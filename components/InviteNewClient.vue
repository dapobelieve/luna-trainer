<template>
  <div class="tail-grid">
    <div class="tail-py-7 tail-px-7 tail-overflow-y-scroll">
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
                  :class="{ invalid: $v.clientInfo.firstName.$error}"
                />
                <div v-if="$v.clientInfo.firstName.$error">
                  <small v-if="!$v.clientInfo.firstName.required" class="error tail-text-red-500">
                    Field is required.
                  </small>
                </div>
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
                  :class="{ invalid: $v.clientInfo.lastName.$error}"
                />
                <div v-if="$v.clientInfo.lastName.$error">
                  <small v-if="!$v.clientInfo.lastName.required" class="error tail-text-red-500">
                    Field is required.
                  </small>
                </div>
              </div>
            </div>
          </div>
          <div class="tail-flex tail-gap-5">
            <i class="ns-phone tail-mt-1 tail-text-2xl tail-text-gray-500"></i>
            <div class="tail-w-full">
              <label for="phone" class="">Telephone</label>
              <input
                id="phone"
                v-model.trim="$v.clientInfo.phone.$model"
                type="tel"
                class="tail-w-full tail-bg-white tail-p-2.5 tail-block sm:tail-text-sm tail-mt-1 tail-border tail-border-gray-300 tail-rounded-md"
                :class="{ invalid: $v.clientInfo.phone.$error}"
              />
              <div v-if="$v.clientInfo.phone.$error">
                <small v-if="!$v.clientInfo.phone.required" class="error tail-text-red-500">
                  Field is required.
                </small>
                <small v-if="!$v.clientInfo.phone.numeric" class="error tail-text-red-500">
                  Must be Numbers.
                </small>
              </div>
            </div>
          </div>
          <div class="tail-flex tail-gap-5">
            <i
              class="ns-envelope tail-mt-1 tail-text-2xl tail-text-gray-500"
            ></i>
            <div class="tail-w-full">
              <label for="email" class="">Email Address</label>
              <input
                id="email"
                v-model.trim="$v.clientInfo.email.$model"
                type="email"
                class="tail-w-full tail-bg-white tail-p-2.5 tail-block sm:tail-text-sm tail-mt-1 tail-border tail-border-gray-300 tail-rounded-md"
                :class="{ invalid: $v.clientInfo.email.$error}"
              />
              <div v-if="$v.clientInfo.email.$error">
                <small v-if="!$v.clientInfo.email.required" class="error tail-text-red-500">
                  Field is required.
                </small>
                <small v-if="!$v.clientInfo.email.email" class="error tail-text-red-500">
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
              <label for="locationAddress" class="">Address</label>
              <input
                id="locationAddress"
                v-model.trim="$v.clientInfo.locationAddress.$model"
                type="tel"
                class="tail-w-full tail-bg-white tail-p-2.5 tail-block sm:tail-text-sm tail-mt-1 tail-border tail-border-gray-300 tail-rounded-md"
                :class="{ invalid: $v.clientInfo.locationAddress.$error}"
              />
              <div v-if="$v.clientInfo.locationAddress.$error">
                <small v-if="!$v.clientInfo.locationAddress.required" class="error tail-text-red-500">
                  Field is required.
                </small>
              </div>
            </div>
          </div>
          <div class="tail-flex tail-gap-5">
            <i
              class="ns-location-alt tail-invisible tail-text-3xl tail-text-gray-500"
            ></i>
            <div class="tail-w-full">
              <label for="city" class="">Town/City</label>
              <input
                id="city"
                v-model.trim="$v.clientInfo.city.$model"
                type="tel"
                class="tail-w-full tail-bg-white tail-p-2.5 tail-block sm:tail-text-sm tail-mt-1 tail-border tail-border-gray-300 tail-rounded-md"
                :class="{ invalid: $v.clientInfo.city.$error}"
              />
              <div v-if="$v.clientInfo.city.$error">
                <small v-if="!$v.clientInfo.city.required" class="error tail-text-red-500">
                  Field is required.
                </small>
              </div>
            </div>
          </div>
          <div class="tail-flex tail-gap-5">
            <i
              class="ns-location-alt tail-invisible tail-text-3xl tail-text-gray-500"
            ></i>
            <div class="tail-w-full">
              <label for="locationZip" class="">Post Code</label>
              <input
                id="locationZip"
                v-model.trim="$v.clientInfo.locationZip.$model"
                type="tel"
                class="tail-w-full tail-bg-white tail-p-2.5 tail-block sm:tail-text-sm tail-mt-1 tail-border tail-border-gray-300 tail-rounded-md"
                :class="{ invalid: $v.clientInfo.locationZip.$error}"
              />
              <div v-if="$v.clientInfo.locationZip.$error">
                <small v-if="!$v.clientInfo.locationZip.required" class="error tail-text-red-500">
                  Field is required.
                </small>
              </div>
            </div>
          </div>
          <div class="tail-flex tail-gap-5">
            <i
              class="ns-location-alt tail-text-3xl tail-text-gray-500"
            ></i>
            <div class="tail-w-full">
              <label for="dogName" class="">Dog's name</label>
              <input
                id="dogName"
                v-model.trim="$v.clientInfo.petName.$model"
                type="tel"
                class="tail-w-full tail-bg-white tail-p-2.5 tail-block sm:tail-text-sm tail-mt-1 tail-border tail-border-gray-300 tail-rounded-md"
                :class="{ invalid: $v.clientInfo.petName.$error}"
              />
              <div v-if="$v.clientInfo.petName.$error">
                <small v-if="!$v.clientInfo.petName.required" class="error tail-text-red-500">
                  Field is required.
                </small>
              </div>
            </div>
          </div>
          <div class="tail-flex tail-justify-between tail-gap-6">
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
                  :class="{ invalid: $v.clientInfo.petBreed.$error}"
                />
                <div v-if="$v.clientInfo.petBreed.$error">
                  <small v-if="!$v.clientInfo.petBreed.required" class="error tail-text-red-500">
                    Field is required.
                  </small>
                </div>
              </div>
              <div class="tail-w-full">
                <label
                  for="age"
                  class="block text-sm font-medium text-gray-700"
                >Age</label>
                <input
                  id="age"
                  v-model.trim="$v.clientInfo.petAge.$model"
                  type="text"
                  class="tail-bg-white tail-w-full tail-p-2.5 tail-block sm:tail-text-sm tail-mt-1 tail-border tail-border-gray-300 tail-rounded-md"
                  :class="{ invalid: $v.clientInfo.petAge.$error}"
                />
                <div v-if="$v.clientInfo.petAge.$error">
                  <small v-if="!$v.clientInfo.petAge.required" class="error tail-text-red-500">
                    Field is required.
                  </small>
                </div>
              </div>
            </div>
          </div>
          <!-- <div class="tail-flex tail-gap-5">
            <i
              class="ns-school tail-mt-1 tail-text-3xl tail-text-gray-500"
            ></i>
            <div class="tail-w-full">
              <label for="dogName" class="">Class</label>
              <input
                id="dogName"
                v-model.trim="$v.clientInfo.class.$model"
                type="tel"
                class="tail-w-full tail-bg-white tail-p-2.5 tail-block sm:tail-text-sm tail-mt-1 tail-border tail-border-gray-300 tail-rounded-md"
                :class="{ invalid: $v.clientInfo.class.$error}"
              />
              <div v-if="$v.clientInfo.class.$error">
                <small v-if="!$v.clientInfo.class.required" class="error tail-text-red-500">
                  Field is required.
                </small>
              </div>
            </div>
          </div> -->
          <div class="tail-flex tail-gap-5">
            <i
              class="ns-notebook tail-text-3xl tail-text-gray-500"
            ></i>
            <div class="tail-w-full">
              <label for="notes" class="">Notes</label>
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
            <button
              :disabled="disabled"
              style="width: fit-content"
              type="submit"
              class="base-button tail-px-3"
            >
              <SingleLoader v-if="isLoading" class="tail-mr-2" />
              save &amp; send invite
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { required, numeric, email } from 'vuelidate/lib/validators'

export default {
  name: 'InviteNewClient',
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
        petAge: '',
        petBreed: '',
        petGender: 'female',
        // class: '',
        notes: '',
        domain: 'getwelp-trainer-ui'
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
      phone: {
        required,
        numeric
      },
      email: {
        required,
        email
      },
      locationAddress: {
        required
      },
      city: {
        required
      },
      locationZip: {
        required
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
      // class: {
      //   required
      // }
    }
  },
  computed: {
    disabled () {
      for (const key in this.clientInfo) {
        // eslint-disable-next-line curly
        if (this.clientInfo[key] === '')
          return true
      }
      return false
    }
  },
  methods: {
    ...mapActions({
      fetchAllClientsConcise: 'client/fetchAllClientsConcise',
      saveClient: 'client/inviteClient'
    }),
    save () {
      if (!this.disabled) {
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
          this.fetchAllClientsConcise()
        })
      }
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
</style>
