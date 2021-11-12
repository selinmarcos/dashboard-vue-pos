<template>
    <div class="auth-wrapper">
       <div class="auth-inner">
            <form @submit.prevent="handleSubmit">
                <h3>Login</h3>
                
        
                <div class="form-group">
                    <label>Email</label>
                    <input v-model="email" type="email" class="form-control" placeholder="Email"/>
                </div>

                <div class="form-group">
                    <label>Password</label>
                    <input v-model="pass" type="password" class="form-control" placeholder="Password"/>
                </div>

                <button class="btn btn-prymary btn-block">Login </button>
            </form>
       </div>
    </div> 
   
    
</template>
<script>
    import axios from 'axios'
   
    export default{
        name: 'Login',
        data(){
            return{
                email:'',
                pass:''
            }
      
        },
        methods:{
               async handleSubmit(){
                   const response = await axios.post('login',{
                    email: this.email,
                    pass: this.pass,

                })
          
                 //console.log('TOKEEEEEN GUARDADO:  '+response.data.token)
                 localStorage.setItem('token', response.data.token)
                 //console.log(response.data.user.name)
                       //console.log(response.data.user)
            
                //this.$store.dispatch('user', reponse.data.user) 
                //this.$store.commit("user", reponse.data.user)
                //   console.log(response.data.user)
                // console.log(this.$store.dispatch('user', response.data.user))
                this.$router.push('/dash')
             
              

                
            }
        }
    }
</script>
<style>
.auth-wraper{
  display: flex;
  justify-content: center;
  flex-direction: column;
  text-align: left;
}
.auth-inner{
  width: 450px;
  margin: auto;
  background: #ffffff;
  box-shadow: 0px 14px 80px rgba(34,35,58,0.2);
  padding: 40px 55px 45px 55px;
  border-radius: 15px;
  transition: all  .3s;
}
.auth-wraper .form-control:focus{
  border-color: #167BFF;
  box-shadow: none;
}

.auth-wraper h3{
  text-align: center;
  margin: 0;
  line-height: 1;
  padding-bottom: 20px;
}

.custom-control-label{
  font-weight: 400;
}

.forgot-password,
.forgot-password a{
  text-align:center;
  font-size: 13px;
  padding-top: 10px;
  color: #7f7d7d;
  margin: 0;
}

.forgot-password a{
  color: #167bff
}

</style>

