Vue.component('fruits-list-title', {
  // こっちが子（使われる側）
  template: '<h1>フルーツ一覧</h1>',
  data: function() {
    return { contents: 'bar' };
  },
});

Vue.component('fruits-list', {
  // こっちが親（使う側）
  template: '<div><fruits-list-title></fruits-list-title></div>',
});

Vue.component('fruit-list-description', {
  template: '<p>季節の代表的なフルーツの一覧です。</p>',
});

Vue.component('fruit-list-table', {
  template: `
  <table>
    <tr>
      <th>季節</th>
      <th>フルーツ</th>
    </tr>
    <tr>
      <td>春</td>
      <td>いちご</td>
    </tr>
    <tr>
      <td>夏</td>
      <td>すいか</td>
    </tr>
    <tr>
      <td>秋</td>
      <td>ぶどう</td>
    </tr>
    <tr>
      <td>冬</td>
      <td>みかん？</td>
    </tr>
  </table>
    `,
});

const FruitsListTitle = Vue.extend({
  template: '<h1>フルーツ一覧</h1>',
});

/* new FruitsListTitle().$mount('#fruits-list');

Vue.component('fruits-list-title', FruitsListTitle); */

// ルートVueインスタンスの作成
new Vue({
  el: '#fruits-list',
});
