<template>
  <div>
    <PageHeader v-if="$route.name !== 'Clients-id-Messages'">
      <template v-slot:title>
        Clients
      </template>
      <template v-slot:buttons>
        <button type="button" id="plus" class="button-fill w-10" @click="inviteClient">
          <i class="fi-rr-plus h-5"></i>
        </button>
      </template>
    </PageHeader>
    <div class="flex justify-center p-4 max-w-full md:max-w-4xl lg:max-w-full 2xl:max-w-7xl mx-auto">
      <gw-pagination class="contain-default-pages" :visible="Boolean(size)" :total-items="size">
        <template v-slot:content="{ pageNumber }">
          <GwClients :status="filter" :page-number="pageNumber" />
        </template>
      </gw-pagination>
    </div>
     <ClientWelcomeModal
        :exitTour="() => {
          closeModal()
          this.doNotShowHints = true
        }"
        :takeTour="() => {
          this.tourItems();
          closeModal()
        }" 
      />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ClientWelcomeModal from '~/components/modals/ClientWelcomeModal.vue'
import {clientTourSteps} from '~/tour/ClientTourSteps'
export default {
  name: 'Clients',
  components: {ClientWelcomeModal},
  data () {
    return {
      clients: false,
      openModal: false,
      filter: 'all'
    }
  },
  head () {
    return {
      title: 'Clients'
    }
  },
  computed: {
    ...mapGetters({
      size: 'client/clientsCount'
    })
  },
  mounted() {
    const client = window.localStorage.getItem("client-tour")
    if (client) {
      this.$router?.push({query: {new: true}})
    }
  },
  updated() {
    const newUser = (this.$route?.query?.new)
    if (newUser) {
      this.$modal.show('welcome-modal')
    }
  },
  methods: {
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
    removeQueryParams() {
      let query = Object.assign({}, this.$route.query);
      delete query.new;
      this.$router.replace({ query });
      window.localStorage.removeItem("client-tour")

    },
    tourItems () {
      if (this.doNotShowHints) return
      clientTourSteps(this.$intro())
        .onchange(e => {
          const button = document.getElementById("plus")
          if (e === button) {
            button.click()
          }
        })
        .oncomplete(() => {
          this.removeQueryParams()
        })
        .onexit(() => {
          this.removeQueryParams()
        })
        .start()

      this.$intro().showHints()
    },
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
.space{
  width: 100%;
  height: 200px;
  background: rgba(59, 130, 246, 0.05);
}
</style>

