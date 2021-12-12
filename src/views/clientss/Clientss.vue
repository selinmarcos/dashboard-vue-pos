<template>
    <v-container tag="section">
        <v-row>
            <v-col cols="12">
                <base-material-card color="warning" class="px-5 py-3"  >
                    <template v-slot:heading>
                        <v-row>
                            <v-col class="display-3 font-weight-light pa-0" color="#2A3B4D" cols="12" sm="6" md="4" >
                                Lista de Clientes<v-btn @click.stop="crear=true"  fab small color="error" class="ml-3"><v-icon>mdi-plus</v-icon></v-btn>
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
                    :items="clientes"
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
                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field v-model="editado.nombre" label="NOMBRE" outlined required></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field v-model="editado.nit" label="NIT" type="number"  outlined required></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field v-model="editado.telefono" label="PHONE" type="number"  outlined required></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field v-model="editado.direccion" label="DIRECCION" outlined required></v-text-field>
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
        clientes:{
            nombre:'',
            nit:'',
            telefono:'',
            direccion:''
        },

        dialog: false,
        crear: false,
        clientes:null,
        search: '',
        headers: [
          {
            text: 'ID',
            align: 'start',
            sortable: false,
            value: '_id',
            class:'teal darken-1 white--text'
          },
          { text: 'NOMBRE', value: 'nombre' , sortable: false , class:'teal darken-1 white--text'},
          { text: 'NIT', value: 'nit' , sortable: false, class:'teal darken-1 white--text'},
          { text: 'PHONE', value: 'telefono' , sortable: false, class:'teal darken-1 white--text' },
          { text: 'DIRECCION', value: 'direccion' , sortable: false, class:'teal darken-1 white--text'},
          { text: 'ACCIONES', value: 'actions', sortable: false , class:'teal darken-1 white--text'},

        ],
        clientes: [ //NOMBRE DE LA TABLA
           
        ],  
        editedIndex: -1, //para saber si es editar o crear
        editado:{
            _id: '',
            nombre:'',
            nit:'',
            telefono:'',
            direccion:''
        },
        defaultItem:{
            _id: '',
            nombre:'',
            nit:'',
            telefono:'',
            direccion:''
        }
      }
    },
    //mostrar datos 
    created(){
        axios.get("clientes").then(response =>{
            this.clientes = response.data
            
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
        //mostrar datos otra vez por que no funciona con created cuando borras un registro.
        obtenerClientes(){
                axios.get("clientes")
                .then(response =>{
                    this.clientes = response.data
                    console.log(response.data)
                })
                .catch((error)=>{
                    console.log(error)
                })
        },

        confirmarBorrado(id){
        axios.delete("clientes"+id)
        .then(()=>{
            this.obtenerClientes()
            this.dialog = false
           
        })
        .catch((error)=>{
            console.log(error)
        })
        },

        altaCliente(){
            
                let params = {nombre:this.nombre, nit:this.nit, telefono:this.telefono, direccion:this.direccion}
                //console.log(nombre)
                console.log(params)
                axios.post("clientes", params)
                .then(() =>{                    
                    this.obtenerClientes()
                })
                .catch((error)=>{
                    console.log(error)
                })
                //falta limpiar variables...revizar esto
                // this.clientes.nombre=""
                // this.clientes.nit=0
                // this.clientes.telefono=""
                // this.clientes.direccion=""
        },
        editarCliente (_id, nombre, nit, telefono, direccion) { 
                let params = {nombre, nit, telefono, direccion}
                console.log(params)
                axios.put("clientes/"+_id, params)

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
        
        this.editedIndex = this.clientes.indexOf(item)
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
        this.nombre=this.editado.nombre
        this.nit=this.editado.nit
        this.telefono=this.editado.telefono
        this.direccion=this.editado.direccion
        //console.log(this._id, this.nombre, this.nit, this.telefono, this.direccion)
        // this.snackbar = true
        // this.textSnack = '¡Actualización Exitosa!'  
        this.editarCliente(this._id,this.nombre, this.nit, this.telefono, this.direccion)  
      } 

        else{
        this.nombre=this.editado.nombre
        this.nit=this.editado.nit
        this.telefono=this.editado.telefono
        this.direccion=this.editado.direccion        
        //   this.snackbar = true
        //   this.textSnack = '¡Alta exitosa!'
          this.altaCliente()
        }       
      
      this.cancelar()
    },
    }

  }

</script>