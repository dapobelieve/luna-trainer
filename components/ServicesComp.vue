<template>
  <div>
    <div class="tail-py-10">
      <h3 class="tail-text-2xl tail-font-medium sec-color">
        Services
      </h3>
      <small class="tail-text-gray-400">Set the types of services you offer and your pricing here...</small>
    </div>
    <div class="tail-pb-4 tail-py-5 tail-px-5 tail-bg-white tail-rounded-md">
      <form autocomplete="off" class="tail-grid tail-gap-6">
        <div class="">
          <label for="services" class="">Services</label>
          <input type="services" class="tail-w-full tail-bg-white tail-p-2.5 tail-block sm:tail-text-sm tail-mt-1 tail-border tail-border-gray-300 tail-rounded-md">
        </div>
        <div class="">
          <div>
            <input type="checkbox">
            <label for="typeofappointment" class="tail-px-2">Type of appointment</label>
          </div>
          <input type="text" class="tail-w-full tail-bg-white tail-p-2.5 tail-block sm:tail-text-sm tail-mt-1 tail-border tail-border-gray-300 tail-rounded-md">
        </div>
        <div class="">
          <label for="price" class="tail-pb-8">Price</label>
          <div class="tail-flex">
            <span class="tail-w-11 tail-h-11 tail-border-r-0 tail-mt-1 tail-text-xl tail-bg-gray-300 tail-text-center tail-rounded-l tail-flex tail-justify-center tail-items-center">£</span>
            <input type="text" class="tail-w-full tail-bg-white tail-p-2.5 tail-block sm:tail-text-sm tail-mt-1 tail-border tail-border-gray-300 tail-border-l-0 tail-rounded-r">
          </div>
        </div>
        <button>
          <div class="tail-flex">
            <i class="ns-add add-icon-color tail-rounded-full tail-text-2xl" />
            <span class="text-primary-color tail-px-4">Add Service</span>
          </div>
        </button>
        <div class="tail-flex tail-justify-end">
          <div class="tail-flex tail-justify-end">
            <button
              style="width: fit-content"
              type="button"
              class="base-button"
            >
              Save Changes
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
