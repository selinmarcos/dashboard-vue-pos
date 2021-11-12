<template>
    <div class="auth-wrapper">
        <div class="auth-inner">
            <form @submit.prevent="handleSubmit">
                <h3>Sign up</h3>

                <div class="form-group">
                    <label>Full Name</label>
                    <input v-model="name" type="text" class="form-control" placeholder="Full Name"/>
                </div>
                
                <div class="form-group">
                    <label>Email</label>
                    <input v-model="email"  type="email" class="form-control" placeholder="Email"/>
                </div>

                
                <div class="form-group">
                    <label>User</label>
                    <input v-model="user"  type="text" class="form-control" placeholder="User"/>
                </div>

                <div class="form-group">
                    <label>Phone</label>
                    <input v-model="phone"  type="number" class="form-control" placeholder="Phone"/>
                </div>

                <div class="form-group">
                    <label>Rol</label>
                    <input v-model="rol"  type="text" class="form-control" placeholder="Rol"/>
                </div>


                <div class="form-group">
                    <label>Password</label>
                    <input v-model="pass"  type="password" class="form-control" placeholder="Password"/>
                </div>

                <div class="form-group">
                    <label>Confirm Password</label>
                    <input v-model="password_confirm"  type="password" class="form-control" placeholder="Confirm Password"/>
                </div>

                <button class="btn btn-prymary btn-block">Sign up </button>
            </form>
        </div>
    </div>
    
</template>

<script>

import axios from 'axios'
//let url = 'http://localhost:3000/api/register/'
export default {
    name: 'Register',
    data(){
        return{
            name: '',
            email:'',
            user:'',
            phone:'',
            rol:'',
            pass:'',
            password_confirm:''
        }

    },
    methods:{
        handleSubmit(){
            const data = {
                name:this.name,
                user:this.user,
                email:this.email,
                phone:this.phone,
                rol:this.rol,
                pass:this.pass,
                password_confirm:this.password_confirm
            }

            axios.post('register', data)
                  .then(response =>{
                      
                     //this.r = response.data
                      console.log(response.data)
                      
                      this.$router.push('/login');
                  }).catch(error =>{
                      console.log(error+'you are making an error')
                  })
            
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