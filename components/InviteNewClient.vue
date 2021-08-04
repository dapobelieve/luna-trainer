<template>
  <div class="tail-grid">
    <div class="tail-py-0 tail-overflow-y-scroll">
      <h2 class="tail-text-2xl tail-font-normal tail-mb-3">
        Client Registration
      </h2>
      <div
        class="tail-py-2 tail-px-5 tail-rounded-md gw-body-color tail-text-gray-500 tail-flex tail-items-center tail-gap-1 tail-border-gray-400 tail-border"
      >
        <i class="ns-info tail-text-xl"></i>
        <span class="gw-body-color">Brief information here</span>
      </div>
      <div class="tail-overflow-y-scroll">
        <form
          autocomplete="off"
          class="tail-grid tail-gap-6 tail-mt-5"
          @submit.prevent="save"
        >
          <div class="tail-flex tail-justify-between tail-gap-6">
            <div class="tail-flex tail-gap-5 tail-w-full">
              <i class="ns-user tail-mt-1 tail-text-2xl tail-text-gray-500"></i>
              <div class="tail-w-full">
                <label
                  for="first_name"
                  class="block text-sm font-medium text-gray-700"
                >First name</label>
                <input
                  id="first_name"
                  v-model.trim="$v.clientInfo.firstName.$model"
                  type="text"
                  class="tail-bg-white tail-w-full tail-p-2.5 tail-block sm:tail-text-sm tail-mt-1 tail-border tail-border-gray-300 tail-rounded-md"
                  :class="{ error: !$v.clientInfo.firstName.required }"
                />
              </div>

              <div class="tail-w-full">
                <label
                  for="last_name"
                  class="block text-sm font-medium text-gray-700"
                >Last name</label>
                <input
                  id="last_name"
                  v-model.trim="$v.clientInfo.lastName.$model"
                  type="text"
                  class="tail-bg-white tail-w-full tail-p-2.5 tail-block sm:tail-text-sm tail-mt-1 tail-border tail-border-gray-300 tail-rounded-md"
                  :class="{ error: !$v.clientInfo.lastName.required }"
                />
              </div>
            </div>
          </div>
          <div class="tail-flex tail-gap-5">
            <i class="ns-phone tail-mt-1 tail-text-2xl tail-text-gray-500"></i>
            <div class="tail-w-full">
              <label for="phone">Telephone</label>
              <input
                id="phone"
                v-model.trim="$v.clientInfo.phone"
                type="tel"
                class="tail-w-full tail-bg-white tail-p-2.5 tail-block sm:tail-text-sm tail-mt-1 tail-border tail-border-gray-300 tail-rounded-md"
              />
            </div>
          </div>
          <div class="tail-flex tail-gap-5">
            <i
              class="ns-envelope tail-mt-1 tail-text-2xl tail-text-gray-500"
            ></i>
            <div class="tail-w-full">
              <label for="email">Email Address</label>
              <input
                id="email"
                v-model.trim="$v.clientInfo.email.$model"
                type="email"
                class="tail-w-full tail-bg-white tail-p-2.5 tail-block sm:tail-text-sm tail-mt-1 tail-border tail-border-gray-300 tail-rounded-md"
                :class="{ error: $v.clientInfo.email.$invalid }"
              />
              <div v-if="$v.$anyDirty" class="tail-mt-1">
                <small v-if="!$v.clientInfo.email.email" class="tail-text-gray-500">
                  Must be valid email.
                </small>
              </div>
            </div>
          </div>
          <div class="tail-flex tail-gap-5">
            <i
              class="ns-location-alt tail-text-3xl tail-text-gray-500"
            ></i>
            <div class="tail-w-full">
              <label for="locationAddress">Address</label>
              <input
                id="locationAddress"
                v-model.trim="clientInfo.locationAddress"
                type="tel"
                class="tail-w-full tail-bg-white tail-p-2.5 tail-block sm:tail-text-sm tail-mt-1 tail-border tail-border-gray-300 tail-rounded-md"
              />
            </div>
          </div>
          <div class="tail-flex tail-gap-5">
            <i
              class="ns-location-alt tail-invisible tail-text-3xl tail-text-gray-500"
            ></i>
            <div class="tail-w-full">
              <label for="city">Town/City</label>
              <input
                id="city"
                v-model.trim="clientInfo.city"
                type="tel"
                class="tail-w-full tail-bg-white tail-p-2.5 tail-block sm:tail-text-sm tail-mt-1 tail-border tail-border-gray-300 tail-rounded-md"
              />
            </div>
          </div>
          <div class="tail-flex tail-gap-5">
            <i
              class="ns-location-alt tail-invisible tail-text-3xl tail-text-gray-500"
            ></i>
            <div class="tail-w-full">
              <label for="locationZip">Post Code</label>
              <input
                id="locationZip"
                v-model.trim="clientInfo.locationZip"
                type="tel"
                class="tail-w-full tail-bg-white tail-p-2.5 tail-block sm:tail-text-sm tail-mt-1 tail-border tail-border-gray-300 tail-rounded-md"
              />
            </div>
          </div>
          <div class="tail-flex tail-gap-5">
            <i
              class="ns-location-alt tail-text-3xl tail-text-gray-500"
            ></i>
            <div class="tail-w-full">
              <label for="dogName">Dog's name</label>
              <input
                id="dogName"
                v-model.trim="$v.clientInfo.petName.$model"
                type="tel"
                class="tail-w-full tail-bg-white tail-p-2.5 tail-block sm:tail-text-sm tail-mt-1 tail-border tail-border-gray-300 tail-rounded-md"
                :class="{ error: !$v.clientInfo.petName.required }"
              />
            </div>
          </div>
          <div class="tail-flex tail-justify-between tail-gap-6 tail-ml-2">
            <div class="tail-flex tail-gap-5 tail-w-full">
              <i
                class="ns-user tail-invisible tail-text-2xl tail-text-gray-500"
              ></i>
              <div class="tail-w-full">
                <label
                  for="breed"
                  class="block text-sm font-medium text-gray-700"
                >Breed</label>
                <input
                  id="breed"
                  v-model.trim="$v.clientInfo.petBreed.$model"
                  type="text"
                  class="tail-bg-white tail-w-full tail-p-2.5 tail-block sm:tail-text-sm tail-mt-1 tail-border tail-border-gray-300 tail-rounded-md"
                  :class="{ error: !$v.clientInfo.petBreed.required }"
                />
              </div>
              <div class="tail-w-full">
                <label for="experience">Age</label>
                <select
                  id="experience"
                  v-model="$v.clientInfo.petAge.$model"
                  type="text"
                  class="tail-w-full tail-bg-white tail-p-2.5 tail-block sm:tail-text-sm tail-mt-1 tail-border tail-border-gray-300 tail-rounded-md"
                  :class="{ error: !$v.clientInfo.petAge.required }"
                >
                  <option
                    v-for="val in Array.from(Array(13).keys())"
                    :key="val"
                    :value="parseInt(val) + 1"
                  >
                    {{ parseInt(val) + 1 }}
                  </option>
                </select>
              </div>
            </div>
          </div>
          <div class="tail-w-full tail-gap-5">
            <div class="tail-py-2 tail-ml-12">
              <div class="tail-flex">
                <div class="tail-mr-4">
                  <input id="male" v-model="$v.clientInfo.petGender.$model" type="radio" value="male" />
                  <label for="male" class="tail-text-gray-600">Male</label>
                </div>
                <div>
                  <input id="female" v-model="$v.clientInfo.petGender.$model" type="radio" value="female" />
                  <label for="female" class="tail-text-gray-600">Female</label>
                </div>
              </div>
            </div>
          </div>
          <div class="tail-flex tail-gap-5">
            <i
              class="ns-notebook tail-text-3xl tail-text-gray-500"
            ></i>
            <div class="tail-w-full">
              <label for="notes">Notes</label>
              <textarea
                id="notes"
                v-model="clientInfo.notes"
                class="tail-w-full tail-bg-white tail-p-2.5 tail-block sm:tail-text-sm tail-mt-1 tail-border tail-border-gray-300 tail-rounded-md"
                cols="30"
                rows="5"
              >
              Write your message</textarea>
            </div>
          </div>
          <div class="tail-flex tail-justify-end tail-gap-5">
            <button
              type="button"
              style="width: fit-content"
              class="base-button tail-bg-white tail-font-normal tail-text-black tail-border tail-border-gray-300 tail-px-3"
              @click="$emit('close', false)"
            >
              cancel
            </button>
            <button-spinner
              style="width:fit-content"
              :disabled="$v.$invalid"
              :loading="isLoading"
            >
              save &amp; send invite
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
        lastName: '',
        phone: '',
        email: '',
        locationAddress: '',
        city: '',
        locationZip: '',
        petName: '',
        petAge: 2,
        petBreed: '',
        petGender: 'male',
        notes: ''
      }
    }
  },
  validations: {
    clientInfo: {
      firstName: {
        required
      },
      lastName: {
        required
      },
      email: {
        required,
        email
      },
      petName: {
        required
      },
      petAge: {
        required
      },
      petBreed: {
        required
      },
      petGender: {
        required
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
      `${this.clientInfo.firstName} ${this.clientInfo.lastName} has been sent an invite.`
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
.error {
  border: 1px solid red;
}
</style>
