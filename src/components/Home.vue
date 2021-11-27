<template>

<div class="main" >
    <div class="title-container">
        <h1>SISTEMA DE VENTAS Y FACTURACION ONLINE</h1>
    </div>
    <div class="cards-container"> 

            <div class="card">

                <div class="top-row background-top-row">
                    <h4>Instagram</h4>
                    <i class="fa fa-instagram" aria-hidden="true"></i>
                </div>

                <div class="content">
                    <h2>Instagram</h2>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis odit repellat quo placeat illo officia, assumenda repudiandae commodi dolor libero.</p>
                    <button class="button background-top-row">Empezar</button>
                </div>

            </div>

            <div class="card">

                <div class="top-row background-top-row">
                    <h4>YouTube</h4>
                    <i class="fa fa-youtube" aria-hidden="true"></i>
                </div>

                <div class="content">
                    <h2>Youtube</h2>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis odit repellat quo placeat illo officia, assumenda repudiandae commodi dolor libero.</p>
                    <button class="button background-top-row">Empezar</button>
                </div>

            </div>

            <div class="card">

                <div class="top-row background-top-row">
                    <h4>Facebook</h4>
                    <i class="fa fa-facebook" aria-hidden="true"></i>
                </div>

                <div class="content">
                    <h2>Facebook</h2>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis odit repellat quo placeat illo officia, assumenda repudiandae commodi dolor libero.</p>
                    <button class="button background-top-row">Empezar</button>
                </div>

            </div>

            <div class="card">

                <div class="top-row background-top-row">
                    <h4>Twitter</h4>
                    <i class="fa fa-twitter" aria-hidden="true"></i>
                </div>

                <div class="content">
                    <h2>Twitter</h2>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis odit repellat quo placeat illo officia, assumenda repudiandae commodi dolor libero.</p>
                    <button class="button background-top-row">Empezar</button>
                </div>

            </div>

    </div>
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
<style>
@import url('https://fonts.googleapis.com/css2?family=Electrolize&display=swap');

:root{
    --white-text:#fff;
}

.background-top-row{
    background-color: rgba(52,3,45,0.3);
    backdrop-filter: blur(.4rem);
}

*{
    padding: 0;
    margin: 0;
    text-decoration: none;
    box-sizing: border-box;
    border: none;
}

body{
    font-family: Arial, Helvetica, sans-serif;
    /* background: url("background.jpg") !important; */
    background: #292841;
    background-size: cover;
}


.title-container{
    padding-top: 10vh;
    text-align: center;
    color: #29CC7A;
    font-family: 'Electrolize', sans-serif;

}



.cards-container{
    display: flex;
    justify-content: center;
    height: 100vh;
    align-items: center;
}

.card{
    border-radius: 1rem;
    box-shadow: 0 1rem 1rem rgba(0, 0, 0, 0.2);
    display: flex;
    flex-direction: column;
    margin: 1.5rem;
    overflow: hidden;
    width: 15rem;
    backdrop-filter: blur(1rem);
    background-color: rgba(255, 255, 255, 0.060);
    border: .1rem solid rgba(255, 255, 255, 0.18);
    color: var(--white-text);
}

.card h6{
    letter-spacing: .1rem;
    text-transform: uppercase;
}

.card h2{
    letter-spacing: .1rem;
    margin: 1rem 0;

}

.top-row{
    padding: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;

}

.top-row i{
    font-size: 2rem;
}

.content{
    padding: 2rem;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
}

.content p{
    font-size: .9rem;    
}

.button{
    border-radius: 3rem;
    color: var(--white-text);
    font-size: .8rem;
    padding: .5rem .3rem;
    letter-spacing: .1rem;
    align-self: flex-end;
    border: .1rem solid rgba(255, 255, 255, 0.18);
}

/* media queries */

@media (max-width:1030px){
    .cards-container{
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: auto;
    }
}
</style>
