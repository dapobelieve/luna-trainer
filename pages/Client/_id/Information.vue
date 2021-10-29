<template>
  <async-view>
    <div v-if="clientInfo" class="py-4 px-8">
      <div class="grid gap-6 text-sm">
        <div class="flex justify-between items-center">
          <h2 class="font-normal text-xl to-gray-700">
            Information
          </h2>
          <div v-if="showButtons" class="flex">
            <button
              :disabled="cancelLoading "
              type="button"
              class="bg-white outline-none mr-2 hover:border hover:border-gray-400 w-100 flex items-center justify-center py-1 h-10 rounded-md w-full px-4 hover:bg-gray-50"
              @click="cancelEditField"
            >
              Cancel
              <SingleLoader v-if="cancelLoading" class="mr-2" />
            </button>
            <button-spinner
              :loading="isLoading"
              type="button"
              style="width:fit-content"
              @click="updateProfile"
            >
              Save
            </button-spinner>
          </div>
        </div>
        <h3 class="mb-6 text-gray-500 text-xs font-medium">
          OWNER
        </h3>
        <!-- owner details -->
        <div class="text-gray-700">
          <div class="flex flex-col items-center mb-6">
            <div>
              <ClientAvatar :client-info="clientInfo" :height="5" :width="5" />
            </div>
            <p class="capitalize font-normal text-xl mt-3">
              {{ fullName }}
            </p>
            <small
              class="text-sm text-gray-400 mt-3"
            >Double click on text to edit</small>
          </div>
          <dl class="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
            <div class="sm:col-span-1 flex">
              <i class="ns-phone text-2xl text-gray-500"></i>
              <div class="ml-4">
                <GwInputField
                  v-model="clientInfo.phoneNumber"
                  placeholder="click here"
                  type="tel"
                  label="Telephone"
                  @input="focusField"
                />
              </div>
            </div>

            <div class="sm:col-span-1 flex">
              <i class="ns-envelope text-2xl text-gray-500"></i>
              <div class="ml-4">
                <dt class="input-text-label">
                  Email Address
                </dt>
                <dd class="mt-1 truncate">
                  {{ clientInfo && clientInfo.email }}
                </dd>
              </div>
            </div>

            <div class="sm:col-span-1 flex">
              <i class="ns-location-alt text-2xl text-gray-500"></i>
              <div class="ml-4">
                <dt class="input-text-label">
                  Location
                </dt>
                <select
                  v-model="clientInfo.location"
                  autocomplete="country"
                  @input="focusField"
                >
                  <option value="" disabled selected hidden>
                    click here
                  </option>
                  <option
                    v-for="country in countries"
                    :key="country.numericCode"
                  >
                    {{ country.name }}
                  </option>
                </select>
              </div>
            </div>
            <div class="sm:col-span-1 flex">
              <div class="ml-10">
                <GwInputField
                  v-model="clientInfo.city"
                  placeholder="click here"
                  type="text"
                  label="City"
                  @input="focusField"
                />
              </div>
            </div>
            <div class="sm:col-span-1 flex">
              <div class="ml-10">
                <GwInputField
                  v-model="clientInfo.zip"
                  placeholder="click here"
                  type="text"
                  label="Post Code"
                  @input="focusField"
                />
              </div>
            </div>
          </dl>
        </div>
        <!-- dog details -->
        <div>
          <h3 class="mb-6 text-gray-500 text-xs font-medium mt-3">
            DOG DETAILS
          </h3>
          <dl class="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
            <div class="sm:col-span-1 flex">
              <i class="ns-time-add text-2xl text-gray-500"></i>
              <div class="ml-4">
                <GwInputField
                  v-model="clientInfo.pet[0].name"
                  label="Dog name"
                  placeholder="click here"
                  type="text"
                  @input="focusField"
                />
              </div>
            </div>

            <div class="sm:col-span-1 ml-10">
              <GwInputField
                v-model="clientInfo.pet[0].breed"
                placeholder="click here"
                label="Breed"
                type="text"
                @input="focusField"
              />
            </div>

            <div class="sm:col-span-1 flex">
              <i class="ns-envelope text-2xl invisible"></i>
              <div class="ml-4">
                <GwInputField
                  v-model="clientInfo.pet[0].age"
                  placeholder="click here"
                  type="text"
                  label="Age"
                  @input="focusField"
                />
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
                <textarea
                  v-model="clientInfo.notes"
                  placeholder="click here"
                  type="text"
                  @input="focusField"
                ></textarea>
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
      cancelLoading: false,
      clientInfo: null,
      countries,
      id: this.$route.params.id,
      editField: '',
      tempClientInfo: {},
      showButtons: false
    }
  },
  computed: {
    firstName () {
      return this.clientInfo ? this.clientInfo.firstName : ''
    },
    lastName () {
      return this.clientInfo && this.clientInfo.lastName !== undefined
        ? this.clientInfo.lastName
        : ''
    },
    fullName () {
      return this.firstName + ' ' + this.lastName
    }
  },
  mounted () {
    this.getClientProfile(this.id)
      .then((response) => {
        if (!response.pet.length) {
          this.clientInfo = {
            ...response,
            pet: [{ name: '', age: '', breed: '' }]
          }
        } else {
          this.clientInfo = response
        }
        this.tempClientInfo = { ...this.clientInfo }
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
          zip: this.clientInfo.zip,
          city: this.clientInfo.city,
          phoneNumber: this.clientInfo.phoneNumber,
          pet: [{
            name: this.clientInfo.pet[0].name,
            age: this.clientInfo.pet[0].age,
            breed: this.clientInfo.pet[0].breed
          }],
          notes: this.clientInfo.notes
        }
      })
        .then((response) => {
          this.showButtons = false
          if (response.status === 'success') {
            this.clientInfo = response.data
            this.isLoading = false
            this.$toast.success('Updated profile successfully')
          }
        })
        .catch((err) => {
          this.showButtons = false
          this.isLoading = false
          if (err.response) {
            this.$toast.error(
              `Something went wrong: ${err.response.data.error ||
                err.response.data.message}`,
              { position: 'bottom-right' }
            )
          }
        })
    },
    cancelEditField () {
      this.cancelLoading = false
      this.clientInfo = this.tempClientInfo
      this.showButtons = false
    },
    focusField () {
      this.showButtons = true
    }
  }
}
</script>

<style lang="scss" scoped>
textarea,
select {
  border: none;
  background-image: none;
  background-color: transparent;
  -webkit-box-shadow: none;
  -moz-box-shadow: none;
  box-shadow: none;
  appearance: none;
}
textarea {
  overflow: hidden;
}
textarea:focus,
select:focus {
  outline: none;
}
</style>
