<template>
  <div>
    <div class="tail-flex">
      <div class="tail-pr-3 tail-w-12 tail-mb-4">
        <p class="tail-font-medium">
          {{ identifier._id.date }}
        </p>
        <p class="tail-font-medium">
          {{ identifier._id.day }}
        </p>
      </div>
      <div class="tail-w-full">
        <div v-for="data in identifier.schedules" :key="data">
          <ScheduleCard :data="data" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GroupIdentifier',
  props: {
    identifier: {
      type: Object,
      required: true
    }
  }
}
</script>

<style>

</style>
