Vue.component('fruits-item-name', {
  props: {
    fruitsItem: {
      // propsはスネークケース
      // テンプレートの中ではケバブケース
      type: Object,
      required: true, // このコンポーネントには必須なのでtrue
    },
  },
  template: '<li>{{ fruitsItem.name }}は便利です。</li>',
});

new Vue({
  el: '#fruits-component',
  data: {
    // 親では配列だが、v-forでオブジェクトとして渡している
    fruitsItems: [{ name: '梨' }, { name: 'いちご' }],
  },
});

// 子コンポーネントのカウンターボタン
const counterButton = Vue.extend({
  template:
    '<span>{{ counter }}個<button v-on:click="addToCart">追加</button></span>',
  data: function() {
    return {
      counter: 0,
    };
  },
  methods: {
    addToCart: function() {
      this.counter += 1;
      this.$emit('sd'); // incrementカスタムイベントの発火
    },
  },
});

// 親コンポーネントのカート
new Vue({
  el: '#fruits-counter',
  components: {
    'counter-button': counterButton,
  },
  data: {
    total: 0, // カート内の合計商品数
    fruits: [{ name: '梨' }, { name: 'いちご' }],
  },
  methods: {
    incrementCartStatus: function() {
      this.total += 1;
    },
  },
});
