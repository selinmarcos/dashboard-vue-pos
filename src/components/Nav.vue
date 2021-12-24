<template>
    <nav class="navbar navbar-dark bg-dark navbar-expand  fixed-top">
      <div class="container">
        <router-link to="/" class="navbar-brand">WMB</router-link>
        <div class="collapse navbar-collapse">
           <ul class="navbar-nav ml-auto" v-if="!user">
              <li class="nav-item">
                <router-link to="/login" class="nav-link">Login</router-link>
              </li>
              <li class="nav-item">
                <router-link to="/register" class="nav-link">Sign up</router-link>
              </li>
           </ul>

         
            <ul v-if="user" class="navbar-nav ml-auto">
              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" id="navbarDarkDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                   <v-icon id="icon">mdi-account</v-icon> {{user.user}} | {{user.rol}}
              
                </a>
                <ul class="dropdown-menu dropdown-menu-dark" aria-labelledby="navbarDarkDropdownMenuLink">
                    <li><a class="dropdown-item" href="#">Profile</a></li>
                    <li> <router-link to="/dashboard" class="dropdown-item">Dashboard</router-link></li>
                    <div class="dropdown-divider"></div>
                    <li><a class="dropdown-item" @click="handleClick" href="javascript:void(0)">Sign out</a></li>
                </ul>
              </li>
            </ul>
         

        </div>
      </div>
       
              <!-- <NewSale :massage="user.user" />   -->
    </nav>
    
</template>


<script>
    import axios from 'axios'
    import {mapGetters} from 'vuex'
    export default{
        name: 'Nav',

        methods:{ 
            handleClick(){
              localStorage.removeItem('token')
              this.$store.dispatch('user', null)
              axios.post('logout')
                  .then(response =>{

                     this.$router.push('/')
                      
                  }).catch(error =>{
                      console.log(error+'you are making an error')
                  })
             
            }
        },
        computed:{
          ...mapGetters(['user'])
        }
    }
</script>
<style scoped>
#icon{
  color: white;
}
/* h1, h2, h3, h4, h5, h6, label, span{
  font-weight: 500;
  font-family: 'Fira Sans', sans-serif;
} */
/* body{
 
  font-weight: 400;
  font-family: 'Fira Sans', sans-serif;
  
} */

.navbar-dark{
 position: absolute;
  height: 34px;
  font-family: sans-serif;
  font-size: 17px;
}

</style>