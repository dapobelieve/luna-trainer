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
                  :class="{ error: $v.clientInfo.firstName.$error }"
                  @click="$v.clientInfo.firstName.$touch()"
                />
                <!-- <div v-if="$v.clientInfo.firstName.$error" class="tail-mt-2">
                  <small v-if="!$v.clientInfo.firstName.required" class="tail-text-red-500">
                    Field is required.
                  </small>
                </div> -->
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
                  :class="{ error: $v.clientInfo.lastName.$error }"
                  @click="$v.clientInfo.lastName.$touch()"
                />
                <!-- <div v-if="$v.clientInfo.lastName.$error" class="tail-mt-2">
                  <small v-if="!$v.clientInfo.lastName.required" class="tail-text-red-500">
                    Field is required.
                  </small>
                </div> -->
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
                :class="{ error: $v.clientInfo.phone.$error }"
                @click="$v.clientInfo.phone.$touch()"
              />
              <div v-if="$v.clientInfo.phone.$error" class="tail-mt-1">
                <!-- <small v-if="!$v.clientInfo.phone.required" class="tail-text-red-500">
                  Field is required.
                </small> -->
                <small v-if="!$v.clientInfo.phone.numeric" class="tail-text-red-500">
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
                :class="{ error: $v.clientInfo.email.$error }"
                @click="$v.clientInfo.email.$touch()"
              />
              <div v-if="$v.clientInfo.email.$error" class="tail-mt-1">
                <!-- <small v-if="!$v.clientInfo.email.required" class="tail-text-red-500">
                  Field is required.
                </small> -->
                <small v-if="!$v.clientInfo.email.email" class="tail-text-red-500">
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
              <label for="city" class="">Town/City</label>
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
              <label for="locationZip" class="">Post Code</label>
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
              <label for="dogName" class="">Dog's name</label>
              <input
                id="dogName"
                v-model.trim="$v.clientInfo.petName.$model"
                type="tel"
                class="tail-w-full tail-bg-white tail-p-2.5 tail-block sm:tail-text-sm tail-mt-1 tail-border tail-border-gray-300 tail-rounded-md"
                :class="{ error: $v.clientInfo.petName.$error }"
                @click="$v.clientInfo.petName.$touch()"
              />
              <!-- <div v-if="$v.clientInfo.petName.$error" class="tail-mt-2">
                <small v-if="!$v.clientInfo.petName.required" class="error tail-text-red-500">
                  Field is required.
                </small>
              </div> -->
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
                  :class="{ error: $v.clientInfo.petBreed.$error }"
                  @click="$v.clientInfo.petBreed.$touch()"
                />
                <!-- <div v-if="$v.clientInfo.petBreed.$error" class="tail-mt-2">
                  <small v-if="!$v.clientInfo.petBreed.required" class="error tail-text-red-500">
                    Field is required.
                  </small>
                </div> -->
              </div>
              <div class="tail-w-full">
                <label for="experience" class="">Age</label>
                <select
                  id="experience"
                  v-model="clientInfo.petAge"
                  type="text"
                  class="tail-w-full tail-bg-white tail-p-2.5 tail-block sm:tail-text-sm tail-mt-1 tail-border tail-border-gray-300 tail-rounded-md"
                >
                  <option
                    v-for="val in clientInfo.petAge"
                    :key="val"
                    :value="parseInt(val) + 1"
                  >
                    {{ parseInt(val) + 1 }}
                  </option>
                </select>
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
            <template
              v-if="clientInfo.petBreed === ''"
            >
              <button
                :disabled="disabled"
                style="width: fit-content"
                type="submit"
                class="dull-button base-button tail-px-3"
              >
                <SingleLoader v-if="isLoading" class="tail-mr-2" />
                save &amp; send invite
              </button>
            </template>

            <template
              v-else
            >
              <button
                :disabled="disabled"
                style="width: fit-content"
                class="base-button tail-px-3"
              >
                save &amp; send invite
              </button>
            </template>
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
        petAge: Array.from(Array(13).keys()),
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
  computed: {
    disabled () {
      for (const key in this.clientInfo) {
        // eslint-disable-next-line curly
        if (this.clientInfo[key] === '')
          return true
      }
      return false
    }
    // isActive () {
    //   if (this.clientInfo.firstName && this.clientInfo.lastName &&
    //   this.clientInfo.petGender && this.clientInfo.notes &&
    //   this.clientInfo.phone && this.clientInfo.email &&
    //   this.clientInfo.locationAddress && this.clientInfo.city &&
    //   this.clientInfo.locationZip && this.clientInfo.petName &&
    //   this.clientInfo.petAge && this.clientInfo.petBreed === '') {
    //     return true
    //   } else {
    //     return false
    //   }
    // }
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

.dull-button {
  background-color: gray !important;
}
input:focus {
    outline: none;
  }

.error {
  border: 1px solid red;
}
.disabled {
  background-color: grey;
}
</style>
