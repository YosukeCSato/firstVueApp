Vue.directive('fallback-image', {
  bind(el) {
    el.addEventListener('error', function() {
      // 画像のロードに失敗したら実行される処理
      el.src = 'https://dummyimage.com/400x400/000/ffffff.png&text=no+image';
    });
  },
});

const c = '<p>こここ</p>';

new Vue({
  el: '#app',
  data: {
    question: c,
  },
});
