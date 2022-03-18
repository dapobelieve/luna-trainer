<template>
  <div class="grid m-6 ">
    <div class="py-0 mb-5">
      <div class="flex justify-between items-center mb-2">
        <h2 class="text-2xl font-normal text-gray-700 mb-1">
          Invite New Client
        </h2>
        <button
          type="button"
          class="focus:outline-none outline-none border-0"
          @click="$emit('close', false)"
        >
          <img
            class="p-1 rounded-full"
            src="~/assets/img/svgs/cancel.svg"
            alt="cancel"
          />
        </button>
      </div>
      <p class="text-gray-500 text-base">
        Let us know your client’s name and email address so we can invite them to GetWelp!
      </p>
      <div class="overflow-y-scroll">
        <form
          autocomplete="off"
          class="grid gap-6 mt-5 text-gray-700"
          @submit.prevent="save"
        >
          <div class="flex justify-between gap-6">
            <div class="flex gap-5 w-full">
              <div class="w-full">
                <label
                  for="first_name"
                  class="block text-sm font-medium text-gray-700 required"
                  :class="{'text-red-500' : $v.clientInfo.firstName.$error}"
                >First name</label>
                <input
                  id="first_name"
                  v-model.trim="$v.clientInfo.firstName.$model"
                  type="text"
                  class="bg-white w-full p-2.5 block sm:text-sm mt-1 border border-gray-300 rounded-md focus:shadow-md focus:outline-none focus:bg-white focus:border-blue-500"
                  :class="{'shadow-md border-red-500' : $v.clientInfo.firstName.$error}"
                />
              </div>
            </div>
          </div>
          <div class="flex gap-5">
            <div class="w-full">
              <label for="email" class="required" :class="{'text-red-500' : $v.clientInfo.email.$error}">Email Address</label>
              <input
                id="email"
                v-model.trim="$v.clientInfo.email.$model"
                type="email"
                class="w-full bg-white p-2.5 block sm:text-sm mt-1 border border-gray-300 rounded-md focus:shadow-md focus:outline-none focus:bg-white focus:border-blue-500"
                :class="{'shadow-md border-red-500' : $v.clientInfo.email.$error}"
              />
              <div v-if="$v.clientInfo.email.$error" class="mt-0.5">
                <small
                  v-if="!$v.clientInfo.email.email"
                  class="error text-red-500"
                >Please enter a valid email address.</small>
              </div>
            </div>
          </div>
          <div class="flex justify-end gap-5">
            <button-spinner
              style="width:fit-content"
              :disabled="$v.$invalid"
              :loading="isLoading"
            >
              Send Invite
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
  props: {
    client: Object,
    redirect: {
      type: Boolean
    }
  },
  data () {
    return {
      isLoading: false,
      clientInfo: {
        firstName: this.client ? this.client.firstName : '',
        email: this.client ? this.client.email : ''
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
    ...mapActions('client', {
      fetchAllClients: 'fetchAllClients',
      inviteClient: 'inviteClient'
    }),
    async save () {
      this.isLoading = true
      const response = await this.inviteClient(this.clientInfo)
      if (response && response.data) {
        this.$gwtoast.success( `${this.clientInfo.firstName} has been sent an invite.`)
        this.$emit('close', false)
        this.$nuxt.$emit("new-client-invite",response.data)
        if (this.redirect) {
          this.$router.push({
            name: 'client-id-information',
            params: {
              id: response.data.data._id
            }
          })
        }
        this.fetchAllClients()
      } else {
        this.$gwtoast.error(response.message)
      } 
      this.isLoading = false  
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
    @apply text-red-500 text-sm;
  }
</style>
