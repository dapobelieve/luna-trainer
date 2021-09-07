<template>
  <main
    :class="[
      $route.name === 'Auth-ForgotPassword' ||
        $route.name === 'Auth-CreateNewPassword'
        ? 'border-collie'
        : $route.name === 'Auth-ProfileSetup' || $route.name === 'Auth-SignUp'
          ? 'dobermann'
          : 'shiba-inu'
    ]"
  >
    <div
      class="tail-flex tail-items-center tail-flex-col lg:tail-flex-row md:tail-px-4 lg:tail-px-0 tail-justify-center centered"
    >
      <header
        class="tail-py-4 tail-w-96 tail-h-full lg:tail--mt-36 tail-mt-8 tail-mr-0 lg:tail-mr-14 tail-text-center lg:tail-text-left"
      >
        <img
          class="lg:tail-mr-auto lg:tail-m-0 tail-m-auto "
          src="~/assets/img/svgs/logomark.svg"
          alt="getWelp logo"
        />
        <h2 class="tail-gray-700 tail-my-4 md:tail-my-8 tail-text-2xl lg:tail-text-4xl tail-font-normal tail-tracking-wide">
          We’re here to make dog trainers’ lives easier
        </h2>
        <span class="tail-my-4 md:tail-my-6 tail-text-gray-500 tail-text-base">
          You can sign in with your Google account below to sign up.
        </span>
        <div class=" tail-mt-6">
          <button
            type="button"
            class="tail-bg-white tail-border tail-w-100 tail-flex tail-align-center tail-justify-center tail-py-3 tail-px-6 tail-rounded lg:tail-m-0 tail-m-auto"
            handleOnClickGoogleButton
          >
            <img src="~/assets/img/googleLogoImg.png" alt="google logo" />
            <span class="tail-ml-1">Sign up with Google</span>
          </button>
        </div>
      </header>
      <div class="tail-relative tail-m-3">
        <hr class="tail-border-0 tail-bg-gray-300 tail-ml-8 tail-text-gray-500 lg:tail-w-px height lg:tail-m-0 tail-mb-4">
        <div
          class="tail-w-full tail-absolute tail-transform lg:tail--translate-y-64 tail--translate-y-8 tail-flex tail-align-center tail-justify-center"
        >
          <small
            class="tail-border tail-rounded-full or-secondary tail-text-grey tail-p-2 body-background"
          >OR</small>
        </div>
      </div>
      <article
        class="md:tail-shadow tail-z-0 tail-rounded-lg tail-m-4 lg:tail-ml-14 tail-overflow-hidden tail-max-w-sm md:tail-max-w-xl md:tail-mb-5 lg:tail-max-w-full md:tail-border tail-border-gray-300"
      >
        <div
          class="tail-h-full md:tail-h-auto"
        >
          <Nuxt />
        </div>
      </article>
    </div>
  </main>
</template>
<script>
export default {
  methods: {
    handleOnClickGoogleButton () {
      const { host, protocol } = window.location
      window.location = `${process.env.ACCOUNT_HOST_URL}/auth/google?redirectUrl=${protocol}//${host}/Auth/SignIn%3FredirectClient%3Dgoogle`
    }
  }
}
</script>
<style lang="scss">
main {
    height: auto;
    min-height: 100vh;
}
.centered {
  position: fixed;
  top: 50%;
  left: 50%;
  /* bring your own prefixes */
  transform: translate(-50%, -50%);
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
}

@media only screen and (min-width: 769px) {
  .views {
    margin-left: 99px;
    width: 100%;
  }

  article {
    min-width: 30rem;
  }

  .border-collie {
    background-image: url("~assets/img/border-collie.png");
    background-repeat: no-repeat;
    background-position: left bottom;
    background-attachment: fixed;
    height: auto;
  }

  .dobermann {
    background-image: url("~assets/img/dobermann.png");
    background-repeat: no-repeat;
    background-position: right bottom;
    background-attachment: fixed;
  }

  .shiba-inu {
    background-image: url("~assets/img/shiba-inu.png");
    background-repeat: no-repeat;
    background-position: left bottom;
    background-attachment: fixed;
  }
}
</style>
