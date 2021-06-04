<template>
  <div class="tail-grid tail-gap-4 tail-pb-4 md:tail-pb-0">
    <div class="tail-col-12">
      <h3>Setup your profile</h3>
      <small class="tail-text-gray-400">Kindly provide all necessary information</small>
    </div>
    <div>
      <form>
        <div class="tail-grid tail-gap-4">
          <div class="tail-col-6 tail-pb-4 md:tail-pb-0">
            <label for="firstname" class="form-label">First name</label>
            <input id="firstname" type="text" class="form-control">
          </div>
          <div class="tail-col-6">
            <label for="lastname" class="form-label">Last name</label>
            <input id="lastname" type="text" class="form-control">
          </div>
        </div>
        <div class="">
          <label for="location" class="form-label">Location</label>
          <input id="location" type="text" class="form-control">
        </div>
        <div class="">
          <label for="location" class="form-label">Profile Image</label>
          <div class="border-dashed tail-flex tail-align-center tail-rounded tail-p-2">
            <img
              class="tail-p-4 tail-rounded-full tail-border tail-bg-gray-200"
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
          <label for="experience" class="form-label">Years of experience</label>
          <input id="experience" type="text" class="form-control">
        </div>
        <div class="">
          <label
            for="specialise"
            class="form-label"
          >What do you specialise in?</label>
          <input id="specialise" type="text" class="form-control">
          <small
            class="tail-text-gray-400"
          >Use comma to separate more than one specialisation.</small>
        </div>
        <div class="">
          <label
            for="accreditations"
            class="form-label"
          >What are your Accreditations?</label>
          <input id="accreditations" type="text" class="form-control">
        </div>
        <div class="">
          <label
            for="accreditations"
            class="form-label"
          >Do you use positive reinforcement, force free, trust based
            methods?</label>
          <div>
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
  layout: 'authLayout'
}
</script>
<style scoped>
.border-dashed {
  border: 1px solid gray;
  border-style: dashed;
}
</style>
