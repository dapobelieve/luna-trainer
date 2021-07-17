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
            <input v-model.trim="$v.profileInfo.firstName.$model" type="text" class="tail-bg-white tail-w-full tail-p-2.5 tail-block sm:tail-text-sm tail-mt-1 tail-border tail-border-gray-300 tail-rounded-md" :class="{ invalid: $v.profileInfo.firstName.$error}" />
            <div v-if="$v.profileInfo.firstName.$error" class="tail-mt-2">
              <small v-if="!$v.profileInfo.firstName.required" class="error tail-text-red-500">
                Field is required.
              </small>
            </div>
          </div>

          <div class="tail-w-full">
            <label for="last_name" class="block text-sm font-medium text-gray-700">Last name</label>
            <input v-model.trim="$v.profileInfo.lastName.$model" type="text" class="tail-bg-white tail-w-full tail-p-2.5 tail-block sm:tail-text-sm tail-mt-1 tail-border tail-border-gray-300 tail-rounded-md" :class="{ invalid: $v.profileInfo.lastName.$error}" />
            <div v-if="$v.profileInfo.lastName.$error" class="tail-mt-2">
              <small v-if="!$v.profileInfo.lastName.required" class="error tail-text-red-500">
                Field is required.
              </small>
            </div>
          </div>
        </div>
        <div class="">
          <label for="business" class="">Business Name</label>
          <input v-model.trim="$v.profileInfo.businessName.$model" type="text" class="tail-w-full tail-bg-white tail-p-2.5 tail-block sm:tail-text-sm tail-mt-1 tail-border tail-border-gray-300 tail-rounded-md" :class="{ invalid: $v.profileInfo.businessName.$error}" />
          <div v-if="$v.profileInfo.businessName.$error" class="tail-mt-2">
            <small v-if="!$v.profileInfo.businessName.required" class="error tail-text-red-500">
              Field is required.
            </small>
          </div>
        </div>
        <div class="">
          <label for="location" class="">Location</label>
          <input v-model.trim="$v.profileInfo.location.$model" type="text" class="tail-w-full tail-bg-white tail-p-2.5 tail-block sm:tail-text-sm tail-mt-1 tail-border tail-border-gray-300 tail-rounded-md" :class="{ invalid: $v.profileInfo.location.$error}" />
          <div v-if="$v.profileInfo.location.$error" class="tail-mt-2">
            <small v-if="!$v.profileInfo.location.required" class="error tail-text-red-500">
              Field is required.
            </small>
          </div>
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
          <tag-input v-model="profileInfo.specialization" :block="false" />
        </div>
        <div class="">
          <label
            for="accreditations"
            class="form-label"
          >What are your Accreditations?</label>
          <tag-input v-model="profileInfo.accreditations" :block="false" />
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
          <button :disabled="isLoading" class="base-button">
            <SingleLoader v-if="isLoading" class="tail-mr-2" />
            {{ isLoading ? 'Setting Up User...' : 'Proceed' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import { required } from 'vuelidate/lib/validators'
import { mapActions } from 'vuex'

export default {
  name: 'ProfileSetup',
  layout: 'authLayout',
  data: () => ({
    isLoading: false,
    profilePic: null,
    imgUrl: null,
    specialsInput: '',
    accreditationInput: '',
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
      type: 'trainer',
      status: 'invited'
    }
  }),
  head () {
    return {
      title: 'Profile Setup'
    }
  },
  computed: {
    disabled () {
      for (const key in this.profileInfo) {
        if (this.profileInfo[key] === null || this.profileInfo[key] === '' || Array.isArray(this.profileInfo.experience)) {
          return true
        }
      }
      return false
    }
  },
  mounted () {
    this.$toast.info('Please complete your profile.', { position: 'top-right' })
  },
  auth: false,
  validations: {
    profileInfo: {
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
  },
  methods: {
    ...mapActions({
      createTrainerProfile: 'authorize/createTrainerProfile',
      uploadPicture: 'authorize/uploadProfileImage',
      getQbInfo: 'qb/getQbInfo'
    }),

    createProfile () {
      if (!this.disabled) {
        this.isLoading = true
        return this.createTrainerProfile(this.profileInfo).then((response) => {
          if (response.status === 'success') {
            this.uploadProfileImage()
            return this.getQbInfo().then((response) => {
              if (response.success === true) {
                this.$toast.success('Welcome', { position: 'bottom-right' })
                this.$router.push({ name: 'Dashboard' })
              }
            }).catch(err => console.log('error', err))
          }
        }).catch((err) => {
          if (err.response) {
            this.$toast.error(`Something went wrong: ${err.response.data.message}`, { position: 'bottom-right' })
          } else if (err.request) {
            this.$toast.error('Something went wrong. Try again', { position: 'bottom-right' })
          } else {
            this.$toast.error(`Something went wrong: ${err.message}`, { position: 'bottom-right' })
          }
        }).finally(() => {
          this.isLoading = false
        })
      }
    },
    uploadProfileImage () {
      const imageData = new FormData()
      imageData.append('file', this.profilePic)
      return this.uploadPicture(imageData)
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
