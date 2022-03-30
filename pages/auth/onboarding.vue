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
          :disabled="[profile, businessDetails, trainerProfile, addedServices]"
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
                  <business-details @validity="businessDetails.isDisabled = $event" />
                </template>
                <template v-else-if="step === 2">
                  <onboarding-trainer-profile
                    @validity="trainerProfile.isDisabled = $event"
                  />
                </template>
                <template v-else-if="step === 3">
                  <onboarding-services
                    :selected-service-index="selectedServiceProps"
                    @clearSelectedServiceIndex="selectedServiceProps = $event"
                    @validity="allow($event)"
                  />
                </template>
              </div>
              <!-- Service items for mobile screen -->
              <template v-if="step === 3">
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
                :disabled="addedServices.isDisabled"
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
                      ? businessDetails.isDisabled
                      : step === 2
                        ? trainerProfile.isDisabled
                        : addedServices.isDisabled
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
          <template v-if="step === 3">
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
import BusinessDetails from '~/components/onboarding-auth/BusinessDetails.vue'
export default {
  name: 'Onboarding',
  components: { OnboardingCompleteModal, BusinessDetails },
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
      businessDetails: {
        id: 1,
        isDisabled: true
      },
      trainerProfile: {
        id: 2,
        isDisabled: true
      },
      addedServices: {
        id: 3,
        isDisabled: true
      },
      pageIntro: [
        {
          id: 0,
          title: 'Setting up your account',
          subTitle: 'Starting with the basics...'
        },
        {
          id: 1,
          title: 'Setting up your business profile',
          subTitle: 'We only need a couple of details'
        },
        {
          id: 2,
          title: 'Next your trainer profile.',
          type: 'html',
          subTitle:
            'Tell us about your qualifications, accreditations and specialisms.'
        },
        {
          id: 3,
          title: 'And finally, your services.',
          type: 'html',
          subTitle:
            '<p class="mb-6 my-4">Now, because we’ve built Luna specifically to be an all-in-one business software solution for dog trainers and behaviourists, we have integrated the services you provide into your billing centre to make it super easy to set up payment links. The services you add today are just to get you started, you can always add, delete or amend at a later date. </p>' +
            "<p>Please don't worry, you can change this in the settings section of the platform.</p>"
        },
        {
          id: 4,
          title: 'Your services',
          type: 'html',
          subTitle:
            '<p class="mb-6 my-4">Now, because we’ve built Luna specifically to be an all-in-one business software solution for dog trainers and behaviourists, we have integrated the services you provide into your billing centre to make it super easy to set up payment links. The services you add today are just to get you started, you can always add, delete or amend at a later date. </p>' +
            "<p>Please don't worry, you can change this in the settings section of the platform.</p>"
        }
      ]
    }
  },
  computed: {
    ...mapState({
      trainerRegInfo: state => state.profile.user,
      editingService: state => state.profile.editingServiceCard
    })
  },
  created () {
    console.log('ok')
    this.startFullPageLoad()
    const tokenValidity = this.$auth.strategy.token.status().valid()
    if (
      this.$auth.loggedIn &&
      Object.entries(this.$auth.user.services).length !== 0 &&
      tokenValidity
    ) {
      this.$router.replace({ name: 'dashboard' }).then(() => {
        this.endFullPageLoad()
      })
    } else if (!this.$auth.strategy.token.status().valid()) {
      this.$router.replace({ name: 'auth-signin' }).then(() => {
        this.endFullPageLoad()
      })
      this.$lunaToast.error('Session Expired. Please login')
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
      cleartrainerRegData: 'profile/SET_EMPTY_TRAINER_REG_DATA',
      setTempState: 'profile/SET_STATE'
    }),
    ...mapActions('authorize', {
      startFullPageLoad: 'startFullPageLoading',
      endFullPageLoad: 'endFullPageLoading'
    }),
    ...mapActions({
      updateOnboardingProfile: 'profile/updateOnboardingProfile'
    }),
    move (e) {
      this.setTempState({ editingServiceCard: false })
      this.step = e
    },
    allow (e) {
      this.addedServices.isDisabled = e
      this.businessDetails.isDisabled = e
    },
    increaseStep () {
      if (this.editingService) {
        this.$lunaToast.error('You are currently editing a service')
      } else {
        this.step++
      }
    },
    decreaseStep () {
      if (this.editingService) {
        this.$lunaToast.error('You are currently editing a service')
      } else {
        this.step--
      }
    },
    async saveProfile () {
      if (!this.$auth.strategy.token.status().valid()) {
        this.$router.replace({ name: 'auth-signin' })
        this.$lunaToast.error('Session Expired. Please login')
      } else {
        this.isLoading = true
        try {
          await this.updateOnboardingProfile()
          localStorage.setItem('profileCompleted', 'true')
          this.$modal.show('done')
        } catch (error) {
          this.$lunaToast.error(
                    `${error}`)
        }
      }
    },
    finishedSetUp () {
      // this.cleartrainerRegData()
      this.$router.replace({ name: 'dashboard' }).then(() => {
        this.$lunaToast.success('Welcome')
      })
    }
  }
}
</script>
<style lang="scss" scoped></style>
