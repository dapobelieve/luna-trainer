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
     <modal name="welcome-modal" :height="470" :width="500">
        <div>
          <div class="space"/>
          <div class="grid m-6">
            <div class="py-0 text-justify">
              <div class="text-left mb-5 font-light text-2xl">
                <h3>Welcome to Clients</h3>
              </div>
              <p class="mb-8 w-50 text-justify">
                This is your client relationship management system or CRM.  You can see all your live clients and archived clients, plus easily invite a new client to join you on Luna. 
              </p>
              <div class="flex justify-left gap-5">
                <button class="bg-blue-500 py-2 px-4 text-white" style="width:fit-content" @click="() => {
                   this.tourItems();
                  closeModal()
                  }">
                  Take the tour
                </button>
                 <button class="bg-white-500 py-2 px-4 text-blue-500" style="width:fit-content" @click="() => {
                   closeModal()
                   this.doNotShowHints = true
                   }">
                   Explore by myself
                </button>
              </div>
            </div>
          </div>
        </div>
      </modal>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Clients',
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

    const newUser = (this.$route?.query?.new)
    if (newUser) {
      this.$modal.show('welcome-modal')
    } else {
        this.$lunaToast.show(
          'The all-in-one business software specifically designed and built for dog trainers and behaviourists. We hope you love it. Would you like to take the tour?.',
          {
            position: 'bottom-right',
            timeout: 10000,
            actions: true,
            heading: 'Welcome to Luna',
            confirm: {
              text: 'Get started',
              resolver: () => {
                this.tourItems()
              }
            },
            cancel: {
              text: 'Not Now',
              resolver: async () => {}
            }
          }
        )
    }
  },
  methods: {
    filterInvoice (link) {
      this.filter = link
    },
    inviteClient () {
      this.$modal.show('inviteClientModal')
    },
    closeModal () {
      this.$modal.hide('welcome-modal')
    },
    removeQueryParams() {
      let query = Object.assign({}, this.$route.query);
      delete query.new;
      this.$router.replace({ query });
      window.localStorage.removeItem("client-tour")

    },
    tourItems () {
      if (this.doNotShowHints) return
      const self = this;
      this.$intro()
        .setOptions({
          ...{
            nextLabel: 'Next',
            prevLabel: 'Back',
            skipLabel: '',
            doneLabel: 'Got it!',
            hidePrev: true,
            hideNext: false,
            nextToDone: true,
            tooltipPosition: 'bottom',
            tooltipClass: '',
            highlightClass: '',
            exitOnEsc: true,
            exitOnOverlayClick: true,
            showStepNumbers: false,
            keyboardNavigation: true,
            showButtons: true,
            showBullets: true,
            showProgress: false,
            scrollToElement: true,
            scrollTo: 'element',
            scrollPadding: 30,
            overlayOpacity: 0.5,
            autoPosition: true,
            positionPrecedence: ['bottom', 'top', 'right', 'left'],
            disableInteraction: false,
            helperElementPadding: 5,
            hintPosition: 'top-middle',
            hintAnimation: true,
            buttonClass: 'bg-white rounded px-6 py-1 text-blue-500',
            progressBarAdditionalClass: false
          },
          steps: [
            {
              element: document.querySelector('#plus'),
              intro: 'This is your client CRM system, click here to add a new client' 
            },
            {
              element: document.querySelector('#clientModalInvite'),
              position: "right",
              intro: 'Fill in their details, send them a note, and by clicking send they will be invited to join Luna and our App where you can message, they will receive payment links from you etc.'},
          ]
        })
        .onchange(function(e){
          const button = document.getElementById("plus")
          if (e === button) {
            button.click()
          }
        })
        .oncomplete(function () {
          self.removeQueryParams()
        })
        .onexit(function () {
          self.removeQueryParams()
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

