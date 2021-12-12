<template>
<v-container>
    <v-row>
        <v-col cols="12">
            <base-material-card color="warning" class="px-5 py-3"  >
                    <template v-slot:heading>
                        <v-row>
                            <v-col class="display-3 font-weight-light pa-0" color="#2A3B4D" cols="12" sm="6" md="4" >
                                Lista de Productos<v-btn @click.stop="crear=true"  fab small color="error" class="ml-3"><v-icon>mdi-plus</v-icon></v-btn>
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
                        :items="products"
                        :items-per-page="10"
                        class="elevation-1"
                        :search="search"
                    >
                    <template v-slot:[`item.actions`]="{ item }">
                        <v-btn fab small color="light-blue" @click="editar(item)">
                            <v-icon>mdi-pencil</v-icon>
                        </v-btn>
                        <v-btn @click.stop="dialog=true" @click="id=item._id" fab small color="blue-grey darken-4"><v-icon>mdi-delete</v-icon></v-btn>
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
                                <v-text-field v-model="clientes._id" label="ID" outlined required></v-text-field>
                            </v-col> -->
                            <v-col >
                                <v-text-field v-model="editado.description" label="PRODUCTO" outlined required></v-text-field>
                            </v-col>
                         </v-row>
                        <v-row>   
                            <v-col cols="12" sm="6" md="4">
                                <v-text-field v-model="editado.stock" label="STOCK" type="number"  outlined required></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                                <v-text-field v-model="editado.price" label="PRECIO" type="number"  prefix="$"  outlined required></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col>
                                <!-- <v-text-field v-model="editado.idProvider" label="PREVEEDOR" outlined required></v-text-field>  -->
                                <!-- <v-text-field v-model="editado.idProvider" label="PREVEEDOR" outlined required></v-text-field> -->
                                <!-- <v-select v-model="editado.provider" :items="items" label="ROL"  dense  outlined ></v-select> -->
                                <v-select  v-model="editado.idProvider" :items="proveedores" item-text="provider" item-value="idProvider" label="PROVEEDOR"  dense  outlined ></v-select>
                                
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card-text>

                    <v-card-actions>
                        <v-btn  @click="cancelar" color="blue-gray" class="ma-2 white--text">Cancelar</v-btn>
                        <v-spacer></v-spacer>
                        <v-btn   @click="guardar" type="submit" color="teal accent-4" class="mr-4 white--text">Guardar</v-btn>
  
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
            this.mostrarProviders()
        },  
    data () {
      return {
          
          //para la funcion crear
        products:{
            description:'',
            stock:'',
            price:'',
            idProvider:''
        },
        //proveedores:[],
        // proveedores:null,
        //proveedores:{idProvider:'', provider:''},
     

        dialog: false,
        crear: false,
        products:null,
        search: '',
        headers: [
          {
            text: 'ID',
            align: 'start',
            sortable: false,
            value: '_id',
            class:'grey darken-3 white--text'
          },
          { text: 'PRODUCTO', value: 'description' , sortable: false, class:'grey darken-3 white--text'},
          { text: 'STOCK', value: 'stock' , sortable: false, class:'grey darken-3 white--text'},
          { text: 'PRECIO', value: 'price' , sortable: false, class:'grey darken-3 white--text' },
          { text: 'PROVEEDOR', value: 'idProvider' , sortable: false, class:'grey darken-3 white--text'},
          { text: 'ACCIONES', value: 'actions', sortable: false, class:'grey darken-3 white--text'},

        ],
        products: [ //description DE LA TABLA
           
        ],  
       

        editedIndex: -1, //para saber si es editar o crear
        editado:{
            _id: '',
            description:'',
            stock:'',
            price:'',
            idProvider:''
            
        },
        defaultItem:{
            _id: '',
            description:'',
            stock:'',
            price:'',
            idProvider:''
        }
      }
    },
    //mostrar datos 
    created(){
        axios.get("products").then(response =>{
            this.products = response.data
            console.log('METODO CREATED:'+ response.data)
            
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

        mostrarProviders(){
            
                axios.get("prov")
                .then(response =>{
                    this.proveedores = response.data
                    console.log(this.proveedores)
                    
                })
                .catch((error)=>{
                    console.log(error)
                })

        },

        //mostrar datos otra vez por que no funciona con created cuando borras un registro.
        obtenerClientes(){
                axios.get("products")
                .then(response =>{
                    this.products= response.data
                    console.log('OBTENER PRODUCTOS'+ response.data)
                })
                .catch((error)=>{
                    console.log(error)
                })
        },

        confirmarBorrado(id){
        axios.delete("products"+id)
        .then(()=>{
            this.obtenerClientes()
            this.dialog = false
           
        })
        .catch((error)=>{
            console.log(error)
        })
        },

        altaCliente(){
                console.log('llegamos aqui')
                let params = {description:this.description, stock:this.stock, price:this.price, idProvider:this.idProvider}
               
                console.log(params)
                axios.post("products", params)
                .then(() =>{                    
                    this.obtenerClientes()
                })
                .catch((error)=>{
                    console.log(error)
                })

        },
        editarCliente (_id, description, stock, price, idProvider) { 
                let params = {description, stock, price, idProvider}
                console.log(params)
                axios.put("products/"+_id, params)

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
        
        this.editedIndex = this.products.indexOf(item)
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
        this.description=this.editado.description
        this.stock=this.editado.stock
        this.price=this.editado.price
        this.idProvider=this.editado.idProvider
        //console.log(this._id, this.description, this.stock, this.price, this.provider)
        // this.snackbar = true
        // this.textSnack = '¡Actualización Exitosa!'  
        this.editarCliente(this._id,this.description, this.stock, this.price, this.idProvider)  
      } 

        else{
        this.description=this.editado.description
        this.stock=this.editado.stock
        this.price=this.editado.price
        this.idProvider=this.editado.idProvider        
        //   this.snackbar = true
        //   this.textSnack = '¡Alta exitosa!'
          this.altaCliente()
        }       
      
      this.cancelar()
    },
    }

  }

</script>