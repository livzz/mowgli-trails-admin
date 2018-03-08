<template>
  <div>
    <div class="ui right floated primary button">Add Tour</div>
    <br>
    <br>
    <div class="ui raised segment loading inverted black" v-if="loading">
      <br>
      <br>
      <br>
    </div>
    <div class="ui link centered cards" v-else>
      <app-tour-list :tour="tour" v-for="(tour,i) in tours" :key="i"></app-tour-list>
    </div>
  </div>
</template>

<script>
  import {db} from '../../firebase';
  import appTourList from './TourList';

  export default {
    data() {
      return {
        loading: true
      }
    },
    components: {
      appTourList
    },
    firebase: {
      tours: {
        source: db.ref('tours'),
        // this is called once the data has been retrieved from firebase
        readyCallback: function () {
          this.loading = false;
        }
      }
    }
  };
</script>

<style scoped>

</style>
