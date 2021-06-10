<template>
  <div>
    <div class="tail-py-5">
      <div class="tail-flex tail-justify-between tail-px-24">
        <div class="tail-relative">
          <div class="tail-sticky">
            <h3 class="tail-text-3xl tail-font-medium sec-color">
              Settings
            </h3>
            <div class="tail-pt-5">
              <SettingsNav />
            </div>
          </div>
        </div>

        <div class="tail-w-4/5">
          <div>
            <div class="tail-pb-4">
              <h3 class="tail-text-3xl tail-font-medium sec-color">
                Profile
              </h3>
              <small class="tail-text-gray-400">Kindly provide all necessary information</small>
            </div>
            <div class="tail-pt-5 tail-bg-white profile-form-size tail-p-3">
              <ProfileForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>
