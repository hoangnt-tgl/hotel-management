import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Axios from 'axios'
import VueFeather from 'vue-feather';
import BootstrapVue from 'bootstrap-vue'
import Breadcrumbs from './components/bread-crumbs.vue'
import store from './store'
import Toasted from 'vue-toasted';
import Vue2Editor from "vue2-editor";

Vue.use(Vue2Editor);
Vue.prototype.$http = Axios
Vue.config.productionTip = false
Vue.use(BootstrapVue);
Vue.use(VueFeather);
Vue.use(Toasted, {
  iconPack: 'fontawesome'
});
Vue.component('Breadcrumbs', Breadcrumbs);
import './assets/scss/app.scss'
import './assets/scss/admin.scss'
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
