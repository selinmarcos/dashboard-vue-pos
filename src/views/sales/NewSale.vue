<template>
  <v-container>
    <!-- <div id='account-info'>
   {{username}}
    </div> -->
    <form v-on:submit.prevent="procesarVenta()">
    <v-row>
      <!--DATOS DEL CLIENTE-->
      <v-col cols="6" md="4">
        <base-material-card class="px-5 py-3">
          <template v-slot:heading>
            <v-row>
              <v-col
                class="display-2 font-weight-light pa-0"
                color="#2A3B4D"
                cols="12"
                sm="6"
                md="8"
              >
                Datos del Cliente
              </v-col>
            </v-row>
          </template>
          <!-- previene que se recargue la pagina -->
          
            <v-row>
              <v-col cols="12">
                <v-text-field id="nitUsuario"
                  v-model="bclientes.nit"
                  @keyup="buscarCliente()"
                  label="NIT"
                  outlined
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field id="nameUsuario"
                  label="Nombre"
                  v-model="bclientes.nombre"
                  outlined
                  
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field id="telefonoUsuario"
                  v-model="bclientes.telefono"
                  label="TELEFONO"
                  outlined
                  
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field id="direccionUsuario"
                  v-model="bclientes.direccion"
                  label="DIRECCION"
                  outlined
                  
                ></v-text-field>
              </v-col>
            </v-row>

            <!-- <v-card-actions>
              <v-btn to="/articulos" color="blue-gray" class="mr-4"
                >Cancelar</v-btn
              >
              <v-btn type="submit" color="indigo" class="mr-4">Guardar</v-btn>
            </v-card-actions> -->
         
        </base-material-card>
      </v-col>

      <v-col cols="12" sm="6" md="8">
        <base-material-card class="px-5 py-3">
          <template v-slot:heading>
            <v-row>
              <v-col
                class="display-2 font-weight-light pa-0"
                color="#2A3B4D"
                cols="12"
                sm="6"
                md="8"
              >
                VENTAS
              </v-col>
            </v-row>
          </template>

          <v-data-table
            :headers="headers0"
            :items="ventas"
            :items-per-page="10"
            class="elevation-1"
            
          >
            <template v-slot:[`item.actions`]="{ item }">
              <v-btn
                @click="deleteVenta(item)"
                fab
                small
                color="blue-grey darken-4"
                ><v-icon>mdi-delete</v-icon></v-btn
              >
            </template>

            <template v-slot:[`item.cantidad`]="{ item }">
              <!-- <v-text-field
                type="number"
                min="1"
          
                v-model.number="item.cantidad"
                outlined
                required
                @keyup="cantidadProducto(item)"
                @mouseup="cantidadProducto(item)" 
                id="stockField"
                
              /> -->
              <v-text-field  onkeypress="return false;" outlined v-model.number="item.cantidad" type="number" class="inputCantidad" append-outer-icon="mdi-plus" @click:append-outer="increment(item)" prepend-icon="mdi-minus" @click:prepend="decrement(item)"></v-text-field>

            </template>

            <template v-slot:[`item.priceT`]="{ item }">
              {{ precioTotal(item) }}
              <!-- <v-text-field :input-value="precioTotal(item)" v-model="item.priceT"></v-text-field> -->
            </template>
          </v-data-table>
          <v-row>

            <v-col>
              <h3>SUBTOTAL: {{ sumField("priceT") }}</h3>
              <h3>IVA(13%): {{iva("priceT")}}</h3>
              <h2 class="red lighten-3">TOTAL: {{totalVenta("priceT")}}</h2>            
            </v-col>

            <v-col>
              <br />
              <!-- <v-btn @click.stop="dialog=true" type="submit" color="blue-grey darken-4" >PROCESAR</v-btn> -->
              <v-btn  type="submit" color="blue-grey darken-4" >PROCESAR</v-btn>

            </v-col>
          </v-row>
        </base-material-card>
      </v-col>
    </v-row>
    </form>
    <!-- PRODUCTOS TABLE -->
    <v-row>
      <v-col cols="12">
        <base-material-card class="px-5 py-3">
          <template v-slot:heading>
            <v-row>
              <v-col
                class="display-3 font-weight-light pa-0"
                color="#2A3B4D"
                cols="12"
                sm="6"
                md="4"
              >
                Lista de Productos
              </v-col>
              <v-col cols="12" sm="6" md="4" class="pa-0">
                <v-text-field
                  v-model="search"
                  append-icon="mdi-magnify"
                  label="Buscar"
                  single-line
                  hide-details
                  class="pt-0"
                  outlined
                ></v-text-field>
              </v-col>
            </v-row>
          </template>

          <v-data-table
            :headers="headers"
            :items="products"
            :items-per-page="10"
            class="elevation-1"
            :search="search"
          >
            <template v-slot:[`item.actions`]="{ item }">
              <v-btn
                @click="addToVenta(item)"
                fab
                small
                color="blue-grey darken-4"
                ><v-icon>mdi-plus</v-icon></v-btn
              >
            </template>
          </v-data-table>
        </base-material-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>

