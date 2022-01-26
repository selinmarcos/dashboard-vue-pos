<template>
  <v-navigation-drawer
    id="core-navigation-drawer"
    v-model="drawer"
    :dark="barColor !== 'rgba(228, 226, 226, 1), rgba(255, 255, 255, 0.7)'"
    :expand-on-hover="expandOnHover"
    :right="$vuetify.rtl"
    :src="barImage"
    mobile-breakpoint="960"
    app
    width="260"
    v-bind="$attrs"
  >
    <template v-slot:img="">
      <v-img
        :gradient="`to bottom, ${barColor}`"
        v-bind="props"
      />
    
    </template>

    <v-divider class="mb-1" />

    <v-list
      dense
      nav
    >
      <v-list-item class="mt-4 mb-1">
        <v-list-item-avatar
          class="align-self-center"
         
          contain
        >
          <v-img
            src="https://webmasterbolivia.com/wp-content/uploads/2021/06/cropped-web-master-bolivia-logo.png"
            max-height="40"
          />
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title
            class="display-1"
            v-text="$store.state.business.companyName"
          />
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <v-divider class="mb-2 mt-0" />

    <v-list
      expand
      nav
    >
      <!-- Style cascading bug  -->
      <!-- https://github.com/vuetifyjs/vuetify/pull/8574 -->
      <div />
      <!-- VALIDAMOS SI ES ADMIN O NO PARA MOSTROS CERTAIN CONTENT -->
      <div v-if="$store.state.user.rol == 'ADMIN'">
        <template v-for="(item, i) in computedItems">
        <base-item-group
          v-if="item.children"
          :key="`group-${i}`"
          :item="item"
        >
          <!--  -->
        </base-item-group>

        <base-item
          v-else
          :key="`item-${i}`"
          :item="item"
        />
      </template>

      </div>
      <div v-else>
      <template v-for="(item, i) in computedItemsNoAdmins">
        <base-item-group
          v-if="item.children"
          :key="`group-${i}`"
          :item="item"
        >
          
        </base-item-group>

        <base-item
          v-else
          :key="`item-${i}`"
          :item="item"
        />
      </template>

      </div>
 

      <!-- Style cascading bug  -->
      <!-- https://github.com/vuetifyjs/vuetify/pull/8574 -->
      <div />
    </v-list>
  </v-navigation-drawer>
</template>

<script>

  // Utilities
  import {
    mapState,
  } from 'vuex'
  //import {mapGetters} from 'vuex'

  export default {
    name: 'DashboardCoreDrawer',
    props: {
      expandOnHover: {
        type: Boolean,
        default: false,
      },
    },

    data: () => ({
      itemsNoAdmins:[
        {
          icon: 'mdi-home',
          title: 'INICIO',
          to: '/dashboard',
        },
        {
          icon: 'mdi-cube',
          title: 'PRODUCTOS',
          to: '/products',
        },
        {
          icon: 'mdi-cash-multiple',
          title: 'VENTAS',
          to: '/sales',
        },
        {
          icon: 'mdi-cash-multiple',
          title: 'NUEVA VENTA',
          to: '/new-sale',
        },
        {
          icon: 'mdi-account-group-outline',
          title: 'CLIENTES',
          to: '/clients',
        },
        {
          title: 'PROVEEDORES',
          icon: 'mdi-office-building-marker',
          to: '/providers',
        },        

      ],
      items: [
        {
          icon: 'mdi-home',
          title: 'INICIO',
          to: '/dashboard',
        },
        {
          icon: 'mdi-cube',
          title: 'PRODUCTOS',
          to: '/products',
        },
        {
          icon: 'mdi-cash-multiple',
          title: 'VENTAS',
          to: '/sales',
        },
        {
          icon: 'mdi-cash-multiple',
          title: 'NUEVA VENTA',
          to: '/new-sale',
        },
        {
          icon: 'mdi-account-group-outline',
          title: 'CLIENTES',
          to: '/clients',
        },
        {
          title: 'PROVEEDORES',
          icon: 'mdi-office-building-marker',
          to: '/providers',
        },
        {
          icon: 'mdi-chart-box',
          title: 'REPORTES',
          to: '/dashboard',
        },
        {
          icon: 'mdi-account-multiple',
          title: 'USUARIOS',
          to: '/users',
        },
        {
          icon: 'mdi-cog',
          title: 'CONFIGURACIÓN',
          to: '/settings',
        }
      ],
    }),

    computed: {
      ...mapState(['barColor', 'barImage']),
      drawer: {
        get () {
          return this.$store.state.drawer
        },
        set (val) {
          this.$store.commit('SET_DRAWER', val)
        },
      },
      computedItems () {
        return this.items.map(this.mapItem)
      },

      computedItemsNoAdmins () {
        return this.itemsNoAdmins.map(this.mapItem)
      },


      profile () {
        return {
          avatar: true,
          title: this.$t('avatar'),
        }
      },

      // ...mapGetters(['business'])
    },

    methods: {
      mapItem (item) {
        return {
          ...item,
          children: item.children ? item.children.map(this.mapItem) : undefined,
          title: this.$t(item.title),
        }
      },
    },
    //GETTING BUSINESS DATA FOR THE DRAWER (IN THE FUTURE CHANGE TU VUEX)

  }
</script>

<style lang="sass">
  @import '~vuetify/src/styles/tools/_rtl.sass'

  #core-navigation-drawer
    .v-list-group__header.v-list-item--active:before
      opacity: .24

    .v-list-item
      &__icon--text,
      &__icon:first-child
        justify-content: center
        text-align: center
        width: 20px

        +ltr()
          margin-right: 24px
          margin-left: 12px !important

        +rtl()
          margin-left: 24px
          margin-right: 12px !important

    .v-list--dense
      .v-list-item
        &__icon--text,
        &__icon:first-child
          margin-top: 10px

    .v-list-group--sub-group
      .v-list-item
        +ltr()
          padding-left: 8px

        +rtl()
          padding-right: 8px

      .v-list-group__header
        +ltr()
          padding-right: 0

        +rtl()
          padding-right: 0

        .v-list-item__icon--text
          margin-top: 19px
          order: 0

        .v-list-group__header__prepend-icon
          order: 2

          +ltr()
            margin-right: 8px

          +rtl()
            margin-left: 8px
</style>
