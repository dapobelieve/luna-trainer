<template>
  <div>
    <div class="tail-pb-4 tail-py-5 tail-px-5 tail-rounded-md tail-bg-white">
      <form autocomplete="off" class="tail-grid tail-gap-6">
        <p v-if="stripconnect">
          Connected to Stripe
        </p>
        <p v-else>
          Connected Accounts
        </p>
        <div><span>Connected accounts</span></div>
        <div class="tail-border tail-w-full tail-rounded tail-flex tail-justify-between tail-p-4">
          <div class="tail-flex tail-justify-between tail-items-center">
            <div>
              <img class="tail-h-6" src="~/assets/img/strip.png" alt="google logo">
            </div>
          </div>

          <button class="tail-border-2 tail-border-gray-500 tail-px-2 tail-py-1 tail-rounded-md">
            Connect with Stripe
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
