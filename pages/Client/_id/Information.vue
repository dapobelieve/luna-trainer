<template>
  <async-view>
    <div v-if="clientInfo" class="py-4 px-8">
      <div class="grid gap-6 text-sm">
        <div class="flex justify-between items-center">
          <h2 class="font-normal text-xl to-gray-700">
            Information
          </h2>
          <div class="flex">
            <button
              :disabled="cancelLoading "
              type="button"
              class="bg-white outline-none mr-2 hover:border hover:border-gray-400 w-100 flex items-center justify-center py-1 h-10 rounded-md w-full px-4 hover:bg-gray-50"
              @click="cancelEditField"
            >
              Cancel
              <SingleLoader v-if="isLoading" class="mr-2" />
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
                <dt class="input-text-label">
                  Telephone
                </dt>
                <dd
                  v-show="!showField('phone')"
                  class="field-value"
                  @click="focusField('phone')"
                >
                  {{ clientInfo.phoneNumber || "N/A" }}
                </dd>
                <AppInput
                  v-show="showField('phone')"
                  v-model="clientInfo.phoneNumber"
                  class-name="input"
                  type="number"
                  @focus="focusField('phone')"
                  @blur="blurField"
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
                  Address
                </dt>
                <dd
                  v-show="!showField('address')"
                  class="field-value"
                  @click="focusField('address')"
                >
                  {{ clientInfo.locationAddress || "N/A" }}
                </dd>
                <AppInput
                  v-show="showField('address')"
                  v-model="clientInfo.locationAddress"
                  class-name="input"
                  type="text"
                  @focus="focusField('address')"
                  @blur="blurField"
                />
              </div>
            </div>
            <div class="sm:col-span-1 flex">
              <div class="ml-10">
                <dt class="input-text-label">
                  City
                </dt>
                <dd
                  v-show="!showField('city')"
                  class="field-value"
                  @click="focusField('city')"
                >
                  {{ clientInfo.locationCity || "N/A" }}
                </dd>
                <AppInput
                  v-show="showField('city')"
                  v-model="clientInfo.locationCity"
                  class-name="input"
                  type="text"
                  @focus="focusField('city')"
                  @blur="blurField"
                />
              </div>
            </div>
            <div class="sm:col-span-1 flex">
              <div class="ml-9">
                <dt class="input-text-label">
                  Post code
                </dt>
                <dd
                  v-show="!showField('zip')"
                  class="field-value"
                  @click="focusField('zip')"
                >
                  {{ clientInfo.locationZip || "N/A" }}
                </dd>
                <AppInput
                  v-show="showField('zip')"
                  v-model="clientInfo.locationZip"
                  class-name="input"
                  type="text"
                  @focus="focusField('zip')"
                  @blur="blurField"
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
                <dt class="input-text-label">
                  Dog name
                </dt>
                <dd
                  v-show="!showField('name')"
                  class="field-value"
                  @click="focusField('name')"
                >
                  {{ clientInfo.pet[0].name || "N/A" }}
                </dd>
                <AppInput
                  v-show="showField('name')"
                  v-model="clientInfo.pet[0].name"
                  class-name="input"
                  type="text"
                  @focus="focusField('name')"
                  @blur="blurField"
                />
              </div>
            </div>

            <div class="sm:col-span-1 ml-10">
              <dt class="input-text-label">
                Breed
              </dt>
              <dd
                v-show="!showField('breed')"
                class="field-value"
                @click="focusField('breed')"
              >
                {{ clientInfo.pet[0].breed || "N/A" }}
              </dd>
              <AppInput
                v-show="showField('breed')"
                v-model="clientInfo.pet[0].breed"
                class-name="input"
                type="text"
                @focus="focusField('breed')"
                @blur="blurField"
              />
            </div>

            <div class="sm:col-span-1 flex">
              <i class="ns-envelope text-2xl invisible"></i>
              <div class="ml-4">
                <dt class="input-text-label">
                  Age
                </dt>
                <dd
                  v-show="!showField('age')"
                  class="field-value"
                  @click="focusField('age')"
                >
                  {{ clientInfo.pet[0].age || "N/A" }} weeks
                </dd>
                <AppInput
                  v-show="showField('age')"
                  v-model="clientInfo.pet[0].age"
                  class-name="input"
                  type="number"
                  @focus="focusField('age')"
                  @blur="blurField"
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
                <dd
                  v-show="!showField('notes')"
                  class="field-value"
                  @click="focusField('notes')"
                >
                  {{ clientInfo.notes || "N/A" }}
                </dd>
                <textarea
                  v-show="showField('notes')"
                  v-model="clientInfo.notes"
                  type="number"
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
      cancelLoading: false,
      clientInfo: null,
      countries,
      id: this.$route.params.id,
      editField: '',
      tempClientInfo: {}
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
        console.log(response)
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
          locationAddress: this.clientInfo.locationAddress,
          locationZip: this.clientInfo.locationZip,
          locationCity: this.clientInfo.locationCity,
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
    cancelEditField () {
      this.cancelLoading = false
      this.clientInfo = this.tempClientInfo
    },
    focusField (name) {
      this.editField = name
    },
    blurField () {
      this.editField = ''
    },
    showField (name) {
      return this.clientInfo[name] === '' || this.editField === name
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
}
textarea {
  overflow: hidden;
}
textarea:focus,
select:focus {
  outline: none;
}
</style>
