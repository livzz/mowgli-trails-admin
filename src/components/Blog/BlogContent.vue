<template>
  <div class="ui grid stackable">
    <div class="ten wide column">
      <div class="ui form">
        <div class="field">
          <label>Main Body</label>
          <textarea placeholder="Enter Main Content" v-model="content.body"></textarea>
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
      <img class="ui centered medium image" :src="imagePath" alt="Image of ths Content">
    </div>
  </div>
</template>

<script>
  export default {
    name: "blog-content",
    props: ['content'],
    data() {
      return {
        imagePath: ''
      }
    },
    methods: {
      onFilePicked(event) {
        const files = event.target.files;
        let fileName = files[0].name;
        if (fileName.lastIndexOf('.') <= 0) {
          return alert("Invalid File!!");
        }
        const fileReader = new FileReader();
        fileReader.addEventListener('load', () => {
          this.imagePath = fileReader.result;
        });
        fileReader.readAsDataURL(files[0]);
        this.content.image = files[0];
      }
    }
  }
</script>

<style scoped>

</style>