import axios from "axios";
import {mapGetters} from 'vuex'

export default {
  
  name: "NewSale",
  //props: ["usuario"],
  mounted() {
    // check this function !
    this.obtenerProductos()

    this.getBusinessName()
  },
  data() {
    return {
  
    
      ventasFactura: [ //noFactura DE LA TABLA
           
        ],
      selected: [],

      bclientes: {
        
        nombre: "",
        nit: "",
        telefono: "",
        direccion: "",
      },

      search: "",
      headers: [
        {
          text: "ID",
          align: "start",
          sortable: false,
          value: "_id",
          class: "grey darken-3 white--text",
        },
        {
          text: "PRODUCTO",
          value: "description",
          sortable: false,
          class: "grey darken-3 white--text",
        },
        {
          text: "STOCK",
          value: "stock",
          sortable: false,
          class: "grey darken-3 white--text",
        },
        {
          text: "PRECIO",
          value: "price",
          sortable: false,
          class: "grey darken-3 white--text",
        },
        {
          text: "ACCIONES",
          value: "actions",
          sortable: false,
          class: "grey darken-3 white--text",
        },
      ],
      ventas: [],
      headers0: [
        {
          text: "ID",
          align: "start",
          sortable: false,
          value: "idProduct0",
          class: "grey darken-3 white--text",
        },
        {
          text: "DESCRIPCION",
          value: "description0",
          sortable: false,
          class: "grey darken-3 white--text",
        },
        {
          text: "CANTIDAD",
          value: "cantidad",
          sortable: false,
          class: "grey darken-3 white--text",
        },
        // {
        //   text: "STOCK",
        //   value: "stock0",
        //   sortable: false,
        //   class: "grey darken-3 white--text",
        //   align: 'd-none' //hidding column
          
        // },
        {
          text: "PRECIO U",
          value: "price0",
          sortable: false,
          class: "grey darken-3 white--text",
        },
        {
          text: "PRECIO T",
          value: "priceT",
          sortable: false,
          class: "grey darken-3 white--text",
        },
        {
          text: "ACCIONES",
          value: "actions",
          sortable: false,
          class: "grey darken-3 white--text",
        },
      ],
      products: [
        //description DE LA TABLA
      ],

      foo:0,
      business:[]
    };
  },


  methods: {
    getBusinessName(){
      axios.get("business")
      .then(response =>{
        console.log('GET BUSINESS'+ response.data[0].companyLegalName)
        this.business.companyLegalName = response.data[0].companyLegalName
        this.business.email = response.data[0].email
        this.business.address = response.data[0].address
        this.business.city = response.data[0].city
        this.business.phone = response.data[0].phone
        this.business.nit = response.data[0].nit
        this.business.web = response.data[0].web
      })
      .catch((e)=>{
        console.log('ERROR BUSINESS'+ e)
      })
    },
    getCurrentDate(){
      let date = new Date();
      let output = String(date.getDate()).padStart(2, '0') + '-' + String(date.getMonth() + 1).padStart(2, '0') + '-' + date.getFullYear()+' '+date.getHours() + ":" + date.getMinutes() ;
      return output 
    },


    increment (item) {

  if(item.stock0 > item.cantidad){
      console.log(item.stock0)
  item.cantidad = parseInt(item.cantidad,10) + 1
      console.log('incrementing')
        console.log(item.cantidad)

  }

    

    },
    decrement (item) {
      if(item.cantidad>1){
      item.cantidad = parseInt(item.cantidad,10) - 1
      console.log('decrementing')
    }
    },
    
    insertarCliente(){
      return new Promise((resolve, reject)=>{
  
    
      // if(document.getElementById('nitUsuario').value == "" )  this.bclientes.nit = '0'
      axios.get("buscarcliente/" + this.bclientes.nit )
        .then((response) => {
        if(response.data){
        //NO INSERTAMOS NADA YA QUE HAY UN NIT EXISTENTE QUE COINCIDE CON EL INSERTADO
                  console.log(' HAY COINCIDENCIAS')
                  resolve()
       }
 
       
      else{
         //let's add default values 
        
        if(document.getElementById('telefonoUsuario').value == "" )  this.bclientes.telefono = '0'
      
        if(document.getElementById('nameUsuario').value == "") this.bclientes.nombre = "Regular"

        if(document.getElementById('direccionUsuario').value == "" ) this.bclientes.direccion = 'NN'

        //INSERTAMOS NUEVO CLIENTE
        console.log('NO HAY COINCIDENCIAS')
        let params = {nombre:this.bclientes.nombre, nit:this.bclientes.nit, telefono:this.bclientes.telefono, direccion:this.bclientes.direccion}
        axios.post("clientes", params)
          .then((respon) =>{ 
            console.log('NUEVO CLIENTE INSERTADO', respon.data) 
            //ahora recuperamos el campo _id del cliente que acabamos de insertar
              axios.get("buscarcliente/" + this.bclientes.nit)
              .then((respons) => {
                 this.bclientes._id = respons.data._id;
                 console.log('campo id recuperado')
                 resolve()
              })
              .catch((error)=>{
                console.log(error)
              })
          })
          .catch((error)=>{
                 console.log(error)
          })

      }


        })
        .catch((error) => {
                console.log('ERROR MY FRIEND'+error)
        })
      })
      
    },
    venta(){

      return new Promise((resolve, reject)=>{
        
        console.log(this.user._id)
        let param = {idClient:this.bclientes._id, idUser:this.user._id, fecha: this.getCurrentDate(), estado:'PAGADO', totalFactura: this.sumField("priceT") }
        console.log('ENTRAMOS')
        axios.post("ventas", param)
        .then((response) =>{                    
            console.log('TODO OKAY VENTAS')
            this.ventasFactura= response.data
            console.log(this.ventasFactura)
            resolve()
        })
        .catch((error)=>{
            console.log(error)
            reject()
        })


      })
        
    },
    detalleVenta(){
     
        return new Promise((resolve, reject)=>{
           console.log('detalle venta')
          let params = {cant:this.ventas}
        
        //console.log(params)
        axios.post("dventas", params)
        .then(() =>{                    
            console.log('TODO OKAY DVENTAS')
            
            resolve()
           
        })
        .catch((error)=>{
            console.log(error)
            
            reject()
        })
        })

    },
    stock(){
       console.log('llamando stock')
        return new Promise((resolve, reject)=>{
         
          let paramstock = {cant:this.ventas}
        axios.put("stock/", paramstock)

        .then(()=>{
            console.log("modificando stock...")
            resolve()
            
          })
        .catch((error)=>{
              console.log('error al modificar stock'+error)
            reject()
        })

        })
          
    },
    async procesarVenta() {
      console.log(this.ventas.length)
      //validamos si el datatable is empty
      if(this.ventas.length){
      //IMPORTANTE !!!! si await no recibe una respuesta del servidor no pasara al siguiente await...
             
        await this.insertarCliente()
        await this.venta()
        await this.detalleVenta()
        await this.stock()
     
        await this.templateInvoice()  

        //limpiamos para no hacer refresh
        this.ventas= []
        this.ventasFactura=[],
        this.bclientes = []
        //we are going to called it again bc if we don't... don't change the stock if we don't reload the page
        this.obtenerProductos()
      }else{
        alert('AGREGUE PRODUCTOS')
      }
    },
    //<TEMPLATE INVOICE JSPDF>
    templateInvoice(){

      var props = {
    outputType: jsPDFInvoiceTemplate.OutputType.DataUrlNewWindow,
    returnJsPDFDocObject: true,
    fileName: "Invoice 2021",
    orientationLandscape: false,
    logo: {
        src: "https://raw.githubusercontent.com/edisonneza/jspdf-invoice-template/demo/images/logo.png",
        width: 53.33, //aspect ratio = width/height
        height: 26.66,
        margin: {
            top: 0, //negative or positive num, from the current position
            left: 0 //negative or positive num, from the current position
        }
    },
    business: {
        email_1: 'NIT: '+ this.business.nit.toString(),
        name: this.business.companyLegalName,
        address: this.business.address,
        phone: this.business.phone.toString(),
        email: this.business.email,
        website: this.business.web,
    },
    contact: {
        label: "Invoice issued for:",
        name: this.bclientes.nombre,
        address: this.bclientes.direccion,
        phone: this.bclientes.telefono.toString(),
        // nit: this.bclientes.nit.toString()
        // email: "client@website.al",
        otherInfo: this.bclientes.nit.toString(),
    },
    invoice: {
        label: "Factura #: ",
        num: this.ventasFactura.noFactura,
        // invDate: "Payment Date: 01/01/2021 18:12",
        invGenDate: "Fecha de Emision: "+this.getCurrentDate(),
        headerBorder: false,
        tableBodyBorder: false,
        header: ["#", "Description", "Price", "Quantity", "Total"],
        table: Array.from(Array(this.ventas.length), (item, index)=>([   
            index + 1,
            this.ventas[index].description0,
            this.ventas[index].price0,
            this.ventas[index].cantidad,
            this.ventas[index].priceT
        ])),
        invTotalLabel: "Total:",
        invTotal: this.totalVenta("priceT"),
        invCurrency: "ALL",
        row1: {
            col1: 'IVA:',
            col2: '13',
            col3: '%',
            style: {
                fontSize: 10 //optional, default 12
            }
        },
        row2: {
            col1: 'SubTotal:',
            col2: this.sumField("priceT") ,
            col3: 'ALL',
            style: {
                fontSize: 10 //optional, default 12
            }
        },
        invDescLabel: "Invoice Note",
        invDesc: "Esta factura contribuye al desarrollo del país. el uso ilícito de esta será sancionado de acuerdo a ley. \n",
    },
    footer: {
        text: "The invoice is created on a computer and is valid without the signature and stamp.",
    },
    pageEnable: true,
    pageLabel: "Page ",
};

 var pdfObject = jsPDFInvoiceTemplate.default(props); 
 console.log('Object Created', pdfObject)
 //falta abrir en navegador 
 //window.open(pdfObject)

    },

    //</TEMPLATE INVOICE JSPDF>
  

    precioTotal(item) {
      //console.log(this.ventas)
 
      this.ventas[this.ventas.indexOf(item)].priceT = item.price0 * item.cantidad;


      return this.ventas[this.ventas.indexOf(item)].priceT;
    },


    //SUMAR COLUMNA / SUBTOTAL
    sumField(key) {
      // sum data in give key (property)
      
      this.ventas.reduce((a, b) => a + (b[key] || 0), 0) * 0.13
      this.subtotal = (this.ventas.reduce((a, b) => a + (b[key] || 0), 0)) - (this.ventas.reduce((a, b) => a + (b[key] || 0), 0) * 0.13)
      return this.subtotal.toFixed(2)
      
    },
    // IVA 13%
        iva(key) {
      // sum data in give key (property)      
      this._iva =  this.ventas.reduce((a, b) => a + (b[key] || 0), 0) * 0.13
      return this._iva.toFixed(2)
      
    },
    //TOTAL
        totalVenta(key) {
      // sum data in give key (property)      
      this.total =  this.ventas.reduce((a, b) => a + (b[key] || 0), 0) 
      return this.total.toFixed(2)

    },



    deleteVenta(item) {
      this.ventas.splice(this.ventas.indexOf(item), 1)

      //Mutation Methods: splice es metodo que vue acepta y traquea a diferencia de delete que no lo hace.
    },

    addToVenta(item) {
      var estado = 0
      this.datosV = Object.assign({}, item);
      if(this.datosV.stock!=0)
      {
       
     
        //Validamos si el producto ya ha sido agregado
        if(this.ventas[0] !== undefined){
        for(let i in this.ventas){
          if(this.ventas[i].idProduct0 === this.datosV._id){
            alert ('El Producto ya ha sido agregado !')
            estado = 1
          }
        }
            if(estado == 0 ){
            console.log('IMPRESION FOR')
            this.ventas.push({
            idProduct0: this.datosV._id,
            description0: this.datosV.description,
            stock0: this.datosV.stock,
            price0: this.datosV.price,
            cantidad: 1,
            priceT: this.datosV.price,
            
            });
          }
            return 0
      }

        else{
        this.ventas.push({
        idProduct0: this.datosV._id,
        description0: this.datosV.description,
        price0: this.datosV.price,
        stock0: this.datosV.stock,
        cantidad: 1,
        priceT: this.datosV.price,
      });
          
        }
     }else{
       alert("AGOTADO")
     }
    },
    buscarCliente() {
      //console.log(this.nit)
      axios.get("buscarcliente/" + this.bclientes.nit)
        .then((response) => {
          //console.log(response.data)

          console.log("SIN  error");
          //console.log(response.data)
          if (response.data) {
            this.bclientes.nit = response.data.nit;
            this.bclientes.nombre = response.data.nombre;
            this.bclientes.telefono = response.data.telefono;
            this.bclientes.direccion = response.data.direccion;
            this.bclientes._id = response.data._id;
            document.getElementById("nameUsuario").disabled = true
            document.getElementById("telefonoUsuario").disabled = true
            document.getElementById("direccionUsuario").disabled = true
            //DESACTIVAMOS LOS IMPUT
            console.log("IMPRIMI ESTO  "+this.bclientes._id)
          } else {
            this.bclientes.nombre = "";
            this.bclientes.telefono = "";
            this.bclientes.direccion = "";
              document.getElementById("nameUsuario").disabled = false
            document.getElementById("telefonoUsuario").disabled = false
            document.getElementById("direccionUsuario").disabled = false
          }
        })
        .catch((error) => {
          this.bclientes.nombre = "";
          this.bclientes.telefono = "";
          this.bclientes.direccion = "";
          console.log("hubo un error");
          console.log(error);
        });
    },
    obtenerProductos() {
     
      axios
        .get("products")
        .then((response) => {
          this.products = response.data;
          //console.log("EXITO")
          //console.log(this.products.description)
        })
        .catch((error) => {
          console.log("ERROR AMIGO");
          console.log(error);
        });
    },

  },
         computed:{
          ...mapGetters(['user'])
        }
};
</script>

<style scoped>
.inputCantidad >>> input[type="number"] {
  -moz-appearance: textfield;
}
.inputCantidad >>> input::-webkit-outer-spin-button,
.inputCantidad >>> input::-webkit-inner-spin-button {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
}
</style>

