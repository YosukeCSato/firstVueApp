const TodoList = {
  props: {
    aaaa: {
      type: Array,
      required: true,
    },
  },
  template: `
  <ul>
    <template v-for="todo in aaaa">
      <slot :todo="todo">
        <li :key="todo.id">
          {{ todo.text }}
        </li>
      </slot>
    </template>
  </ul>
  `,
};

new Vue({
  el: '#app',
  data() {
    return {
      cccc: [
        {
          id: 1,
          text: 'C++',
          isCompleted: true,
        },
        {
          id: 2,
          text: 'JavaScript',
          isCompleted: false,
        },
        {
          id: 3,
          text: 'Java',
          isCompleted: true,
        },
        {
          id: 4,
          text: 'Perl',
          isCompleted: false,
        },
      ],
    };
  },
  components: {
    TodoList: TodoList,
  },
});
