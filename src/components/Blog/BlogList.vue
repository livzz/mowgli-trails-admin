<template>

  <div class="item">
    <div class="image">
      <img :src="blog.mainImage">
    </div>
    <div class="content">
      <a class="header">{{blog.title}}</a>
      <div class="meta">
        <span>Description</span>
      </div>
      <div class="description">
        <p>{{blog.hook}}</p>
      </div>
      <div class="extra">
        <div class="ui right floated secondary button">
          Edit
        </div>
        <div class="ui right floated red button" v-if="blog.type === 0" @click="() => changeType(blog)">
          Publish
        </div>
        <div class="ui right floated red button" v-else @click="() => changeType(blog)">
          Archive
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "blog-list",
    props: ['blog', 'changeType']
  }
</script>

<style scoped>

</style>
