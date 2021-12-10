<template>
  <async-view>
    <div v-if="clientInfo" class="grid bg-white border rounded-xl w-full p-2">
      <form>
        <div class="flex items-center p-4 bg-white sticky top-14 rounded-xl" style="z-index: 1">
          <h2 class="text-xl">
            Information
          </h2>
          <div v-if="showButtons" class="flex space-x-2 ml-auto">
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
            >
              Save
            </button-spinner>
          </div>
        </div>
        <div class="grid gap-6 p-4">
          <div class="h-40 bg-blue-50 rounded-xl mb-6">
            <div class="mt-6 flex flex-col items-center ">
              <ClientAvatar :client-info="clientInfo" :height="5" :width="5" />
              <div class="flex space-x-2 mt-2">
                <GwInputField
                  v-model="clientInfo.firstName"
                  placeholder="First name"
                  type="text"
                  autocomplete="text"
                  :align-right="true"
                  class="text-xl capitalize text-right"
                  @input="focusField"
                />
                <GwInputField
                  v-model="clientInfo.lastName"
                  placeholder="Last name"
                  autocomplete="text"
                  type="text"
                  class="text-xl capitalize"
                  @input="focusField"
                />
              </div>
            </div>
          </div>
          <!-- Personal Information -->
          <div>
            <p class="uppercase tracking-wider font-medium text-xs text-gray-500">
              Personal Information
            </p>
            <div>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 xl:gap-6 w-full mt-6">
                <div>
                  <PhoneComponent v-model="clientInfo.phoneNumber" label="Telephone" @input="focusField" />
                </div>
                <div class="place-self-auto mt-1">
                  <dt class="input-text-label">
                    Email Address
                  </dt>
                  <dd class="truncate information_box">
                    {{ clientInfo && clientInfo.email }}
                  </dd>
                </div>
              </div>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 xl:gap-6 w-full mt-6">
                <div class="w-full">
                  <dt class="input-text-label">
                    Country
                  </dt>
                  <div class="information_box">
                    <select v-model="clientInfo.location" autocomplete="country" @input="focusField">
                      <option :value="null" selected disabled>
                        click here
                      </option>
                      <option v-for="country in countries" :key="country.numericCode">
                        {{ country.name }}
                      </option>
                    </select>
                  </div>
                </div>
                <div>
                  <GwInputField
                    v-model="clientInfo.city"
                    placeholder="Type here"
                    type="text"
                    label="City"
                    autocomplete="text"
                    class-name="information_box"
                    class="w-full"
                    @input="focusField"
                  />
                </div>
              </div>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 xl:gap-6 w-full mt-6">
                <div>
                  <GwInputField
                    v-model="clientInfo.zip"
                    placeholder="Type here"
                    type="text"
                    autocomplete="text"
                    label="Post Code/ Zip Code"
                    class-name="information_box"
                    @input="focusField"
                  />
                </div>
              </div>
            </div>
          </div>

          <!-- Dog Details -->
          <div class="mt-6">
            <p class="uppercase tracking-wider font-medium text-xs text-gray-500">
              Dog Details
            </p>
            <div>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 xl:gap-6 w-full mt-6">
                <div>
                  <GwInputField
                    v-model="clientInfo.pet[0].name"
                    label="Dog name"
                    placeholder="Type here"
                    type="text"
                    autocomplete="text"
                    class-name="information_box"
                    @input="focusField"
                  />
                </div>
                <div>
                  <GwInputField
                    v-model="clientInfo.pet[0].breed"
                    placeholder="Type here"
                    label="Breed"
                    type="text"
                    autocomplete="text"
                    class-name="information_box"
                    @input="focusField"
                  />
                </div>
              </div>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 xl:gap-6 w-full mt-6"> 
               <div>
                <label for="age" class="input-text-label text-gray-700 block">Age</label>
                  <date-picker
                    v-model="petAge"
                    style="width: 100% !important"
                    class="w-full relative"
                    :disabled-date="date => date > new Date()"
                    format="DD-MMM-YYYY"
                    @change="focusField"
                  ></date-picker>
                <small v-if="clientInfo.pet[0].age" class="text-xs"><span class="capitalize">{{ clientInfo.pet[0].name ? clientInfo.pet[0].name : 'Your dog' }}</span> is about {{ showDate }}</small>  
             </div>
                <div>
                  <dt class="input-text-label">
                    Behavioural Problems
                  </dt>
                  <dd class="information_box text-gray-400">
                    {{ clientInfo && clientInfo.behaviour }}
                  </dd>
                </div>
              </div>
              <div class="grid grid-cols-1 gap-4 xl:gap-6 w-full mt-6">
                <div>
                  <dt class="input-text-label">
                    Owner's Notes
                  </dt>
                  <dd class="information_text-area truncate">
                    {{ clientInfo && clientInfo.notes }}
                  </dd>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  </async-view>
</template>

<script>
import DatePicker from 'vue2-datepicker'
import 'vue2-datepicker/index.css'
import { mapActions } from 'vuex'
import countries from '~/countries.json'
export default {
  name: 'Information',
  components: { DatePicker },
  data () {
    return {
      hasAnyInputChanged: false,
      isLoading: false,
      cancelLoading: false,
      clientInfo: null,
      countries,
      id: this.$route.params.id,
      tempClientInfo: {},
      showButtons: false,
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
    },
    petAge: {
      set (value) {
        return this.clientInfo.pet[0].age = value
      },
      get () {
        return new Date(this.clientInfo.pet[0].age)
      }
    },
    showDate(){
      let month, years, week
      const userDate = new Date(this.clientInfo.pet[0].age)
      const currentDate = new Date()
      const days =  Math.floor((Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()) - Date.UTC(userDate.getFullYear(), userDate.getMonth(), userDate.getDate()) ) /(1000 * 60 * 60 * 24))
      const weeks = Math.floor(days / 7)
      const months = Math.floor(weeks / 4) 
      const calcWeeks = weeks % 4
      const calcYears = months > 12 ? Math.floor(months / 12) : 0
      const calcMonths = this.calcYears >= 1 ? months % 12 : months

      return `${calcWeeks} week(s), ${calcMonths} month(s) and ${calcYears} years(s)`
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
.information_box{
    height: 2.5rem;
    border: 1px solid #E2E8F0;
    padding: 7px 12px;
    box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.05);
    border-radius: 6px;
  }
  .information_text-area{
    height: 6rem;
    border: 1px solid #E2E8F0;
    padding: 7px 12px;
    box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.05);
    border-radius: 6px;
  }
</style>
