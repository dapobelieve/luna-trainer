<template>
  <div>
    <div class="tail-pr-3 tail-w-12">
      <p class="tail-font-medium">
        {{ date }}
      </p>
      <p class="tail-font-medium">
        {{ day }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GroupIdentifier',
  props: {
    date: {
      type: String,
      required: true
    },
    day: {
      type: String,
      required: true
    }
  }
}
</script>

<style>

</style>
