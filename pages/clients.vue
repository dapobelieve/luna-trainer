<template>
  <div>
    <PageHeader v-if="$route.name !== 'Clients-id-Messages'">
      <template v-slot:title>
        Clients
      </template>
      <template v-slot:buttons>
        <button class="flex items-center mr-2">
          <i class="fi-rr-download text-[#3B82F6] mt-1"></i>
          <span class="mx-2 text-[#3B82F6]">Export</span>
        </button>
        <button type="button" class="button-fill" @click="inviteClient">
          Invite Client
        </button>
      </template>
    </PageHeader>
    <div class="w-full flex justify-center p-4">
      <div class="max-w-xl md:max-w-4xl 2xl:max-w-7xl lg:max-w-full w-full">
        <div class="mb-4 overflow-x-auto">
          <div class="w-72 flex">
            <div v-for="(status, statusIndex) in statuses" :key="statusIndex" role="presentation" class="flex items-center justify-center">
              <a class="px-4 cursor-pointer relative" style="min-width: 56px" @click="filterByStatus(status)">
                <div class="pt-4 pb-4 relative flex justify-center items-center">
                  <span class="select-none">{{ status | capitalize }}</span>
                  <div v-show="statusHasRoute === status || (status === 'all' && !statusHasRoute )" class="indicator absolute bottom-0 h-[4px] bg-blue-500"></div>
                </div>
              </a>
            </div>
          </div>
        </div>
        <LunaTable
          v-if="clients.data"
          check-able
          :loading="loading"
          :total-pages="clients && clients.size"
          :table-data="computedClients"
          :headings="headings"
          @item-clicked=""
        >
          <template v-slot:tableRows="{rowData, setActiveItem, activeRow: optionOpen}">
            <td>
              <div class="flex justify-start ml-5 items-center">
                <ClientAvatar class="mr-4" :width="2.5" :height="2.5" :client-info="{firstName: rowData.firstName, imgUrl: rowData.imgURL}" />
                <div class="text-sm text-slate-700 font-medium">
                  {{ rowData.firstName }}
                  {{ rowData.lastName }}
                </div>
              </div>
            </td>
            <td>
              <div class="justify-start text-sm text-slate-700 font-medium ml-5 flex">
                {{ rowData.email }}
              </div>
            </td>
            <td>
              <div class="justify-start ml-5 flex">
                <ClientStatusComponent :status="rowData.status" />
              </div>
            </td>
            <td>
              <div class="justify-start ml-5 flex">
                {{ formatDate(rowData.createdAt, 'MMM d, h:m b') }}
              </div>
            </td>
            <td class="w-1/12">
              <div v-if="clientActionLoading && activeId == rowData._id" class="flex justify-center">
                <SingleLoader />
              </div>
              <button v-else type="button" @click.stop="setActiveItem(rowData._id), activeId = rowData._id">
                <img src="~/assets/img/svgs/ellipsis.svg" alt="" />
              </button>
              <ClickOutside :do="() => { setActiveItem('') }">
                <div
                  v-show="optionOpen == rowData._id"
                  class="top-[1] absolute right-[33px] w-40 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-[500]"
                >
                  <div class="py-2 flex flex-col" role="none">
                    <template v-if="rowData.status === 'accepted'">
                      <button type="button" class="dropdown-button" @click="$router.push({ name: 'payments-request' })" @click.stop="">
                        Payment Request
                      </button>
                      <button type="button" class="dropdown-button" @click="$router.push({name: 'schedule'})" @click.stop="">
                        Create Session
                      </button>
                      <button type="button" class="dropdown-button" @click.stop="archiveClient(rowData), setActiveItem('')">
                        Archive
                      </button>
                      <button
                        type="button"
                        class="dropdown-button"
                        @click="$router.push({ name: 'client-id-messages', params: { id: rowData._id }
                        })"
                        @click.stop=""
                      >
                        Message
                      </button>
                    </template>
                    <template v-if="rowData.status === 'invited'">
                      <button type="button" class="dropdown-button" @click="revoke(rowData), setActiveItem('')">
                        Delete
                      </button>
                      <button type="button" class="dropdown-button" @click="resendInvite(rowData._id), setActiveItem('')">
                        Resend Invite
                      </button>
                    </template>
                    <template v-if="rowData.status === 'archived'">
                      <button
                        type="button"
                        class="dropdown-button"
                        @click="$router.push({ name: 'client-id-messages', params: { id: rowData._id }
                        })"
                        @click.stop=""
                      >
                        Restore
                      </button>
                    </template>
                  </div>
                </div>
              </ClickOutside>
            </td>
          </template>
        </LunaTable>
      </div>
    </div>
    <ClientWelcomeModal
      :exit-tour="() => {
        closeModal()
        doNotShowHints = true
      }"
      :take-tour="() => {
        tourItems();
        closeModal()
      }"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { format } from 'date-fns'
