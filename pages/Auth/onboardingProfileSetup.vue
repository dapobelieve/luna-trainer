<template>
  <div class="lg:tail-grid lg:tail-grid-cols-3 tail-bg-blue-50 tail-h-full">
    <div
      class="tail-flex tail-flex-col tail-bg-blue-50 lg:tail-bg-white tail-h-screen tail-px-6 tail-py-10 tail-w-full"
    >
      <circle-step-navigation
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
      <div
        class="tail-mt-10 lg:tail-hidden tail-pb-28"
        :class="{ 'tail-pb-0': step === 2 }"
      >
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
            @clearSelectedServiceIndex="checMe($event)"
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
      <div class="tail-mt-20 tail-hidden lg:tail-block tail-text-gray-700">
        <template v-if="'type' in pageIntro[step]">
          <h2 class="tail-text-2xl tail-mb-8 tail-max-w-xs">
            {{ pageIntro[step].title }}
          </h2>
          <div
            class="tail-font-extralight"
            v-html="pageIntro[step].subTitle"
          ></div>
        </template>
        <template v-else>
          <h2 class="tail-text-2xl tail-mb-8 tail-max-w-xs">
            {{ pageIntro[step].title }}
          </h2>
          <p class="tail-font-extralight">
            {{ pageIntro[step].subTitle }}
          </p>
        </template>
      </div>
      <!-- end of bigger screen view -->

      <!-- this buttons is for small screens only -->
      <div
        class="tail-flex tail-items-center tail-space-x-2 sm:tail-space-x-4 lg:tail-hidden tail-fixed tail-bottom-8 tail-right-0 tail-left-0 tail-px-5"
      >
        <button
          class="tail-text-blue-500 tail-mr-auto"
          :class="[
            step === 3 || step === 4 ? 'tail-visible' : 'tail-invisible'
          ]"
          @click.prevent="step++"
        >
          Skip
        </button>
        <button
          v-if="step"
          :disabled="isLoading"
          type="button"
          style="width: fit-content"
          class="base-button tail-bg-white tail-text-blue-500 tail-border tail-border-blue-500 tail-px-3 tail-py-1 tail-rounded"
          @click.prevent="decreaseStep"
        >
          back
        </button>
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
          class="base-button tail-text-white tail-border tail-bg-blue-500 tail-px-3 tail-py-1 tail-rounded"
          @click="increaseStep"
        >
          Next
        </button>
      </div>
      <!-- ends small screen view -->
    </div>

    <!-- only shows on bigger screen -->
    <div
      class="tail-mt-10 lg:tail-mt-0 tail-hidden lg:tail-flex tail-flex-col tail-bg-blue-50 tail-h-screen tail-px-6 tail-py-10"
    >
      <div
        class="tail-text-lg tail-font-medium tail-text-gray-900 tail-mb-auto"
      >
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
            @clearSelectedServiceIndex="checMe($event)"
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
      <div class="tail-flex tail-items-center tail-space-x-2 sm:tail-space-x-4">
        <button
          class="tail-text-blue-500 tail-mr-auto"
          :class="[
            step === 3 || step === 4 ? 'tail-visible' : 'tail-invisible'
          ]"
          @click.prevent="step++"
        >
          Skip
        </button>
        <button
          v-if="step"
          :disabled="isLoading"
          type="button"
          style="width: fit-content"
          class="base-button tail-bg-white tail-text-blue-500 tail-border tail-border-blue-500 tail-px-3 tail-py-1 tail-rounded"
          @click.prevent="decreaseStep"
        >
          back
        </button>
        <button
          v-if="step === 4"
          :disabled="isLoading"
          type="button"
          style="width: fit-content"
          class="base-button tail-text-white tail-border tail-bg-blue-500 tail-px-3 tail-py-1 tail-rounded"
          @click="saveProfile"
        >
          <SingleLoader v-if="isLoading" class="tail-mr-2" />
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
          style="width: fit-content"
          class="base-button tail-text-white tail-border tail-bg-blue-500 tail-px-3 tail-py-1 tail-rounded"
          @click="increaseStep"
        >
          Next
        </button>
      </div>
    </div>
    <!-- end of bigger screen view -->

    <!-- only shows on bigger screens -->
    <template v-if="step === 2">
      <div
        class="tail-mt-10 lg:tail-mt-0 tail-bg-blue-50 tail-h-screen tail-px-6 tail-pt-10 tail-border tail-hidden lg:tail-block"
      >
        <onboarding-service-cards
          @editservice="selectedServiceProps = $event"
        />
      </div>
    </template>
    <!-- end of bigger screen view -->

    <!-- only shows on smaller screen -->
    <template v-if="step === 2">
      <div
        class="lg:tail-mt-0 tail-bg-blue-50 tail-px-6 tail-pt-10 tail-border-t lg:tail-border-l lg:tail-hidden tail--mt-80"
      >
        <onboarding-service-cards
          @editservice="selectedServiceProps = $event"
        />
      </div>
    </template>
    <!-- end of smaller screen -->
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
    if ('jumpto' in this.$route.query) {
      const step = parseInt(this.$route.query.jumpto)
      this.move(step)
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
    checMe (e) {
      console.log('this is e ', e)
      this.selectedServiceProps = e
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
      this.isLoading = true
      try {
        return this.create().then((result) => {
          if (result.status === 'success') {
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
</script>
<style lang="scss" scoped></style>
