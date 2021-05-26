<template>
  <div class="d-grid gap-4">
    <div class="col-12">
      <h3>Setup your profile</h3>
      <small class="text-muted">Kindly provide all necessary information</small>
    </div>
    <div>
      <form class="d-grid gap-4">
        <div class="row">
          <div class="col-md-6">
            <label for="firstname" class="form-label">First name</label>
            <input id="firstname" type="text" class="form-control">
          </div>
          <div class="col-md-6">
            <label for="lastname" class="form-label">Last name</label>
            <input id="lastname" type="text" class="form-control">
          </div>
        </div>
        <div class="">
          <label for="location" class="form-label">Location</label>
          <input id="location" type="text" class="form-control">
        </div>
        <div class="">
          <label
            for="location"
            class="form-label"
          >Profile Image</label>
          <div class="border-dashed d-flex align-items-center rounded p-2">
            <img class="p-4 rounded-circle border bg-info" src="~/assets/img/user.svg">
            <div class="ms-4">
              <small class="d-block"> Drop images here or <u>browse</u> </small>
              <small class="text-muted">Image format: jpeg, png or gif</small>
            </div>
          </div>
        </div>
        <hr>
        <div class="">
          <label
            for="experience"
            class="form-label"
          >Years of experience</label>
          <input id="experience" type="text" class="form-control">
        </div>
        <div class="">
          <label
            for="specialise"
            class="form-label"
          >What do you specialise in?</label>
          <input id="specialise" type="text" class="form-control">
          <small
            class="text-muted"
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
        <button
          type="submit"
          class="btn primary-color text-white border-0 w-100 mt-2"
        >
          Proceed
        </button>
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
.border-dashed{
    border: 1px solid gray;
    border-style: dashed;
}
</style>
