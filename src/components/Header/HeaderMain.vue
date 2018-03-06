<template>
    <div class="ui primary menu inverted">
        <router-link tag="a" to="/" class="item" active-class="active" exact>Home</router-link>
        <router-link tag="a" to="/blog" class="item" active-class="active" exact>Blog</router-link>
        <router-link tag="a" to="/tour" class="item" active-class="active" exact>Tour</router-link>
        <div class="right menu">
            <a class="ui item" @click="logout">
            Logout
            </a>
        </div>
    </div>
</template>

<script>
export default {
  methods: {
    logout() {
      this.$store.dispatch('actionLogout', this.toLogin);
    },
    toLogin() {
      this.$router.push('/login');
    }
  }
};
</script>

<style scoped>

</style>