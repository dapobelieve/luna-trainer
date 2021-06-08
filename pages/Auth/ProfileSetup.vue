<template>
  <div class="tail-grid tail-gap-4 tail-mb-4">
    <div class="tail-col-12">
      <h3 class="tail-text-3xl">Setup your profile</h3>
      <small class="tail-text-gray-400">Kindly provide all necessary information</small>
    </div>
    <div>
      <form autocomplete="off" class="tail-grid tail-gap-6">
        <div class="tail-flex tail-justify-between tail-gap-6">
          <div class="tail-w-full">
            <label for="first_name" class="block text-sm font-medium text-gray-700">First name</label>
            <input type="text" class="tail-bg-white tail-w-full tail-p-2.5 tail-block sm:tail-text-sm tail-mt-1 tail-border tail-border-gray-300 tail-rounded-md" />
          </div>

          <div class="tail-w-full">
            <label for="last_name" class="block text-sm font-medium text-gray-700">Last name</label>
            <input type="text" class="tail-bg-white tail-w-full tail-p-2.5 tail-block sm:tail-text-sm tail-mt-1 tail-border tail-border-gray-300 tail-rounded-md" />
          </div>
        </div>
        <div class="">
          <label for="location" class="">Location</label>
          <input type="text" class="tail-w-full tail-bg-white tail-p-2.5 tail-block sm:tail-text-sm tail-mt-1 tail-border tail-border-gray-300 tail-rounded-md" />
        </div>
        <div class="">
          <label for="location" class="form-label">Profile Image</label>
          <div class="border-dashed tail-flex tail-items-center tail-rounded tail-p-3">
            <img
              class="tail-p-8 tail-rounded-full tail-border tail-bg-gray-200"
              src="~/assets/img/user.svg"
            >
            <div class="tail-ml-4">
              <small class="tail-block"> Drop images here or <u>browse</u> </small>
              <small class="tail-text-gray-400">Image format: jpeg, png or gif</small>
            </div>
          </div>
        </div>
        <hr>
        <div class="">
          <label for="experience" class="">Years of experience</label>
          <input type="text" class="tail-w-full tail-bg-white tail-p-2.5 tail-block sm:tail-text-sm tail-mt-1 tail-border tail-border-gray-300 tail-rounded-md" />
        </div>
        <div class="">
          <label
            for="specialise"
            class="form-label"
          >What do you specialise in?</label>
          <input type="text" class="tail-w-full tail-bg-white tail-p-2.5 tail-block sm:tail-text-sm tail-mt-1 tail-border tail-border-gray-300 tail-rounded-md" />
          <small
            class="tail-text-gray-400"
          >Use comma to separate more than one specialisation.</small>
        </div>
        <div class="">
          <label
            for="accreditations"
            class="form-label"
          >What are your Accreditations?</label>
          <input type="text" class="tail-w-full tail-bg-white tail-p-2.5 tail-block sm:tail-text-sm tail-mt-1 tail-border tail-border-gray-300 tail-rounded-md" />
        </div>
        <div class="">
          <label
            for="accreditations"
            class="form-label"
          >Do you use positive reinforcement, force free, trust based
            methods?</label>
          <div class="tail-mt-1">
            <input id="yes" type="radio" name="methods" value="yes">
            <label for="yes">Yes</label> <br>
            <input id="no" type="radio" name="methods" value="no">
            <label for="no">No</label>
          </div>
        </div>
        <div class="tail-flex tail-justify-center">
          <button
            type="button"
            class="primary-color tail-text-white tail-border-0 tail-w-100 tail-mt-2 tail-rounded tail-p-1.5 btn-size"
            @click="$router.push({ name: 'Dashboard' })"
          >
            Proceed
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ProfileSetup',
  layout: 'authLayout',
  auth: false
}
</script>
<style scoped>
.border-dashed {
  border: 1px solid gray;
  border-style: dashed;
}
</style>
