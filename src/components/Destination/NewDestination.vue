<template>
  <div>
    <div class="ui segment">
      <div class="ui form">
        <div class="field">
          <label>Title</label>
          <input placeholder="Enter Title" maxlength="150" v-model="destination.title"/>
        </div>
        <div class="two fields">
          <div class="field">
            <label>Location</label>
            <input placeholder="Enter Summery" v-model="destination.location"/>
          </div>
          <div class="field">
            <label>Category</label>
            <select class="ui fluid dropdown" v-model="destination.category">
              <option selected>Select a category</option>
              <option>Featured</option>
              <option>Curated</option>
            </select>
          </div>
        </div>
      </div>
      <br>
      <div class="ui grid stackable">
        <div class="ten wide column">
          <div class="ui form">
            <div class="field">
              <label>Description</label>
              <textarea placeholder="Enter Content Body" v-model="destination.description">
              </textarea>
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
          <img class="ui centered medium image" :src="destination.image" alt="Image of ths Content">
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
  name: 'new-destination',
  props: ['destination', 'submit', 'cancel', 'upload'],
  methods: {
    onFilePicked(event) {
      const files = event.target.files;
      const fileName = files[0].name;
      if (fileName.lastIndexOf('.') <= 0) {
        return alert('Invalid File!!');
      }
      const result = this.upload(files[0]);
      return result.then((url) => {
        this.destination.image = url;
      });
    },
  },
};
</script>

<style scoped>

</style>
