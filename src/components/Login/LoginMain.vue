<template>
  <div class="ui container">
    <br>
    <br>
    <br>
    <div class="ui two column middle aligned center aligned grid stackable">
      <div class="column">
        <h2 class="ui teal image header">
          <div class="content">
            Log-in to your account
          </div>
        </h2>
        <form class="ui large form" >
          <div class="ui stacked segment">
            <div class="field">
              <div class="ui left icon input">
                <i class="user icon"></i>
                <input type="text" name="email" placeholder="E-mail address" v-model="email">
              </div>
            </div>
            <div class="field">
              <div class="ui left icon input">
                <i class="lock icon"></i>
                <input type="password" name="password" placeholder="Password" v-model="password">
              </div>
            </div>
            <div class="ui fluid large teal submit button" :class="{'loading': isLoading}" @click="submitHandler">Login</div>
          </div>

          <div class="ui error message"></div>

        </form>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Login',
  data() {
    return {
      email: '',
      password: '',
      isLoading: false
    };
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.getAuthState;
    }
  },
  methods: {
    submitHandler() {
      this.isLoading = true;
      this.$store.dispatch('actionLogin', {
        email: this.email,
        password: this.password,
        callback: this.setLoadingFalse
      });
    },
    setLoadingFalse() {
      this.isLoading = false;
    }
  },
  watch: {
    isLoggedIn(value) {
      if (value) {
        this.$router.push('/');
      }
    }
  }
};
</script>

<style scoped>

</style>
