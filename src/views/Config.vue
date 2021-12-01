<template>
  <v-container
    id="user-profile"
    fluid
    tag="section"
  >
    <v-row justify="center">
      <v-col
        cols="12"
        md="8"
      >
        <base-material-card>
          <template v-slot:heading>
            <div class="display-2 font-weight-dark">
              DATOS DE LA EMPRESA
            </div>

            <!-- <div class="subtitle-1 font-weight-light">
              Complete your profile
            </div> -->
          </template>
          <!-- Validamos si hay datos en business para ejecutar una funcion u otra -->
          <div v-if="this.business._id">      
          <form   v-on:submit.prevent="updateBusiness()">
            <v-container class="py-0">
              <v-row>
                <v-col
                  cols="12"
                  md="4"
                >
                  <v-text-field
                     required
                     type="number"
                    label="NIT"
                    
                    v-model="business.nit"
                 
                  
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="4"
                >
                  <v-text-field
                  required
                  type="number"
                    class="purple-input"
                    label="TELEFONO"
                    v-model="business.phone"
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="4"
                >
                  <v-text-field
                  required
                  type="email"
                    label="EMAIL"
                    class="purple-input"
                    v-model="business.email"
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="6"
                >
                  <v-text-field
                  required
                    label="NOMBRE DE LA EMPRESA"
                    class="purple-input"
                    v-model="business.companyName"
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="6"
                >
                  <v-text-field
                  required
                    label="RAZÓN SOCIAL"
                    class="purple-input"
                    v-model="business.companyLegalName"
                  />
                </v-col>

                <v-col cols="12">
                  <v-text-field
                  required
                    label="DIRECCIÓN"
                    class="purple-input"
                    v-model="business.address"
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="4"
                >
                  <v-text-field
                  required
                    label="CIUDAD"
                    class="purple-input"
                    v-model="business.city"
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="4"
                >
                  <v-text-field
                  required
                    label="PAÍS"
                    class="purple-input"
                    v-model="business.country"
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="4"
                >
                  <v-text-field
                  required
                    class="purple-input"
                    label="IVA %"
                    type="number"
                    v-model="business.iva"
                  />
                </v-col>

                <!-- <v-col cols="12">
                  <v-textarea
                    class="purple-input"
                    label="SLOGAN"
                    value=""
                  />
                </v-col> -->

                <v-col
                  cols="12"
                  class="text-right"
                >
                  <v-btn
                    color="success"
                    class="mr-0"
                    type="submit"
                  >
                    ACTUALIZAR
                  </v-btn>
                </v-col>
              </v-row>
            </v-container>
          </form>
          </div>  

          <div v-else>      
          <form   v-on:submit.prevent="handleCompany()">
            <v-container class="py-0">
              <v-row>
                <v-col
                  cols="12"
                  md="4"
                >
                  <v-text-field
                    required
                    type="number"
                    label="NIT"
                   
                    v-model="business.nit"
                 
                  
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="4"
                >
                  <v-text-field
                    required
                    type="number"
                    class="purple-input"
                    label="TELEFONO"
                    v-model="business.phone"
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="4"
                >
                  <v-text-field
                     required
                    label="EMAIL"
                    class="purple-input"
                    v-model="business.email"
                   
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="6"
                >
                  <v-text-field
                  required
                    label="NOMBRE DE LA EMPRESA"
                    class="purple-input"
                    v-model="business.companyName"
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="6"
                >
                  <v-text-field
                  required
                    label="RAZÓN SOCIAL"
                    class="purple-input"
                    v-model="business.companyLegalName"
                  />
                </v-col>

                <v-col cols="12">
                  <v-text-field
                  required
                    label="DIRECCIÓN"
                    class="purple-input"
                    v-model="business.address"
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="4"
                >
                  <v-text-field
                  required
                    label="CIUDAD"
                    class="purple-input"
                    v-model="business.city"
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="4"
                >
                  <v-text-field
                  required
                    label="PAÍS"
                    class="purple-input"
                    v-model="business.country"
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="4"
                >
                  <v-text-field
                  required
                    class="purple-input"
                    label="IVA %"
                    type="number"
                    v-model="business.iva"
                  />
                </v-col>

                <!-- <v-col cols="12">
                  <v-textarea
                    class="purple-input"
                    label="SLOGAN"
                    value=""
                  />
                </v-col> -->

                <v-col
                  cols="12"
                  class="text-right"
                >
                  <v-btn
                    color="success"
                    class="mr-0"
                    type="submit"
                  >
                   CREAR
                  </v-btn>
                </v-col>
              </v-row>
            </v-container>
          </form>
          </div> 



        </base-material-card>
      </v-col>

      <v-col
        cols="12"
        md="4"
      >
        <base-material-card
          class="v-card-profile"
          avatar="https://demos.creative-tim.com/vue-material-dashboard/img/marc.aba54d65.jpg"
        >
          <v-card-text class="text-center">
            <h6 class="display-1 mb-1 grey--text">
              CEO / CO-FOUNDER
            </h6>

            <h4 class="display-2 font-weight-light mb-3 black--text">
              Alec Thompson
            </h4>

            <p class="font-weight-light grey--text">
              Don't be scared of the truth because we need to restart the human foundation in truth And I love you like Kanye loves Kanye I love Rick Owens’ bed design but the back is...
            </p>



            <v-btn 
               @click="createInvoice"
              color="success"
              rounded
              class="mr-0"
            >
              create
            </v-btn>
                <v-btn 
                @click.stop="dialog=true"
              @click="renderInvoice"
              color="success"
              rounded
              class="mr-0"
            >
              render
            </v-btn>
                <v-btn 
              @click="downloadInvoice"
              color="success"
              rounded
              class="mr-0"
            >
              download
            </v-btn>
          </v-card-text>
        </base-material-card>
      </v-col>
    </v-row>
         <v-dialog   v-model="dialog" max-width="750">
           
                            <p>
    Invoice Base64 (click create invoice):
    <small>{{ invoiceBase64 }}</small>
    </p>
  
  <div id="pdf"></div>

           

        </v-dialog> 
  </v-container>
  
