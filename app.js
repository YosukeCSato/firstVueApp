var items = [
  {
    name: '鉛筆',
    price: 300,
    quantity: 0,
  },
  {
    name: 'ノート',
    price: 400,
    quantity: 0,
  },
  {
    name: '消しゴム',
    price: 500,
    quantity: 0,
  },
];

const vm = new Vue({
  el: '#app',
  data: {
    // dataプロパティ
    items: items,
    loggedInButton: 'ログイン済みのため購入できます',
  },

  filters: {
    // この節で追加したフィルタの定義
    numberWithDelimiter: function(value) {
      if (!value) {
        return 0;
      }
      return value.toString().replace(/(\d)(?=(\d{3})+$)/g, '$1,');
    },
  },
  methods: {
    doBuy: function() {
      // 本来はここでサーバーと通信を行う
      alert(this.totalPriceWithTax + '円のお買い上げ！');
      this.items.forEach(function(item) {
        item.quantity = 0;
      });
    },
  },
  computed: {
    totalPrice: function() {
      // this経由でインスタンス内のデータにアクセス
      return this.items.reduce(function(sum, item) {
        return sum + item.price * item.quantity;
      }, 0);
    },
    totalPriceWithTax: function() {
      // 算出プロパティに依存した算出プロパティも定義できる
      return Math.floor(this.totalPrice * 1.1);
    },
    canBuy: function() {
      return this.totalPrice >= 1000; // 1000円以上から購入可能にする。
    },
    errorMessageClass: function() {
      return {
        error: !this.canBuy,
      };
    },
    errorMessageStyle: function() {
      // canBuyが偽のときに赤く表示する
      return {
        border: this.canBuy ? '' : '1px solid red',
        color: this.canBuy ? '' : 'red',
      };
    },
  },
});
