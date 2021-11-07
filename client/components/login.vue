<template>
    <form class="login">
        <h2>S'inscrire</h2>
        <input type="text" class="loginInput" v-model="newUser.name" placeholder="Name" required>
        <input type="email" class="loginInput" v-model="newUser.email" placeholder="Email" required>
        <input type="password" class="loginInput" v-model="newUser.password" placeholder="Mot de passe" required>
        <input type="text" class="loginInput" v-model="newUser.address" placeholder="Delivery address" required>
        <button type="submit" id="submit" @click='register(newUser)'>Inscription</button>
        
        <h2>Se Connecter</h2>
        <input type="email" class="loginInput" v-model="newUser.email" placeholder="Email" required>
        <input type="password" class="loginInput" v-model="newUser.password" placeholder="Mot de passe" required>
        <button id="submit" @click='login(newUser)'>Se Connecter</button>
    </form>
</template>

<script>
module.exports = {
    data() {
        return {
            newUser: {
                name: '',
                email: '',
                password: '',
                address: ''
            }
        }
    },
    methods: {
        login(newUser){
            this.$emit('login' , this.newUser)
        },
        register(newUser){
            this.$emit('register', this.newUser)
        }
    }
}
</script>

<style scoped>
.login{
    width: auto;
    border: 1px solid black;
    box-shadow: 3px 3px 3px black;
    padding: 10px;
    text-align: center;
}

.loginInput{
    border: none;
    border-bottom: 3px solid rgb(233, 0, 0);
}

* {
    box-sizing: border-box; 
}

#submit{
    cursor: pointer;
}
</style>