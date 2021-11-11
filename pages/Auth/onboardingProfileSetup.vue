<template>
  <async-view loader-id="logout">
    <div
      class="flex flex-col lg:flex-row justify-center mx-auto lg:justify-start max-w-xl lg:max-w-full px-4 lg:px-0 min-h-screen"
    >
      <div
        class="flex flex-col bg-none lg:bg-white lg:h-screen lg:max-w-[26rem] 2xl:max-w-md w-full lg:p-10 gap-20 lg:border-r lg:sticky top-0"
      >
        <circle-step-navigation
          class="flex items-center h-16 lg:h-auto"
          :step-count="step"
          :disabled="[profile, trainerProfile, addedServices, firstClient]"
          @stepper="move($event)"
        />

        <div class="hidden lg:block flex-grow">
          <template v-if="'type' in pageIntro[step]">
            <h1 class="text-3xl">
              {{ pageIntro[step].title }}
            </h1>
            <p
              class="xl:text-lg mt-10 text-gray-500"
              v-html="pageIntro[step].subTitle"
            ></p>
          </template>
          <template v-else>
            <h1 class="text-3xl">
              {{ pageIntro[step].title }}
            </h1>
            <p class="xl:text-lg mt-10 text-gray-500">
              {{ pageIntro[step].subTitle }}
            </p>
          </template>
        </div>
        <!-- end of bigger screen view -->
      </div>

      <div
        class="lg:flex flex-col xl:flex-row flex-grow mt-4 lg:mt-0"
      >
        <div
          class="flex flex-col items-center lg:p-10 flex-grow lg:overflow-y-auto"
        >
          <div
            class="flex flex-col gap-6 lg:max-w-lg 2xl:max-w-xl w-full h-full"
          >
            <div class="flex-grow">
              <div>
                <template v-if="step === 0">
                  <onboarding-profile @validity="profile.isDisabled = $event" />
                </template>
                <template v-else-if="step === 1">
                  <onboarding-trainer-profile
                    @validity="trainerProfile.isDisabled = $event"
                  />
                </template>
                <template v-else-if="step === 2">
                  <onboarding-services
                    :selected-service-index="selectedServiceProps"
                    @clearSelectedServiceIndex="selectedServiceProps = $event"
                    @validity="allow($event)"
                  />
                </template>
                <template v-else-if="step === 3">
                  <onboarding-clients @validity="firstClient.isDisabled" />
                </template>
              </div>
              <!-- Service items for mobile screen -->
              <template v-if="step === 2">
                <div class="xl:hidden py-6">
                  <onboarding-service-cards
                    @editservice="selectedServiceProps = $event"
                  />
                </div>
              </template>
            </div>
            <div
              class="flex items-center justify-end gap-2"
            >
              <button
                class="text-blue-500 mr-auto"
                :class="{'hidden' : step !== 3 }"
                @click.prevent="saveProfile"
              >
                Skip
              </button>
              <button
                v-if="step"
                :disabled="isLoading"
                type="button"
                class="button-outline"
                @click.prevent="decreaseStep"
              >
                back
              </button>
              <button-spinner
                v-if="step === 3"
                :loading="isLoading"
                type="button"
                style="width:fit-content"
                @click="saveProfile"
              >
                Save & Complete
              </button-spinner>
              <button
                v-else-if="step !== 5"
                :disabled="
                  step === 0
                    ? profile.isDisabled
                    : step === 1
                      ? trainerProfile.isDisabled
                      : step === 2
                        ? addedServices.isDisabled
                        : firstClient.isDisabled
                "
                type="button"
                class="button-fill"
                @click="increaseStep"
              >
                Next
              </button>
            </div>
          </div>
        </div>
        <!-- Service items for screen 1280 and above -->
        <div
          class="hidden xl:block w-full lg:max-w-sm 2xl:max-w-xl"
        >
          <template v-if="step === 2">
            <div
              class="h-screen border-l overflow-y-auto xl:p-10"
            >
              <onboarding-service-cards
                @editservice="selectedServiceProps = $event"
              />
              <div class="h-20"></div>
            </div>
          </template>
        </div>
      </div>
    </div>
    <onboarding-complete-modal @closeOnboardingCompleteModal="finishedSetUp" />
  </async-view>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import OnboardingCompleteModal from '../../components/modals/OnboardingCompleteModal.vue'
