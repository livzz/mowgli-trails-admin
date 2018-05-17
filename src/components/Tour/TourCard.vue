<template>
  <div class="ui card">
    <a class="image" href="#">
      <img :src="tour.image">
    </a>
    <div class="content">
      <a class="header" href="#">{{tour.activity}}</a>
      <div class="meta">
        <a>{{tour.location}}</a>
      </div>
    </div>
    <div class="extra content">
      <div class="ui button primary" @click="() => editTour(tour)">Edit</div>
      <div class="ui button red" @click="() => deleteTour(tour)">Delete</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'tour-list',
  props: ['tour', 'editTour', 'deleteTour'],
};
</script>

<style scoped>

</style>
