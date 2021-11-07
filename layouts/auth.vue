<template>
  <main class="grid place-content-center min-h-screen">
    <div class="flex justify-center px-4 pb-28 lg:pb-0">
      <div
        class="flex flex-col lg:flex-row justify-center items-center max-w-lg lg:max-w-screen-xl w-full mt-10 lg:mt-20 2xl:mt-28 gap-4 lg:gap-9 xl:gap-12 relative"
      >
        <div
          class="max-w-full lg:max-w-sm w-full flex-shrink-0 flex flex-col text-center lg:text-left self-start"
        >
          <img
            class="lg:mr-auto lg:m-0 m-auto h-8 md:h-10 2xl:h-auto"
            src="~/assets/img/svgs/logomark.svg"
            alt="getWelp logo"
          />
          <div class="mt-6 lg:mt-10">
            <h1
              class="text-2xl md:text-3xl lg:text-4xl"
            >We’re here to make dog trainers’ lives easier</h1>
            <div class="w-full md:w-10/12 flex flex-col mr-auto ml-auto lg:ml-0 mt-4 lg:mt-6">
              <p
                v-if="routeName === 'Auth-SignUp'"
                class="text-gray-500"
              >You can sign in with your Google account below to sign up.</p>
              <p
                v-else
                class="text-gray-500"
              >You can sign in with your Google account below which will sync everything you need at once</p>
            </div>
            <div class="mt-6">
              <button
                type="button"
                class="bg-white border border-gray-400 w-100 flex items-center justify-center py-3 h-12 lg:m-0 m-auto rounded-md w-full lg:w-max px-3 lg:px-12 hover:bg-gray-50 shadow-sm"
                @click="routeName === 'Auth-SignIn' ? handleOnClickGoogleSignIn() : handleOnClickGoogleSignUp()"
              >
                <img src="~/assets/img/googleLogoImg.png" alt="google logo" />
                <span
                  class="ml-3"
                >{{ routeName === 'Auth-SignIn' ? 'Sign in' : 'Sign up' }} With Google</span>
              </button>
            </div>
          </div>
        </div>
        <div
          class="h-16 w-16 flex-shrink-0 rounded-full flex items-center justify-center text-xs text-gray-500 bg-gray-100"
        >
          <span class="tracking-widest">OR</span>
          <span
            class="h-px lg:h-full w-full lg:w-px border-b lg:border-b-0 border-r-0 lg:border-r absolute lg:bottom-0 -z-10"
          ></span>
        </div>
        <div class="max-w-full lg:max-w-sm w-full flex-shrink-0">
          <Nuxt />
        </div>
      </div>
    </div>
    <modal name="my-modal" height="auto" :adaptive="true" :max-width="450" :click-to-close="false">
      <div class="text-left mx-6 mt-8 mb-4">
        <h2 class="text-2xl md:text-3xl lg:text-3xl mb-4">Welcome to GetWelp!</h2>
        <p
          class="text-base text-gray-700 mb-6 leading-relaxed"
        >So, you’ve made it this far! We want to give you the best chance of getting most out of the platform so we’re going to run you through an onboarding process which will integrate and automate various elements of your business right from the word go!</p>
        <div class="flex justify-start py-4">
          <button
            style="width: fit-content"
            type="submit"
            class="button-fill"
            @click="displaySetUp"
          >Lets Get Started</button>
        </div>
      </div>
    </modal>
  </main>
</template>
<script>
export default {
  data () {
    return {
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
      this.$modal.show('my-modal')
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
