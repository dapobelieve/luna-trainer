<template>
  <async-view>
    <div v-if="clientInfo">
      <div class="grid bg-white border rounded-xl w-full">
        <div class="flex justify-between items-center p-4 pb-2">
          <h2 class="text-xl">
            Information
          </h2>
          <button-spinner
            :loading="isLoading"
            type="button"
            style="width:fit-content"
            class="button-sm"
            @click="updateProfile"
          >Update profile</button-spinner>
        </div>
        <!-- owner details -->
        <div class="flex flex-col space-y-6 p-4">
          <p class="uppercase tracking-wider font-medium text-xs text-gray-500">Owner</p>
          <div class="flex flex-col items-center">
            <div>
              <ClientAvatar :client-info="clientInfo" :height="5" :width="5" />
            </div>
            <p class="capitalize font-normal text-xl mt-2">{{ fullName }}</p>
          </div>
          <p class="text-xs text-gray-400 text-center">Double click on text to edit</p>
          <dl class="flex flex-col space-y-6">
            <div class="flex space-x-4 xl:space-x-6">
              <i
                class="p-1 rounded-full text-2xl h-12 w-12 flex items-center justify-center flex-shrink-0 text-gray-500 bg-gray-100 ns-envelope"
              ></i>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 xl:gap-6 w-full">
                <div>
                  <dt class="input-text-label">Telephone</dt>
                  <dd class="mt-1 truncate">{{ clientInfo && clientInfo.phoneNumber }}</dd>
                </div>
                <div class="place-self-auto">
                  <dt class="input-text-label">Email</dt>
                  <dd class="mt-1 truncate">{{ clientInfo && clientInfo.email }}</dd>
                </div>
              </div>
            </div>

            <div class="flex space-x-4 xl:space-x-6">
              <i
                class="p-1 rounded-full text-2xl h-12 w-12 flex items-center justify-center flex-shrink-0 text-gray-500 bg-gray-100 ns-location-alt"
              ></i>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 xl:gap-6 w-full">
                <div>
                  <dt class="input-text-label">Location</dt>
                  <dd class="mt-1 truncate">{{ clientInfo && clientInfo.location }}</dd>
                </div>
                <div>
                  <dt class="input-text-label">City</dt>
                  <dd class="mt-1 truncate">{{ clientInfo && clientInfo.city }}</dd>
                </div>
              </div>
            </div>
          </dl>
        </div>
        <!-- dog details -->
        <div class="flex flex-col space-y-6 p-4">
          <p class="uppercase tracking-wider font-medium text-xs text-gray-500">DOG DETAILS</p>
          <p class="text-xs text-gray-400 text-center">Double click on text to edit</p>
          <dl class="flex flex-col space-y-6">
            <div class="flex space-x-4 xl:space-x-6">
              <i
                class="p-1 rounded-full text-2xl h-12 w-12 flex items-center justify-center flex-shrink-0 text-gray-500 bg-gray-100 ns-time-add"
              ></i>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 xl:gap-6 w-full">
                <div>
                  <dt class="input-text-label">Dog name</dt>
                  <dd class="mt-1 truncate">{{ clientInfo && clientInfo.pet[0].name }}</dd>
                </div>
                <div>
                  <dt class="input-text-label">Breed</dt>
                  <dd class="mt-1 truncate">{{ clientInfo && clientInfo.pet[0].breed }}</dd>
                </div>
                <div>
                  <dt class="input-text-label">Age</dt>
                  <dd class="mt-1 truncate">{{ clientInfo && clientInfo.pet[0].age }}</dd>
                </div>
              </div>
            </div>
            <div class="flex flex-grow space-x-4 xl:space-x-6">
              <i
                class="p-1 rounded-full text-2xl h-12 w-12 flex items-center justify-center flex-shrink-0 text-gray-500 bg-gray-100 ns-time-add"
              ></i>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 xl:gap-6 w-full">
                <div>
                  <dt class="input-text-label">Behavioural Problems</dt>
                  <dd class="mt-1 text-gray-400">Not Available</dd>
                </div>
              </div>
            </div>
            <div class="flex flex-grow space-x-4 xl:space-x-6">
              <i
                class="p-1 rounded-full text-2xl h-12 w-12 flex items-center justify-center flex-shrink-0 text-gray-500 bg-gray-100 ns-time-add"
              ></i>
              <div class="grid gap-6 flex-grow flex-wrap w-full">
                <div>
                  <dt class="input-text-label">Note</dt>
                  <dd class="mt-1 truncate">{{ clientInfo && clientInfo.notes }}</dd>
                </div>
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
