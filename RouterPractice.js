// JSONを返す関数
// この関数を用いて、擬似的にWeb API経由で情報を取得したようにする
const getUsers = function(callback) {
  setTimeout(function() {
    callback(null, [
      {
        id: 1,
        name: 'Takuya Tejima',
      },
      {
        id: 2,
        name: 'David Bowie',
      },
      {
        id: 3,
        name: 'Mick Ronson',
      },
    ]);
  }, 1000);
};

// コンポーネントUserList
const UserList = {
  // HTML上のscriptタグのidを指定する
  template: '#user-list',
  data: function() {
    return {
      loading: false,
      users: function() {
        return []; // 初期値の空配列
      },
      error: null,
    };
  },

  // 初期化時にデータを取得する
  created: function() {
    this.fetchData();
  },

  // $routeの変更をwatchすることでルーティングが変更されたときに再度データを取得
  watch: {
    $route: 'fetchData',
  },

  methods: {
    fetchData: function() {
      this.loading = true;
      // 取得したデータの結果をusersに格納する
      // Function.prototype.bindはthisのスコープを渡すために利用
      getUsers(
        function(err, users) {
          this.loading = false;
          if (err) {
            this.error = err.toString();
          } else {
            this.users = users;
          }
        }.bind(this),
      );
    },
  },
};

const getUser = function(userId, callback) {
  setTimeout(function() {
    const filteredUsers = userData.filter(function(user) {
      return user.id === parseInt(userId, 10);
    });
    callback(null, filteredUsers && filteredUsers[0]);
  }, 1000);
};

// 詳細ページのコンポーネント
const UserDetail = {
  template: '#user-detal',
  // 初期値のセット
  data: function() {
    return {
      loading: false,
      user: null,
      error: null,
    };
  },
  created: function() {
    this.fetchData();
  },

  watch: {
    $route: 'fetchData',
  },

  methods: {
    fetchData: function() {
      this.loading = true;
      // this.$route.params.userIdに現在のURL上のパラメーターに対応したuserIdが格納される
      getUser(
        this.$route.params.userId,
        function(err, user) {
          this.loading = false;
          if (err) {
            this.error = err.toString;
          } else {
            this.user = user;
          }
        }.bind(this),
      );
    },
  },
};

// user-detailコンポーネント用のuserDate
const userData = [
  {
    id: 1,
    name: 'Takuya Tejima',
    description: '東南アジアで働くエンジニアです。',
  },
  {
    id: 2,
    name: 'David Bowie',
    description: 'ロックンロールスターです。',
  },
  {
    id: 3,
    name: 'Mick Ronson',
    description: '最高のギタリストです。',
  },
];

// 擬似的にAPI経由で情報を更新したようにする
const postUser = function(params, callback) {
  setTimeout(function() {
    // idは追加されるごとに自動的にincrementされていく
    params.id = userData.length + 1;
    userData.push(params);
    callback(null, params);
  }, 1000);
};

// 新規ユーザー作成コンポーネント
const UserCreate = {
  template: '#user-create',
  data: function() {
    return {
      sending: false,
      user: this.defaultUser(),
      error: null,
    };
  },

  created: function() {},

  methods: {
    defaultUser: function() {
      return {
        name: '',
        description: '',
      };
    },

    createUser: function() {
      // 入力パラメーターのバリデーション
      if (this.user.name.trim() === '') {
        this.error = 'Nameは必須です。';
        return;
      }
      if (this.user.description.trim() === '') {
        this.error = 'Descriptionは必須です。';
        return;
      }
      postUser(
        this.user,
        function(err, user) {
          this.sending = false;
          if (err) {
            this.error = err.toString();
          } else {
            this.error = null;
            // デフォルトでフォームをリセット
            this.user = this.defaultUser();
            alert('新規ユーザーが登録されました');
            // ユーザー一覧ページに戻る
            this.$router.push('/users');
          }
        }.bind(this),
      );
    },
  },
};

// ログインコンポーネント
const Login = {
  template: '#login',
  data: function() {
    return {
      email: 'vue@example.com',
      pass: '',
      error: false,
    };
  },
  methods: {
    login: function() {
      Auth.login(
        this.email,
        this.pass,
        function(loggedIn) {
          if (!loggedIn) {
            this.error = true;
          } else {
            // redirectパラメーターがついている場合はそのパスに遷移
            this.$router.replace(this.$route.query.redirect || '/');
          }
        }.bind(this),
      );
    },
  },
};

const Auth = {
  login: function(email, pass, cb) {
    // ダミーデータを使った疑似ログイン
    setTimeout(function() {
      if (email === 'vue@example.com' && pass === 'vue') {
        // ログイン成功時はローカルストレージにtokenを保存する
        localStorage.token = Math.random()
          .toString(36)
          .substring(7);
        if (cb) {
          cb(true);
        }
      } else {
        if (cb) {
          cb(false);
        }
      }
    }, 0);
  },

  logout: function() {
    delete localStorage.token;
  },

  loggedIn: function() {
    // ローカルストレージにtokenがあればログイン状態とみなす
    return !!localStorage.token;
  },
};

// ルートオプションを渡して、ルーターインスタンスを生成
const router = new VueRouter({
  routes: [
    {
      path: '/top',
      component: {
        template: '<div>トップページです。</div>',
      },
    },
    {
      path: '/users',
      component: UserList,
    },
    {
      path: '/users/new',
      component: UserCreate,
      beforeEnter: function(to, from, next) {
        // 認証されていない状態でアクセスしたときはloginページに遷移する
        if (!Auth.loggedIn()) {
          next({
            path: '/login',
            query: { redirect: to.fullPath },
          });
        } else {
          // 認証済みであればそのまま新規ユーザー作成ページへ進む
          next();
        }
      },
    },
    {
      path: '/user/:userId',
      component: UserDetail,
    },
    {
      path: '/login',
      component: Login,
    },
    {
      path: '/logout',
      beforeEnter: function(to, from, next) {
        Auth.logout();
        next('/');
      },
    },
  ],
});

const app = new Vue({
  router: router,
}).$mount('#app');
