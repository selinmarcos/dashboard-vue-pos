<template>
  <div class="auth-wrapper">
    <div class="auth-inner">
      <form @submit.prevent="handleSubmit">
        <!-- mensaje de error -->
        <!-- <v-alert v-if="error" dense outlined type="error">
          {{ error }}
        </v-alert> -->
        <error  v-if="error" :error="error" />
        <h3>Login</h3>
        <!-- <h4>{{$store.state.user}}</h4> -->
        <div class="form-group">
          <label>Email</label>
          <input
            v-model="email"
            type="email"
            class="form-control"
            placeholder="Email"
          />
        </div>

        <div class="form-group">
          <label>Password</label>
          <input
            v-model="pass"
            type="password"
            class="form-control"
            placeholder="Password"
          />
        </div>
        <v-btn type="submit" color="primary" dark align-center> Login </v-btn>
        <button class="btn btn-prymary btn-block">Login</button>
        <p class="forgot-password text-right">
          <router-link to="forgot">Olvidate tu contraseña?</router-link>
        </p>
      </form>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import Error from "./Error.vue"
export default {
  name: "Login",
  components:{
    Error
  },
  data() {
    return {
      email: "",
      pass: "",
      error: "",
    };
  },
  methods: {
    //nos logeamos es decir creamos el token
    async handleSubmit() {
      //ponemos el try catch in order to show the error message
      try {
        const respons = await axios.post("login", {
          email: this.email,
          pass: this.pass,
        });

        console.log("TOKEEEEEN GUARDADO:  " + respons.data.token);
        localStorage.setItem("token", respons.data.token);

        //nos conectamos a user para hacer la autenticacion (si no no aparece el user en el nav)
        const response = await axios.get("user");
        //enviamos todo user a vuex
        this.$store.dispatch("user", response.data);
        //this.$store.state("user", true)

        //redireccionamos al dashboard
        // this.$router.push("/dashboard");
        this.$router.push({name:'Inicio'})
      } catch (e) {
        console.log(e)
        this.error = "Usuario o Contraseña Incorrecto";
      }
    },
  },
};
</script>
<style>
@import url("https://fonts.googleapis.com/css?family=Fira+Sans:400,500,600,700,800");
* {
  box-sizing: border-box;
}
.mainpage {
  margin-top: 34px;
}
.navbar-light {
  height: 90px;
}
body {
  background: #292841;
  min-height: 100vh;
  display: flex;
  font-weight: 400;
  font-family: "Fira Sans", sans-serif;
}
h1,
h2,
h3,
h4,
h5,
h6,
label,
span {
  font-weight: 500;
  font-family: "Fira Sans", sans-serif;
  text-align: center;
}

body,
html,
#app,
#root,
.auth-wraper {
  width: 100%;
  height: 100%;
}

#app {
  text-align: left;
}

.auth-wraper {
  display: flex;
  justify-content: center;
  flex-direction: column;
  text-align: left;
}
.auth-inner {
  width: 450px;
  margin-top: 10vh !important;
  margin: auto;
  background: #ffffff;
  box-shadow: 0px 14px 80px rgba(34, 35, 58, 0.2);
  padding: 40px 55px 45px 55px;
  border-radius: 15px;
  transition: all 0.3s;
}
.auth-wraper .form-control:focus {
  border-color: #167bff;
  box-shadow: none;
}

.auth-wraper h3 {
  text-align: center;
  margin: 0;
  line-height: 1;
  padding-bottom: 20px;
}

.custom-control-label {
  font-weight: 400;
}

.forgot-password,
.forgot-password a {
  text-align: center;
  font-size: 13px;
  padding-top: 10px;
  color: #7f7d7d;
  margin: 0;
}

.forgot-password a {
  color: #167bff;
}
</style>

