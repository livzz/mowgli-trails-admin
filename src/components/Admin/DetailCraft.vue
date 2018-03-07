<template>
  <div class="ui clearing segment">
    <p>Name: {{craft.name}}</p>
    <p>Phone: {{craft.phone}}</p>
    <p>Email: {{craft.email}}</p>
    <div class="ui segment">
      <p>Activities</p>
      <div class="ui horizontal segments">
        <div class="ui segment" v-for="item in craft.activities">
          <p>{{item}}</p>
        </div>
      </div>
    </div>
    <p>Location: {{craft.location}}</p>
    <p>Message: {{craft.message}}</p>
    <div class="ui segment">
      <p>Places</p>
      <div class="ui horizontal segments">
        <div class="ui segment" v-for="item in craft.places">
          <p>{{item}}</p>
        </div>
      </div>
    </div>
    <p>Start Date: {{craft.startDate}}</p>
    <p>End Date: {{craft.endDate}}</p>
    <p>Traveller Count: {{craft.travellerCount}}</p>
    <div class="ui right floated primary button" @click="close">Close</div>
  </div>
</template>

<script>
  export default {
    name: "detail-craft",
    props: ['craft', 'close']
  }
</script>

<style scoped>

</style>
