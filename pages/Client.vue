<template>
  <div>
    <transition name="fadeIn">
      <PageHeader v-if="clientInfo">
        <template v-slot:back-button>
          <button type="button" @click="$router.push({ name: 'Clients' })">
            <img src="~/assets/img/svgs/chevron-back.svg" alt="" srcset="">
          </button>
        </template>
        <template v-slot:avatar>
          <span
            class="tail-rounded-full tail-border-2 tail-border-red-400 tail-p-1 tail-mr-1 tail-ml-4"
          >
            <ClientAvatar
              :firstname="firstName"
              :lastname="lastName"
              :width="1.5"
              :height="1.5"
            />
          </span>
        </template>
        <template v-slot:title>
          <span class="tail-capitalize">
            {{ firstName }} {{ lastName }}
          </span>
        </template>
        <template v-slot:buttons>
          <button
            type="button"
            class="tail-bg-white tail-inline-flex tail-items-center tail-px-2 tail-py-1 tail-border-none tail-text-xs tail-font-medium tail-rounded tail-shadow-sm tail-text-black hover:tail-bg-gray-100 focus:tail-outline-none focus:tail-ring-2 focus:tail-ring-offset-2"
          >
            <img src="~/assets/img/svgs/ellipsis.svg" alt="" srcset="">
          </button>
        </template>
      </PageHeader>
    </transition>
    <div class="tail-relative tail-flex tail-overflow-hidden tail-px-5 tail-py-4" style="height: calc(100vh - 63px)">
      <div class="tail-flex-1 tail-min-w-0 tail-flex tail-flex-col tail-overflow-hidden">
        <main class="tail-flex-1 tail-flex tail-overflow-hidden">
          <div class="tail-flex-1 tail-flex tail-overflow-hidden tail-space-x-6">
            <!-- Static sidebar for desktop viewing -->
            <div class="tail-flex tail-flex-shrink-0 tail-w-1/3">
              <div class="tail-w-full">
                <!-- Sidebar contents-->
                <client-sidbar-content>
                  <template v-slot:petSummary>
                    <div
                      v-if="clientInfo"
                      class="tail-bg-white tail-rounded-lg tail-flex tail-justify-between tail-p-4 tail-mb-3"
                      aria-current="page"
                    >
                      <div>
                        <p>
                          Dog: {{ petName }}
                        </p>
                        <p>
                          Age: {{ petAge }}
                        </p>
                        <p>
                          Breed: {{ petBreed }}
                        </p>
                      </div>
                      <p>
                        2 courses
                      </p>
                    </div>
                    <div v-else class="tail-bg-white tail-rounded-lg tail-grid tail-place-items-center tail-h-24 tail-p-4 tail-mb-3">
                      <SingleLoader />
                    </div>
                  </template>
                </client-sidbar-content>
              </div>
            </div>
            <!-- Main content -->
            <div class="tail-flex-1 tail-bg-white tail-rounded-lg tail-overflow-y-auto" style="height: calc(100vh - 95px)">
              <nuxt-child />
            </div>
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'Client',
  data () {
    return {
      clientInfo: this.$route.params.clientInfo,
      id: this.$route.params.id
    }
  },
  computed: {
    firstName () {
      return (this.clientInfo && this.clientInfo.firstName) || ''
    },
    lastName () {
      return (this.clientInfo && this.clientInfo.lastName) || ''
    },
    petName () {
      return (this.clientInfo && this.clientInfo.pet[0].name) || ''
    },
    petAge () {
      return (this.clientInfo && this.clientInfo.pet[0].age) || ''
    },
    petBreed () {
      return (this.clientInfo && this.clientInfo.pet[0].breed) || ''
    }
  },
  mounted () {
    // const u = this.getSendbirdUser('0003') // get this sendbird user profile
    this.getClientProfile(this.id).then((response) => {
      if (this.clientInfo === undefined) {
        this.clientInfo = response
      }
    }).catch(err => console.log('error fetching client', err))
  },
  methods: {
    ...mapActions({
      getClientProfile: 'client/getSingleClient',
      getSendbirdUser: 'sendBird/getUser'
    })
  }
}
</script>

<style lang="scss" scoped>
.fadeIn-enter-active, .fadeIn-leave-active {
  transition: opacity .5s;
}
.fadeIn-enter, .fadeIn-leave-to {
  opacity: 0;
}
</style>
