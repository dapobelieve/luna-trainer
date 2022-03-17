<template>
  <modal name="change-email-modal" height="auto" :adaptive="true">
    <div class="m-6">
      <div class="flex justify-between items-center mb-8">
        <h5 class="text-2xl text-gray-700">
          <slot name="title">
            Change Email
          </slot>
        </h5>
        <button type="button" @click="$modal.hide('change-email-modal')">
          <i class="ns-cross text-lg text-blue-500"></i>
        </button>
      </div>
      <div>
        <form>
          <div class="bg-gray-50 h-20 rounded-xl text-sm mb-6 border-2 border-solid border-gray-100">
            <div class="mt-2">
              <p class="py-1 px-3">
                Current Email
              </p>
              <p class="py-1 px-3">
                {{ $auth.user.email }}
              </p>
            </div>
          </div>
          <InputComponent
            id="email"
            v-model="
              $v.form.email.$model"
            autofocus
            placeholder=""
            type="email"
            class="mb-8"
          >
            <template v-slot:labelText>
              New Email
            </template>
          </InputComponent>
          <div class="flex justify-end">
            <button-spinner
              :loading="isLoading"
              type="button"
              style="width:fit-content"
              :disabled="$v.$invalid"
              @click="updateEmail"
            >
              Update
            </button-spinner>
          </div>
        </form>
      </div>
    </div>
  </modal>
</template>

<script>
import { mapActions } from 'vuex'
import { required, email } from 'vuelidate/lib/validators'
export default {
  data () {
    return {
      form: {
        email: null
      },
      isLoading: false
    }
  },
  validations: {
    form: {
      email: {
        required,
        email
      }
    }
  },
  methods: {
    ...mapActions({
      fetchUserProfile: 'profile/getUserProfile'
    }),
    async updateEmail () {
      this.isLoading = true
      try {
        await this.$store.dispatch('authorize/changeEmail', { ...this.form })
        this.$lunaToast.success(`We have sent a verification link to ${this.form.email}.`)
        await this.fetchUserProfile()
        this.$modal.hide('change-email-modal')
        this.$emit('display-cancel-change')
      } catch (e) {
        this.$lunaToast.error(e.response.data.message)
      } finally {
        this.isLoading = false
        this.form = { email: null }
      }
    }
  }
}
</script>

<style scoped>

</style>
