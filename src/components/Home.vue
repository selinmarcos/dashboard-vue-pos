<template>
    <div class="body-class">
        <header>
        <div class="container-header">
            <!-- <nav>
                <a href="#" id="icono" class="icono">Menú</a>
                <div class="enlaces uno" id="enlaces">
                    <a href="">Inicio</a>
                    <a href="">Acerca de</a>
                    <a href="">Contacto</a>
                </div>
            </nav> -->
            <div class="textos">
                <h1 style="font-weight:bold;">Sistema de Facturación WMB</h1>
                <h2>Digitaliza tu negocio, administra tu inventario, genera facturas digitales.</h2>
                <a style="letter-spacing: 2px; font-size: 17px;" target="_blank" href="https://api.whatsapp.com/send?phone=59170666327&text=Hola%20me%20gustar%C3%ADa%20que%20me%20expliquen%20mejor%20sobre%20el%20Sistema%20de%20Ventas%20y%20Facturaci%C3%B3n.">Contactar <i class="fab fa-whatsapp"></i></a>
            </div>
            <img src="./../assets/vector.png" alt="">
        </div>
    </header>
    <div class="wave">
        <div style="height: 150px; overflow: hidden;" ><svg viewBox="0 0 500 150" preserveAspectRatio="none" style="height: 100%; width: 100%;"><path d="M0.00,49.98 C150.00,150.00 349.20,-50.00 500.00,49.98 L500.00,150.00 L0.00,150.00 Z" style="stroke: none; fill: #23272A;"></path></svg></div>
    </div>
  
    <div class="container-cardd">
        <!-- <div class="heading">
          <h1>Css Responsive Flexbox Cards</h1>
        </div> -->
        <div class="row">
          <div class="cardd">
            <div class="card-header">
                <i class="fas fa-boxes fa-3x" aria-hidden="true"></i>
            </div>
            <div class="card-body">
                <h3 style="font-weight:bold;">Controle su Inventario</h3><br>
              <p>
                Controle su inventario en tiempo real, que no le falten productos !
              </p>
            </div>
          </div>
          <div class="cardd">
            <div class="card-header">
                <i class="fas fa-shopping-cart fa-3x" aria-hidden="true"></i>
            </div>
            <div class="card-body">
                <h3 style="font-weight:bold;">Punto de Venta</h3><br>
              <p>
                Realice sus ventas de manera rapida y eficaz.
              </p>
            </div>
          </div>
          <div class="cardd">
            <div class="card-header">
             
              <i class="fas fa-file-invoice fa-3x" aria-hidden="true"></i>
          
            </div>
            <div class="card-body">
                <h3 style="font-weight:bold;">Factura Digital</h3><br>
              <p>
                Genere facturas en PDF automaticamente.
              </p>
            </div>
          </div>
          <div class="cardd">
            <div class="card-header">
                <i class="fas fa-chart-line fa-3x" aria-hidden="true"></i>     
            </div>
            <div class="card-body">
                <h3 style="font-weight:bold;">Reportes</h3><br>
              <p>
                Genere Reportes, analice sus ganancias vea como va creciendo su negocio.
              </p>
            </div>
          </div>
        </div>
        <div class="row">
            <div class="cardd">
              <div class="card-header">
                <i class="fas fa-mobile-alt fa-3x" aria-hidden="true"></i>    
              </div>
              <div class="card-body">
                <h3 style="font-weight:bold;">Adaptable a cualquier Dispositivo</h3><br>
                <p>
                    Podrá acceder desde cualquier dispositivo Tablet, PC o Celular
                </p>

              </div>
            </div>
            <div class="cardd">
              <div class="card-header">
                <i class="fab fa-simplybuilt fa-3x" aria-hidden="true"></i>  
              </div>
              <div class="card-body">
                <h3 style="font-weight:bold;">Facil de utilizar</h3><br>
                <p>
                    Simple e intuitivo, sin opciones innecesarias.
                </p>
       
              </div>
            </div>
            <div class="cardd">
              <div class="card-header">
                <i class="fas fa-question-circle fa-3x" aria-hidden="true"></i>      
              </div>
              <div class="card-body">
                <h3 style="font-weight:bold;">Soporte Permanente</h3><br>
                <p>
                    Soporte técnico de bugs y asesoría.
                </p>
        
              </div>
            </div>
            <div class="cardd">
              <div class="card-header">
                <i class="fas fa-bell fa-3x" aria-hidden="true"></i>      
              </div>
              <div class="card-body">
                <h3 style="font-weight:bold;">Notificaciones</h3><br>
                <p>
                    Si su stock se esta agotando no se preocupe, le llegara una notifiación.
                </p>
    
              </div>
            </div>
          </div>
    </div>

      <div class="pricing">
        <div class="container">
            <h1 class="title">Escoge un Plan</h1>
            <!-- <div class="toggle-switch">
                <span>Billed anually </span>
                <input type="checkbox" class="toggler">
                <span> Billed monthly</span>
            </div> -->
    
            <div class="cards">
    
            <!-- Starter Plan -->
                <div class="card" id="card-1">
                <h1 class="card-title">Mensual</h1>
                <h2 class="card-price" id="starter-price"> $100 <span> / mes</span> </h2>
                <ul class="card-plan">
                    <li> Punto de Venta + Sistema de Facturación</li>
                    <li> Actualizaciones y mejoras constantes</li>
                    <li> Soporte Técnico </li>
                    <li> Hasta 5 empleados</li>
                    <li> Capacitacion Gratuita</li>
                    <li> 10 GB de almacenamiento</li>

                </ul>
                <button type="button" class="card-btn">Empezar</button>
                </div>
    
                <!-- Pro Plan -->
                <div class="card" id="card-1">
                    <h1 class="card-title">Anual</h1>
                    <h2 class="card-price" id="starter-price"> $700 <span> / año</span> </h2>
                    <ul class="card-plan">
                        <li> Punto de Venta + Sistema de Facturación</li>
                        <li> Actualizaciones y mejoras constantes</li>
                        <li> Soporte Técnico </li>
                        <li> Hasta 10 empleados</li>
                        <li> Capacitacion Gratuita</li>
                        <li> 20 GB de almacenamiento</li>
                  
                    </ul>
                    <button type="button" class="card-btn">Empezar</button>
                    </div>
    
                <!-- Permanent Card -->
                <div class="card" id="card-1">
                    <h1 class="card-title">Permanente</h1>
                    <h2 class="card-price" id="starter-price"> $2100  </h2>
                    <ul class="card-plan">
                        <li> Punto de Venta + Sistema de Facturación</li>
                        <li> Actualizaciones y mejoras constantes</li>
                        <li> Soporte Técnico </li>
                        <li> Hasta 20 empleados</li>
                        <li> Capacitacion Gratuita</li>
                        <li> +30 GB de almacenamiento</li>
  
                    </ul>
                    <button type="button" class="card-btn">Empezar</button>
                    </div>

            </div>
        </div>
    </div>
    

    <footer>
        <div class="footer-content">
            <a target="_blank" href="https://api.whatsapp.com/send?phone=59170666327&text=Hola%20me%20gustar%C3%ADa%20que%20me%20expliquen%20mejor%20sobre%20el%20Sistema%20de%20Ventas%20y%20Facturaci%C3%B3n" style="width: 250px; padding:9px;"  type="button" class="card-btn lastbutton"> QUIERO QUE ME EXPLIQUEN</a>  
            <ul class="socials">
                <li><a href="#"><i class="fa fa-facebook"></i></a></li>
                <li><a href="#"><i class="fa fa-youtube"></i></a></li> 
            </ul>
        </div>
        <div class="footer-bottom">
            <p style="color: antiquewhite;">copyright &copy;2021 WMB. designed by <a style="color:#BC1E4A;" href="">Web Master Bolivia</a></p>
        </div>
    </footer>
        
    </div>


 
