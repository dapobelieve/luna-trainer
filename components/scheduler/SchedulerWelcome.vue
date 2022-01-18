<template>
  <modal name="scheduler-modal" class="p-0" height="auto" :adaptive="true">
    <img class="w-full" src="~/assets/img/scheduler.svg">
    <div class="grid m-6">
      <div class="py-0">
        <div class="text-left mb-2 font-medium text-2xl">
          <h3>Welcome to your scheduler</h3>
        </div>
        <p class="text-left mb-8 w-50">
          So, you’ve made it this far! We want to give you the best chance of getting most out of the platform so we’re going to run you through a quick tour of the product so you can easily use GetWelp!
        </p>
        <div class="flex justify-start gap-5">
          <button class="bg-blue-500 py-2 px-4 text-white" style="width:fit-content" @click="$emit('tour')">
            Take the Tour
          </button>
          <button class="py-2 px-4 text-primary-color" style="width:fit-content" @click="$emit('close')">
            Explore by myself
          </button>
        </div>
      </div>
    </div>
  </modal>
</template>
