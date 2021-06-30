<template>
  <div>
    <div class="tail-py-6">
      <h3 class="tail-text-3xl tail-font-medium sec-color">
        Security
      </h3>
    </div>
    <div class="tail-pb-4 tail-bg-white profile-form-size tail-px-6 tail-py-3">
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
            type="button"
            class="primary-color tail-text-white tail-border-0 tail-w-100 tail-mt-2 tail-rounded tail-p-1.5"
            @click="$router.push({ name: 'Dashboard' })"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
