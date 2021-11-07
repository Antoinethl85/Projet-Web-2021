<template>
  <div>
    <h2>Mon Panier</h2>
    <article v-for="article in panier.articles": key="article.id": set="art = article.find( a=> a.id == artile.id)">
      <div class="article-img">
        <div :style="{ backgroundImage: 'url(' + art.image + ')' }">
        </div>
      </div>
      <div class="article-content" v-if="editingArticle.id !== article.id">
        <div class="article-title">
          <h2>{{ art.name }} - {{ art.price }}€</h2>
          <h2>{{ article.quantity }}</h2>
        </div>
      </div>
    </article>
  </div>
</template>
 
<script>
module.exports = {
  props: {
    articles: { type: Array, default: [] },
    panier: { type: Object }
  },
  data () {
    return {
    }
  },
  async mounted () {
  },
  methods: {
  }
}
</script>
 
<style scoped>
</style>