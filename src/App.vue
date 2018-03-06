<template>
  <div id="app">
    <app-header></app-header>
    <router-view/>
  </div>
</template>

<script>
import Header from './components/Header/HeaderMain';

export default {
  name: 'App',
  components: {
    appHeader: Header
  },
  created() {
    this.$store.dispatch('initAuthState');
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.getAuthState;
    }
  },
  methods: {
    toLogin() {
      this.$router.push('/login');
    }
  },
  watch: {
    $route(to) {
      if (to.meta.requireAuth) {
        if (!this.isLoggedIn) {
          this.toLogin();
        }
      }
    }
  }
};
</script>

<style>

</style>
