const express = require('express')
const router = express.Router()
const articles = require('../data/articles.js')
 
class Panier {
  constructor () {
    this.createdAt = new Date()
    this.updatedAt = new Date()
    this.articles = []
  }
}

const client = new Client({
  user: 'postgres',
  host: 'localhost',
  password: 'efreiAntoine',
  database: 'ProjetWeb2021'
 })
 
/**
 * Dans ce fichier, vous trouverez des exemples de requêtes GET, POST, PUT et DELETE
 * Ces requêtes concernent l'ajout ou la suppression d'articles sur le site
 * Votre objectif est, en apprenant des exemples de ce fichier, de créer l'API pour le panier de l'utilisateur
 *
 * Notre site ne contient pas d'authentification, ce qui n'est pas DU TOUT recommandé.
 * De même, les informations sont réinitialisées à chaque redémarrage du serveur, car nous n'avons pas de système de base de données pour faire persister les données
 */
 
/**
 * Notre mécanisme de sauvegarde des paniers des utilisateurs sera de simplement leur attribuer un panier grâce à req.session, sans authentification particulière
 */
router.use((req, res, next) => {
  // l'utilisateur n'est pas reconnu, lui attribuer un panier dans req.session
  if (typeof req.session.panier === 'undefined') {
    req.session.panier = new Panier()
  }
  next()
})
 
/*
 * Cette route doit retourner le panier de l'utilisateur, grâce à req.session
 */
router.get('/panier', (req, res) => {
  res.status(200).json( req.session.panier )
})
 
/*
 * Cette route doit ajouter un article au panier, puis retourner le panier modifié à l'utilisateur
 * Le body doit contenir l'id de l'article, ainsi que la quantité voulue
 */
router.post('/panier', (req, res) => {
  
  console.log(req.body)
  const id = req.body.articleId
  const quantity = req.body.quantity
  const article = {
    id: id,
    quantity: quantity
  }
  console.log(0)
  if (id <= 0 || id == null || id == undefined) {
    res.status(400).json({ message: 'bad request'})
  }
  else {
    console.log(ahhhhhhhh)
    if (id === req.session.panier.articles.id || article.quantity <= 0){
        res.status(400).json({ message: 'bad request'})
    }
    else {
      console.log(1)
      req.session.panier.articles.push(article)
      console.log(2)
    }
  }
  res.statut(200).json(req.session.panier.articles)
})
 
/*
 * Cette route doit permettre de confirmer un panier, en recevant le nom et prénom de l'utilisateur
 * Le panier est ensuite supprimé grâce à req.session.destroy()
 */
router.post('/panier/pay', (req, res) => {
  const name = req.body.name
  const surname = req.body.surname
 
  if(req.session.panier.articles.length ==0) {
    res.status(400).json({ message: 'Panier vide' })
    return
  } else {
    req.session.destroy()
    res.status(200).json({ message: 'Merci ' + name + ' ' + surname + ' pour votre achat'})
    return
  }
})
 
/*
 * Cette route doit permettre de changer la quantité d'un article dans le panier
 * Le body doit contenir la quantité voulue
 */
router.put('/panier/:articleId', (req, res) => {
  const articleId = req.params.articleId
  const articleQuantity = parseInt(req.body.articleQuantity)
  var Present = false
  var index = 0
 
 
  if(articleQuantity<=0) {
    res.status(501).json({ message: 'Bad request' })
  }
 
  for (let i = 0; i<req.session.panier.articles.length;i++) {
    article= req.session.panier.articles[i]
    if (article.id == articleId) {
      Present = true
      index = i
      break
    }
  }
  if (Present){
    req.session.panier.articles[index].quantity = articleQuantity
    res.status(200).json({ message: 'Done' })
  } else {
    res.status(400).json({ message: 'Bad request' })
  }
})
 
/*
 * Cette route doit supprimer un article dans le panier
 */
