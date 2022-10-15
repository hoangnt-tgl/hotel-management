<template>
  <div>
    <div class="page-wrapper">
      <Header />
      <body class="ltr">
      <div class="page-body-wrapper">
        <div class="page-sidebar" :class="!togglesidebar ? 'open' : ''">
          <Sidebar
            class="switch"
            @clicked="sidebar_toggle"
            v-if="togglesidebar"
          />
        </div>
        <div class="page-body">
          <transition name="fadeIn" enter-active-class="animated fadeIn">
            <router-view class="view"></router-view>
          </transition>
        </div>
         <ul class="custom-theme">
           <li class="btn-dark-setting" v-if="layoutmode==='dark'" @click="layoutMode('dark')">Dark</li>
           <li class="btn-dark-setting" v-if="layoutmode==='light'" @click="layoutMode('light')">Light</li>
         </ul>
        <Footer />
      </div>
      </body>
    </div>
  </div>
</template>

<script>
import Header from '../components/partials/AdminHeader.vue'
import Sidebar from '../components/partials/AdminSidebar.vue'
import Footer from '../components/partials/AdminFooter.vue'

export default {
  name: "admin",
  data() {
    return {
      rightsidebar_toggle_var: false,
      mobileheader_toggle_var: false,
      sidebar_toggle_var: false,
      horizontal_Sidebar: true,
      resized: false,
      layoutmode:'dark',
    };
  },
  // props:['sidebar_toggle_var'],
  components: {
    Footer,
    Sidebar,
    Header
  },
  computed: {
    togglesidebar() {
      return this.$store.state.menu.togglesidebar
    }
  },
  methods: {
    sidebar_toggle(value) {
      this.sidebar_toggle_var = !value;
    },
    rightsidebar_toggle(value) {
      this.rightsidebar_toggle_var = value;
    },
    mobiletoggle_toggle(value) {
      this.mobileheader_toggle_var = value;
    },
    layoutMode(type) {
      if(type == 'dark') {
        document.body.classList.remove('light')
        document.body.classList.add('dark')
        this.layoutmode='light'  
      }
      else {
        document.body.classList.remove('dark')
        document.body.classList.add('light')
        this.layoutmode='dark'
      }
    }
  }
};
</script>

