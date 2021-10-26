<template>
  <div>
    <div class="pb-4 py-5 px-5 rounded-md bg-white">
      <form autocomplete="off" class="grid gap-6">
        <p v-if="stripconnect">
          Connected to Stripe
        </p>
        <p v-else>
          Connected Accounts
        </p>
        <div><span>Connected accounts</span></div>
        <div class="border w-full rounded flex justify-between p-4">
          <div class="flex justify-between items-center">
            <div>
              <img class="h-6" src="~/assets/img/strip.png" alt="google logo">
            </div>
          </div>

          <button class="border-2 border-gray-500 px-2 py-1 rounded-md">
            Connect with Stripe
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
