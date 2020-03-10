import Vue from 'vue'
import Container from './index.vue'

// 1.会存在跨域问题, 用来测试解决跨域
const xhr = new XMLHttpRequest()
xhr.open('get', '/app/user', true)
xhr.onload = function() {
  console.log('fallback')
}
xhr.send()

// 2.会存在跨域问题， 用来mock数据
const xhr2 = new XMLHttpRequest()
xhr2.open('get', '/user', true)
xhr2.onload = function() {
  console.log('fallback')
}
xhr2.send()

new Vue({
  el: '#app',
  render: h => h(Container)
})
