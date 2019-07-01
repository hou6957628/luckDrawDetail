import Vue from 'vue'
import Router from 'vue-router'
import prize from '@/components/prize'
import partRecord from '@/components/partRecord'
import productDetail from '@/components/productDetail'
import winRecord from '@/components/winRecord'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'prize',
      component: prize,
      redirect:'productDetail',
      meta: {
        requireAuth: true
      },
      children:[
        {
          path:"/partRecord",
          component:partRecord
        },
        {
          path:"/productDetail",
          component:productDetail
        },
        {
          path:"/winRecord",
          component:winRecord
        },
      ],
    }
  ]
})
