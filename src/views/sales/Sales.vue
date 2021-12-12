<template>
    <v-container tag="section">
        <v-row>
            <v-col cols="12">
                <base-material-card color="warning" class="px-5 py-3"  >
                    <template v-slot:heading>
                        <v-row>
                            <v-col class="display-3 font-weight-light pa-0" color="#2A3B4D" cols="12" sm="6" md="4" >
                                Ventas
                                <!-- <v-btn @click.stop="crear=true"  fab small color="error" class="ml-3"><v-icon>mdi-plus</v-icon></v-btn> -->
                            </v-col>
                            <v-col cols="12" sm="6" md="4" class="pa-0">
                                
                            </v-col>

                            <v-col cols="12" sm="6" md="4" class="pa-0 ">
                               <v-text-field 
                                v-model="search"
                                append-icon="mdi-magnify"
                                label="Buscar"
                                single-line
                                hide-details
                                class="pt-0"
                                
                            ></v-text-field>
                            </v-col>
                        </v-row>
               
                    </template>
                <v-data-table
                    :headers="headers"
                    :items="ventas"
                    :items-per-page="10"
                    class="elevation-1"
                    :search="search"
                >
                <template v-slot:[`item.actions`]="{ item }">
                    <v-btn  @click="id=item._id, generatePDF(item._id)"  fab small color="blue-grey darken-4"><v-icon>mdi-eye</v-icon></v-btn>
                    <v-btn fab small color="light-blue" @click="editar(item)">
                        <v-icon>mdi-pencil</v-icon>
                    </v-btn>
                    <v-btn @click.stop="dialog=true" @click="id=item._id" fab small color="red lighten-1"><v-icon>mdi-cancel</v-icon></v-btn>
                </template>
                </v-data-table>
        <!-- -------------------------------------<VENTANAS DE DIALOGO>----------------------------------         -->
                        <!-- ventana de dialogo para eliminar registro -->
                <v-dialog v-model="dialog" max-width="350">
                    <v-card>
                        <v-card-title class="headline">Desea eliminar el registro ?</v-card-title>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn @click="dialog=false">Cancelar</v-btn>
                            <v-btn @click="confirmarBorrado(id)" color="error">Aceptar</v-btn>
                        </v-card-actions>
                    </v-card>

                </v-dialog> 

                    <!-- ventana de dialogo para crear  -->
                <v-dialog v-model="crear" max-width="500px">
                    <template ></template>
                    <v-card>
                        <v-card-title class="cyan withe-text">
                            <!-- si es una alta o modificacion va cambiar el titulo formTitle  -->
                            <span class="headline">{{formTitle}}</span> 
                        </v-card-title>

                        <v-card-text>
                            <v-container>
                                <v-row>
                                    <!-- <v-col cols="12" sm="6" md="4">
                                        <v-text-field v-model="ventas._id" label="ID" outlined required></v-text-field>
                                    </v-col> -->
                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field v-model="editado.noFactura" label="noFactura" outlined required></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field v-model="editado.fecha" label="fecha" type="number"  outlined required></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field v-model="editado.idClient" label="PHONE" type="number"  outlined required></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field v-model="editado.idUser" label="idUser" outlined required></v-text-field>
                                    </v-col>
                                </v-row>
                            </v-container>
                        </v-card-text>
                        
                        <v-card-actions>
                            <v-btn @click="cancelar" color="blue-gray" class="ma-2 white--text">Cancelar</v-btn>
                            <v-btn @click="guardar" type="submit" color="teal accent-4" class="mr-4 white--text">Guardar</v-btn>
                        </v-card-actions>
                        
                    </v-card>

                </v-dialog> 
<!-- -------------------------------------</VENTANAS DE DIALOGO>------------------------------------ -->
                </base-material-card>
            </v-col>
         </v-row>
    </v-container>
    
</template>

