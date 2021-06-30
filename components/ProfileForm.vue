<template>
  <div class="tail-grid tail-gap-4 tail-bg-white tail-px-5 tail-py-10 tail-rounded-md">
    <div>
      <form autocomplete="off" class="tail-grid tail-gap-6">
        <div class="">
          <label for="location" class="form-label">Profile Image</label>
          <div style="cursor: pointer" class="border-dashed tail-flex tail-items-center tail-rounded tail-p-3" @click="selectImage">
            <input
              ref="fileInput"
              type="file"
              name="image"
              class="tail-hidden"
              accept="image/*"
              @change="onChange"
            />
            <div class="tail-h-20 tail-w-20">
              <img
                style="object-fit: cover"
                :class="[!profileInfo.profilePic ? 'tail-p-2' : 'tail-p-0', 'tail-rounded-full', 'tail-w-full',, 'tail-h-full', 'tail-border', 'tail-bg-gray-200']"
                :src="profileInfo.profilePic || 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50'"
              >
            </div>
            <div class="tail-ml-4">
              <template v-if="!profileInfo.profilePic">
                <small class="tail-block"> Drop images here or <u>browse</u> </small>
                <small class="tail-text-gray-400">Image format: jpeg, png or gif</small>
              </template>
              <template v-else>
                <small class="tail-block"> <u>Upload a different image?</u> </small>
              </template>
            </div>
          </div>
        </div>
        <div class="tail-flex tail-justify-between tail-gap-6">
          <div class="tail-w-full">
            <label for="first_name" class="block text-sm font-medium text-gray-700">First name</label>
            <input type="text" :value="$store.state.authorize.getWelpUser.firstName" class="tail-bg-white tail-w-full tail-p-2.5 tail-block sm:tail-text-sm tail-mt-1 tail-border tail-border-gray-300 tail-rounded-md">
          </div>

          <div class="tail-w-full">
            <label for="last_name" class="block text-sm font-medium text-gray-700">Last name</label>
            <input type="text" :value="$store.state.authorize.getWelpUser.lastName" class="tail-bg-white tail-w-full tail-p-2.5 tail-block sm:tail-text-sm tail-mt-1 tail-border tail-border-gray-300 tail-rounded-md">
          </div>
        </div>
        <div class="">
          <label for="email" class="">Email address</label>
          <input type="email" disabled :value="$store.state.authorize.getWelpUser.email" class="tail-w-full tail-bg-white tail-p-2.5 tail-block sm:tail-text-sm tail-mt-1 tail-border tail-border-gray-300 tail-rounded-md tail-bg-gray-200">
        </div>
        <div class="">
          <label for="experience" class="">Age</label>
          <input type="text" class="tail-w-full tail-bg-white tail-p-2.5 tail-block sm:tail-text-sm tail-mt-1 tail-border tail-border-gray-300 tail-rounded-md">
        </div>
        <div class="">
          <label for="location" class="">Location</label>
          <input type="text" :value="$store.state.authorize.getWelpUser.location" class="tail-w-full tail-bg-white tail-p-2.5 tail-block sm:tail-text-sm tail-mt-1 tail-border tail-border-gray-300 tail-rounded-md">
        </div>
        <div class="">
          <label for="business-name" class="">Business Name</label>
          <input type="text" :value="$store.state.authorize.getWelpUser.businessName" class="tail-w-full tail-bg-white tail-p-2.5 tail-block sm:tail-text-sm tail-mt-1 tail-border tail-border-gray-300 tail-rounded-md">
        </div>
        <div class="">
          <label for="url" class="">Website URL</label>
          <input type="text" class="tail-w-full tail-bg-white tail-p-2.5 tail-block sm:tail-text-sm tail-mt-1 tail-border tail-border-gray-300 tail-rounded-md">
        </div>
        <div class="">
          <label for="experience" class="">Years of experience</label>
          <input type="text" :value="$store.state.authorize.getWelpUser.experience" class="tail-w-full tail-bg-white tail-p-2.5 tail-block sm:tail-text-sm tail-mt-1 tail-border tail-border-gray-300 tail-rounded-md">
        </div>
        <div class="">
          <label for="Specialization" class="">Specialization</label>
          <input type="text" class="tail-w-full tail-bg-white tail-p-2.5 tail-block sm:tail-text-sm tail-mt-1 tail-border tail-border-gray-300 tail-rounded-md">
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
<script>
export default {
  name: 'ProfileSetup',
  data () {
    return {
      profileInfo: {
        firstName: '',
        lastName: '',
        businessName: '',
        location: '',
        experience: Array.from(Array(50).keys()),
        specialization: [],
        accreditations: [],
        useOfReinforcement: null,
        profilePic: null,
        // email: this.$route.params.email,
        type: 'trainer',
        status: 'invited'
      }
    }
  },
  methods: {
    selectImage () {
      this.$refs.fileInput.click()
    },
    onChange (e) {
      const files = e.target.files
      this.createImage(files[0])
    },
    createImage (file) {
      this.profilePic = file
      const reader = new FileReader()
      reader.onload = (e) => {
        this.profileInfo.profilePic = e.target.result
      }
      reader.readAsDataURL(file)
    }
  }
}
</script>
<style scoped>
.border-dashed {
  border: 1px solid gray;
  border-style: dashed;
}
</style>
