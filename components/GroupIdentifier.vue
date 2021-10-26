<template>
  <div>
    <div class="flex">
      <div class="pr-3 w-12 mb-4">
        <p class="font-medium">
          {{ identifier._id.date }}
        </p>
        <p class="font-medium">
          {{ identifier._id.day }}
        </p>
      </div>
      <div class="w-full">
        <div v-for="data in identifier.schedules" :key="data.id">
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
