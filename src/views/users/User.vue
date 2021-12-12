<template>


    <v-card>  
        <h1>Lista de Usuarios</h1> 
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
                :items="users"
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
        <v-dialog v-model="dialog" max-width="350" >
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
    <v-row justify="center">
        <v-dialog v-model="crear" max-width="600px" transition="dialog-top-transition">

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
                            <v-col cols="12" sm="6" >
                                <v-text-field  v-model="editado.name" label="NOMBRE" outlined required></v-text-field>
                            </v-col>
                         
                          
                            <v-col cols="12" sm="6" >
                                <v-text-field  v-model="editado.user" label="USUARIO"   outlined required></v-text-field>
                               
                            </v-col>
                            <v-col cols="12" sm="6" >
                                 <v-text-field v-model="editado.email" label="EMAIL"  outlined required></v-text-field>
                            </v-col>
                        
                        
                            <v-col cols="12" sm="6">
                                <v-text-field v-model="editado.phone" label="CELULAR" type="number" outlined required></v-text-field>
                            </v-col>
                        
                        
                            <v-col cols="12">
                          
                                <v-select v-model="editado.rol" :items="items" label="ROL"  dense  outlined ></v-select>
         
                            </v-col>
                        
                        
                            <v-col cols="12">
                                <v-text-field v-model="editado.pass" label="NUEVA CONTRASEÑA" type="password" outlined required></v-text-field>
                            </v-col>
                        </v-row>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn  @click="cancelar" color="blue-gray" class="ma-2 white--text">Cancelar</v-btn>
                    
                            <v-btn   @click="guardar" type="submit" color="teal accent-4" class="mr-4 white--text">Guardar</v-btn>
                            <v-spacer></v-spacer>
                        </v-card-actions>
                    </v-container>
                </v-card-text>

 
            </v-card>

        </v-dialog> 
    </v-row>
<!-- -------------------------------------</VENTANAS DE DIALOGO>------------------------------------ -->
    </v-card>
    
</template>

<script>

import axios from 'axios'
  export default {
    mounted(){ // check this function !
            this.obtenerClientes()
        },  
    data () {
      return {
       
        items: ['VENDEDOR', 'SUPERVISOR', 'ADMINISTRADOR'], //itemas para el select
        

          //para la funcion crear
        users:{
            //id:'',
            name:'',
            email:'',
            user:'',
            phone:'',
            rol: '',
            pass: ''
        },

        dialog: false,
        crear: false,
        users:null,
        search: '',
        headers: [
          {
            text: 'ID',
            align: 'start',
            sortable: false,
            value: '_id',
            class:'grey darken-3 white--text'
          },
          { text: 'NOMBRE', value: 'name' , sortable: false, class:'grey darken-3 white--text'},
          { text: 'EMAIL', value: 'email' , sortable: false, class:'grey darken-3 white--text'},
          { text: 'USUARIO', value: 'user' , sortable: false, class:'grey darken-3 white--text' },
          { text: 'CELULAR', value: 'phone' , sortable: false, class:'grey darken-3 white--text'},
          { text: 'ROL', value: 'rol' , sortable: false, class:'grey darken-3 white--text'},
          //{ text: '', value: 'pass' , sortable: false, class:'grey darken-3 white--text'},
          { text: 'ACCIONES', value: 'actions', sortable: false, class:'grey darken-3 white--text'},

        ],
        users: [ //name DE LA TABLA
           
        ],  
        editedIndex: -1, //para saber si es editar o crear
        editado:{
            _id: '',
            name:'',
            email:'',
            user:'',
            phone:'',
            rol: '',
            pass: ''
        },
        defaultItem:{
            _id: '',
            name:'',
            email:'',
            user:'',
            phone:'',
            rol: '',
            pass: ''
        }
      }
    },
    //mostrar datos 
    created(){
        axios.post("users").then(response =>{
            this.users = response.data
            
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
                axios.get("users")
                .then(response =>{
                    this.users= response.data
                })
                .catch((error)=>{
                    console.log(error)
                })
        },

        confirmarBorrado(id){
        axios.delete("users"+id)
        .then(()=>{
            this.obtenerClientes()
            this.dialog = false
           
        })
        .catch((error)=>{
            console.log(error)
        })
        },

        altaCliente(){
            
                let params = {name:this.name, email:this.email, user:this.user, phone:this.phone, rol:this.rol, pass:this.pass}
                //console.log(name)
                //console.log(params)
                axios.post("users", params)
                .then(() =>{                    
                    this.obtenerClientes()
                })
                .catch((error)=>{
                    console.log(error)
                })

        },
        editarCliente (_id, name, email, user, phone, rol, pass) { 
                let params = {name, email, user, phone, rol, pass}
                console.log(params)
                axios.put("users/"+_id, params)

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
        
        this.editedIndex = this.users.indexOf(item)
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
        this.name=this.editado.name
        this.email=this.editado.email
        this.user=this.editado.user
        this.phone=this.editado.phone
        this.rol=this.editado.rol
        this.pass=this.editado.pass
        //console.log(this._id, this.name, this.email, this.user, this.phone)
        // this.snackbar = true
        // this.textSnack = '¡Actualización Exitosa!'  
        this.editarCliente(this._id,this.name, this.email, this.user, this.phone, this.rol, this.pass)  
      } 

        else{
        this.name=this.editado.name
        this.email=this.editado.email
        this.user=this.editado.user
        this.phone=this.editado.phone   
        this.rol=this.editado.rol
        this.pass=this.editado.pass     
        //   this.snackbar = true
        //   this.textSnack = '¡Alta exitosa!'
          this.altaCliente()
        }       
      
      this.cancelar()
    },
    }

  }

</script>