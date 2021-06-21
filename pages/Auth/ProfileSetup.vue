<template>
  <div class="tail-grid tail-gap-4 tail-mb-4">
    <div class="tail-col-12">
      <h3 class="tail-text-3xl">
        Setup your profile
      </h3>
      <small class="tail-text-gray-400">Kindly provide all necessary information</small>
    </div>
    <div>
      <form autocomplete="off" class="tail-grid tail-gap-6" @submit.prevent="createProfile">
        <div class="tail-flex tail-justify-between tail-gap-6">
          <div class="tail-w-full">
            <label for="first_name" class="block text-sm font-medium text-gray-700">First name</label>
            <input v-model.trim="profileInfo.firstName" type="text" class="tail-bg-white tail-w-full tail-p-2.5 tail-block sm:tail-text-sm tail-mt-1 tail-border tail-border-gray-300 tail-rounded-md" />
          </div>

          <div class="tail-w-full">
            <label for="last_name" class="block text-sm font-medium text-gray-700">Last name</label>
            <input v-model.trim="profileInfo.lastName" type="text" class="tail-bg-white tail-w-full tail-p-2.5 tail-block sm:tail-text-sm tail-mt-1 tail-border tail-border-gray-300 tail-rounded-md" />
          </div>
        </div>
        <div class="">
          <label for="location" class="">Location</label>
          <input v-model.trim="profileInfo.location" type="text" class="tail-w-full tail-bg-white tail-p-2.5 tail-block sm:tail-text-sm tail-mt-1 tail-border tail-border-gray-300 tail-rounded-md" />
        </div>
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
        <hr>
        <div class="">
          <label for="experience" class="">Years of experience</label>
          <select
            id="experience"
            v-model="profileInfo.experience"
            type="text"
            class="tail-w-full tail-bg-white tail-p-2.5 tail-block sm:tail-text-sm tail-mt-1 tail-border tail-border-gray-300 tail-rounded-md"
          >
            <option
              v-for="val in profileInfo.experience"
              :key="val"
              :value="parseInt(val) + 1"
            >
              {{ parseInt(val) + 1 }}
            </option>
          </select>
        </div>
        <div class="">
          <label
            for="specialise"
            class="form-label"
          >What do you specialise in?</label>
          <input v-model.trim="profileInfo.specialization" type="text" class="tail-w-full tail-bg-white tail-p-2.5 tail-block sm:tail-text-sm tail-mt-1 tail-border tail-border-gray-300 tail-rounded-md" />
          <small
            class="tail-text-gray-400"
          >Use comma to separate more than one specialisation.</small>
        </div>
        <div class="">
          <label
            for="accreditations"
            class="form-label"
          >What are your Accreditations?</label>
          <input v-model.trim="profileInfo.accreditations" type="text" class="tail-w-full tail-bg-white tail-p-2.5 tail-block sm:tail-text-sm tail-mt-1 tail-border tail-border-gray-300 tail-rounded-md" />
          <small
            class="tail-text-gray-400"
          >Use comma to separate more than one specialisation.</small>
        </div>
        <div class="">
          <label
            for="accreditations"
            class="form-label"
          >Do you use positive reinforcement, force free, trust based
            methods?</label>
          <div class="tail-mt-1">
            <input id="yes" v-model="profileInfo.useOfReinforcement" type="radio" value="true">
            <label for="yes">Yes</label> <br>
            <input id="no" v-model="profileInfo.useOfReinforcement" type="radio" value="false">
            <label for="no">No</label>
          </div>
        </div>
        <div class="tail-flex tail-justify-center">
          <button
            :disabled="disabled"
            type="submit"
            class="primary-color tail-text-white tail-border-0 tail-w-100 tail-mt-2 tail-rounded tail-p-1.5 btn-size"
          >
            Proceed
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  // check if user is coming from signin or signup page
  name: 'ProfileSetup',
  beforeRouteEnter (to, from, next) {
    if (from.name === 'Auth-SignIn' || from.name === 'Auth-SignUp') {
      next((vm) => {
        vm.$nextTick(function () {
          setTimeout(() => {
            this.$toast.info('Please complete your profile.', { position: 'top-right' })
          }, 4100)
        })
      })
    } else {
      next({ name: 'Auth-SignIn' })
    }
  },
  layout: 'authLayout',
  auth: false,
  data: () => ({
    profilePic: null,
    imgUrl: null,
    profileInfo: {
      firstName: '',
      lastName: '',
      location: '',
      experience: Array.from(Array(50).keys()),
      specialization: '',
      accreditations: null,
      useOfReinforcement: null,
      profilePic: null,
      // email: this.$route.params.email,
      type: 'trainer',
      status: 'invited'
    }
  }),
  computed: {
    disabled () {
      for (const key in this.profileInfo) {
        // eslint-disable-next-line curly
        if (this.profileInfo[key] === null || this.profileInfo[key] === '' || Array.isArray(this.profileInfo.experience))
          return true
      }
      return false
    }
  },
  methods: {
    ...mapActions({
      createTrainerProfile: 'createTrainerProfile',
      uploadPicture: 'uploadProfileImage'
    }),
    createProfile () {
      if (!this.disabled) {
        const picture = this.profilePic
        const imageData = new FormData()
        imageData.append('file', picture)
        return this.uploadPicture(imageData).then((response) => {
          console.log('response from uploading picture', response)
          if (response.status === 'success' && response.data) {
            const profileInfo = this.profileInfo
            delete profileInfo.profilePic
            const newProfile = {
              ...profileInfo,
              imgURL: response.data
            }
            return this.createTrainerProfile(newProfile).then((response) => {
              console.log('response creating profile', response)
            }).catch((err) => {
              if (err.response) {
                this.$toast.error(`Something went wrong: ${err.response.data.message}`, { position: 'bottom-right' })
              } else if (err.request) {
                this.$toast.error('Something went wrong. Try again', { position: 'bottom-right' })
              } else {
                this.$toast.error(`Something went wrong: ${err.message}`, { position: 'bottom-right' })
              }
            })
          }
        }).catch((err) => {
          if (err.response) {
            this.$toast.error(`Something went wrong: ${err.response.data.message}`, { position: 'bottom-right' })
          } else if (err.request) {
            this.$toast.error('Something went wrong. Try again', { position: 'bottom-right' })
          } else {
            this.$toast.error(`Something went wrong: ${err.message}`, { position: 'bottom-right' })
          }
        })
      }
      return this.createTrainerProfile(this.profileInfo).then((result) => {
        if (result) {
          this.$router.push({
            name: 'Dashboard'
          })
        }
      }).catch((err) => {
        console.log(err)
      })
    },
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
