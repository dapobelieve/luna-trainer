<template>
 <main>
    <div class="tail-flex tail-justify-center tail-px-4 tail-pb-28 lg:pb-0">
      <div
        class="tail-flex tail-flex-col lg:tail-flex-row tail-justify-center tail-items-center tail-max-w-lg lg:tail-max-w-screen-xl tail-w-full tail-mt-10 lg:tail-mt-20 2xl:tail-mt-28 tail-gap-4 lg:tail-gap-9 xl:tail-gap-12 tail-relative"
      >
        <div
          class="tail-max-w-full lg:tail-max-w-sm tail-w-full tail-flex tail-flex-col tail-text-center lg:tail-text-left tail-self-start"
        >
          <img
            class="lg:tail-mr-auto lg:tail-m-0 tail-m-auto tail-h-8 md:tail-h-10 2xl:tail-h-auto"
            src="~/assets/img/svgs/logomark.svg"
            alt="getWelp logo"
          />
          <div class="tail-mt-6 lg:tail-mt-10">
            <h1
              class="tail-text-2xl md:tail-text-3xl lg:tail-text-4xl"
            >We’re here to make dog trainers’ lives easier</h1>
            <div
              class="tail-w-full md:tail-w-10/12 tail-flex tail-flex-col tail-mr-auto tail-ml-auto lg:tail-ml-0 tail-mt-4 lg:tail-mt-6"
            >
              <p
                v-if="routeName === 'Auth-SignUp'"
                class="tail-text-gray-500"
              >You can sign in with your Google account below to sign up.</p>
              <p
                v-else
                class="tail-text-gray-500"
              >You can sign in with your Google account below which will sync everything you need at once</p>
            </div>
            <div class="tail-mt-6">
              <button
                type="button"
                class="tail-bg-white tail-border tail-border-gray-400 tail-w-100 tail-flex tail-items-center tail-justify-center tail-py-3 tail-h-12 lg:tail-m-0 tail-m-auto tail-rounded-md tail-w-full lg:tail-w-max tail-px-3 lg:tail-px-12 hover:tail-bg-gray-50 tail-shadow-sm tail-transition-all"
                @click="routeName === 'Auth-SignIn' ? handleOnClickGoogleSignIn() : handleOnClickGoogleSignUp()"
              >
                <img src="~/assets/img/googleLogoImg.png" alt="google logo" />
                <span
                  class="tail-ml-3"
                >{{ routeName === 'Auth-SignIn' ? 'Sign in' : 'Sign up' }} With Google</span>
              </button>
            </div>
          </div>
        </div>
        <div
          class="tail-h-16 tail-w-16 tail-flex-shrink-0 tail-rounded-full tail-flex tail-items-center tail-justify-center tail-text-xs tail-text-gray-500 tail-bg-gray-50"
        >
          <span class="tail-tracking-widest">OR</span>
          <span
            class="tail-h-px lg:tail-h-full tail-w-full lg:tail-w-px tail-border-b lg:tail-border-b-0 tail-border-r-0 lg:tail-border-r tail-absolute lg:tail-bottom-0 tail--z-10"
          ></span>
        </div>
        <div class="tail-max-w-full lg:tail-max-w-sm tail-w-full">
          <Nuxt />
        </div>
      </div>
    </div>
    <div v-if="getStarted" class="tail-flex tail-items-center tail-justify-center tail-h-screen">
      <Modal :is-open="letsGetStarted" :close="false" :close-back-drop="letsGetStarted = true" :input-width="30" @close="letsGetStarted = $event">
        <div class="tail-text-left">
          <h1
            class="tail-text-2xl md:tail-text-3xl lg:tail-text-4xl tail-mb-6"
          >
            Welcome to GetWelp!
          </h1>
          <p class="tail-text-base tail-text-gray-700 tail-mb-6 tail-leading-relaxed">
            So, you’ve made it this far! We want to give you the best chance of getting most out of the platform so we’re going to run you through an onboarding process which will integrate and automate various elements of your business right from the word go!
          </p>
          <div class="tail-flex tail-justify-start tail-py-4">
            <button
              style="width: fit-content"
              type="submit"
              class="primary-button"
              @click="displaySetUp"
            >
              Lets Get Started
            </button>
          </div>
        </div>
      </Modal>
    </div>
  </main>
</template>
<script>
export default {
  data () {
    return {
      getStarted: false,
      sigupDisplay: true,
      letsGetStarted: true
    }
  },
  computed: {
    routeName () {
      return this.$route.name
    }
  },
  created () {
    this.$nuxt.$on('profile', () => {
      this.started()
    })
  },
  methods: {
    handleOnClickGoogleSignUp () {
      const { host, protocol } = window.location
      window.location = `${process.env.ACCOUNT_HOST_URL}/auth/google?redirectUrl=${protocol}//${host}/Auth/SignIn%3FredirectClient%3Dgoogle`
    },
    handleOnClickGoogleSignIn () {
      window.location = `${process.env.ACCOUNT_HOST_URL}/auth/google?redirectUrl=${window.location.href}%3FredirectClient%3Dgoogle`
    },
    started () {
      this.getStarted = true
      this.sigupDisplay = false
    },
    displaySetUp () {
      this.$router.replace({
        name: 'Auth-onboardingProfileSetup'
      })
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
