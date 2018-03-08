<template>
  <div class="ui segment">
    <div class="ui form">
      <div class="field">
        <label>Title</label>
        <input type="text" placeholder="Enter Title" v-model="blogPost.title">
      </div>
      <div class="field">
        <label>Summery</label>
        <textarea placeholder="Enter Summery" maxlength="30" v-model="blogPost.hook"></textarea>
      </div>
    </div>
    <br>
    <div v-for="(item,index) in blogPost.content" :key="index">
      <app-blog-content :content="item" :upload="upload"></app-blog-content>
    </div>
    <button class="ui right floated primary button" @click="submit">Submit</button>
    <button class="ui right floated teal button" @click="onAddMoreContent">Add More Content</button>
    <button class="ui right floated button" @click="close">Cancel</button>
    <br>
    <br>
  </div>
</template>

<script>
  import appBlogContent from './BlogContent';

  export default {
    name: "blog-detail",
    props: ['close', 'blogPost', 'newContent', 'upload', 'submit'],
    components: {
      appBlogContent
    },
    methods: {
      onAddMoreContent() {
        this.newContent();
        this.$forceUpdate();
      }
    }
  }
</script>

<style scoped>

</style>
