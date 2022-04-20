<template>
  <async :state="$fetchState">
    <template>
      <ul>
        <li v-for="(mountain, index) in mountains" :key="index">
          {{ mountain.title }}
        </li>
      </ul>
    </template>
  </async>
</template>
<script>
export default {
  name: "AsyncTest",
  layout: "empty",
  middleware: "validToken",
  auth: false,
  data() {
    return {
      mountains: [],
    };
  },
  async fetch() {
    this.mountains = await this.$axios
      .$get("https://api.nuxtjs.dev/mountains")
      .then((response) => response);
  }
};
</script>
<style lang="scss" scoped>
</style>
