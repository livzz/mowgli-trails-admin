<template>
  <div class="ui primary top fixed menu inverted">
        <router-link tag="a" to="/" class="item" active-class="active" exact>Home</router-link>
        <router-link tag="a" to="/blog" class="item" active-class="active" exact>Blog</router-link>
        <router-link tag="a" to="/tour" class="item" active-class="active" exact>Tour</router-link>
        <router-link tag="a" to="/mailing" class="item" active-class="active" exact>
          Mailing
        </router-link>
        <router-link tag="a" to="/destinations" class="item" active-class="active" exact>
          Destinations
        </router-link>
        <router-link tag="a" to="/places" class="item" active-class="active" exact>
          Places
        </router-link>
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
    },
  },
};
</script>

<style scoped>

</style>
