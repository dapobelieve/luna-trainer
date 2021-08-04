<template>
  <div class="tail-flex tail-justify-center tail-items-center" style="height: 90vh">
    <div class="tail-grid tail-grid-cols-12">
      <div class="">
        <h2 class="tail-text-3xl tail-mb-3">
          Invite Client
        </h2>
        <div
          class="border tail-border-gray-300 tail-py-2 tail-px-5 tail-rounded-md tail-text-gray-500 tail-flex tail-items-center tail-gap-1"
          style="background: #EFF1F6"
        >
          <i class="ns-time-check"></i>
          <span class="">Brief information here</span>
        </div>
        <div class="tail-overflow-y-scroll">
          <form
            autocomplete="off"
            class="tail-grid tail-gap-6 tail-mt-5"
            @submit.prevent="save"
          >
            <div class="tail-flex tail-justify-between tail-gap-6">
              <div class="tail-flex tail-gap-5">
                <i class="ns-user tail-mt-1 tail-text-2xl tail-text-gray-500"></i>
                <div class="tail-w-full">
                  <label
                    for="first_name"
                    class="block text-sm font-medium text-gray-700"
                  >First name</label>
                  <input
                    id="first_name"
                    v-model.trim="clientInfo.firstName"
                    type="text"
                    class="tail-bg-white tail-w-full tail-p-2.5 tail-block sm:tail-text-sm tail-mt-1 tail-border tail-border-gray-300 tail-rounded-md"
                  />
                  <div v-if="!$v.clientInfo.firstName.required" class="error tail-text-gray-500 tail-text-sm">
                    Field is required.
                  </div>
                </div>

                <div class="tail-w-full">
                  <label
                    for="last_name"
                    class="block text-sm font-medium text-gray-700"
                  >Last name</label>
                  <input
                    id="last_name"
                    v-model.trim="clientInfo.lastName"
                    type="text"
                    class="tail-bg-white tail-w-full tail-p-2.5 tail-block sm:tail-text-sm tail-mt-1 tail-border tail-border-gray-300 tail-rounded-md"
                  />
                  <div v-if="!$v.clientInfo.lastName.required" class="error tail-text-gray-500 tail-text-sm">
                    Field is required.
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
                  v-model.trim="clientInfo.phone"
                  type="tel"
                  class="tail-w-full tail-bg-white tail-p-2.5 tail-block sm:tail-text-sm tail-mt-1 tail-border tail-border-gray-300 tail-rounded-md"
                />
                <div v-if="!$v.clientInfo.phone.required" class="error tail-text-gray-500 tail-text-sm">
                  Field is required.
                </div>
                <div v-if="!$v.clientInfo.phone.numeric" class="error tail-text-gray-500 tail-text-sm">
                  Must be Numbers.
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
                  v-model.trim="clientInfo.email"
                  type="email"
                  class="tail-w-full tail-bg-white tail-p-2.5 tail-block sm:tail-text-sm tail-mt-1 tail-border tail-border-gray-300 tail-rounded-md"
                />
                <div v-if="!$v.clientInfo.email.required" class="error tail-text-gray-500 tail-text-sm">
                  Field is required.
                </div>
                <div v-if="!$v.clientInfo.email.email" class="error tail-text-gray-500 tail-text-sm">
                  Must be valid email.
                </div>
              </div>
            </div>
            <div class="tail-flex tail-gap-5">
              <i
                class="ns-location-alt tail-mt-1 tail-text-3xl tail-text-gray-500"
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
                class="ns-location-alt tail-invisible tail-mt-1 tail-text-3xl tail-text-gray-500"
              ></i>
              <div class="tail-w-full">
                <label for="city" class="">Town/City</label>
                <input
                  id="city"
                  v-model="clientInfo.city"
                  type="tel"
                  class="tail-w-full tail-bg-white tail-p-2.5 tail-block sm:tail-text-sm tail-mt-1 tail-border tail-border-gray-300 tail-rounded-md"
                />
              </div>
            </div>
            <div class="tail-flex tail-gap-5">
              <i
                class="ns-location-alt tail-invisible tail-mt-1 tail-text-3xl tail-text-gray-500"
              ></i>
              <div class="tail-w-full">
                <label for="locationZip" class="">Post Code</label>
                <input
                  id="locationZip"
                  v-model="clientInfo.locationZip"
                  type="tel"
                  class="tail-w-full tail-bg-white tail-p-2.5 tail-block sm:tail-text-sm tail-mt-1 tail-border tail-border-gray-300 tail-rounded-md"
                />
              </div>
            </div>
            <div class="tail-flex tail-gap-5">
              <i
                class="ns-location-alt tail-invisible tail-mt-1 tail-text-3xl tail-text-gray-500"
              ></i>
              <div class="tail-w-full">
                <label for="dogName" class="">Dog's name</label>
                <input
                  id="dogName"
                  v-model="clientInfo.petName"
                  type="tel"
                  class="tail-w-full tail-bg-white tail-p-2.5 tail-block sm:tail-text-sm tail-mt-1 tail-border tail-border-gray-300 tail-rounded-md"
                />
              </div>
            </div>
            <div class="tail-flex tail-justify-between tail-gap-6">
              <div class="tail-flex tail-gap-5">
                <i
                  class="ns-user tail-invisible tail-mt-1 tail-text-2xl tail-text-gray-500"
                ></i>
                <div class="tail-w-full">
                  <label
                    for="breed"
                    class="block text-sm font-medium text-gray-700"
                  >Breed</label>
                  <input
                    id="breed"
                    v-model="clientInfo.petBreed"
                    type="text"
                    class="tail-bg-white tail-w-full tail-p-2.5 tail-block sm:tail-text-sm tail-mt-1 tail-border tail-border-gray-300 tail-rounded-md"
                  />
                </div>
              </div>

              <div class="tail-w-full">
                <label
                  for="age"
                  class="block text-sm font-medium text-gray-700"
                >Age</label>
                <input
                  id="age"
                  v-model="clientInfo.petAge"
                  type="text"
                  class="tail-bg-white tail-w-full tail-p-2.5 tail-block sm:tail-text-sm tail-mt-1 tail-border tail-border-gray-300 tail-rounded-md"
                />
              </div>
            </div>
            <div class="tail-flex tail-gap-5">
              <i
                class="ns-location-alt tail-invisible tail-mt-1 tail-text-3xl tail-text-gray-500"
              ></i>
              <div class="tail-w-full">
                <label for="dogName" class="">Class</label>
                <input
                  id="dogName"
                  v-model="clientInfo.class"
                  type="tel"
                  class="tail-w-full tail-bg-white tail-p-2.5 tail-block sm:tail-text-sm tail-mt-1 tail-border tail-border-gray-300 tail-rounded-md"
                />
              </div>
            </div>
            <div class="tail-flex tail-gap-5">
              <i
                class="ns-notebook tail-mt-1 tail-text-3xl tail-text-gray-500"
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
                class="base-button tail-bg-white tail-text-black tail-border tail-border-gray-300 tail-px-3"
                @click="$emit('close', false)"
              >
                cancel
              </button>
              <button
                type="button"
                style="width: fit-content"
                class="base-button tail-bg-white tail-text-black tail-border tail-border-gray-300 tail-px-3"
              >
                save
              </button>
              <button
                :disabled="disabled"
                style="width: fit-content"
                type="submit"
                class="base-button tail-px-3"
              >
                save &amp; send invite
              </button>
            </div>
          </form>
        </div>
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
        class: '',
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
  },
  methods: {
    ...mapActions({
      saveClient: 'client/inviteClient'
    }),
    save () {
      if (!this.disabled) {
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
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.modal {
  background-image: url("~assets/img/Base.png");
  object-fit: cover;
  background-repeat: no-repeat;
}

::-webkit-scrollbar {
    width: 0;  /* Remove scrollbar space */
    background: transparent;  /* Optional: just make scrollbar invisible */
}
/* Optional: show position indicator in red */
::-webkit-scrollbar-thumb {
    background: #FF0000;
}
</style>
