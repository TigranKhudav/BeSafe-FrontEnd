import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vuelidate from 'vuelidate'
import Spinner from 'vue-simple-spinner'
import VueObserveVisibility from 'vue-observe-visibility'
import 'bootstrap'

Vue.component('vue-simple-spinner', Spinner)

Vue.use(VueObserveVisibility)
Vue.use(Vuelidate)

Vue.config.devtools = true
// Vue.config.productionTip = true

Vue.directive('outside-click', {
  bind(el, binding, vNode) {
    if (typeof binding.value !== 'function') {
      console.warn('[Vue-click-outside:] provided expression', binding.expression, 'is not a function.')
      return false
    }
    const handler = (e) => (binding.modifiers.bubble || (!el.contains(e.target) && el !== e.target)) && binding.value(e)
    el.__vueClickOutside__ = handler
    document.addEventListener('click', handler)
  },
  unbind(el) {
    document.removeEventListener('click', el.__vueClickOutside__)
    el.__vueClickOutside__ = null
  },
  // stop(){
  //   el.st
  // }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')