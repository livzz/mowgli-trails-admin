<template>
  <div>
    <div class="ui raised segment loading inverted black" v-if="loading">
      <br>
      <br>
      <br>
    </div>
    <div v-else>
      <div class="ui basic segment" v-if="!addPlace">
        <label>View Places of:</label>
        <select class="ui right floated dropdown" v-model="viewState">
          <option value="-1" disabled selected>Select a State</option>
          <option v-for="place in places" :key="place['.key']">{{place['.key']}}</option>
        </select>
        <div class="ui right floated black button" @click="onNewPlace">Add Place</div>
        <br>
        <br>
        <table class="ui celled table">
          <thead>
            <tr>
              <th>Places</th>
            </tr>
          </thead>
          <tbody>
            <tr :key="i" v-for="(district ,i) in districts">
              <td>{{district['.value']}}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="ui segment" v-else>
        <div class="ui form">
          <div class="two fields">
            <div class="field">
              <label>Select a State</label>
              <select class="ui right floated dropdown" v-model="viewState">
                <option value="-1" disabled selected>Select a State</option>
                <option v-for="place in places" :key="place['.key']">{{place['.key']}}</option>
              </select>
            </div>
            <div class="field">
              <label>OR Enter New State</label>
              <input placeholder="Enter State name" v-model="newState"/>
            </div>
          </div>
          <div class="field">
            <label>District</label>
            <input type="text" placeholder="Enter district" v-model="newDistrict">
          </div>
        </div>
        <br>
        <br>
        <button class="ui right floated primary button" @click="onAddPlace">Submit</button>
        <button class="ui right floated button" @click="onCancel">Cancel</button>
        <br>
        <br>
      </div>
    </div>
  </div>
</template>

<script>
import { db } from '../../firebase';

export default {
  name: 'PlacesMain',
  data() {
    return {
      viewState: '-1',
      addPlace: false,
      newState: '',
      newDistrict: '',
      districts: [],
      loading: true,
    };
  },
  methods: {
    onNewPlace() {
      this.addPlace = true;
    },
    onAddPlace() {
      if (this.newState === '' && this.viewState !== '-1') {
        this.$firebaseRefs.places.child(this.viewState)
          .push(this.newDistrict)
          .then(() => this.onCancel())
          .catch(e => console.log(e));
      } else {
        this.$firebaseRefs.places.child(this.newState)
          .push(this.newDistrict)
          .then(() => this.onCancel())
          .catch(e => console.log(e));
      }
    },
    onCancel() {
      this.addPlace = false;
      this.newState = '';
      this.newDistrict = '';
    },
  },
  firebase: {
    places: {
      source: db.ref('places'),
      // this is called once the data has been retrieved from firebase
      readyCallback() {
        this.loading = false;
      },
    },
  },
  watch: {
    viewState() {
      this.$bindAsArray('districts', db.ref('places').child(this.viewState));
    },
  },
};
</script>

<style scoped>

</style>
