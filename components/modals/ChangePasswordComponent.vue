<template>
  <div>
    <div class="flex justify-between items-center mb-8">
      <h5 class="text-2xl text-gray-700">
        <slot name="title">
          Change Password
        </slot>
      </h5>
      <button type="button" @click="$emit('close-modal')">
        <i class="ns-cross text-lg text-blue-500"></i>
      </button>
    </div>
    <div>
      <form>
        <InputComponent
          id="oldPass"
          v-model="form.oldPassword"
          autofocus
          placeholder=""
          type="password"
          class="mb-8"
        >
          <template v-slot:labelText>
            Old Password
          </template>
        </InputComponent>
        <InputComponent
          id="pass1"
          v-model="form.newPassword"
          autofocus
          placeholder=""
          type="password"
          class="mb-8"
        >
          <template v-slot:labelText>
            New Password
          </template>
        </InputComponent>
        <div class="flex justify-end">
          <button-spinner
            :disabled="!form.newPassword || !form.oldPassword"
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
import InputComponent from '~/components/util/InputComponent'
export default {
  components: { InputComponent },
  data () {
    return {
      form: {
        oldPassword: null,
        newPassword: null
      },
      isLoading: false
    }
  },
  methods: {
    async updatePassword () {
      this.isLoading = true
      try {
        await this.$store.dispatch('authorize/resetPassword', { ...this.form })
        this.$gwtoast.success('Password changed successfully')
        this.$emit('close-modal')
      } catch (e) {
        this.$gwtoast.error(e.response.data.message)
      } finally {
        this.isLoading = false
      }
    }
  }
}
</script>

<style scoped>

</style>
