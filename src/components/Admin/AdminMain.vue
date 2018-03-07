<template>
  <div>
    <div class="ui raised segment loading inverted black" v-if="loading">
      <br>
      <br>
      <br>
    </div>
    <div v-if="!loading && craft === null">
      <div class="ui raised segment pointer" v-for="craft in craftCustomers" @click="viewDetail(craft)">
        <p class="ui header">{{craft.name}}</p>
        <p>{{craft.email}}</p>
      </div>
    </div>
    <app-craft :craft="craft" :close="closeDetail" v-if="craft !== null"></app-craft>
  </div>
</template>

<script>
  import {db} from '../../firebase';
  import appCraft from './DetailCraft';

  export default {
    data() {
      return {
        loading: true,
        craft: null
      }
    },
    components: {
      appCraft
    },
    firebase: {
      craftCustomers: {
        source: db.ref('craftCustomers'),
        // this is called once the data has been retrieved from firebase
        readyCallback() {
          this.loading = false
        }
      }
    },
    methods: {
      viewDetail(craft) {
        this.craft = craft;
        console.log(craft);
      },
      closeDetail() {
        this.craft = null;
      }
    }
  };
</script>

<style scoped>
  .pointer {
    cursor: pointer;
  }
</style>
