<template>
  <div id="app">
    <app-header v-if="$route.path !== '/login'"></app-header>
    <br>
    <br>
    <br>
    <div class="ui container">
      <router-view/>
    </div>
  </div>
</template>

<script>
import Header from './components/Header/HeaderMain';

export default {
  name: 'App',
  components: {
    appHeader: Header,
  },
  created() {
    this.$store.dispatch('initAuthState');
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.getAuthState;
    },
  },
  methods: {
    toLogin() {
      this.$router.push('/login');
    },
  },
  watch: {
    $route(to) {
      if (to.meta.requireAuth) {
        if (!this.isLoggedIn) {
          this.toLogin();
        }
      }
    },
  },
};
</script>

<style>

</style>
