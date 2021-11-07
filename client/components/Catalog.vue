<template>
  <div>
    <h2>Our catalog</h2>
    <article v-for="article in articles" :key="article.id">
      <div class="article-img">
        <div :style="{ backgroundImage: 'url(' + article.image + ')' }">
        </div>
      </div>
      <div class="article-content" v-if="editingArticle.id !== article.id">
        <div class="article-title">
          <h2>{{ article.name }} - {{ article.price }}€</h2>
          <div>
          <button @click="deleteArticle(article.id)" class="buttonForm">Supprimer</button>
          <button @click="editArticle(article)" class="buttonForm">Modifier</button>
            <div v-if="!panier.articles.find(a => a.id === article.id)">
              <button @click="addToPanier(article.id)" class="buttonForm">Ajouter au panier</button>
            </div>
            <div v-else>
              <button @click="removeFromPanier(article.id)" class="buttonForm">Retirer du panier</button>
            </div>
          </div>
        </div>
        <p>{{ article.description }}</p>
      </div>
      <div class="article-content" v-else>
        <div class="article-title">
          <h2><input type="text" v-model="editingArticle.name"> - <input type="number" v-model="editingArticle.price"></h2>
          <div>
            <button @click="sendEditArticle()">Valider</button>
            <button @click="abortEditArticle()">Annuler</button>
          </div>
        </div>
        <p><textarea v-model="editingArticle.description"></textarea></p>
        <input type="text" v-model="editingArticle.image" placeholder="Lien vers l'image">
      </div>
    </article>
    <add-article @add-article="addArticle" :show='showForm'></add-article>
    <button @click='showForm = !showForm' class="buttonForm">Afficher le formulaire</button>
  </div>
</template>
 
<script>
const AddArticle = window.httpVueLoader('./components/AddArticle.vue')
 
module.exports = {
  components: {
    AddArticle
  },
  props: {
    articles: { type: Array, default: [] },
    panier: { type: Object }
  },
  data () {
    return {
      editingArticle: {
        id: -1,
        name: '',
        description: '',
        image: '',
        price: 0,
      },
      showForm: false
    }
  },
  methods: {
    addArticle () {
      this.$emit('add-article', this.newArticle)
    },
    deleteArticle (articleId) {
      this.$emit('delete-article', articleId)
    },
    editArticle (article) {
      this.editingArticle.id = article.id
      this.editingArticle.name = article.name
      this.editingArticle.description = article.description
      this.editingArticle.image = article.image
      this.editingArticle.price = article.price
    },
    sendEditArticle () {
      this.$emit('update-article', this.editingArticle)
      this.abortEditArticle()
    },
    abortEditArticle () {
      this.editingArticle = {
        id: -1,
        name: '',
        description: '',
        image: '',
        price: 0
      }
    },
    addToPanier(articleId) {
      this.$emit('add-to-panier', articleId)
    },
    removeFromPanier(articleId) {
      this.$emit('remove-from-panier', articleId)
    }
  }
}
</script>
 
<style scoped>
h2{
  text-align: center;
}

article {
  display: flex;
}
 
.article-img {
  flex: 1;
}
 
.article-img div {
  width: 100px;
  height: 100px;
  background-size: cover;
}
 
.article-content {
  flex: 3;
}
 
.article-title {
  display: flex;
  justify-content: space-between;
}
 
textarea {
  width: 100%;
}

.buttonForm:hover{
  cursor: pointer;
}
</style>