export default {
  name: 'OnboardingProfileSetup',
  components: { OnboardingCompleteModal },
  layout: 'authOnboarding',
  data () {
    return {
      selectedServiceProps: null,
      isLoading: false,
      step: 0,
      profile: {
        id: 0,
        isDisabled: true
      },
      trainerProfile: {
        id: 1,
        isDisabled: true
      },
      addedServices: {
        id: 2,
        isDisabled: true
      },
      firstClient: {
        id: 3,
        isDisabled: true
      },
      pageIntro: [
        {
          id: 0,
          title: 'We would like to get to know you personally.',
          subTitle:
            'This first stage is your personal profile. Pretty simple, right?'
        },
        {
          id: 1,
          title: 'You as a Trainer...',
          subTitle:
            'We want to get to know you as a Trainer, in this section. It’s important because it gives us a good understanding of the types of Trainers using GetWelp and how we can help 🙂'
        },
        {
          id: 2,
          title: 'Your services',
          type: 'html',
          subTitle:
            '<p class="mb-6">So, as you know we’ve built software for you to run your entire business in one place. </p>' +
            '<p class="mb-6">For our invoicing and payments bit to work seamlessly, we’d like to know what services you provide your clients, what type of appointment it is, the currency you charge and what your price usually is.</p>' +
            'For example:<br/><ul class="list-disc list-inside mb-6"><li>Puppy Classes</li><li>Remote</li><li>$50</li></ul>' +
            "<p>Please don't worry, you can change this in the settings section of the platform.</p>"
        },
        {
          id: 3,
          title: 'Add your first client',
          type: 'html',
          subTitle:
            '<p class="mb-6">To make things really simple for you, if you add a client at this stage, a template profile will be created in your Clients section in the platform and it’s super easy to navigate. </p>' +
            '<p class="mb-6">Add your client’s name, email address, dog’s breed and dog’s name to get going. </p>' +
            '<p class="mb-6">A client invitation will not be sent just yet until you tell us when you’d like to send it. You can edit this too later. </p>' +
            '<p>If you’d just like to skip this section and head on into the platform then feel free to do so too!</p>'
        },
        {
          id: 4,
          title: 'Stripe',
          type: 'html',
          subTitle:
            '<p class="mb-6">If you’re an existing Stripe user or have a verified account, you can connect to Stripe by click on the Stripe logo below. It’ll makes your whole experience easier. </p>' +
            '<p>But, we also appreciate you’re new here so if you want to skip this section and head on into the rest of the onboarding process, you can do so and come back to setting up Stripe later! ✌️</p>'
        }
      ]
    }
  },
  computed: {
    ...mapState({
      trainerRegInfo: state => state.profile.trainnerRegData.personalProfile,
      clientInfo: state => state.profile.trainnerRegData.client,
      editingService: state => state.profile.editingServiceCard
    }),
    isClientFormFilled () {
      return (
        Object.values(this.clientInfo).length &&
        (this.clientInfo.firstName || this.clientInfo.lastName) &&
        this.clientInfo.email
      )
    }
  },
  created () {
    this.startFullPageLoad()
    const tokenValidity = this.$auth.strategy.token.status().valid()
    if (
      this.$auth.loggedIn &&
      Object.entries(this.$auth.user).length !== 0 &&
      tokenValidity
    ) {
      this.$router.replace({ name: 'Dashboard' }).then(() => {
        this.endFullPageLoad()
      })
    } else if (!this.$auth.strategy.token.status().valid()) {
      this.$router.replace({ name: 'Auth-SignIn' }).then(() => {
        this.endFullPageLoad()
      })
      this.$gwtoast.error('Session Expired. Please login', {
        position: 'bottom-right'
      })
    } else if (
      this.$auth.strategy.token.status().valid() &&
      'jumpto' in this.$route.query
    ) {
      this.endFullPageLoad()
      const step = parseInt(this.$route.query.jumpto)
      this.move(step)
    } else {
      this.endFullPageLoad()
    }
  },
  methods: {
    ...mapMutations({
      clearTrainnerRegData: 'profile/SET_EMPTY_TRAINNER_REG_DATA',
      setTempState: 'profile/SET_STATE'
    }),
    ...mapActions('authorize', {
      startFullPageLoad: 'startFullPageLoading',
      endFullPageLoad: 'endFullPageLoading'
    }),
    ...mapActions({
      create: 'profile/createProfile',
      addClient: 'client/inviteClient'
    }),
    move (e) {
      this.setTempState({ editingServiceCard: false })
      this.step = e
    },
    allow (e) {
      this.addedServices.isDisabled = e
      this.firstClient.isDisabled = e
    },
    increaseStep () {
      if (this.editingService) {
        this.$gwtoast.error('You are currently editing a service', {
          position: 'top-right'
        })
      } else {
        this.step++
      }
    },
    decreaseStep () {
      if (this.editingService) {
        this.$gwtoast.error('You are currently editing a service', {
          position: 'top-right'
        })
      } else {
        this.step--
      }
    },
    saveProfile () {
      if (!this.$auth.strategy.token.status().valid()) {
        this.$router.replace({ name: 'Auth-SignIn' })
        this.$gwtoast.error('Session Expired. Please login', {
          position: 'bottom-right'
        })
      } else {
        this.isLoading = true
        return this.create().then((result) => {
          localStorage.setItem('profileCompleted', 'true')
          if (result.status === 'success') {
            // set currency in store
            this.setTempState({ currency: this.trainerRegInfo.currency })
            if (this.isClientFormFilled) {
              return this.addClient(this.clientInfo).then((result) => {
                if (result.response !== undefined) {
                  this.isLoading = false
                  this.$gwtoast.error(
                    `Something went wrong: ${result.response.data.message}`,
                    { position: 'bottom-right' }
                  )
                } else {
                  this.$modal.show('done')
                }
              })
            } else {
              this.$modal.show('done')
            }
          }
        })
      }
    },
    finishedSetUp () {
      this.clearTrainnerRegData()
      this.$router.replace({ name: 'Dashboard' }).then(() => {
        this.$gwtoast.success('Welcome', { position: 'bottom-right' })
      })
    }
  }
}
</script>
<style lang="scss" scoped></style>
