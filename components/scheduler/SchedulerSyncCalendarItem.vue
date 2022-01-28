<template>
  <div class="flex items-center">
    <slot :provider="provider" name="content" />
    <div class="ml-auto w-20 flex justify-center">
      <SingleLoader v-if="loading" />
      <button @click="connect" v-else class="text-primary-color px-4 py-2 border rounded-lg">
        Connect
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    provider: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      loading: false
    }
  },
  methods: {
    connect() {
      this.loading = true
      setTimeout(() => {
        this.$emit('connect', this.provider)
        this.loading = false
      }, 2000)
    }    
  }
}
</script>

<style scoped>

</style>