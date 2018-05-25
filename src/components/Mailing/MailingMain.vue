<template>
  <div>
    <button class="ui button primary">Send Mail to all</button>
    <div class="ui raised segment loading inverted black" v-if="loading">
      <br>
      <br>
      <br>
    </div>
    <table class="ui celled striped table" v-else>
      <thead>
        <th>Email</th>
        <th>Date</th>
      </thead>
      <tbody>
        <tr v-for="email in emails" :key="email['key']">
          <td>{{email['.key']}}</td>
          <td>{{email['.value']}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { db } from '../../firebase';

export default {
  name: 'MailingMain',
  data() {
    return {
      loading: true,
    };
  },
  firebase: {
    emails: {
      source: db.ref('email'),
      // this is called once the data has been retrieved from firebase
      readyCallback() {
        this.loading = false;
      },
    },
  },
};
</script>

<style scoped>

</style>
