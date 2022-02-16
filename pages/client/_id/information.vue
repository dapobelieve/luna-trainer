<template>
  <async-view>
    <div v-if="clientInfo" class="grid pb-4 bg-white border rounded-xl w-full min-h-screen">
      <form>
        <div class="bg-white sticky top-14 rounded-xl" style="z-index: 1">
          <h2 class="text-xl py-4 px-3.5">
            Information
          </h2>
          <div v-if="showButtons" class="sm:absolute right-4 flex space-x-2 justify-end mr-4">
            <button
              :disabled="cancelLoading"
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

          <section class="">
            <ul
              class="tabs flex justify-between md:justify-start md:space-x-[2rem] px-3.5 border-b border-gray-200"
            >
              <button
                v-for="(link, index) in links"
                :key="link.index"
                :class="[{ active: tab === index + 1 }, 'capitalize py-2.5 px-3']"
                @click.prevent="switchTabs(index + 1)"
              >
                {{ link }}
              </button>
            </ul>
            <!-- Tab contents -->
            <div class="my-6 mx-4">
              <client-information v-if="tab === 1" v-model="clientInfo" @showButtons="showButtons = true" />
              <client-dog-information v-if="tab === 2" v-model="clientInfo" @showButtons="showButtons = true" />
              <div v-if="tab === 3">
                <client-health-information v-if="tab === 3" v-model="clientInfo" @showButtons="showButtons = true" />
              </div>
            </div>
          </section>
        </div>
      </form>
    </div>
  </async-view>
</template>

<script>
import 'vue2-datepicker/index.css'
import { mapActions } from 'vuex'
export default {
  name: 'Information',
  data () {
    return {
      hasAnyInputChanged: false,
      isLoading: false,
      cancelLoading: false,
      clientInfo: null,
      id: this.$route.params.id,
      tempClientInfo: {},
      showButtons: false,
      tab: 1,
      links: ['client', 'dog', 'health']
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
          pet: [
            {
              name: this.clientInfo.pet[0].name,
              age: this.clientInfo.pet[0].age,
              breed: this.clientInfo.pet[0].breed
            }
          ],
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
        })
        .finally(() => {
          this.isLoading = false
        })
    },
    cancelEditField () {
      this.cancelLoading = false
      this.clientInfo = this.tempClientInfo
      this.showButtons = false
    },
    switchTabs (tabNumber) {
      this.tab = tabNumber
    }
  }
}
</script>

<style lang="scss" scoped>
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
    content: "";
    @apply bg-blue-500 h-1 w-full rounded-sm shadow-md absolute -bottom-0.5;
  }
}

</style>
