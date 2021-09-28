<template>
  <div
    class="tail-flex tail-flex-col lg:tail-flex-row tail-justify-center tail-mx-auto lg:tail-justify-start tail-max-w-xl lg:tail-max-w-full tail-px-4 lg:tail-px-0 tail-min-h-screen"
  >
    <div
      class="tail-flex tail-flex-col tail-bg-none lg:tail-bg-white lg:tail-h-screen lg:tail-max-w-[26rem] 2xl:tail-max-w-md tail-w-full lg:tail-p-10 tail-gap-20 lg:tail-border-r lg:tail-sticky tail-top-0"
    >
      <circle-step-navigation
        class="tail-flex tail-items-center tail-h-16 lg:tail-h-auto"
        :step-count="step"
        :disabled="[
          profile,
          trainerProfile,
          addedServices,
          firstClient,
          stripeConnect
        ]"
        @stepper="move($event)"
      />

      <!-- This section is for smaller screens -->
      <!-- <div class="tail-mt-10 lg:tail-hidden tail-pb-28" :class="{ 'tail-pb-0': step === 2 }">
        <template v-if="step === 0">
          <onboarding-profile @validity="profile.isDisabled = $event" />
        </template>
        <template v-else-if="step === 1">
          <onboarding-trainer-profile @validity="trainerProfile.isDisabled = $event" />
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
        <template v-else-if="step === 4">
          <onboarding-stripe @validity="stripeConnect.isDisabled = $event" />
        </template>
      </div>-->

      <div class="tail-hidden lg:tail-block tail-flex-grow">
        <template v-if="'type' in pageIntro[step]">
          <h1 class="tail-text-3xl">{{ pageIntro[step].title }}</h1>
          <p
            class="xl:tail-text-lg tail-mt-10 tail-text-gray-500"
            v-html="pageIntro[step].subTitle"
          ></p>
        </template>
        <template v-else>
          <h1 class="tail-text-3xl">{{ pageIntro[step].title }}</h1>
          <p class="xl:tail-text-lg tail-mt-10 tail-text-gray-500">{{ pageIntro[step].subTitle }}</p>
        </template>
      </div>
      <!-- end of bigger screen view -->

      <!-- this buttons is for small screens only -->
      <!-- <div
        class="tail-flex tail-items-center tail-space-x-2 sm:tail-space-x-4 lg:tail-hidden tail-fixed tail-bottom-8 tail-right-0 tail-left-0 tail-px-5"
      >
        <button
          class="tail-text-blue-500 tail-mr-auto"
          :class="[step === 3 ? 'tail-visible' : step === 4 ? 'tail-hidden' : 'tail-invisible']"
          @click.prevent="step++"
        >Skip</button>
        <button
          class="tail-text-blue-500 tail-mr-auto"
          :class="[step === 4 ? 'tail-visible' : step === 3 ? 'tail-hidden' : 'tail-invisible']"
          @click.prevent="saveProfile"
        >
          Skip
        </button>
        <button
          v-if="step"
          :disabled="isLoading"
          type="button"
          style="width: fit-content"
          class="base-button tail-bg-white tail-text-blue-500 tail-border-blue-500 tail-px-3 tail-py-1 hover:tail-text-white hover:tail-border-transparent"
          @click.prevent="decreaseStep"
        >back</button>
        <button
          v-if="step === 4"
          type="button"
          :disabled="isLoading"
          style="width: fit-content"
          class="base-button tail-text-white tail-border tail-bg-blue-500 tail-px-3 tail-py-1 tail-rounded"
          @click="saveProfile"
        >
          <SingleLoader v-if="isLoading" class="tail-mr-2" />
          {{ isLoading ? "Creating Account" : "Save & Complete" }}
        </button>
        <button
          v-else-if="step !== 5"
          type="button"
          :disabled="
            step === 0
              ? profile.isDisabled
              : step === 1
                ? trainerProfile.isDisabled
                : step === 2
                  ? addedServices.isDisabled
                  : step === 3
                    ? firstClient.isDisabled
                    : stripeConnect.isDisabled
          "
          style="width: fit-content"
          class="base-button tail-bg-blue-500 tail-px-3 tail-py-1"
          @click="increaseStep"
        >Next</button>
      </div>-->
      <!-- ends small screen view -->
    </div>

    <div class="lg:tail-flex tail-flex-col xl:tail-flex-row tail-flex-grow tail-mt-4 lg:tail-mt-0">
      <div
        class="tail-flex tail-flex-col tail-items-center lg:tail-p-10 tail-flex-grow lg:tail-overflow-y-auto"
      >
        <div
          class="tail-flex tail-flex-col tail-gap-6 lg:tail-max-w-lg 2xl:tail-max-w-xl tail-w-full tail-h-full"
        >
          <div class="tail-flex-grow">
            <div>
              <template v-if="step === 0">
                <onboarding-profile @validity="profile.isDisabled = $event" />
              </template>
              <template v-else-if="step === 1">
                <onboarding-trainer-profile @validity="trainerProfile.isDisabled = $event" />
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
              <template v-else-if="step === 4">
                <onboarding-stripe @validity="stripeConnect.isDisabled = $event" />
              </template>
            </div>
            <!-- Service items for mobile screen -->
            <template v-if="step === 2">
              <div class="xl:tail-hidden tail-py-6">
                <onboarding-service-cards @editservice="selectedServiceProps = $event" />
              </div>
            </template>
          </div>

          <div class="tail-flex tail-items-center tail-gap-2">
            <button
              class="button-text tail-mr-auto"
              :class="[
            step === 3 || step === 4 ? 'tail-visible' : 'tail-invisible'
          ]"
              @click.prevent="step++"
            >Skip</button>
            <button
              v-if="step"
              :disabled="isLoading"
              type="button"
              class="button-outline"
              @click.prevent="decreaseStep"
            >back</button>
            <button
              v-if="step === 4"
              :disabled="isLoading"
              type="button"
              class="button-fill"
              @click="saveProfile"
            >
              <SingleLoader v-if="isLoading" />
              {{ isLoading ? "Creating Account" : "Save & Complete" }}
            </button>
            <button
              v-else-if="step !== 5"
              :disabled="

            step === 0
              ? profile.isDisabled
              : step === 1
                ? trainerProfile.isDisabled
                : step === 2
                  ? addedServices.isDisabled
                  : step === 3
                    ? firstClient.isDisabled
                    : stripeConnect.isDisabled
          "

              type="button"
              class="button-fill"
              @click="increaseStep"
            >Next</button>
          </div>
        </div>

      </div>
      <!-- Service items for screen 1280 and above -->
      <div class="tail-hidden xl:tail-block tail-w-full lg:tail-max-w-sm 2xl:tail-max-w-xl">
        <template v-if="step === 2">
          <div class="tail-h-screen tail-border-l tail-overflow-y-auto xl:tail-p-10">
            <onboarding-service-cards @editservice="selectedServiceProps = $event" />
            <div class="tail-h-20"></div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
