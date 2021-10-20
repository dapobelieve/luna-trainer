<template>
  <div class="tail-grid">
    <div class="tail-py-0">
      <div class="tail-flex tail-justify-between tail-items-center tail-mb-2">
        <h2 class="tail-text-2xl tail-font-normal tail-text-gray-700 tail-mb-1">
          Invite New Client
        </h2>
        <button
          type="button"
          class="focus:tail-outline-none tail-outline-none tail-border-0"
          @click="$emit('close', false)"
        >
          <img
            class="tail-p-1 tail-rounded-full"
            src="~/assets/img/svgs/cancel.svg"
            alt="cancel"
          />
        </button>
      </div>
      <p class="tail-text-gray-500 tail-text-base">
        Let us know your client’s name and email address so we can invite them to GetWelp!
      </p>
      <div class="tail-overflow-y-scroll">
        <form
          autocomplete="off"
          class="tail-grid tail-gap-6 tail-mt-5 text-gray-700"
          @submit.prevent="save"
        >
          <div class="tail-flex tail-justify-between tail-gap-6">
            <div class="tail-flex tail-gap-5 tail-w-full">
              <div class="tail-w-full">
                <label
                  for="first_name"
                  class="block text-sm font-medium text-gray-700 required"
                  :class="{'tail-text-red-500' : $v.clientInfo.firstName.$error}"
                >First name</label>
                <input
                  id="first_name"
                  v-model.trim="$v.clientInfo.firstName.$model"
                  type="text"
                  class="tail-bg-white tail-w-full tail-p-2.5 tail-block sm:tail-text-sm tail-mt-1 tail-border tail-border-gray-300 tail-rounded-md focus:tail-shadow-md focus:tail-outline-none focus:tail-bg-white focus:tail-border-blue-500"
                  :class="{'tail-shadow-md tail-border-red-500' : $v.clientInfo.firstName.$error}"
                  @blur="$v.clientInfo.firstName.$touch()"
                />
              </div>
            </div>
          </div>
          <div class="tail-flex tail-gap-5">
            <div class="tail-w-full">
              <label for="email" class="required" :class="{'tail-text-red-500' : $v.clientInfo.email.$error}">Email Address</label>
              <input
                id="email"
                v-model.trim="$v.clientInfo.email.$model"
                type="email"
                class="tail-w-full tail-bg-white tail-p-2.5 tail-block sm:tail-text-sm tail-mt-1 tail-border tail-border-gray-300 tail-rounded-md focus:tail-shadow-md focus:tail-outline-none focus:tail-bg-white focus:tail-border-blue-500"
                :class="{'tail-shadow-md tail-border-red-500' : $v.clientInfo.email.$error}"
                @blur="$v.clientInfo.email.$touch()"
              />
              <div v-if="$v.clientInfo.email.$error" class="tail-mt-0.5">
                <small
                  v-if="!$v.clientInfo.email.email"
                  class="error tail-text-red-500"
                >Please enter a valid email address.</small>
              </div>
            </div>
          </div>
          <div class="tail-flex tail-justify-end tail-gap-5">
            <button-spinner
              style="width:fit-content"
              :disabled="$v.$invalid"
              :loading="isLoading"
            >
              send
            </button-spinner>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { required, email } from 'vuelidate/lib/validators'
import ButtonSpinner from './util/ButtonSpinner.vue'

export default {
  name: 'InviteNewClient',
  components: { ButtonSpinner },
  data () {
    return {
      isLoading: false,
      clientInfo: {
        firstName: '',
        email: ''
      }

    }
  },
  validations: {
    clientInfo: {
      firstName: {
        required
      },
      email: {
        required,
        email
      }
    }
  },
  methods: {
    ...mapActions({
      fetchAllClients: 'client/fetchAllClients',
      saveClient: 'client/inviteClient'
    }),
    save () {
      this.isLoading = true
      return this.$axios.post(`${process.env.BASEURL_HOST}/client/invite`, this.clientInfo).then((response) => {
        if (response && response.data.status === true) {
          this.$toast.success(
      `${this.clientInfo.firstName} has been sent an invite.`
          )
          this.$emit('close', false)
        } else {
          this.$toast.error('Error sending client invite')
        }
      }).catch((err) => {
        if (err.response) {
          this.$toast.error(`Something went wrong: ${err.response.data.message}`, { position: 'bottom-right' })
        } else if (err.request) {
          this.$toast.error('Something went wrong. Try again', { position: 'bottom-right' })
        } else {
          this.$toast.error(`Something went wrong: ${err.message}`, { position: 'bottom-right' })
        }
      }).finally(() => {
        this.isLoading = false
        this.fetchAllClients()
      })
    }
  }
}
</script>

<style lang="scss" scoped>

::-webkit-scrollbar {
    width: 0;  /* Remove scrollbar space */
    background: transparent;  /* Optional: just make scrollbar invisible */
}
/* Optional: show position indicator in red */
::-webkit-scrollbar-thumb {
    background: #FF0000;
}

.dull-button {
  background-color: gray !important;
}
input:focus {
  outline: none;
}
  .required:after {
    content:" *";
    @apply tail-text-red-500 tail-text-sm;
  }
</style>
