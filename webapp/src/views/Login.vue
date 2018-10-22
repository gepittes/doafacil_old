<template>
    <div>
        <h2>Login</h2>
        <form @submit.prevent="login({ email, password })">
            <input type="text" placeholder="email" v-model="email">
            <input type="password" placeholder="password" v-model="password">
            <button type="submit">Login</button>
        </form>
    </div>
</template>

<script>
    import { mapState, mapActions } from 'vuex'

    export default {
        data() {
            return {
                email: "",
                password: ""
            }
        },
        methods: {
            ...mapActions(["login"]),
            login() {
                this.login({
                    email: this.email,
                    password: this.password
                }).then(() => {
                    this.$router.push("/")
                });
            }
        },
    };
</script>