router.delete('/panier/:articleId', (req, res) => {
  const articleId = req.params.articleId
  var Present = false
  var index = 0
 
 
  for (let i = 0; i<req.session.panier.articles.length;i++) {
    article= req.session.panier.articles[i]
    if (article.id == articleId) {
      Present = true
      index = i
      break
    }
  }
 
  if (!Present) {
    res.status(400).json({ message: 'Bad request' })
  } else {
    req.session.panier.articles.splice(index,1)
    res.json({ message: 'Done' })
  }
})
 
 
 
/**
 * Cette route envoie l'intégralité des articles du site
 */
router.get('/articles', (req, res) => {
  res.json(articles)
})
 
/**
 * Cette route crée un article.
 * WARNING: dans un vrai site, elle devrait être authentifiée et valider que l'utilisateur est bien autorisé
 * NOTE: lorsqu'on redémarre le serveur, l'article ajouté disparait
 *   Si on voulait persister l'information, on utiliserait une BDD (mysql, etc.)
 */
router.post('/article', (req, res) => {
  const name = req.body.name
  const description = req.body.description
  const image = req.body.image
  const price = parseInt(req.body.price)
 
  // vérification de la validité des données d'entrée
  if (typeof name !== 'string' || name === '' ||
      typeof description !== 'string' || description === '' ||
      typeof image !== 'string' || image === '' ||
      isNaN(price) || price <= 0) {
    res.status(400).json({ message: 'bad request' })
    return
  }
 
  const article = {
    id: articles.length + 1,
    name: name,
    description: description,
    image: image,
    price: price
  }
  articles.push(article)
  // on envoie l'article ajouté à l'utilisateur
  res.json(article)
})
 
/**
 * Cette fonction fait en sorte de valider que l'article demandé par l'utilisateur
 * est valide. Elle est appliquée aux routes:
 * - GET /article/:articleId
 * - PUT /article/:articleId
 * - DELETE /article/:articleId
 * Comme ces trois routes ont un comportement similaire, on regroupe leurs fonctionnalités communes dans un middleware
 */
function parseArticle (req, res, next) {
  const articleId = parseInt(req.params.articleId)
 
  // si articleId n'est pas un nombre (NaN = Not A Number), alors on s'arrête
  if (isNaN(articleId)) {
    res.status(400).json({ message: 'articleId should be a number' })
    return
  }
  // on affecte req.articleId pour l'exploiter dans toutes les routes qui en ont besoin
  req.articleId = articleId
 
  const article = articles.find(a => a.id === req.articleId)
  if (!article) {
    res.status(404).json({ message: 'article ' + articleId + ' does not exist' })
    return
  }
  // on affecte req.article pour l'exploiter dans toutes les routes qui en ont besoin
  req.article = article
  next()
}
 
router.route('/article/:articleId')
  /**
   * Cette route envoie un article particulier
   */
  .get(parseArticle, (req, res) => {
    // req.article existe grâce au middleware parseArticle
    res.json(req.article)
  })
 
  /**
   * Cette route modifie un article.
   * WARNING: dans un vrai site, elle devrait être authentifiée et valider que l'utilisateur est bien autorisé
   * NOTE: lorsqu'on redémarre le serveur, la modification de l'article disparait
   *   Si on voulait persister l'information, on utiliserait une BDD (mysql, etc.)
   */
  .put(parseArticle, (req, res) => {
    const name = req.body.name
    const description = req.body.description
    const image = req.body.image
    const price = parseInt(req.body.price)
 
    req.article.name = name
    req.article.description = description
    req.article.image = image
    req.article.price = price
    res.send()
  })
 
  .delete(parseArticle, (req, res) => {
    const index = articles.findIndex(a => a.id === req.articleId)
 
    articles.splice(index, 1) // remove the article from the array
    res.send()
  }
)

router.get('/me', async (req,res) => {
    const id = req.session.userId
    if (typeof id !== 'number') {
      console.log("vous n'êtes pas connecté")
      res.status(401).json({message: "vous n'êtes pas connecté"})
    }
    else {
      const sql = 'SELECT email FROM public.users WHERE id=$1'
      const result = await client.query({
        text: sql,
        values: [id]
      })
      console.log("vous êtes connecté")
      res.status(200).json({message: "vous êtes connecté"})
    }
})
 
module.exports = router