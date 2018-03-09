<template>
  <div>
    <div v-if="newTour === null">
      <div class="ui right floated primary button" @click="onAddTour">Add Tour</div>
      <br>
      <br>
      <div class="ui raised segment loading inverted black" v-if="loading">
        <br>
        <br>
        <br>
      </div>
      <div class="ui link centered cards" v-else>
        <app-tour-list
          :tour="tour"
          :edit-tour="handleEditTour"
          :deleteTour="handleDeleteTour"
          v-for="(tour,i) in tours"
          :key="i">
        </app-tour-list>
      </div>
    </div>
    <app-new-tour
      :tour="newTour"
      :submit="handleSubmitTour"
      :cancel="handleCloseTour"
      :upload="handleUploadImage"
      v-else></app-new-tour>
  </div>
</template>

<script>
  import {db, app} from '../../firebase';
  import appTourList from './TourList';
  import appNewTour from './NewTour';

  export default {
    data() {
      return {
        loading: true,
        newTour: null,
        key: null
      }
    },
    methods: {
      handleSubmitTour() {
        if (this.key === null) {
          db.ref('tours').push(this.newTour);
          this.newTour = null
        } else {
          db.ref('tours').child(this.key).set(this.newTour).then(() => {
            this.key = null;
            alert("New Tour Created!!");
            this.newTour = null
          });
        }
      },
      handleEditTour(tour) {
        this.newTour = {
          activity: tour.activity,
          image: tour.image,
          location: tour.location,
          description: tour.description,
          category: tour.category
        };
        this.key = tour['.key'];
      },
      handleDeleteTour(tour) {
        this.$firebaseRefs.tours.child(tour['.key']).remove()
      },
      handleUploadImage(image) {
        const upload = app
          .storage()
          .ref(`tours/${image.name}`)
          .put(image);
        upload.on('state_changed', snapshot => {
          let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
        });
        return upload.then(fileData => fileData.metadata.downloadURLs[0]);
      },
      onAddTour() {
        this.newTour = {
          activity: '',
          image: '',
          location: '',
          description: '',
          category: 'Select a category'
        }
      },
      handleCloseTour() {
        this.newTour = null;
        this.key = null;
      }
    },
    components: {
      appTourList,
      appNewTour
    },
    firebase: {
      tours: {
        source: db.ref('tours'),
        // this is called once the data has been retrieved from firebase
        readyCallback() {
          this.loading = false;
        }
      }
    }
  };
</script>

<style scoped>

</style>
