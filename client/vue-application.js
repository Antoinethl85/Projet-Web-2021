const Home = window.httpVueLoader('./components/Home.vue')
const Panier = window.httpVueLoader('./components/Panier.vue')
const Catalog = window.httpVueLoader('./components/Catalog.vue')
const Login = window.httpVueLoader('./components/Login.vue')
 
const routes = [
  { path: '/', component: Home },
  { path: '/panier', component: Panier },
  { path: '/catalog', component: Catalog },
  { path: '/login', component: Login },
]
 
const router = new VueRouter({
  routes
})
 
var app = new Vue({
  router,
  el: '#app',
  data: {
    articles: [],
    panier: {
      createdAt: null,
      updatedAt: null,
      articles: []
    }
  },
  async mounted () {
    const res = await axios.get('/api/articles')
    this.articles = res.data
    const res2 = await axios.get('/api/panier')
    this.panier = res2.data
  },
  methods: {
    async register (newUser) {
      try{
        const res = await axios.post('/api/register', newUser)
        alert(res.data.message)
        if (res.data.register) {
          router.push('/')
        }
        else {
          router.push('/login')
        }
      }
      catch(err) {
        alert(erre.reponse.data.message)
      }
    },
    async login (newUser) {
      try{
        const res = await axios.post('/api/login', newUser)
        alert(res.data.message)
        if (res.data.login) {
          router.push('/')
        }
        else {
          router.push('/login')
        }
      }
      catch(err) {
        alert(erre.reponse.data.message)
      }
    },
    async connect() {
      await axios.get('/api/me')
    },
    async addArticle (article) {
      const res = await axios.post('/api/article', article)
      this.articles.push(res.data)
      const res2 = await axios.get('/api/panier')
      this.panier = res2.data
    },
    async updateArticle (newArticle) {
      await axios.put('/api/article/' + newArticle.id, newArticle)
      const article = this.articles.find(a => a.id === newArticle.id)
      article.name = newArticle.name
      article.description = newArticle.description
      article.image = newArticle.image
      article.price = newArticle.price
      const res2 = await axios.get('/api/panier')
      this.panier = res2.data
    },
    async deleteArticle (articleId) {
      await axios.delete('/api/article/' + articleId)
      const index = this.articles.findIndex(a => a.id === articleId)
      this.articles.splice(index, 1)
      const res2 = await axios.get('/api/panier')
      this.panier = res2.data
    },
    async addToPanier (articleId) {
      const res = await axios.post('/api/panier', {articleId: articleId, quantity: 1})
      this.panier.push(res.data)
      console.log(panier)
      const res2 = await axios.get('/api/panier')
      this.panier = res2.data
    },
    async removeFromPanier (articleId) {
      const res = await axios.remove('/api/panier', articleId)
      this.panier.remove(res.data)
      const res2 = await axios.get('/api/panier')
      this.panier = res2.data
    }
  }
})
