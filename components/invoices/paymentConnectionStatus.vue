<template>
  <div class="px-4 py-5">
    <div class="flex justify-between items-center mb-6">
      <p class="text-xl font-bold text-gray-700">
        Payment Gateway
      </p>
      <i
        role="button"
        class="fi-rr-cross text-blue-500 text-sm"
        @click.prevent="closeModal"
      ></i>
    </div>
    <div>
      <ul class="space-y-5">
        <li class="flex justify-between items-center">
          <div>
            <p class="text-lg font-medium text-gray-700 mb-1 flex items-center space-x-1">
              <span
                class="bg-green-50 rounded-full p-2 h-8 w-8 flex shadow-sm flex-shrink"
              >
                <i class="fi-rr-check text-sm text-green-500"></i>
              </span>
              <span>
                <img
                  class="h-6 inline-block"
                  src="~/assets/img/stripe.png"
                  alt="stripe logo"
                />
              </span>
            </p>
          </div>
          <div>
            <button disabled class="btn-gray text-sm text-gray-400 cursor-not-allowed">
              Connected
            </button>
          </div>
        </li>
        <li class="flex justify-between items-center">
          <div>
            <p class="text-lg font-medium text-gray-700 mb-1 flex items-center space-x-1">
              <span
                class="bg-yellow-50 rounded-full p-2 h-8 w-8 flex shadow-sm flex-shrink"
              >
                <i class="fi-rr-time-forward text-base text-yellow-500"></i>
              </span>
              <span>
                <img
                  class="h-6 inline-block"
                  src="~/assets/img/stripe.png"
                  alt="stripe logo"
                />
              </span>
            </p>
          </div>
          <div>
            <button disabled class="button-outline text-sm bg-blue-50">
              Connecting...
            </button>
          </div>
        </li>
        <li class="flex justify-between items-center">
          <div>
            <p class="text-lg font-medium text-gray-700 mb-1 flex items-center space-x-1">
              <span
                class="bg-red-50 rounded-full p-2 h-8 w-8 flex shadow-sm flex-shrink"
              >
                <i class="fi-rr-time-oclock text-base text-red-500"></i>
              </span>
              <span>
                <img
                  class="h-6 inline-block"
                  src="~/assets/img/stripe.png"
                  alt="stripe logo"
                />
              </span>
            </p>
          </div>
          <div>
            <button class="button-outline text-sm">
              Reconnect
            </button>
          </div>
        </li>
        <li class="flex justify-between items-center">
          <div>
            <p class="text-lg font-medium text-gray-700 mb-1 flex items-center space-x-1">
              <span
                class="bg-red-50 rounded-full p-2 h-8 w-8 flex shadow-sm flex-shrink"
              >
                <i class="fi-rr-time-oclock text-base text-red-500"></i>
              </span>
              <span>
                <img
                  class="h-6 inline-block"
                  src="~/assets/img/paypal.png"
                  alt="stripe logo"
                />
              </span>
            </p>
          </div>
          <div>
            <button class="button-outline text-sm">
              Connect
            </button>
          </div>
        </li>
        <li class="flex justify-between items-center">
          <div>
            <p class="text-lg font-medium text-gray-700 mb-1 flex items-center space-x-1">
              <span
                class="invisible bg-red-50 rounded-full p-2 h-8 w-8 flex shadow-sm flex-shrink"
              >
                <i class="fi-rr-marker-time text-base text-red-500"></i>
              </span>
              <span>
                <img
                  class="h-6 inline-block"
                  src="~/assets/img/paypal.png"
                  alt="stripe logo"
                />
              </span>
            </p>
          </div>
          <div>
            <button class="button-outline text-sm">
              Connect
            </button>
          </div>
        </li>
        <li class="flex justify-between items-center">
          <div>
            <p class="text-lg font-medium text-gray-700 mb-1 flex items-center space-x-1">
              <span
                class="invisible bg-red-50 rounded-full p-2 h-8 w-8 flex shadow-sm flex-shrink"
              >
                <i class="fi-rr-marker-time text-base text-red-500"></i>
              </span>
              <span class="flex items-center">
                <i
                  role="button"
                  class="fi-rr-bank mr-2 text-gray-700 h-5 w-5"
                ></i>
                <span class="text-base font-medium">Bank</span>
              </span>
            </p>
          </div>
          <div>
            <button disabled class="button-outline text-sm">
              Setup
            </button>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PaymentConnectionStatus',
  methods: {
    closeModal () {
      this.$emit('closeModal')
    }
  }
}
</script>

<style lang="scss" scoped></style>
