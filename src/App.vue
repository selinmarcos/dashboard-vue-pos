<template>
  <div id="app">
    <Nav />
    
            <router-view :usuario="user"/> 
   
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

     async created(){
         const response = await axios.get('user')

          this.$store.dispatch('user', response.data)  
     }
  }
</script>
 <style>
   #dash{
     position: absolute;
   }
 </style>
