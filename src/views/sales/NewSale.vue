<template>
  <v-container>
    <!-- <div id='account-info'>
   {{username}}
    </div> -->
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
          <form v-on:submit.prevent="guardarArticulo()">
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="nit"
                  @keyup="buscarCliente()"
                  label="NIT"
                  outlined
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Nombre"
                  v-model="bclientes.nombre"
                  outlined
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="bclientes.telefono"
                  label="TELEFONO"
                  outlined
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="bclientes.direccion"
                  label="DIRECCION"
                  outlined
                  required
                ></v-text-field>
              </v-col>
            </v-row>

            <v-card-actions>
              <v-btn to="/articulos" color="blue-gray" class="mr-4"
                >Cancelar</v-btn
              >
              <v-btn type="submit" color="indigo" class="mr-4">Guardar</v-btn>
            </v-card-actions>
          </form>
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
            :search="search"
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
              <v-text-field
                type="number"
                v-model.number="item.cantidad"
                outlined
              />
            </template>

            <template v-slot:[`item.priceT`]="{ item }">
              {{ precioTotal(item) }}
              <!-- <v-text-field :input-value="precioTotal(item)" v-model="item.priceT"></v-text-field> -->
            </template>
          </v-data-table>
          <v-row>
            <v-col>
              <br />
              <v-btn color="blue-grey darken-4" @click="procesarVenta()">PROCESAR</v-btn>
            </v-col>
            <v-col>
              <h3>SUBTOTAL: {{ sumField("priceT") }}</h3>
              <h3>IVA(13%): {{iva("priceT")}}</h3>
              <h2 class="red lighten-3">TOTAL: {{totalVenta("priceT")}}</h2>
              <!-- <H1>Massage:{{usuario._id}}</H1> -->
              
             
            </v-col>
          </v-row>
        </base-material-card>
      </v-col>
    </v-row>

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
let url = "http://localhost:8000/api/dventas"
let urlv = "http://localhost:8000/api/ventas"
//import easyinvoice from 'easyinvoice';
import axios from "axios";
export default {
  
  name: "NewSale",
  props: ["usuario"],
  mounted() {
    // check this function !
    this.obtenerProductos();
  },
  data() {
    return {
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
    };
  },


  methods: {
    procesarVenta() {
      //VENTAS
        // let param = {idClient:this.bclientes._id, idUser:user._id}
        let param = {idClient:this.bclientes._id, idUser:'612ab0240dd20217141dd7cb', fecha: new Date(), estado:'PAGADO', totalFactura: this.sumField("priceT") }
        //console.log(nombre)
        //console.log(param)
        axios.post(urlv, param)
        .then(() =>{                    
            console.log('TODO OKAY')
        })
        .catch((error)=>{
            console.log(error)
        })

    //DETALLE VENTAS
    //ARREGLAR LOS ASYNC AWAIT O PROMESAS ESTE setTimeout es provisional....
        setTimeout(() => {
          let params = {cantidad:this.ventas}
        //console.log(nombre)
        console.log(params)
        axios.post(url, params)
        .then(() =>{                    
            console.log('TODO OKAY')
        })
        .catch((error)=>{
            console.log(error)
        })
}, 1000);


        //location.reload();
        
    },

    precioTotal(item) {
      console.log(this.ventas)
      //this.sub= 0
      this.ventas[this.ventas.indexOf(item)].priceT =
        item.price0 * item.cantidad;
      //console.log(item.priceT)
      //this.t = this.t + this.ventas[this.ventas.indexOf(item)].priceT
      //this.$set(this.r, 'priceT', this.resultado)
      //console.log("TOTAL DE VENTAS"+this.ventas[this.ventas.indexOf(item)].priceT)

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
      this.datosV = Object.assign({}, item);
      this.ventas.push({
        idProduct0: this.datosV._id,
        description0: this.datosV.description,
        price0: this.datosV.price,
        cantidad: 1,
        priceT: this.datosV.price,
      });
    },
    buscarCliente() {
      //console.log(this.nit)
      let urlBuscarCliente = "http://localhost:8000/api/buscarcliente/";
      axios
        .get(urlBuscarCliente + this.nit)
        .then((response) => {
          //console.log(response.data)

          console.log("SIN  error");
          //console.log(response.data)
          if (response.data) {
            this.bclientes.nombre = response.data.nombre;
            this.bclientes.telefono = response.data.telefono;
            this.bclientes.direccion = response.data.direccion;
            this.bclientes._id = response.data._id;

            console.log("IMPRIMI ESTO  "+this.bclientes._id)
          } else {
            this.bclientes.nombre = "";
            this.bclientes.telefono = "";
            this.bclientes.direccion = "";
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
      let url0 = "http://localhost:8000/api/products";
      axios
        .get(url0)
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
    guardarArticulo() {
      let router = this.$router;
      let params = this.articulo;
      axios
        .post(url, params)
        .then(() => {
          console.log(params);
          router.push("/articulos");
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
