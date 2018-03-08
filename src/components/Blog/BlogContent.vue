<template>
  <div>
    <div class="ui grid stackable">
      <div class="ten wide column">
        <div class="ui form">
          <div class="field">
            <label>Content Body</label>
            <textarea placeholder="Enter Content Body" v-model="content.body"></textarea>
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
        <img class="ui centered medium image" :src="content.image" alt="Image of ths Content">
      </div>
    </div>
    <div class="ui divider"></div>
  </div>
</template>

<script>
  export default {
    name: "blog-content",
    props: ['content', 'upload'],
    data() {
      return {
        imagePath: '',
      }
    },
    methods: {
      onFilePicked(event) {
        const files = event.target.files;
        let fileName = files[0].name;
        if (fileName.lastIndexOf('.') <= 0) {
          return alert("Invalid File!!");
        }
        const result = this.upload(files[0]);
        result.then(url => {
          this.content.image = url;
          this.imagePath = url;
        })
      }
    }
  }
</script>

<style scoped>

</style>
