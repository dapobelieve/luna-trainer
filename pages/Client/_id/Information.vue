<template>
  <async-view>
    <div v-if="clientInfo" class="py-4 px-8">
      <div class="grid gap-6 text-sm">
        <div class="flex justify-between items-center">
          <h2 class="font-normal text-xl to-gray-700">
            Information
          </h2>
          <div>
            <button-spinner
              :loading="isLoading"
              type="button"
              style="width:fit-content"
              @click="updateProfile"
            >
              Cancel
            </button-spinner>
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
            <p class="capitalize font-normal text-xl mt-2">
              {{ fullName }}
            </p>
            <small class="text-xs text-gray-400 mt-2">click on text to edit</small>
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
                <dd v-show="!showField('phone')" class="field-value" @click="focusField('phone')">
                  {{ clientInfo.phoneNumber || 'N/A' }}
                </dd>
                <input
                  v-show="showField('phone')"
                  v-model="clientInfo.phoneNumber"
                  type="text"
                  class="input-text"
                  @focus="focusField('phone')"
                  @blur="blurField"
                >
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
                <dd v-show="!showField('location')" class="field-value" @click="focusField('location')">
                  {{ clientInfo.location || 'N/A' }}
                </dd>
                <select
                  v-show="showField('location')"
                  v-model="clientInfo.location"
                  autocomplete="country"
                  class="input-text"
                  @focus="focusField('location')"
                  @blur="blurField"
                >
                  <option
                    v-for="country in countries"
                    :key="country.numericCode"
                  >
                    {{ country.name }}
                  </option>
                </select>
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
                <dd v-show="!showField('name')" class="field-value" @click="focusField('name')">
                  {{ clientInfo.pet[0].name || 'N/A' }}
                </dd>
                <input
                  v-show="showField('name')"
                  v-model="clientInfo.pet[0].name"
                  type="text"
                  class="input-text"
                  @focus="focusField('name')"
                  @blur="blurField"
                >
              </div>
            </div>

            <div class="sm:col-span-1">
              <dt class="input-text-label">
                Breed
              </dt>
              <dd v-show="!showField('breed')" class="field-value" @click="focusField('breed')">
                {{ clientInfo.pet[0].breed || 'N/A' }}
              </dd>
              <input
                v-show="showField('breed')"
                v-model="clientInfo.pet[0].breed"
                type="text"
                class="input-text"
                @focus="focusField('breed')"
                @blur="blurField"
              >
            </div>

            <div class="sm:col-span-1 flex">
              <i class="ns-envelope text-2xl invisible"></i>
              <div class="ml-4">
                <dt class="input-text-label">
                  Age
                </dt>
                <dd v-show="!showField('age')" class="field-value" @click="focusField('age')">
                  {{ clientInfo.pet[0].age || 'N/A' }} weeks
                </dd>
                <input
                  v-show="showField('age')"
                  v-model="clientInfo.pet[0].age"
                  type="number"
                  class="input-text"
                  @focus="focusField('age')"
                  @blur="blurField"
                >
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
                <dd v-show="!showField('notes')" class="field-value" @click="focusField('notes')">
                  {{ clientInfo.notes || 'N/A' }} weeks
                </dd>
                <textarea
                  v-show="showField('notes')"
                  v-model="clientInfo.notes"
                  type="number"
                  class="input-text"
                  @focus="focusField('notes')"
                  @blur="blurField"
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
      clientInfo: null,
      countries,
      id: this.$route.params.id,
      editField: ''
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
    },
    focusField (name) {
      this.editField = name
    },
    blurField () {
      this.editField = ''
    },
    showField (name) {
      return (this.clientInfo[name] === '' || this.editField === name)
    }
  }
}
</script>

<style lang="scss" scoped></style>
