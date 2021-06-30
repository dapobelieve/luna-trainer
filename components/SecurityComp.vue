<template>
  <div>
    <div class="tail-py-6">
      <h3 class="tail-text-2xl tail-font-medium sec-color">
        Security
      </h3>
    </div>
    <div class="tail-pb-4 tail-py-5 tail-px-5 tail-rounded-md tail-bg-white">
      <form autocomplete="off" class="tail-grid tail-gap-6">
        <div class="">
          <label for="password1" class="">Current Password</label>
          <input type="password" class="tail-w-full tail-bg-white tail-p-2.5 tail-block sm:tail-text-sm tail-mt-1 tail-border tail-border-gray-300 tail-rounded-md">
        </div>
        <div class="">
          <label for="password2" class="tail-px-2">New Password</label>
          <input type="password" class="tail-w-full tail-bg-white tail-p-2.5 tail-block sm:tail-text-sm tail-mt-1 tail-border tail-border-gray-300 tail-rounded-md">
        </div>
        <div class="tail-flex tail-justify-end">
          <button
            style="width: fit-content"
            type="button"
            class="base-button"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
