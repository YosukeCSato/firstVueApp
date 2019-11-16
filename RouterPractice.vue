<template> </template>

<script lang="js">

const router = new VueRouter({
  routes: [
    {
      path: '/top',
      component: {
        template: '<h1>トップページです。</h1>'
      }
    },
    {
      path: '/users',
      component: {
        template: '<div>ユーザー一覧ページです。'
      }
    }
  ]
})
</script>

<style lang="scss" module>
