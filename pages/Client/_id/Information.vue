<template>
  <async-view>
    <div v-if="clientInfo" class="py-4 px-8">
      <div class="grid gap-6 text-sm">
        <div class="flex justify-between items-center">
          <h2 class="font-normal text-xl to-gray-700">
            Information
            <span
              v-if="clientInfo.status === 'invited'"
              class="rounded-full text-xs bg-indigo-50 text-indigo-500 py-0.5 px-2 ml-2 uppercase"
            >pending</span>
          </h2>
          <button-spinner
            :loading="isLoading"
            type="button"
            style="width:fit-content"
            @click="updateProfile"
          >
            Update profile
          </button-spinner>
        </div>
        <h3 class="mb-6 text-gray-500 text-xs font-medium">
          DOG OWNER
        </h3>
        <!-- owner details -->
        <div class="text-gray-700">
          <div class="flex flex-col items-center mb-6">
            <div>
              <ClientAvatar :client-info="clientInfo" :height="5" :width="5" />
            </div>
            <p class="capitalize font-normal text-xl mt-2">
              {{ fullName }}
            </p>
          </div>
          <dl
            class="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2"
          >
            <div class="sm:col-span-1 flex">
              <i class="ns-envelope text-2xl text-gray-500"></i>
              <div class="ml-4">
                <dt class="input-text-label">
                  Telephone
                </dt>
                <input
                  v-model="clientInfo.phoneNumber"
                  type="number"
                  class="input-text"
                />
              </div>
            </div>

            <div class="sm:col-span-1">
              <dt class="input-text-label">
                Email
              </dt>
              <dd class="mt-1 truncate">
                {{ clientInfo && clientInfo.email }}
              </dd>
            </div>

            <div class="sm:col-span-1 flex">
              <i class="ns-location-alt text-2xl text-gray-500"></i>
              <div class="ml-4">
                <dt class="input-text-label">
                  Location
                </dt>
                <dd class="">
                  <select
                    v-model="clientInfo.location"
                    autocomplete="country"
                    class="input-text"
                  >
                    <option
                      v-for="country in countries"
                      :key="country.numericCode"
                    >
                      {{ country.name }}
                    </option>
                  </select>
                </dd>
              </div>
            </div>
          </dl>
        </div>
        <!-- dog details -->
        <div>
          <h3
            class="mb-6 text-gray-500 text-xs font-medium mt-3"
          >
            DOG DETAILS
          </h3>
          <dl
            class="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2"
          >
            <div class="sm:col-span-1 flex">
              <i class="ns-time-add text-2xl text-gray-500"></i>
              <div class="ml-4">
                <dt class="input-text-label">
                  Dog name
                </dt>
                <input
                  v-model="clientInfo.pet[0].name"
                  type="text"
                  class="input-text"
                />
              </div>
            </div>

            <div class="sm:col-span-1">
              <dt class="input-text-label">
                Breed
              </dt>
              <input
                v-model="clientInfo.pet[0].breed"
                type="text"
                class="input-text"
              />
            </div>

            <div class="sm:col-span-1 flex">
              <i class="ns-envelope text-2xl invisible"></i>
              <div class="ml-4">
                <dt class="input-text-label">
                  Age
                </dt>
                <div class="flex items-center">
                  <input
                    v-model="clientInfo.pet[0].age"
                    type="text"
                    class="input-text w-14 mr-2"
                  />
                  <span>weeks</span>
                </div>
              </div>
            </div>

            <div class="sm:col-span-2 flex">
              <i class="ns-envelope text-2xl text-gray-500"></i>
              <div class="ml-4">
                <dt class="input-text-label">
                  Behavioural Problems
                </dt>
                <dd class="mt-1 truncate">
                  Not Available
                </dd>
              </div>
            </div>

            <div class="sm:col-span-2 flex">
              <i class="ns-notebook text-2xl text-gray-500"></i>
              <div class="ml-4">
                <dt class="input-text-label">
                  Note
                </dt>
                <input
                  v-model="clientInfo.notes"
                  type="text"
                  class="input-text"
                />
              </div>
            </div>
          </dl>
        </div>
      </div>
    </div>
  </async-view>
</template>

<script>
import { mapActions } from 'vuex'
import countries from '~/countries.json'
export default {
  name: 'Information',
  data () {
    return {
      hasAnyInputChanged: false,
      isLoading: false,
      clientInfo: null,
      countries,
      id: this.$route.params.id
    }
  },
  computed: {
    firstName () {
      return this.clientInfo ? this.clientInfo.firstName : ''
    },
    lastName () {
      return this.clientInfo && this.clientInfo.lastName !== undefined ? this.clientInfo.lastName : ''
    },
    fullName () {
      return this.firstName + ' ' + this.lastName
    }
  },
  mounted () {
    this.getClientProfile(this.id)
      .then((response) => {
        if (!response.pet.length) {
          this.clientInfo = { ...response, pet: [{ name: '', age: '', breed: '' }] }
        } else {
          this.clientInfo = response
        }
      })
      .catch(err => console.log('error fetching client', err))
  },
  methods: {
    ...mapActions('client', {
      getClientProfile: 'getSingleClientById',
      updateClient: 'updateClientProfile'
    }),
    updateProfile () {
      this.isLoading = true
      return this.updateClient({
        id: this.clientInfo._id,
        info: {
          location: this.clientInfo.location,
          phoneNumber: this.clientInfo.phoneNumber,
          petName: this.clientInfo.pet[0].name,
          petAge: this.clientInfo.pet[0].age,
          petBreed: this.clientInfo.pet[0].breed
        }
      })
        .then((response) => {
          if (response.status === 'success') {
            this.clientInfo = response.data
            this.isLoading = false
            this.$toast.success('Updated profile successfully')
          }
        })
        .catch((err) => {
          this.isLoading = false
          if (err.response) {
            this.$toast.error(
              `Something went wrong: ${err.response.data.error ||
                err.response.data.message}`,
              { position: 'bottom-right' }
            )
          }
        })
    }
  }
}
</script>

<style lang="scss" scoped></style>
