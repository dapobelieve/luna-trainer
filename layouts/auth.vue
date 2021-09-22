<template>
  <main
    class="tail-overflow-y-auto"
  >
    <div
      v-if="sigupDisplay"
      class="tail-flex tail-items-center tail-flex-col tail-px-5 lg:tail-flex-row md:tail-px-4 lg:tail-px-0 tail-justify-center centered"
    >
      <header
        class="tail-py-4 tail-w-96 tail-h-full lg:tail--mt-36 tail-mt-8 tail-mr-0 lg:tail-mr-8 tail-text-center lg:tail-text-left"
      >
        <img
          class="lg:tail-mr-auto lg:tail-m-0 tail-m-auto tail-pt-5 md:tail-pt-0"
          src="~/assets/img/svgs/logomark.svg"
          alt="getWelp logo"
        />
        <h2 class="tail-gray-700 tail-my-4 tail-px-3 md:tail-px-0 md:tail-my-8 tail-text-2xl lg:tail-text-4xl tail-font-normal tail-tracking-wide">
          We’re here to make dog trainers’ lives easier
        </h2>
        <p v-if="routeName === 'Auth-SignUp'" class="tail-my-4 md:tail-my-6 tail-px-14 md:tail-px-0 tail-text-gray-500 tail-text-base">
          You can sign in with your Google account below to sign up.
        </p>
        <p v-else class="tail-my-4 md:tail-my-6 tail-px-14 md:tail-px-0 tail-text-gray-500 tail-text-base">
          You can sign in with your Google account below which will sync everything you need at once
        </p>
        <div class=" tail-mt-6">
          <button
            type="button"
            class="tail-bg-white tail-border tail-w-100 tail-flex tail-align-center tail-justify-center tail-py-3 tail-px-6 tail-rounded lg:tail-m-0 tail-m-auto"
            @click="routeName === 'Auth-SignIn' ? handleOnClickGoogleSignIn() : handleOnClickGoogleSignUp()"
          >
            <img src="~/assets/img/googleLogoImg.png" alt="google logo" />
            <span class="tail-ml-1">{{ routeName === 'Auth-SignIn' ? 'Sign in' : 'Sign up' }} with Google</span>
          </button>
        </div>
      </header>
      <div class="tail-relative tail-m-3 tail-hidden lg:tail-block">
        <hr class="tail-border-0 tail-bg-gray-300 tail-ml-8 tail-text-gray-500 lg:tail-w-px height lg:tail-m-0 tail-mb-4">
        <div
          class="tail-w-full tail-absolute tail-transform lg:tail--translate-y-64 tail--translate-y-8 tail-flex tail-align-center tail-justify-center"
        >
          <small
            class=" or-secondary tail-text-grey tail-p-2 body-background"
          >OR</small>
        </div>
      </div>
      <div data-text="OR" class="divide tail-block lg:tail-hidden">
      </div>
      <article
        class="tail-z-0 tail-m-4 lg:tail-ml-14 tail-overflow-hidden tail-max-w-xs md:tail-max-w-xl md:tail-mb-5 lg:tail-max-w-full"
      >
        <div
          class="tail-h-full md:tail-h-auto"
        >
          <Nuxt />
        </div>
      </article>
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
main {
    height: auto;
    min-height: 100vh;
}
.height{
  height: 30rem
}

@media only screen and (max-width: 768px) {
  article {
    width: 100%;
  }
  .height{
  width: 30rem;
  height: 1px;
 }
   .divide[data-text] {
    margin: 2rem 0;
    color: #666;
}
.divide[data-text]:before {
    content: attr(data-text);
    position: absolute;
    padding: .25rem .75rem;
    background: rgba(240, 245, 250, 1);
    margin-bottom: 2px;
}
.divide {
    border: 1px solid rgba(14,19,24,.07);
    margin: 30px 0 15px 0;
    width: 80%;
    display: flex;
    justify-content: center;
    align-items: center;
}
}

@media only screen and (min-width: 769px) {

  .views {
    margin-left: 99px;
    width: 100%;
  }
  .centered {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

  article {
    min-width: 30rem;
  }
}
</style>
