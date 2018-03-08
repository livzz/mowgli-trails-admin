<template>
  <div class="ui card">
    <a class="image" href="#">
      <img :src="tour.image">
    </a>
    <div class="content">
      <a class="header" href="#">{{tour.location}}</a>
      <div class="meta">
        <a>{{tour.description}}</a>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "tour-list",
    props: ['tour']
  }
</script>

<style scoped>

</style>
