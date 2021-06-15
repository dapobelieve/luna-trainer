<template>
  <div class="tail-grid tail-grid-cols-9" style="height: 90vh">
    <div class="modal tail-h-full tail-col-span-3 tail-hidden lg:tail-block"></div>
    <div class="tail-col-span-9 lg:tail-col-span-6 tail-py-7 tail-px-5 tail-overflow-y-scroll">
      <h2 class="tail-text-3xl tail-mb-3">
        Invite Client
      </h2>
      <div
        class="border tail-border-gray-300 tail-py-2 tail-px-5 tail-rounded-md tail-text-gray-500 tail-flex tail-items-center tail-gap-1"
        style="background: #EFF1F6"
      >
        <i class="ns-time-check"></i>
        <span class=''>Brief information here</span>
      </div>
      <div class="tail-overflow-y-scroll">
        <form
          @submit.prevent="save"
          autocomplete="off"
          class="tail-grid tail-gap-6 tail-mt-5"
        >
          <div class="tail-flex tail-justify-between tail-gap-6">
            <div class="tail-flex tail-gap-5">
              <i class="ns-user tail-mt-1 tail-text-2xl tail-text-gray-500"></i>
              <div class="tail-w-full">
                <label
                  for="first_name"
                  class="block text-sm font-medium text-gray-700"
                  >First name</label
                >
                <input
                  id="first_name"
                  v-model="clientInfo.firstName"
                  type="text"
                  class="tail-bg-white tail-w-full tail-p-2.5 tail-block sm:tail-text-sm tail-mt-1 tail-border tail-border-gray-300 tail-rounded-md"
                />
              </div>

              <div class="tail-w-full">
                <label
                  for="last_name"
                  class="block text-sm font-medium text-gray-700"
                  >Last name</label
                >
                <input
                  id="last_name"
                  v-model="clientInfo.lastName"
                  type="text"
                  class="tail-bg-white tail-w-full tail-p-2.5 tail-block sm:tail-text-sm tail-mt-1 tail-border tail-border-gray-300 tail-rounded-md"
                />
              </div>
            </div>
          </div>
          <div class="tail-flex tail-gap-5">
            <i class="ns-phone tail-mt-1 tail-text-2xl tail-text-gray-500"></i>
            <div class="tail-w-full">
              <label for="phone" class="">Telephone</label>
              <input
                id="phone"
                v-model="clientInfo.phone"
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
              <label for="email" class="">Email Address</label>
              <input
                v-model="clientInfo.email"
                id="email"
                type="email"
                class="tail-w-full tail-bg-white tail-p-2.5 tail-block sm:tail-text-sm tail-mt-1 tail-border tail-border-gray-300 tail-rounded-md"
              />
            </div>
          </div>
          <div class="tail-flex tail-gap-5">
            <i
              class="ns-location-alt tail-mt-1 tail-text-3xl tail-text-gray-500"
            ></i>
            <div class="tail-w-full">
              <label for="address" class="">Address</label>
              <input
                id="address"
                v-model="clientInfo.address"
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
              <label for="postCode" class="">Post Code</label>
              <input
                id="postCode"
                v-model="clientInfo.postCode"
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
                v-model="clientInfo.dogInfo.name"
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
                  >Breed</label
                >
                <input
                  id="breed"
                  v-model="clientInfo.dogInfo.breed"
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
                v-model="clientInfo.dogInfo.age"
                type="text"
                class="tail-bg-white tail-w-full tail-p-2.5 tail-block sm:tail-text-sm tail-mt-1 tail-border tail-border-gray-300 tail-rounded-md"
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
                v-model="clientInfo.notes"
                id="notes"
                class="tail-w-full tail-bg-white tail-p-2.5 tail-block sm:tail-text-sm tail-mt-1 tail-border tail-border-gray-300 tail-rounded-md"
                cols="30"
                rows="5"
              >
                        Write your message</textarea
              >
            </div>
          </div>
          <div class="tail-flex tail-justify-end tail-gap-5">
            <button
              @click="$emit('close', false)"
              type="button"
              style="width: fit-content"
              class="base-button tail-bg-white tail-text-black tail-border tail-border-gray-300 tail-px-3"
            >
              cancel
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
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'InviteNewClient',
  data () {
    return {
      disabled: false,
      clientInfo: {
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        address: '',
        city: '',
        postCode: '',
        dogInfo: {
          name: '',
          breed: '',
          age: ''
        },
        notes: ''
      }
    }
  },
  methods: {
    ...mapActions({
      saveClient: 'mock/addClient'
    }),
    save () {
      this.disabled = true
      this.saveClient(this.clientInfo)
      this.disabled = false
      this.$toast.success(
        `${this.clientInfo.firstName} ${this.clientInfo.lastName} is now your client`
      )
      this.$emit('close', false)
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
</style>
