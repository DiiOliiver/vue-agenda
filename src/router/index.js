import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import FormContato from '@/components/FormContato'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/create',
      name: 'Form',
      component: FormContato
    },    
    {
      path: '/edit/:id',
      name: 'Form',
      props: true,
      component: FormContato
    },
  ]
})
