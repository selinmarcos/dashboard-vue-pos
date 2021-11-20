<template>
  <div class="auth-wrapper">
    <div class="auth-inner">
      <form @submit.prevent="handleSubmit()">
        <h3>Olvidaste tu contraseña</h3>

        <div class="form-group">
          <label>Correo</label>
          <input
            type="email"
            class="form-control"
            placeholder="ejemplo@gmail.com"
            v-model="email"
          />
        </div>
        <button class="btn btn-primary" btn-block>Aceptar</button>
      </form>
    </div>
  </div>
</template>
<script>
import axios from "axios"
export default {
  name: "Forgot",
  data(){
      return{
          email:''
      }
  },
  methods:{
      async handleSubmit(){
          const response = await axios.post('forgot',{
              email:this.email
          })

          console.log()

      }

  }
};
</script>
