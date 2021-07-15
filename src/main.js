import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vuelidate from 'vuelidate'
import 'bootstrap'

import VueObserveVisibility from 'vue-observe-visibility'
Vue.use(VueObserveVisibility)

Vue.use(Vuelidate)
Vue.config.devtools = true
// Vue.config.productionTip = true

Vue.directive('outside-click', {
  bind: function (el, binding, vNode) {
    if (typeof binding.value !== 'function') {
      const compName = vNode.context.name
      let warn = `[Vue-outside-click:] provided expression '${binding.expression}' is not a function, but has to be`
      warn += compName && `Found in component '${compName}'`
    }
    const bubble = binding.modifiers.bubble
    const handler = (e) => (bubble || (!el.contains(e.target) && el !== e.target)) && binding.value(e)
    el.__vueClickOutside__ = handler
    document.addEventListener('click', handler)
  },
  unbind(el) {
    document.removeEventListener('click', el.__vueClickOutside__)
    el.__vueClickOutside__ = null
  }
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')