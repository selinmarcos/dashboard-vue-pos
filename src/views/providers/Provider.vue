<template>


    <v-card>  
        <h1>Lista de Proveedores</h1> 
            <v-btn @click.stop="crear=true" fab dark color="#ff5252"><v-icon>mdi-plus</v-icon></v-btn> 
        <v-card-title>  
                
                
            <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Search"
                single-line
                hide-details
            ></v-text-field>
            
        </v-card-title>

                <v-data-table
            :headers="headers"
            :items="providers"
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
                                <v-text-field v-model="editado.provider" label="PROVEEDOR" outlined required></v-text-field>
                            </v-col>
                         </v-row>
                        <v-row>   
                            <v-col cols="12" sm="6" md="4">
                                <v-text-field v-model="editado.contact" label="CONTACTO"   outlined required></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                                <v-text-field v-model="editado.phone" label="TELEFONO" type="number"   outlined required></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col>
                                <v-text-field v-model="editado.direccion" label="DIRECCION" outlined required></v-text-field>
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
    </v-card>
    
</template>

<script>
//let url = 'http://localhost:8000/api/providers/'
import axios from 'axios'
  export default {
    mounted(){ // check this function !
            this.obtenerClientes()
        },  
    data () {
      return {
          //para la funcion crear
        providers:{
            provider:'',
            contact:'',
            phone:'',
            direccion:''
        },

        dialog: false,
        crear: false,
        providers:null,
        search: '',
        headers: [
          {
            text: 'ID',
            align: 'start',
            sortable: false,
            value: '_id',
            class:'grey darken-3 white--text'
          },
          { text: 'PROVEEDOR', value: 'provider' , sortable: false, class:'grey darken-3 white--text'},
          { text: 'CONTACTO', value: 'contact' , sortable: false, class:'grey darken-3 white--text'},
          { text: 'TELEFONO', value: 'phone' , sortable: false, class:'grey darken-3 white--text' },
          { text: 'DIRECCION', value: 'direccion' , sortable: false, class:'grey darken-3 white--text'},
          { text: 'ACCIONES', value: 'actions', sortable: false, class:'grey darken-3 white--text'},

        ],
        providers: [ //provider DE LA TABLA
           
        ],  
        editedIndex: -1, //para saber si es editar o crear
        editado:{
            _id: '',
            provider:'',
            contact:'',
            phone:'',
            direccion:''
        },
        defaultItem:{
            _id: '',
            provider:'',
            contact:'',
            phone:'',
            direccion:''
        }
      }
    },
    //mostrar datos 
    // created(){
    //     axios.post("providers").then(response =>{
    //         this.providers = response.data
            
    //     })
    // },
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
                axios.get("providers")
                .then(response =>{
                    this.providers= response.data
                })
                .catch((error)=>{
                    console.log(error)
                })
        },

        confirmarBorrado(id){
        axios.delete("providers/"+id)
        .then(()=>{
            this.obtenerClientes()
            this.dialog = false
           
        })
        .catch((error)=>{
            console.log(error)
        })
        },

        altaCliente(){
            
                let params = {provider:this.provider, contact:this.contact, phone:this.phone, direccion:this.direccion}
                //console.log(provider)
                //console.log(params)
                axios.post("providers", params)
                .then(() =>{                    
                    this.obtenerClientes()
                })
                .catch((error)=>{
                    console.log(error)
                })

        },
        editarCliente (_id, provider, contact, phone, direccion) { 
                let params = {provider, contact, phone, direccion}
                console.log(params)
                axios.put("providers/"+_id, params)

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
        
        this.editedIndex = this.providers.indexOf(item)
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
        this.provider=this.editado.provider
        this.contact=this.editado.contact
        this.phone=this.editado.phone
        this.direccion=this.editado.direccion
        //console.log(this._id, this.provider, this.contact, this.phone, this.direccion)
        // this.snackbar = true
        // this.textSnack = '¡Actualización Exitosa!'  
        this.editarCliente(this._id,this.provider, this.contact, this.phone, this.direccion)  
      } 

        else{
        this.provider=this.editado.provider
        this.contact=this.editado.contact
        this.phone=this.editado.phone
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