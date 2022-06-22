<template>
  <AsyncView>
    <div
      v-if="clientInfo"
      class="grid border rounded-xl w-full overflow-y-auto information"
    >
      <form>
        <div class="bg-white sticky top-14 min-h-full rounded-xl flex flex-col" style="z-index: 1">
          <h2 class="text-xl py-4 px-3.5">
            Information
          </h2>
          <div
            v-if="showButtons"
            class="absolute right-4 top-4 flex space-x-2 justify-end"
          >
            <button
              :disabled="cancelLoading"
              type="button"
              class="button-text button-sm"
              @click="cancelEditField"
            >
              Cancel
              <SingleLoader v-if="cancelLoading" class="mr-2" />
            </button>
            <ButtonSpinner
              :loading="isLoading"
              type="button"
              class="button-fill button-sm"
              @click="updateProfile"
            >
              Save
            </ButtonSpinner>
          </div>

          <TabbedItems :links="links">
            <template v-slot:tabviews="{ tab }">
              <ClientInformation
                v-if="tab === 1"
                v-model="clientInfo"
                @showButtons="showButtons = true"
              />
              <ClientDogInformation
                v-if="tab === 2"
                v-model="clientInfo"
                @showButtons="showButtons = true"
              />
              <ClientHealthInformation v-if="tab === 3" />
            </template>
          </TabbedItems>
        </div>
      </form>
    </div>
  </AsyncView>
</template>

<script>
import { mapActions } from 'vuex'
import dogBreeds from '~/dogBreeds.json'
import countries from '~/countries.json'

export default {
  name: 'Information',
  data () {
    return {
      hasAnyInputChanged: false,
      isLoading: false,
      cancelLoading: false,
      countries,
      clientInfo: null,
      id: this.$route.params.id,
      showButtons: false,
      links: [{ link: 'Client' }, { link: 'Dog' }, { link: 'Health' }],
      gender: [{ name: 'male' }, { name: 'female' }],
      dogBreeds: dogBreeds.sort((a, b) => {
        return a?.name > b?.name ? 1 : -1
      }).map(i => ({ ...i, name: this.format(i.name), value: this.format(i.name) }))
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
    this.getProfile(this.id)
      .then((response) => {
        response.businessCountry = this.countries.find((i) => {
          return i?.code === response.businessCountry
        })
        response.pet[0].fixing = {
          date: new Date(response.pet[0]?.fixing?.date ?? Date.now()),
          value: response.pet[0]?.fixing?.value
        }
        response.pet[0].gender = this.gender.find((i) => {
          return i?.name === response.pet[0].gender
        })
        response.pet[0].breed = this.dogBreeds.find((i) => {
          return i?.name === response.pet[0].breed
        })
        if (!response.pet.length) {
          this.clientInfo = {
            ...response,
            pet: [{ name: '', age: '' }]
          }
        } else {
          this.clientInfo = response
        }
      })
      .catch(err => console.log('error fetching client', err))
  },
  methods: {
    ...mapActions('client', {
      getProfile: 'getSingleClientById',
      updateClient: 'updateClientProfile'
    }),
    updateProfile () {
      this.isLoading = true

      return this.updateClient({
        id: this.clientInfo._id,
        info: {
          firstName: this.clientInfo.firstName,
          lastName: this.clientInfo.lastName,
          businessCountry: this.clientInfo.businessCountry?.code ?? '',
          location: this.clientInfo.location,
          zip: this.clientInfo.zip,
          city: this.clientInfo.city,
          phoneNumber: this.clientInfo.phoneNumber,
          pet: [
            {
              name: this.clientInfo.pet[0].name,
              age: this.clientInfo.pet[0].age,
              breed: this.clientInfo.pet[0].breed?.name,
              gender: this.clientInfo.pet[0].gender?.name,
              fixing: {
                date: this.clientInfo.pet[0]?.fixing?.date,
                value: this.clientInfo.pet[0]?.fixing?.value
              }
            }
          ],
          notes: this.clientInfo.notes,
          behaviouralIssues: this.clientInfo.behaviouralIssues
        }
      })
        .then((response) => {
          this.showButtons = false
          if (response.status === 'success') {
            this.clientInfo = response.data
            this.isLoading = false
            this.$lunaToast.success('Updated profile successfully')
          }
        })
        .catch((err) => {
          this.showButtons = false
          this.isLoading = false
          if (err.response) {
            this.$lunaToast.error(
              `${
                err.response.data.error || err.response.data.message
              }`,
              { position: 'bottom-right' }
            )
          }
        })
        .finally(() => {
          this.isLoading = false
        })
    },
    format (str) {
      return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
    },
    cancelEditField () {
      this.cancelLoading = false
      this.showButtons = false
    }
  }
}
</script>

<style lang="scss" scoped>
.information {
  height: calc(100vh - 90px)
}
@media only screen and (max-width: 768px) {
  .information {
    height: calc(100vh - 160px);
  }
}
textarea,
select {
  @apply border-0 bg-none bg-transparent shadow-none appearance-none focus:outline-none overflow-hidden;
}

.information_box {
  height: 2.5rem;
  border: 1px solid #e2e8f0;
  padding: 7px 12px;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.05);
  border-radius: 6px;
}

.information_text-area {
  height: 6rem;
  border: 1px solid #e2e8f0;
  padding: 7px 12px;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.05);
  border-radius: 6px;
}

.tabs {
  @apply text-base font-normal text-gray-500;
}

.tabs button {
  transition: 0.3s;
  position: relative;
}
.tabs button.active {
  @apply text-gray-700;
  &::after {
    content: '';
    @apply bg-blue-500 h-1 w-full rounded-sm shadow-md absolute -bottom-0.5;
  }
}
</style>