</template>



<script>
 import {mapGetters} from 'vuex'
 export default{
    name: 'Home',
    computed:{
        ...mapGetters(['user'])
    },
   
 }
</script>
<style scoped>
/* //STYLES HEADER */
*{
    margin:0;
    padding: 0;
    box-sizing: border-box;
    text-decoration: none !important;
    border: none;
    
}

.body-class{
    font-family: 'Open Sans', sans-serif;
    /* ARREGLAR BUG CAMBIAR A BLUE PARA TEST */
   background-color: #191B1D;
   
}
body{
    background-color: #191B1D ;
    font-family: 'Open Sans', sans-serif ;
}

nav{
    position: fixed;
    top: 20px;
    left: 20px;
    display: flex;
    justify-content: flex-start;
}

nav a{
    color:#fff;
    text-decoration: none;
}

.icono{
    display: block;
    z-index: 100000000;
    animation: moverIzquierda 1s ease-in;
}

header{
    background: #DA4453;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, #89216B, #DA4453);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to right, #89216B, #DA4453); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */    
    height: auto;
    padding: 48px;
    width: 100%;
}

.container-header{
    width: 95%;
    max-width: 1200px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    margin: auto;
}

img{
    display: block;
    height: 450px;
    object-fit: cover;
    animation: arriba 1s ease-in;
}

