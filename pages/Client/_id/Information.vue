<template>
  <async-view>
    <div v-if="clientInfo" class="grid bg-white border rounded-xl w-full">
      <div class="flex items-center p-4 bg-white sticky top-14 rounded-xl">
        <h2 class="text-xl">Information</h2>
        <div class="flex space-x-2 ml-auto">
          <button
            :disabled="cancelLoading "
            type="button"
            class="button-text button-sm"
            @click="cancelEditField"
          >
            Cancel
            <SingleLoader v-if="cancelLoading" class="mr-2" />
          </button>
          <button-spinner
            :loading="isLoading"
            type="button"
            class="button-fill button-sm"
            @click="updateProfile"
          >Save</button-spinner>
        </div>
      </div>
      <div class="grid gap-6 p-4">
        <p class="uppercase tracking-wider font-medium text-xs text-gray-500">Owner</p>
        <div class="flex flex-col items-center">
          <div>
            <ClientAvatar :client-info="clientInfo" :height="5" :width="5" />
          </div>
          <div class="capitalize font-normal flex space-x-2 text-xl mt-2">
            <GwInputField
              v-model="clientInfo.firstName"
              placeholder="First name"
              type="text"
              :align-right="true"
              class="text-xl capitalize text-right"
              @input="focusField"
            />
            <GwInputField
              v-model="clientInfo.lastName"
              placeholder="Last name"
              type="text"
              class="text-xl capitalize"
              @input="focusField"
            />
          </div>
        </div>

        <p class="text-xs text-gray-400 text-center">Click on text to edit</p>
        <dl class="grid gap-6">
          <div class="flex space-x-4 xl:space-x-6">
            <i
              class="p-1 rounded-full text-2xl h-12 w-12 flex items-center justify-center flex-shrink-0 text-gray-500 bg-gray-100 ns-envelope"
            ></i>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 xl:gap-6 w-full">
              <div>
                <GwInputField
                  v-model="clientInfo.phoneNumber"
                  placeholder="Type here"
                  type="tel"
                  label="Telephone"
                  class="mt-1"
                  @input="focusField"
                />
              </div>
              <div class="place-self-auto">
                <dt class="input-text-label">Email</dt>
                <dd class="truncate">{{ clientInfo && clientInfo.email }}</dd>
              </div>
            </div>
          </div>
          <div class="flex space-x-4 xl:space-x-6">
            <i
              class="p-1 rounded-full text-2xl h-12 w-12 flex items-center justify-center flex-shrink-0 text-gray-500 bg-gray-100 ns-location-alt"
            ></i>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 xl:gap-6 w-full">
              <div>
                <dt class="input-text-label">Country</dt>
                <select v-model="clientInfo.location" autocomplete="country" @input="focusField">
                  <option :value="null" selected disabled>click here</option>
                  <option v-for="country in countries" :key="country.numericCode">{{ country.name }}</option>
                </select>
              </div>
              <div class="place-self-auto">
                <GwInputField
                  v-model="clientInfo.city"
                  placeholder="Type here"
                  type="text"
                  label="City"
                  @input="focusField"
                />
              </div>
              <div class>
                <div class>
                  <div>
                    <GwInputField
                      v-model="clientInfo.zip"
                      placeholder="Type here"
                      type="text"
                      label="Post Code"
                      @input="focusField"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </dl>
      </div>
      <!-- dog details -->
      <div class="grid gap-6 p-4">
        <p class="uppercase tracking-wider font-medium text-xs text-gray-500">DOG DETAILS</p>
        <p class="text-xs text-gray-400 text-center">Click on text to edit</p>
        <dl class="flex flex-col space-y-6">
          <div class="flex space-x-4 xl:space-x-6">
            <div
              class="p-1 h-12 w-12 mb-4 rounded-full flex items-center justify-center flex-shrink-0 bg-gray-100"
            >
              <img class="h-5 w-5" src="~/assets/img/svgs/pawn.svg" alt="dog paw" />
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 xl:gap-6 w-full">
              <div>
                <GwInputField
                  v-model="clientInfo.pet[0].name"
                  label="Dog name"
                  placeholder="Type here"
                  type="text"
                  @input="focusField"
                />
              </div>
              <div>
                <GwInputField
                  v-model="clientInfo.pet[0].breed"
                  placeholder="Type here"
                  label="Breed"
                  type="text"
                  @input="focusField"
                />
              </div>
              <div>
                <GwInputField
                  v-model="clientInfo.pet[0].age"
                  placeholder="Type here"
                  type="text"
                  label="Age"
                  @input="focusField"
                />
              </div>
            </div>
          </div>
          <div class="flex flex-grow space-x-4 xl:space-x-6">
            <div
              class="p-1 h-12 w-12 mb-4 rounded-full flex items-center justify-center flex-shrink-0 bg-gray-100"
            >
              <img class="h-5 w-5" src="~/assets/img/svgs/behaviour.svg" alt="dog paw" />
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 xl:gap-6 w-full">
              <div>
                <dt class="input-text-label">Behavioural Problems</dt>
                <dd class="mt-1 text-gray-400">{{ clientInfo && clientInfo.behaviour }}</dd>
              </div>
            </div>
          </div>
          <div class="flex flex-grow space-x-4 xl:space-x-6">
            <div
              class="p-1 h-12 w-12 mb-4 rounded-full flex items-center justify-center flex-shrink-0 bg-gray-100"
            >
              <img class="h-5 w-5" src="~/assets/img/svgs/notes.svg" alt="dog paw" />
            </div>
            <div class="grid gap-6 flex-grow flex-wrap w-full">
              <div>
                <dt class="input-text-label">Owner's Notes</dt>
                <dd class="mt-1 truncate">{{ clientInfo && clientInfo.notes }}</dd>
              </div>
            </div>
          </div>
        </dl>
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
          firstName: this.clientInfo.firstName,
          lastName: this.clientInfo.lastName,
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
            this.$gwtoast.success('Updated profile successfully')
          }
        })
        .catch((err) => {
          this.showButtons = false
          this.isLoading = false
          if (err.response) {
            this.$gwtoast.error(
              `Something went wrong: ${err.response.data.error ||
                err.response.data.message}`,
              { position: 'bottom-right' }
            )
          }
        }).finally(() => {
          this.isLoading = false
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
  @apply border-0 bg-none bg-transparent shadow-none appearance-none focus:outline-none overflow-hidden;
}
</style>
