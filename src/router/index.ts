import { createRouter,createWebHistory } from "vue-router";

const router = createRouter ({
  history:createWebHistory(), // history 模式
  routes: [
      {
          path: '/', 
          redirect: { name: 'A' },
      },
      {
          name: 'A',
          path: '/AAA', 
          component: () => import('@/views/AAA.vue'), 
    },
    {
              name: 'B',
              path: '/BBB', 
              component: () => import('../views/BBB.vue')
            }
  ]
})
export default router;
