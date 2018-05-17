<template>
  <div class="ui card">
    <a class="image" href="#">
      <img :src="destination.image">
    </a>
    <div class="content">
      <a class="header" href="#">{{destination.location}}</a>
    </div>
    <div class="extra content">
      <div class="ui button primary" @click="() => editDestination(destination)">Edit</div>
      <div class="ui button red" @click="() => deleteDestination(destination)">Delete</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'destination-list',
  props: ['destination', 'editDestination', 'deleteDestination'],
};
</script>

<style scoped>

</style>
