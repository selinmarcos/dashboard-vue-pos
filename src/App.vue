<template>
  <div id="app">
    <Nav />
    
            <router-view /> 
   
  </div>

</template>

<script>
  import Nav from './components/Nav.vue'
  import axios from 'axios'
  export default {
    name: 'App',
    components:{
      Nav,

    },

//Hacemos la autenticacion cuando carga el componente principal Muy Importante !
     async created(){
       //getting 'user' for vuex

         const response = await axios.get('user')
          this.$store.dispatch('user', response.data)  

        //getting 'business' for vuex
          const responsee = await axios.get('business')
          this.$store.dispatch('business', responsee.data[0]) 
 
     }

       

   
     
  }
</script>
 <style>

 </style>