.textos{
    width: 50%;
    color:#fff;
}

.textos h1{
    font-size:50px;
    animation: moverDerecha 1s ease-in;

}

.textos h2{
    font-size:20px;
    animation: moverIzquierda 1s ease-in;
    font-weight: lighter;
}

.textos a{
    display: inline-block;
    color:#fff;
    font-weight: 300;
    text-decoration: none;
    margin-top: 30px;
    border: 1px solid #fff;
    width: 150px;
    border-radius: 3px;
    text-align: center;
    padding: 10px 0;
    animation: arriba 1s ease-in;

}

.wave{
    height: 100px;
    width: 100%;
    background: #DA4453;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, #89216B, #DA4453);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to right, #89216B, #DA4453); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */    
}

.enlaces{
    position: fixed;
    display: flex;
    top: 0;
    background: #000;
    justify-content: space-around;
    align-items: center;
    height: 100vh;
    right: 0;
    flex-direction: column;
    width: 100%;
    transition: all 1s ease;
    background: #bc4e9c;  /* fallback for old browsers */
background: -webkit-linear-gradient(to right, #f80759, #bc4e9c);  /* Chrome 10-25, Safari 5.1-6 */
background: linear-gradient(to right, #f80759, #bc4e9c); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

}

.uno{
    
-webkit-clip-path: circle(0% at 0 0);
clip-path: circle(0% at 0 0);

}

.dos{
    
    -webkit-clip-path: circle(150% at 0 0);
    clip-path: circle(150% at 0 0);
    
    }

@keyframes moverIzquierda{
    0%{
        opacity: 0;
        transform: translateX(-100px);
    }

    100%{
        opacity: 1;
        transform: translate(0);
    }
}

@keyframes moverDerecha{
    0%{
        opacity: 0;
        transform: translateX(100px);
    }

    100%{
        opacity: 1;
        transform: translate(0);
    }
}

@keyframes arriba{
    0%{
        opacity: 0;
        transform: translateY(100px);
    }

    100%{
        opacity: 1;
        transform: translate(0);
    }
}

@media screen and (max-width:1000px){
    img{
        height: 400px;
    }

}

@media screen and (max-width:800px){
    img{
        height: 370px;
    }
    .textos h1{
        font-size: 45px;
    }

    .textos h2{
        font-size: 19px;
    }
    
}

@media screen and (max-width:700px){
    img{
        height: 250px;
    }
    .textos h1{
        font-size: 40px;
    }

    .textos h2{
        font-size: 15px;
    }
    
}

@media screen and (max-width:450px){
    .container-header{
        width: 100%;
        flex-wrap: wrap-reverse;
        justify-content: center;
    }
    .textos{
        width: 100%;
        text-align: center;
    }
    .textos h1{
        font-size: 40px;
    }    
}

@media screen and (max-width:340px){

    img{
        height: 160px;
    }
    .textos h1{
        font-size: 30px;
    }
    .textos a{
        width: 120px;
    }
    .textos h2{
        font-size: 15px;
    }
    
}

/* RESPONSIVE CARDS */
.container-cardd {
    
    width: 100%;
    margin: 50px auto;
    background: #23272A;
    font-family:  Helvetica;
    font-weight: 10px;
  }
  .heading {
    text-align: center;
    font-size: 20px;
    margin-bottom: 50px;
  }
  
  .row {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    flex-flow: wrap;
  }
  
  .cardd {
    width: 20%;
    background: #fff;
    border: 1px solid #ccc;
    margin-bottom: 50px;
    transition: 0.3s;
  }
  
  .card-header {
      text-align: center;
      padding: 15px 10px;
      background: linear-gradient(to right, #ff416c, #ff4b2b);
      /* background: linear-gradient(to right, #89216B, #DA4453);; */
      color: #fff;
  }
  
  .card-body {
      padding: 15px 5px;
      text-align: center;
      font-size: 16px;
  }
  
  .card-body .btn {
    display: block;
    color: #fff;
    text-align: center;
    background: linear-gradient(to right, #ff416c, #ff4b2b);
    margin-top: 30px;
    text-decoration: none;
    padding: 10px 5px;
  }
  
  .cardd:hover {
    transform: scale(1.05);
    box-shadow: 0 0 40px -10px rgba(0, 0, 0, 0.25);
  }
  
  @media screen and (max-width: 1000px) {
    .cardd {
      width: 40%;
    }
  }
  
  @media screen and (max-width: 620px) {
    .container-cardd {
      width: 100%;
    }
  
    .heading {
      padding: 20px;
      font-size: 20px;
    }
  
    .cardd {
      width: 80%;
    }
  }
  /* footer */
  footer{
    position: relative;
    top: 15em;
    bottom: 0;
    left: 0;
    right: 0;
    background: #111;
    height: auto;
    width: 100vw;
    font-family: "Open Sans";
    padding-top: 40px;
    color: #fff;
}

@media (max-width:400px){
    footer{
        top: 103em;
    }

}
.footer-content{
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    text-align: center;

}
.footer-content h3{
    font-size: 1.8rem;
    font-weight: 400;
    text-transform: capitalize;
    line-height: 3rem;
}
.footer-content p{
    max-width: 500px;
    margin: 10px auto;
    line-height: 28px;
    font-size: 14px;
}
.socials{
    list-style: none;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 1rem 0 3rem 0;
}
.socials li{
    margin: 0 10px;
}
.socials a{
    text-decoration: none;
    color: #fff;
}
.socials a i{
    font-size: 1.1rem;
    transition: color .4s ease;

}
.socials a:hover i{
    color: aqua;
}

.footer-bottom{
    background: #000;
    width: 100vw;
    padding: 20px 0;
    text-align: center;
}
.footer-bottom p{
    font-size: 14px;
    word-spacing: 2px;
    text-transform: capitalize;
}
.footer-bottom span{
    text-transform: uppercase;
    opacity: .4;
    font-weight: 200;
}



.lastbutton:hover{
    background: #BC1E4A;
}


/*PRICING*/
/* PRICING TABLE */
*:focus {
    outline: none;
  }
  
  ul {
    list-style: none;
  }
.pricing{
    font-family: Arial, Helvetica, sans-serif;
    background-color: #191b1d;
    color: white;
    height: 50vh;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
.top-banner {
    background-color: #bc1e4a;
    position: absolute;
    padding: 1.5rem 4rem;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    text-align: center;
    border-radius: 0 0 10px 10px;
  }
  
  p.current-plan {
    font-size: 0.75rem;
    margin-bottom: 0.5rem;
  }
  
  p.plan-type {
    font-size: 1rem;
    font-weight: 900;
  }
  
  .container {
    text-align: center;
    width: 1100px;
    height: 100%;
  }
  
  h1.title {
    letter-spacing: 2px;
    margin-bottom: 1.5rem;
  }
  
  .toggle-switch{
      display: flex;
      height: 30px;
      width: 100%;
      justify-content: center;
      align-items: center;
      margin-bottom: 1.5rem;
  }
  
  .toggler{
      appearance: none;
      -webkit-appearance: none;
      -moz-appearance: none;
      width: 50px;
      height: 25px;
      background-color: #bc1e4a;
      border-radius: 25px;
      margin: 0 1rem;
      position: relative;
  }
  
  .toggler::before{
      content: "";
      width: 16px;
      height: 16px;
      background-color: white;
      position: absolute;
      border-radius: 50%;
      top:50%;
      transform: translateY(-50%);
      right:4px;
  }
  
  .toggler:checked:before{
      right: 55%;
  }
  
  .cards{
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      flex-wrap: wrap;
      height: 100%;

  }
  /* EXTRAS MODIFICACIONES */
  .card-plan{
      font-size: 15px !important;
      font-family: sans-serif !important;
  }
  /*</EXTRAS MODIFICACIONES> */
  .card{
     height: 500px;
     width: 32%;
     background-color: #22262C; 
     border-radius: 15px;
     padding: 2rem;
     text-align: center;
  }
  
  .card-title{
      font-size: 1.5rem;
      font-weight: lighter;
      margin-bottom: 1rem;
  }
  
  .card-price{
      font-size: 3rem;
      text-align: center;
      font-weight: bold;
  }
  
  h2>span{
      font-size: 1rem;
  }
  
  #card-3 .card-price{
      font-size: 2rem !important;
  } 
  
  #card-1 .card-price{
      margin-bottom: 4rem;
  }
  .card ul{
      text-align: left;
      font-size: 0.9rem;
      font-weight: lighter;
  }
  
  .card ul li:before{
      content:"•";
      margin-right: 0.5rem;
      color:#bc1e4a;
      font-size: 1.5rem;
  }
  
  .card ul li{
      margin-bottom: 0.5rem;
  }
  
  .card-btn{
      margin-top: 1rem;
      width: 100%;
      background-color: transparent;
      border: 1px solid #bc1e4a;
      color:white;
      font-size: 1.1rem;
      letter-spacing: 2px;
      padding: 1rem;
      border-radius: 5px;
  }
  
  #card-1 .card-btn:hover, 
  #card-3 .card-btn:hover, 
  .active .card-btn
  {
      background-color: #bc1e4a;
  }
  
  #maus{
    background: transparent;
    color:white;
    border-color: #545c5c;
    margin-top: 1rem;
    width: 100%;
    padding: 1rem 2rem;
    font-size: 1rem;
    border-radius: 5px;
  }
  
  option{
      font-size: 1.2rem;
      background-color: #333;
  }
  
  .note{
      color:#bc1e4a;
      font-size: 0.75rem;
      text-align: left;
      display: block;
      margin-top: 5px;
  }
  
  #card-2 ul{
      margin-top: 3rem;
  }
  
  #card-3 ul{
      margin-top: 7.5rem;
  }
  
  @media (max-width:1112px){
      .cards{
          justify-content: center;
      }
  
      .card{
          width: 40%;
      margin: 2rem;
      }
  }
  
  @media (max-width:848px){
      .card{
          width:50%
      }
  }
  
  @media (max-width:674px){
      .top-banner{
          width: 70%;
      }
      .card{
          width: 70%;
      }
  }
  
  @media (max-width:500px){
      .top-banner{
          width: 90%;
      }
  
      .card{
          width: 90%;
          height: 530px;
      }

  }


  

</style>