import ClientWelcomeModal from '~/components/modals/ClientWelcomeModal.vue'
import { clientTourSteps } from '~/tour/ClientTourSteps'
import LunaTable from '~/components/table/LunaTable'
import ClientStatusComponent from '~/components/ClientStatusComponent'
import ClickOutside from '~/components/util/ClickOutside'
import SingleLoader from '~/components/util/SingleLoader'
export default {
  name: 'Clients',
  components: { SingleLoader, ClickOutside, ClientStatusComponent, ClientWelcomeModal, LunaTable },
  provide () {
    return {
      filterTypes: this.filterTypes
    }
  },
  data () {
    return {
      loading: false,
      activeId: '',
      clientActionLoading: false,
      headings: [
        {
          text: 'Clients',
          value: '',
          sortable: false
        },
        {
          text: 'Email',
          value: 'total',
          sortable: false
        },
        {
          text: 'Status',
          value: 'status',
          sortable: true
        },
        {
          text: 'Invited',
          value: 'createdAt',
          sortable: true
        },
        {
          text: '',
          value: ''
        }
      ],
      statuses: ['all', 'accepted', 'pending', 'archived'],
      openModal: false,
      filterTypes: [
        'date-range'
      ]
    }
  },
  head () {
    return {
      title: 'Clients'
    }
  },
  watch: {
    '$route.query': {
      deep: true,
      immediate: true,
      async handler () {
        await this.$fetch()
      }
    }
  },
  computed: {
    statusHasRoute () {
      return this.$route.query.status
    },
    ...mapGetters({
      clients: 'client/getAllClients2'
    }),
    computedClients () {
      return this.clients.data
    }
  },
  mounted () {
    const client = window.localStorage.getItem('client-tour')
    if (client) {
      this.$router?.push({ query: { new: true } })
    }
  },
  updated () {
    const newUser = (this.$route?.query?.new)
    if (newUser) {
      this.$modal.show('welcome-modal')
    }
  },
  methods: {
    async resendInvite (id) {
      try {
        this.clientActionLoading = true
        const res = await this.$store.dispatch('client/resendClientInvite', id)
        this.$lunaToast.success('Invite Resent')
      } catch (e) {
        console.log(error)
      } finally {
        this.clientActionLoading = false
      }
    },
    async revoke (client) {
      try {
        this.clientActionLoading = true
        await this.$store.dispatch('client/revoke', client)
        this.$lunaToast.success('Link Revoked')
      } catch (e) {
        console.log(error)
      } finally {
        this.clientActionLoading = false
      }
    },
    async archiveClient (client) {
      try {
        this.clientActionLoading = true
        const res = await this.$store.dispatch('client/archive', client)
        this.$lunaToast.success('Client Archived')
      } catch (e) {
        console.log(error)
      } finally {
        this.clientActionLoading = false
      }
    },
    filterByStatus (status) {
      this.$router.push({
        name: this.$route.name,
        query: {
          ...this.$route.query,
          status
        }
      })
    },
    formatDate (date, formatStr) {
      return format(new Date(date), formatStr)
    },
    ...mapActions({
      fetchAllClients: 'client/fetchClients'
    }),
    filterInvoice (link) {
      this.filter = link
    },
    inviteClient () {
      this.$modal.show('invite-client')
    },
    closeModal () {
      this.$modal.hide('welcome-modal')
      this.removeQueryParams()
    },
    removeQueryParams () {
      const query = Object.assign({}, this.$route.query)
      delete query.new
      this.$router.replace({ query })
      window.localStorage.removeItem('client-tour')
    },
    tourItems () {
      if (this.doNotShowHints) { return }
      clientTourSteps(this.$intro())
        .onchange((e) => {
          const button = document.getElementById('plus')
          if (e === button) {
            button.click()
          }
        })
        .onexit(() => {
          const skip = document.getElementById('skip')
          skip?.classList?.add('opacity-0')
          this.removeQueryParams()
        })
        .start()

      const skip = document.getElementById('skip')
      skip?.classList?.remove('opacity-0')
      this.$intro().showHints()
    }
  },
  async fetch () {
    try {
      this.loading = true
      let status
      if (this.$route.query.status === 'pending') {
        status = 'invited'
      } else if (this.$route.query.status === 'all') {
        status = undefined
      } else {
        status = this.$route.query.status
      }
      await this.fetchAllClients({
        ...this.$route.query,
        status
      })
    } catch (e) {

    } finally {
      this.loading = false
    }
  }
}
</script>
<style>
@import '../assets/css/introtheme.css';
/* .introjs-prevbutton {
 height: 0%;
 opacity: 0;
} */
</style>
<style lang="scss" scoped>
.indicator {
  height: 4px;
  align-self: center;
  display: inline-flex;
  position: absolute;
  bottom: 0;
  min-width: 35px;
  width: 100%;
  border-radius: 9999px;
}

.space{
  width: 100%;
  height: 200px;
  background: rgba(59, 130, 246, 0.05);
}
</style>
