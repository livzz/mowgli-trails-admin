<template>
  <div class="ui clearing segment">
    <p>Name: {{craft.userDetails.name}}</p>
    <p>Phone: {{craft.userDetails.phone}}</p>
    <p>Email: {{craft.userDetails.email}}</p>
    <div class="ui segment">
      <p>Activities</p>
      <div class="ui horizontal segments">
        <div class="ui segment" :key="i" v-for="(item,i) in craft.activities">
          <p>{{item}}</p>
        </div>
      </div>
    </div>
    <p>Location: {{craft.userDetails.location}}</p>
    <p>Message: {{craft.tripDetails.message}}</p>
    <div class="ui segment">
      <p>Places</p>
      <div class="ui horizontal segments">
        <div class="ui segment" :key="i" v-for="(item,i) in craft.places">
          <p>{{item}}</p>
        </div>
      </div>
    </div>
    <p>Start Date: {{craft.tripDetails.startDate}}</p>
    <p>End Date: {{craft.tripDetails.endDate}}</p>
    <p>Traveller Count: {{craft.tripDetails.travellerCount}}</p>
    <div class="ui right floated primary button" @click="close">Close</div>
  </div>
</template>

<script>
export default {
  name: 'detail-craft',
  props: ['craft', 'close'],
};
</script>

<style scoped>

</style>
