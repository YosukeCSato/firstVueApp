const router = new VueRouter({
  routes: [
    {
      path: '/top',
      component: {
        template: '<h1>トップページです。</h1>',
      },
    },
    {
      path: '/users',
      component: {
        template: '<div>ユーザー一覧ページです</div>',
      },
    },
  ],
});

const app = new Vue({
  router: router,
}).$mount('#app');