</template>
<script>
import easyinvoice from 'easyinvoice';
import axios from "axios";
 let url = "http://localhost:8000/api/business/";
  export default {
    name: 'business',
    // mounted(){
    //     this.getBusiness()
    // },
    data(){
        return{
           dialog: false,
            invoiceBase64: '',
            business: {
                _id:"",
                nit: "",
                phone: "",
                email: "",
                companyName: "",
                companyLegalName: "",
                address: "",
                city: "",
                country: "",
                iva: ""
            },
              //  business: null,
              //  business:[]
            
        } 
   
    },
    created(){
        axios.get(url).then(response =>{
            var estado = response.data
            console.log(estado)
            this.business.nit = response.data[0].nit
            this.business.phone = response.data[0].phone
            this.business.address = response.data[0].address
            this.business.companyName = response.data[0].companyName
            this.business.companyLegalName = response.data[0].companyLegalName
            this.business.country = response.data[0].country
            this.business.city = response.data[0].city
            this.business.iva = response.data[0].iva
            this.business.email = response.data[0].email
            this.business._id = response.data[0]._id
          
        
            
        })
    },
    methods:{
        //INVOICE SAMPLE
        async createInvoice() {
	    //See documentation for all data properties
      const data = this.getSampleData(); 
      const result = await easyinvoice.createInvoice(data);
      this.invoiceBase64 = result.pdf;
    },
    async downloadInvoice() {
       //See documentation for all data properties
      const data = this.getSampleData(); 
      const result = await easyinvoice.createInvoice(data);
      easyinvoice.download('myInvoice.pdf', result.pdf);
      //	you can download like this as well:
      //	easyinvoice.download();
      //	easyinvoice.download('myInvoice.pdf');
    },
    async renderInvoice(){

     



     //See documentation for all data properties
      document.getElementById("pdf").innerHTML = "loading...";
      const data = this.getSampleData(); 
      const result = await easyinvoice.createInvoice(data);      
    	easyinvoice.render('pdf', result.pdf);
      //window.open(easyinvoice.render('pdf', result.pdf));
    },
    getSampleData() {
      return {
        //"documentTitle": "RECEIPT", //Defaults to INVOICE

        //"locale": "de-DE", 
        //Defaults to en-US. List of locales: https://datahub.io/core/language-codes/r/3.html 

        "currency": "USD", 
        //Defaults to no currency. List of currency codes: https://www.iban.com/currency-codes

        "taxNotation": "vat", //or gst
        "marginTop": 25,
        "marginRight": 25,
        "marginLeft": 25,
        "marginBottom": 25,
        "logo": "https://public.easyinvoice.cloud/img/logo_en_original.png", //or base64
				"background": "https://public.easyinvoice.cloud/img/watermark-draft.jpg", //or base64
        "sender": {
          "company": "Sample Corp",
          "address": "Sample Street 123",
          "zip": "1234 AB",
          "city": "Sampletown",
          "country": "Samplecountry"
          //"custom1": "custom value 1",
          //"custom2": "custom value 2",
          //"custom3": "custom value 3"
        },
        "client": {
          "company": "Client Corp",
          "address": "Clientstreet 456",
          "zip": "4567 CD",
          "city": "Clientcity",
          "country": "Clientcountry"
          //"custom1": "custom value 1",
          //"custom2": "custom value 2",
          //"custom3": "custom value 3"
        },
        "invoiceNumber": "2021.0001",
        "invoiceDate": "1.1.2021",
        "products": [
            {
                "quantity": "2",
                "description": "Test1",
                "tax": 6,
                "price": 33.87
            },
            {
                "quantity": "4",
                "description": "Test2",
                "tax": 21,
                "price": 10.45
            }
        ],
        "bottomNotice": "Kindly pay your invoice within 15 days.",
        //Used for translating the headers to your preferred language
        //Defaults to English. Below example is translated to Dutch
        // "translate": { 
        //     "invoiceNumber": "Factuurnummer",
        //     "invoiceDate": "Factuurdatum",
        //     "products": "Producten", 
        //     "quantity": "Aantal", 
        //     "price": "Prijs",
        //     "subtotal": "Subtotaal",
        //     "total": "Totaal" 
        // }
      };
    },

        //CREATE
       handleCompany(){
           console.log('HANDLE business RUNNING')
           console.log('ayudaaaa'+this.business.nit)
            let params = {nit: this.business.nit, phone: this.business.phone, email:this.business.email, companyName:this.business.companyName, companyLegalName:this.business.companyLegalName, address:this.business.address, city:this.business.city, country:this.business.country,iva:this.business.iva}
              axios.post(url, params)
              .then((respons) => {
                 //this.bclientes._id = respons.data._id;
                 console.log('METODO CREAR'+respons.data)
              })
              .catch((error)=>{
                console.log(error)
              })
       }, 
        //SHOW
        //    getBusiness(){
        //        console.log('ejecutandome lero lero')
        //         axios.get(url)
        //         .then(response =>{
        //             //var estado = response.data[0]
        //             if(response.data){
        //                 this.business= response.data[0]
        //                 console.log(this.business._id)
        //             }
     
                    
                    
                    
        //         })
        //         .catch((error)=>{
        //             console.log(error)
        //         })
        // },   
        //EDIT
        updateBusiness(){
          console.log('EJECUTANDO UPDATE')
                let params = {nit: this.business.nit, phone: this.business.phone, email:this.business.email, companyName:this.business.companyName, companyLegalName:this.business.companyLegalName, address:this.business.address, city:this.business.city, country:this.business.country,iva:this.business.iva}
                console.log('enviamos esto:'+this.business.iva)
                
                axios.put(url+this.business._id, params)
                .then(()=>{
                    console.log('editado con exito')
                })
                .catch((error)=>{
                    console.log(error)
                })
            }
    } 
  }
</script>
<style>
#pdf {
  text-align: center;
}

#pdf canvas {
  border: 1px solid black;
  width: 95%;
}
</style>