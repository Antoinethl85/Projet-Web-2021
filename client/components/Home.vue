<template>
    <p>
        <button id="connect" @click='connect(newUser)'>Je suis connecté?</button>

        Toute l'équipe de la boutique vous accueille et vous conseille sur l'achat ou la location de tracteurs sur Paris.
        
        Et sans plus attendre, venez découvrir notre nouvelle boutique en ligne et à Paris, nous serons là pour vous conseiller et vous guider pour votre achat!
        
        Accès WIFI gratuit à l'extérieur de l'agence sur le banc connecté.
        
        Fermé le 25 décembre et du 12er au 03 janvier 2021.
    </p>
</template>

<script>
module.exports = {
    data() {
        return {
            newUser: {
                email: '',
                password: ''
            }
        }
    },
    methods: {
        connect(newUser) {
        this.$emit('connect', this.newUser)
        }
    }
}
</script>
<style>
form{
}

input{
}

* {
     box-sizing: border-box; 
}

#connect{
    cursor: pointer;
    display: block;
    margin: auto;
}
</style>