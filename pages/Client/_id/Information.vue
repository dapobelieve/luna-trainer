<template>
  <async-view>
    <div v-if="clientInfo" class="tail-py-4 tail-px-8">
      <div class="tail-grid tail-gap-6 tail-text-sm">
        <div class="tail-flex tail-justify-between tail-items-center">
          <h2 class="tail-font-normal tail-text-xl tail-to-gray-700">
            Information
            <span
              v-if="clientInfo.status === 'invited'"
              class="tail-rounded-full tail-text-xs tail-bg-indigo-50 tail-text-indigo-500 tail-py-0.5 tail-px-2 tail-ml-2 tail-uppercase"
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
        <h3 class="tail-mb-6 tail-text-gray-500 tail-text-xs tail-font-medium">
          DOG OWNER
        </h3>
        <!-- owner details -->
        <div class="tail-text-gray-700">
          <div class="tail-flex tail-flex-col tail-items-center tail-mb-6">
            <div>
              <ClientAvatar :client-info="clientInfo" :height="5" :width="5" />
            </div>
            <p class="tail-capitalize tail-font-normal tail-text-xl tail-mt-2">
              {{ fullName }}
            </p>
          </div>
          <dl
            class="tail-grid tail-grid-cols-1 tail-gap-x-4 tail-gap-y-6 sm:tail-grid-cols-2"
          >
            <div class="sm:tail-col-span-1 tail-flex">
              <i class="ns-envelope tail-text-2xl tail-text-gray-500"></i>
              <div class="tail-ml-4">
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
              <dd class="tail-mt-1 input-text tail-truncate">
                {{ clientInfo && clientInfo.email }}
              </dd>
            </div>

            <div class="sm:tail-col-span-1 tail-flex">
              <i class="ns-location-alt tail-text-2xl tail-text-gray-500"></i>
              <div class="tail-ml-4">
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
            class="tail-mb-6 tail-text-gray-500 tail-text-xs tail-font-medium tail-mt-3"
          >
            DOG DETAILS
          </h3>
          <dl
            class="tail-grid tail-grid-cols-1 tail-gap-x-4 tail-gap-y-6 sm:tail-grid-cols-2"
          >
            <div class="sm:tail-col-span-1 tail-flex">
              <i class="ns-time-add tail-text-2xl tail-text-gray-500"></i>
              <div class="tail-ml-4">
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

            <div class="sm:tail-col-span-1 tail-flex">
              <i class="ns-envelope tail-text-2xl tail-invisible"></i>
              <div class="tail-ml-4">
                <dt class="input-text-label">
                  Age
                </dt>
                <div class="tail-flex tail-items-center">
                  <input
                    v-model="clientInfo.pet[0].age"
                    type="text"
                    class="input-text tail-w-14 tail-mr-2"
                  />
                  <span>weeks</span>
                </div>
              </div>
            </div>

            <div class="sm:tail-col-span-2 tail-flex">
              <i class="ns-envelope tail-text-2xl tail-text-gray-500"></i>
              <div class="tail-ml-4">
                <dt class="input-text-label">
                  Behavioural Problems
                </dt>
                <dd class="tail-mt-1 input-text tail-truncate">
                  Not Available
                </dd>
              </div>
            </div>

            <div class="sm:tail-col-span-2 tail-flex">
              <i class="ns-notebook tail-text-2xl tail-text-gray-500"></i>
              <div class="tail-ml-4">
                <dt class="input-text-label">
                  Note
                </dt>
                <input v-model="clientInfo.notes" type="text" class="input-text" />
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
      return this.clientInfo ? this.clientInfo.lastName : ''
    },
    fullName () {
      return this.firstName + ' ' + this.lastName
    }
  },
  mounted () {
    this.getClientProfile(this.id)
      .then((response) => {
        this.clientInfo = response
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

<style lang="scss" scoped>
</style>
