<template>
  <div>
    <div v-if="newDestination === null">
      <div class="ui right floated primary button" @click="onAddDestination">Add Destination</div>
      <br>
      <br>
      <div class="ui raised segment loading inverted black" v-if="loading">
        <br>
        <br>
        <br>
      </div>
      <div class="ui link centered cards" v-else>
        <app-destination-card
          :destination="destination"
          :editDestination="handleEdit"
          :deleteDestination="handleDelete"
          v-for="(destination,i) in destinations"
          :key="i">
        </app-destination-card>
      </div>
    </div>
    <app-new-destination
      :destination="newDestination"
      :submit="handleSubmit"
      :cancel="handleClose"
      :upload="handleUploadImage"
      v-else>
    </app-new-destination>
  </div>
</template>

<script>
import { db, app } from '../../firebase';
import appDestinationCard from './DestinationCard';
import appNewDestination from './NewDestination';

export default {
  name: 'DestinationMain',
  data() {
    return {
      loading: true,
      newDestination: null,
      key: null,
      db: db.ref('destinations'),
    };
  },
  methods: {
    handleSubmit() {
      if (this.key === null) {
        this.db.push(this.newDestination);
        this.newDestination = null;
      } else {
        this.db.child(this.key).set(this.newDestination).then(() => {
          this.key = null;
          alert('New Destination Created!!');
          this.newDestination = null;
        });
      }
    },
    handleEdit(destination) {
      this.newDestination = {
        image: destination.image,
        location: destination.location,
        description: destination.description,
        category: destination.category,
      };
      this.key = destination['.key'];
    },
    handleDelete(destination) {
      this.$firebaseRefs.destinations.child(destination['.key']).remove();
    },
    handleUploadImage(image) {
      const upload = app.storage().ref(`destinations/${image.name}`).put(image);
      upload.on('state_changed', (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`Upload is ${progress}% done`);
      });
      return upload.then(fileData => fileData.metadata.downloadURLs[0]);
    },
    onAddDestination() {
      this.newDestination = {
        activity: '',
        image: '',
        location: '',
        description: '',
        category: 'Select a category',
      };
    },
    handleClose() {
      this.newDestination = null;
      this.key = null;
    },
  },
  components: {
    appDestinationCard,
    appNewDestination,
  },
  firebase: {
    destinations: {
      source: db.ref('destinations'),
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
