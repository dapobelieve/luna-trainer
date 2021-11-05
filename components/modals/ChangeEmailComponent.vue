<template>
  <div>
    <div class="flex justify-between items-center mb-8">
      <h5 class="text-2xl text-gray-700">
        <slot name="title">
          Change Email
        </slot>
      </h5>
      <button type="button" @click="$emit('close-modal')">
        <i class="ns-cross text-lg text-blue-500"></i>
      </button>
    </div>
    <div>
      <form>
        <div class="flex justify-end">
          <button-spinner
            :loading="isLoading"
            type="button"
            style="width:fit-content"
            @click="updatePassword"
          >
            Update
          </button-spinner>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      form: {
        oldPassword: null,
        newPassword: null,
        newPassword2: null
      },
      isLoading: false
    }
  },
  methods: {
    async updatePassword () {
      this.isLoading = true
      try {
        await this.$store.dispatch('authorize/resetPassword', { ...this.form })
        this.$emit('close-modal')
      } catch (e) {
        this.$toasted.error(e.response.data.message)
      } finally {
        this.isLoading = false
      }
    }
  }
}
</script>

<style scoped>

</style>
