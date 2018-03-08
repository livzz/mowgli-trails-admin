<template>
  <div class="ui segment">
    <div class="ui form">
      <div class="field">
        <label>Title</label>
        <input type="text" placeholder="Enter Title">
      </div>
      <div class="field">
        <label>Summery</label>
        <textarea placeholder="Enter Summery" maxlength="30"></textarea>
      </div>
    </div>
    <br>
    <app-blog-content :content="item" v-for="item in blogPost.content"></app-blog-content>
    <button class="ui right floated primary button">Submit</button>
    <button class="ui right floated teal button">Add More Content</button>
    <button class="ui right floated button">Cancel</button>
    <br>
    <br>
  </div>
</template>

<script>
  import appBlogContent from './BlogContent';

  export default {
    name: "blog-detail",
    props: ['close', 'blogPost'],
    components: {
      appBlogContent
    }
  }
</script>

<style scoped>

</style>
