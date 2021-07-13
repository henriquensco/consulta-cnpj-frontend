import Vue from 'vue';
import App from './App.vue';

import VueMask from 'v-mask';
import Tabs from 'vue-tabs-component';


Vue.config.productionTip = false;
Vue.use(VueMask);
Vue.use(Tabs);


new Vue({
  render: h => h(App),
}).$mount('#app')
