/* new Vue({
  el: '#fruits-list',
  components: {
    'fruits-list-title': {
      template: '<h1>フルーツ一覧</h1>',
    },
  },
}); */

const FruitsListTitle = Vue.extend({
  template: '<h3>ふるううううううふつ一覧</h3>',
});

Vue.component('rock-list-title', {
  template: '#rock-list-title',
  data: function() {
    return ['りんご', 'みかん'];
  },
});

Vue.component('input-date-with-today', {
  render: function(createElement) {
    return createElement('input', {
      attrs: {
        type: 'date',
        value: new Date().toISOString().substring(0, 10),
      },
    });
  },
});

new Vue({
  el: '#app',
});

new Vue({
  el: '#fruits-list',
  components: {
    'fruits-list-title': FruitsListTitle,
  },
});
