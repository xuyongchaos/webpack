import Vue from 'vue'
import Container from './index.vue'

// 会存在跨域问题
const xhr = new XMLHttpRequest()
xhr.open('get', '/api/app/user', true)

xhr.onload = function() {
  console.log('fallback')
}

xhr.send()
new Vue({
  el: '#app',
  render: h => h(Container)
})
