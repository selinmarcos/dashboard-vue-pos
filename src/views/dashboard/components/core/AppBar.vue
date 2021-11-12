<template>

  <v-app-bar
    id="app-bar"
    absolute
    app
    color="transparent"
    flat
    height="75"
  >
    <v-btn
      class="mr-3"
      elevation="1"
      fab
      small
      @click="setDrawer(!drawer)"
    >
      <v-icon v-if="value">
        mdi-view-quilt
      </v-icon>

      <v-icon v-else>
        mdi-dots-vertical
      </v-icon>
    </v-btn>

    <v-toolbar-title
      class="hidden-sm-and-down font-weight-light"
      v-text="$route.name"
    />

    <v-spacer />
    <template><span class="text-h5">{{currentDate()}}</span></template>

    <div class="mx-3" />

    <!-- <v-btn
      class="ml-2"
      min-width="0"
      text
      to="/"
    >
      <v-icon>mdi-power</v-icon>
    </v-btn> -->

<!-- MENU BELL DE NOTIFICACIONES -->
    <v-menu
      bottom
      left
      offset-y
      origin="top right"
      transition="scale-transition"
    >
      <template v-slot:activator="{ attrs, on }">
        <v-btn
          class="ml-2"
          min-width="0"
          text
          v-bind="attrs"
          v-on="on"
        >
          <v-badge
            color="red"
            overlap
            bordered
          >
            <template v-slot:badge>
              <span>5</span>
            </template>

            <v-icon>mdi-bell</v-icon>
          </v-badge>
        </v-btn>
      
      </template>

      <v-list
        :tile="false"
        nav
      >
        <div>
          <app-bar-item
            v-for="(n, i) in notifications"
            :key="`item-${i}`"
          >
            <v-list-item-title v-text="n" />
          </app-bar-item>
        </div>
      </v-list>
    </v-menu>
<!-- MENU USUARIOS Y CERRAR SESION  -->
    <v-menu>
      <template v-slot:activator="{ on, attrs }">
      <v-btn
        class="ml-2"
        min-width="0"
        text
        
        v-bind="attrs"
        v-on="on"
      >
        <v-icon>mdi-account</v-icon>
      </v-btn>
      </template>

      <v-list>
          <v-list-item @click="onClickUsers">
            <v-list-item-title>Editar Perfil</v-list-item-title>
          </v-list-item>
          <v-list-item @click="onClickUsers">
            <v-list-item-title>Editar Datos de Empresa</v-list-item-title>
          </v-list-item >
          <v-list-item @click="onClickUsers" to="/products">
            <v-list-item-title><v-icon color="red">mdi-power</v-icon>CERRAR CESION</v-list-item-title>
          </v-list-item>
      </v-list>

    </v-menu>

  </v-app-bar>
</template>

<script>
  // Components
  import { VHover, VListItem } from 'vuetify/lib'

  // Utilities
  import { mapState, mapMutations } from 'vuex'

  export default {
    name: 'DashboardCoreAppBar',

    components: {
      AppBarItem: {
        render (h) {
          return h(VHover, {
            scopedSlots: {
              default: ({ hover }) => {
                return h(VListItem, {
                  attrs: this.$attrs,
                  class: {
                    'black--text': !hover,
                    'white--text secondary elevation-12': hover,
                  },
                  props: {
                    activeClass: '',
                    dark: hover,
                    link: true,
                    ...this.$attrs,
                  },
                }, this.$slots.default)
              },
            },
          })
        },
      },
    },

    props: {
      value: {
        type: Boolean,
        default: false,
      },
    },

    data: () => ({
      notifications: [
        'Mike John Responded to your email',
        'You have 5 new tasks',
        'You\'re now friends with Andrew',
        'Another Notification',
        'Another one',
      ],
      
    }),
    

    computed: {
      ...mapState(['drawer']),
    },

    methods: {
      ...mapMutations({
        setDrawer: 'SET_DRAWER',
      }),
      currentDate(){
        const fecha = new Date()
        const year = fecha.getFullYear()
        var dia = fecha.getDate()
        var mes = fecha.getMonth()
        
        switch(mes){
          case 1:
            mes = "Enero"
            break
          case 2:
            mes = "Febrero"
            break
          case 3:
              mes = "Marzo"
            break
          case 4:
              mes = "Abril"
            break
          case 5:
              mes = "Mayo"
            break
          case 6:
              mes = "Junio"
            break
          case 7:
              mes = "Julio"
            break
          case 8:
              mes = "Agosto"
            break
          case 9:
              mes = "Septiembre"
            break
          case 10:
              mes = "Octubre"
            break
          case 11:
              mes = "Noviembre"
            break
          case 12:
              mes = "Diciembre"
            break
        }
        if(dia<=9)
        {
          dia = '0'+dia
        }
        const todayDate = dia+' de '+ mes+' de '+year
  
       return todayDate
    },
      onClickUsers () {
        // Perform an action
      },
    }

  }
</script>
