<template>
  <modal :click-to-close="false" height="auto" :adaptive="true" name="auth-modal">
    <div class="m-6">
      <div class="flex justify-between items-center mb-8">
        <div>
          <h5 class="text-2xl text-gray-700">
            <slot name="title">
              Session Expired
            </slot>
          </h5>
          <p>Please sign in</p>
        </div>
      </div>
      <div>
        <form @submit.prevent="fnLogin">
          <div class="flex justify-around">
            <div class="text-center">
              <ClientAvatar
                :width="4.5"
                :height="4.5"
                :client-info="$auth.user"
              />
              <div>
                <span class="text-3xl font-bold">{{ $auth.user.firstName }} {{ $auth.user.lastName }}</span>
              </div>
            </div>
          </div>
          <div>
            <InputComponent
              id="oldPass"
              v-model="form.password"
              autofocus
              placeholder=""
              type="password"
              class="mb-8"
            >
              <template v-slot:labelText>
                Password
              </template>
            </InputComponent>
          </div>
          <button
            type="submit"
            :disabled="isLoading || !form.password"
            class="button-fill"
          >
            <SingleLoader v-if="isLoading" class="mr-2" />Login
          </button>
        </form>
      </div>
    </div>
  </modal>
</template>

<script>
export default {
  data () {
    return {
      isLoading: false,
      form: {
        password: null
      }
    }
  },
  methods: {
    async fnLogin () {
      this.isLoading = true
      try {
        await this.$store.dispatch('authorize/loginUser', {
          email: this.$auth.user.email,
          password: this.form.password,
          domain: 'getwelp-trainer-ui'
        })
        this.$gwtoast.success('Login Successful')
        this.$modal.hide('auth-modal')
      } catch (e) {
        console.log(e)
      } finally {
        this.isLoading = false
      }
    }
  }
}
</script>

<style scoped>

</style>
