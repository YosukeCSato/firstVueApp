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
        this.error = 'Nameは必須です';
        return;
      }
      if (this.user.description.trim() === '') {
        this.error = 'Descriptionは必須です';
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

// JSONを返す関数
// この関数を用いて擬似的にWeb API経由で情報を取得したようにする
const getUsers = function(callback) {
  setTimeout(function() {
    callback(null, [
      {
        id: 1,
        name: 'David Bowie',
      },
      {
        id: 2,
        name: 'Bob Dylan',
      },
    ]);
  }, 1000);
};

// ユーザーデータの定義
const userData = [
  {
    id: 1,
    name: 'David Bowie',
    description: `1947年1月8日、イギリスのロンドン南部ブリクストンにケント出身でウェイトレスをしていたマーガレット・マリー(1913〜2001)と、ヨークシャー出身で子供のためのチャリティー団体Barnardo'sで広報活動をしていたヘイウッド・ステントン・ジョーンズ(？〜1969)の間に生まれた。
    本名はデヴィッド・ロバート・ヘイウッド・ジョーンズ。一家は、ロンドン南部のブリクストンとストックウェルの境界に近い、40 Stansfield Roadに住んでおり、ボウイは6歳になるまでストックウェルの幼児学校に通っていたが、1953年に一家はブロムリーの郊外に引っ越す。`,
  },
  {
    id: 2,
    name: 'Bob Dylan',
    description:
      'ボブ・ディラン（英語: Bob Dylan、1941年5月24日 - ）は、ユダヤ系アメリカ人のミュージシャンである。出生名は、ロバート・アレン・ジマーマン（Robert Allen Zimmerman）だが[1][2][3]、後に自ら法律上の本名もボブ・ディランに改名している[4][5]。“ボブ”はロバートの愛称、“ディラン”は詩人ディラン・トマスにちなむ。70年代末には保守派のビル・グレアムの影響を強く受け、福音派（新興宗教的キリスト教）に改宗（ボーン・アゲイン）し、コンサートでブーイングを浴びたが、ソニー・ミュージックなどによれば、83年以降はユダヤ教に回帰している。2016年歌手として初めてノーベル文学賞を受賞。',
  },
];

// getUserの引数は、userIdとcallback
// callbackで渡される引数は、関数
// ユーザー詳細ページコンポーネントでgetUserを呼ぶときに
// $route.params.userIdと、関数を渡している
// そしてここのcallbackでコンポーネントの関数を呼び出す
// 呼び出した返り値をcallbackに入れる

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
  template: '#user-detail',
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
            this.error = err.toString();
          } else {
            this.user = user;
          }
        }.bind(this),
      );
    },
  },
};
// UserListコンポーネント
const UserList = {
  // HTML上のscriptタグのidを指定する。
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
  // 初期化時にデータを取得する（fetchData()が呼ばれる）
  created: function() {
    this.fetchData();
  },

  // $routeの変更をwatchすることで、ルーティングが変更されたときに再度データを取得
  watch: {
    $route: 'fetchData',
  },

  methods: {
    fetchData: function() {
      this.loading = true;
      // 取得したデータの結果をusersに格納する。
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

const Auth = {
  login: function(email, pass, callback) {
    // ダミーデータを使った疑似ログイン
    setTimeout(function() {
      if (email === 'vue@example.com' && pass === 'vue') {
        // ログイン成功時はローカルストレージにtokenを保存する
        localStorage.token = Math.random()
          .toString(36)
          .substring(7);
        if (callback) {
          callback(true);
        }
      } else {
        if (callback) {
          callback(false);
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

// ログインコンポーネント
const Login = {
  template: '#login',
  data: function() {
    return {
      email: null,
      pass: null,
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

const router = new VueRouter({
  routes: [
    {
      path: '/top',
      component: {
        template: '<div>トップページです</div>',
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
        // 認証されていない状態でアクセスした時はloginページに遷移する
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
      path: '/users/:userId',
      name: 'user',
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
  data: {
    Auth: Auth,
  },
  router: router,
}).$mount('#app');

/*
グローバルのフック関数はルートのVueを作った後に書く
router.beforeEach(function(to, from, next) {
  if (to.path === '/users') {
    next('/top');
  } else {
    next();
  }
}); */
