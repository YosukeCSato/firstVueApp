const headerTemplate = `
  <div>
    <slot name="header">No title</slot>
  </div>
 `;

const contentTemplate = `
  <div>
    <slot name="content">No contents</slot>
  </div>
`;

Vue.component('page-header', {
  template: headerTemplate,
});

Vue.component('page-content', {
  template: contentTemplate,
});

new Vue({
  el: '#fruits-list',
});