<script>
import axios from 'axios'
  export default {
    mounted(){ // check this function !
            this.obtenerClientes()
        },  
    data () {
      return {
          //para la funcion crear
        ventas:{
            noFactura:'',
            fecha:'',
            idClient:'',
            idUser:''
        },

        dialog: false,
        crear: false,
        ventas:null,
        search: '',
        headers: [
          {
            text: 'ID',
            align: 'start',
            sortable: false,
            value: '_id',
            class:'teal darken-1 white--text'
          },
          { text: 'No FACTURA', value: 'noFactura' , sortable: false , class:'teal darken-1 white--text'},
          { text: 'FECHA', value: 'fecha' , sortable: false, class:'teal darken-1 white--text'},
          { text: 'CLIENTE', value: 'idCliente.nombre' , sortable: false, class:'teal darken-1 white--text' },
          { text: 'VENDEDOR', value: 'idUsuario.rol' , sortable: false, class:'teal darken-1 white--text'},
          { text: 'ESTADO', value: 'estado' , sortable: false, class:'teal darken-1 white--text' },
          { text: 'TOTAL FACTURA', value: 'totalFactura' , sortable: false, class:'teal darken-1 white--text'},
          { text: 'ACCIONES', value: 'actions', sortable: false , class:'teal darken-1 white--text'},

        ],
        ventas: [ //noFactura DE LA TABLA
           
        ],
        registerVenta:[],  
        editedIndex: -1, //para saber si es editar o crear
        editado:{
            _id: '',
            noFactura:'',
            fecha:'',
            idClient:'',
            idUser:'',
            estado:'',
            totalFactura:''
        },
        defaultItem:{
            _id: '',
            noFactura: '',
            fecha:'',
            idCliente:'',
            idUser:'',
            estado:'',
            totalFactura:''
        }
      }
    },
    //mostrar datos 
    created(){
        axios.get("ventas").then(response =>{
            this.ventas = response.data
            
        })
    },
    computed:{
        formTitle(){
            return  this.editedIndex === -1 ? 'NUEVO REGISTRO' : 'EDITAR REGISTRO'
        }
    },
    watch:{
        crear(val){
            val || this.cancelar()
        }
    },
    methods:{
        //INVOICE PDF
         generatePDF(id){
             console.log('INVOICE',id)
       
             axios.get("dventas" + id)
        .then((response) => {
           
             this.registerVenta= response.data

             this.total= this.registerVenta.length
          


          
             console.log('ARRAY',this.registerVenta)

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
        name: "Business Name",
        address: "Albania, Tirane ish-Dogana, Durres 2001",
        phone: "(+355) 069 11 11 111",
        email: "email@example.com",
        email_1: "info@example.al",
        website: "www.example.al",
    },
    contact: {
        label: "Invoice issued for:",
        name: "Client Name",
        address: "Albania, Tirane, Astir",
        phone: "(+355) 069 22 22 222",
        email: "client@website.al",
        otherInfo: "www.website.al",
    },
    invoice: {
        label: "Invoice #: ",
        num: 19,
        invDate: "Payment Date: 01/01/2021 18:12",
        invGenDate: "Invoice Date: 02/02/2021 10:17",
        headerBorder: false,
        tableBodyBorder: false,
        header: ["#", "Description", "Price", "Quantity", "Total"],
        table: Array.from(Array(this.total), (item, index)=>([
            index + 1,
            this.registerVenta[index].productName,
            this.registerVenta[index].productPrice,
            this.registerVenta[index].cantidad,
            this.registerVenta[index].precioVenta
        ])),
        invTotalLabel: "Total:",
        invTotal:this.registerVenta[0].venta.totalFactura.toString(),
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
            col2: '116,199.90',
            col3: 'ALL',
            style: {
                fontSize: 10 //optional, default 12
            }
        },
        invDescLabel: "Invoice Note",
        invDesc: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary.",
    },
    footer: {
        text: "The invoice is created on a computer and is valid without the signature and stamp.",
    },
    pageEnable: true,
    pageLabel: "Page ",
};

var pdfObject = jsPDFInvoiceTemplate.default(props); //returns number of pages created
console.log('Object Created', pdfObject)

// FIX THIS... WE NEED TO SHOW THE INVOICE IN POP UP WITH CUSTOM SIZES....we need to chnge the output type in the begining the guy from youtube said blob is correct now is set with DataUrlNewWindow
// console.log('blob', pdfObject.Blob)
//check https://github.com/edisonneza/jspdf-invoice-template/blob/main/src/index.js

// var file = new Blob([pdfObject], {type: 'application/pdf'});
// var fileURL = URL.createObjectURL(file);
// window.open(fileURL, "width=200,height=100");


        }).catch((error) => {
            console.log(error)

        });


    
    },    

        //mostrar datos otra vez por que no funciona con created cuando borras un registro.
        obtenerClientes(){
                axios.get("ventas")
                .then(response =>{
                    this.ventas = response.data
                    console.log(response.data)
                })
                .catch((error)=>{
                    console.log(error)
                })
        },

        confirmarBorrado(id){
        axios.delete("ventas"+id)
        .then(()=>{
            this.obtenerClientes()
            this.dialog = false
           
        })
        .catch((error)=>{
            console.log(error)
        })
        },

        altaCliente(){
            
                let params = {noFactura:this.noFactura, fecha:this.fecha, idClient:this.idClient, idUser:this.idUser}
                //console.log(noFactura)
                console.log(params)
                axios.post("ventas", params)
                .then(() =>{                    
                    this.obtenerClientes()
                })
                .catch((error)=>{
                    console.log(error)
                })
                //falta limpiar variables...revizar esto
                // this.ventas.noFactura=""
                // this.ventas.fecha=0
                // this.ventas.idClient=""
                // this.ventas.idUser=""
        },
        editarCliente (_id, noFactura, fecha, idClient, idUser) { 
                let params = {noFactura, fecha, idClient, idUser}
                console.log(params)
                axios.put("ventas/"+_id, params)

                .then(()=>{
                    console.log("llegue sin errores")
                    this.obtenerClientes()
                })
                .catch((error)=>{
                    console.log(error)
                    console.log("llegue error")
                })
    },
    editar(item){
        
        this.editedIndex = this.ventas.indexOf(item)
        this.editado = Object.assign({}, item)
        console.log(this.editado)
        this.crear = true
    },
    cancelar(){
        this.crear = false
        this.editado = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
    },
    guardar () {
      if (this.editedIndex > -1) {
          
          //Guarda en caso de Edición
        this._id=this.editado._id          
        this.noFactura=this.editado.noFactura
        this.fecha=this.editado.fecha
        this.idClient=this.editado.idClient
        this.idUser=this.editado.idUser
        //console.log(this._id, this.noFactura, this.fecha, this.idClient, this.idUser)
        // this.snackbar = true
        // this.textSnack = '¡Actualización Exitosa!'  
        this.editarCliente(this._id,this.noFactura, this.fecha, this.idClient, this.idUser)  
      } 

        else{
        this.noFactura=this.editado.noFactura
        this.fecha=this.editado.fecha
        this.idClient=this.editado.idClient
        this.idUser=this.editado.idUser        
        //   this.snackbar = true
        //   this.textSnack = '¡Alta exitosa!'
          this.altaCliente()
        }       
      
      this.cancelar()
    },
    }

  }

</script>