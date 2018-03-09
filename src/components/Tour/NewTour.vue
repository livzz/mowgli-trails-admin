<template>
  <div>
    <div class="ui segment">
      <div class="ui form">
        <div class="two fields">
          <div class="field">
            <label>Activity</label>
            <input type="text" placeholder="Enter Title" v-model="tour.activity">
          </div>
          <div class="field">
            <label>Category</label>
            <select class="ui fluid dropdown" v-model="tour.category">
              <option selected>Select a category</option>
              <option>Featured</option>
              <option>Curated</option>
            </select>
          </div>
        </div>
        <div class="field">
          <label>Location</label>
          <input placeholder="Enter Summery" maxlength="30" v-model="tour.location"/>
        </div>
      </div>
      <br>
      <div class="ui grid stackable">
        <div class="ten wide column">
          <div class="ui form">
            <div class="field">
              <label>Description</label>
              <textarea placeholder="Enter Content Body" v-model="tour.description"></textarea>
            </div>
            <div class="field">
              <input
                type="file"
                class="ui button"
                accept="image/*"
                @change="onFilePicked"
              />
            </div>
          </div>
        </div>
        <div class="six wide column">
          <img class="ui centered medium image" :src="tour.image" alt="Image of ths Content">
        </div>
      </div>
      <button class="ui right floated primary button" @click="submit">Submit</button>
      <button class="ui right floated button" @click="cancel">Cancel</button>
      <br>
      <br>
    </div>
  </div>
</template>

<script>
  export default {
    name: "new-tour",
    props: ['tour', 'submit', 'cancel', 'upload'],
    methods: {
      onFilePicked(event) {
        const files = event.target.files;
        let fileName = files[0].name;
        if (fileName.lastIndexOf('.') <= 0) {
          return alert("Invalid File!!");
        }
        const result = this.upload(files[0]);
        result.then(url => {
          this.tour.image = url;
        })
      }
    }
  }
</script>

<style scoped>

</style>
