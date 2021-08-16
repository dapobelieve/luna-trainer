<template>
  <div>
    <div class="tail-m-3">
      <client-only>
        <v-date-picker v-model="date" mode="date" style="width: 100% !important" />
      </client-only>
    </div>
    <TimeTag />
  </div>
</template>

<script>
export default {
  data () {
    return {
      date: ''
    }
  }

}
</script>

<style>

</style>
