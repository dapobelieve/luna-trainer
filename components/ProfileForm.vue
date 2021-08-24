<template>
  <div class="tail-grid tail-gap-4 tail-bg-white tail-px-5 tail-py-10 tail-rounded-md">
    <div>
      <form autocomplete="off" class="tail-grid tail-gap-6">
        <div>
          <label for="location" class="form-label">Profile Image</label>
          <div style="cursor: pointer" class="border-dashed tail-flex tail-items-center tail-rounded tail-p-3" @click="()=>this.$refs.fileInput.click()">
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
                v-if="!profileImageUrl"
                style="object-fit: cover"
                :class="[ 'tail-p-2', 'tail-rounded-full', 'tail-w-full','tail-h-full', 'tail-border', 'tail-bg-gray-200']"
                src="~/assets/img/avatar-placeholder.gif"
              >
              <img
                v-else
                :class="[ 'tail-p-0', 'tail-rounded-full', 'tail-w-full','tail-h-full', 'tail-border', 'tail-bg-gray-200']"
                style="object-fit: cover"
                :src="profileImageUrl"
              >
            </div>
            <div class="tail-ml-4">
              <template v-if="!profileImageUrl">
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
            <input type="text" :value="profile.firstName" class="tail-bg-white tail-w-full tail-p-2.5 tail-block sm:tail-text-sm tail-mt-1 tail-border tail-border-gray-300 tail-rounded-md">
          </div>

          <div class="tail-w-full">
            <label for="last_name" class="block text-sm font-medium text-gray-700">Last name</label>
            <input type="text" :value="profile.lastName" class="tail-bg-white tail-w-full tail-p-2.5 tail-block sm:tail-text-sm tail-mt-1 tail-border tail-border-gray-300 tail-rounded-md">
          </div>
        </div>
        <div>
          <label for="email">Email address</label>
          <input disabled type="email" :value="profile.email" class="tail-w-full tail-bg-white tail-p-2.5 tail-block sm:tail-text-sm tail-mt-1 tail-border tail-border-gray-300 tail-rounded-md tail-bg-gray-200">
        </div>
        <div>
          <label for="location">Location</label>
          <input type="text" :value="profile.location" class="tail-w-full tail-bg-white tail-p-2.5 tail-block sm:tail-text-sm tail-mt-1 tail-border tail-border-gray-300 tail-rounded-md">
        </div>
        <div>
          <label for="business-name">Business Name</label>
          <input disabled type="text" :value="profile.businessName" class="tail-w-full tail-bg-white tail-p-2.5 tail-block sm:tail-text-sm tail-mt-1 tail-border tail-border-gray-300 tail-rounded-md">
        </div>
        <div>
          <label for="url">Website URL</label>
          <input v-model="profile.webURL" type="website" class="tail-w-full tail-bg-white tail-p-2.5 tail-block sm:tail-text-sm tail-mt-1 tail-border tail-border-gray-300 tail-rounded-md">
        </div>
        <div>
          <label for="experience">Years of experience</label>
          <input type="text" :value="profile.experience" class="tail-w-full tail-bg-white tail-p-2.5 tail-block sm:tail-text-sm tail-mt-1 tail-border tail-border-gray-300 tail-rounded-md">
        </div>
        <div>
          <label for="Specialization">Specialization</label>
          <settings-tag-input v-model="profile.specialization" :tabindex="9" />
        </div>
        <div>
          <label for="Specialization">Accreditations</label>
          <settings-tag-input v-model="profile.accreditations" :tabindex="10" />
        </div>
        <div class="tail-flex tail-justify-end">
          <button-spinner :loading="loading" type="button" style="width:fit-content" @click="submit">
            Update profile
          </button-spinner>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import { required } from 'vuelidate/lib/validators'

export default {
  name: 'ProfileSetup',
  data () {
    return {
      profile: this.$auth.user,
      profileImageUrl: this.$auth.user.imgURL,
      profileImageData: null,
      loading: false,
      disabled: false
    }
  },
  methods: {
    ...mapActions({
      updateProfile: 'profile/updateProfile',
      uploadPicture: 'profile/uploadProfileImage'
    }),
    submit () {
      console.log(this.profile)
      if (!this.disabled) {
        this.loading = true
        return this.updateProfile(this.profile).then(async (response) => {
          if (response.status === 'success') {
            if (this.profileImageUrl !== this.profile.imgURL) {
              this.loading = true
              await this.uploadProfileImage()
              this.loading = false
              this.$toast.success('Updated profile successfully')
            } else {
              this.$toast.success('Updated profile successfully')
            }
          }
        }).catch((err) => {
          if (err.response) {
            this.$toast.error(`Something went wrong: ${err.response.data.error || err.response.data.message}`, { position: 'bottom-right' })
          }
        }).finally(() => {
          this.loading = false
        })
      }
    },
    uploadProfileImage () {
      const imageData = new FormData()
      imageData.append('file', this.profileImageData)
      return this.uploadPicture(imageData)
    },
    onChange (e) {
      const files = e.target.files
      const reader = new FileReader()
      this.profileImageData = files[0]
      reader.onload = (e) => {
        this.profileImageUrl = e.target.result
      }
      reader.readAsDataURL(this.profileImageData)
    }
  },
  validations: {
    profile: {
      firstName: {
        required
      },
      lastName: {
        required
      },
      businessName: {
        required
      },
      location: {
        required
      }
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