export default {
  name: 'OnboardingProfileSetup',
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
      stripeConnect: {
        id: 4,
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
            '<p class="tail-mb-6">So, as you know we’ve built software for you to run your entire business in one place. </p>' +
            '<p class="tail-mb-6">For our invoicing and payments bit to work seamlessly, we’d like to know what services you provide your clients, what type of appointment it is, the currency you charge and what your price usually is.</p>' +
            'For example:<br/><ul class="tail-list-disc tail-list-inside tail-mb-6"><li>Puppy Classes</li><li>Remote</li><li>$50</li></ul>' +
            "<p>Please don't worry, you can change this in the settings section of the platform.</p>"
        },
        {
          id: 3,
          title: 'Add your first client',
          type: 'html',
          subTitle:
            '<p class="tail-mb-6">To make things really simple for you, if you add a client at this stage, a template profile will be created in your Clients section in the platform and it’s super easy to navigate. </p>' +
            '<p class="tail-mb-6">Add your client’s name, email address, dog’s breed and dog’s name to get going. </p>' +
            '<p class="tail-mb-6">A client invitation will not be sent just yet until you tell us when you’d like to send it. You can edit this too later. </p>' +
            '<p>If you’d just like to skip this section and head on into the platform then feel free to do so too!</p>'
        },
        {
          id: 4,
          title: 'Stripe',
          type: 'html',
          subTitle:
            '<p class="tail-mb-6">If you’re an existing Stripe user or have a verified account, you can connect to Stripe by click on the Stripe logo below. It’ll makes your whole experience easier. </p>' +
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
        this.clientInfo.firstName &&
        this.clientInfo.lastName &&
        this.clientInfo.email
      )
    }
  },
  mounted () {
    if (this.$auth.strategy.token.status().valid() && 'jumpto' in this.$route.query) {
      const step = parseInt(this.$route.query.jumpto)
      this.move(step)
    }
    if (!this.$auth.strategy.token.status().valid()) {
      this.$router.replace({ name: 'Auth-SignIn' })
      this.$toast.error('Session Expired. Please login', {
        position: 'bottom-right'
      })
    }
  },
  methods: {
    ...mapMutations({
      clearTrainnerRegData: 'profile/SET_EMPTY_TRAINNER_REG_DATA',
      setTempState: 'profile/SET_STATE'
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
        this.$toast.error('You are currently editing a service', {
          position: 'top-right'
        })
      } else {
        this.step++
      }
    },
    decreaseStep () {
      if (this.editingService) {
        this.$toast.error('You are currently editing a service', {
          position: 'top-right'
        })
      } else {
        this.step--
      }
    },
    saveProfile () {
      if (!this.$auth.strategy.token.status().valid()) {
        this.$router.replace({ name: 'Auth-SignIn' })
        this.$toast.error('Session Expired. Please login', {
          position: 'bottom-right'
        })
      } else {
        this.isLoading = true
        try {
          return this.create().then((result) => {
            if (result.status === 'success') {
              // set currency in store
              this.setTempState({ currency: this.trainerRegInfo.currency })
              if (this.isClientFormFilled) {
                return this.addClient(this.clientInfo).then((result) => {
                  if (result.status) {
                    this.clearTrainnerRegData()
                    this.$router.replace({ name: 'Dashboard' }).then(() => {
                      this.$toast.success('Welcome', {
                        position: 'bottom-right'
                      })
                    })
                  }
                })
              } else {
                this.clearTrainnerRegData()
                this.$router.replace({ name: 'Dashboard' }).then(() => {
                  this.$toast.success('Welcome', { position: 'bottom-right' })
                })
              }
            }
          })
        } catch (err) {
          this.isLoading = false
          this.$toast.error(
            'Something went wrong',
            { position: 'bottom-right' }
          )
          if (err.response) {
            this.$toast.error(
              `Something went wrong: ${err.response.data.message}`,
              { position: 'bottom-right' }
            )
          } else if (err.request) {
            this.$toast.error('Something went wrong. Try again', {
              position: 'bottom-right'
            })
          } else {
            this.$toast.error(`Something went wrong: ${err.message}`, {
              position: 'bottom-right'
            })
          }
        }
      }
    }
  }
}
</script>
<style lang="scss" scoped></style>
