import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vuelidate from 'vuelidate'
import 'bootstrap'

Vue.use(Vuelidate)

Vue.directive('outside-click', {
  bind: function (el, binding, vNode) {
    if (typeof binding.value !== 'function') {
      const compName = vNode.context.name
      let warn = `[Vue-outside-click:] provided expression '${binding.expression}' is not a function, but has to be`
      if (compName) { warn += `Found in component '${compName}'` }
      console.warn(warn)
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

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
