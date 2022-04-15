<template>
  <div class="grid gap-4 mb-4">
    <div class="col-12">
      <h3 class="text-3xl">
        Setup your profile
      </h3>
      <small class="text-gray-400">Kindly provide all necessary information</small>
    </div>
    <div>
      <form autocomplete="off" class="grid gap-6">
        <div class="flex justify-between gap-6">
          <div class="w-full">
            <label for="first_name" class="block text-sm font-medium text-gray-700 required">First name</label>
            <input v-model.trim="$v.profileInfo.firstName.$model" type="text" class="bg-white w-full p-2.5 block sm:text-sm mt-1 border border-gray-300 rounded-md" :class="{ invalid: $v.profileInfo.firstName.$error}" />
            <div v-if="$v.profileInfo.firstName.$error" class="mt-1">
              <small v-if="!$v.profileInfo.firstName.required" class="error text-gray-500">
                Field is required.
              </small>
            </div>
          </div>

          <div class="w-full">
            <label for="last_name" class="block text-sm font-medium text-gray-700 required">Last name</label>
            <input v-model.trim="$v.profileInfo.lastName.$model" type="text" class="bg-white w-full p-2.5 block sm:text-sm mt-1 border border-gray-300 rounded-md" :class="{ invalid: $v.profileInfo.lastName.$error}" />
            <div v-if="$v.$anyDirty" class="mt-1">
              <small v-if="!$v.profileInfo.lastName.required" class="error text-gray-500">
                Field is required.
              </small>
            </div>
          </div>
        </div>
        <div class="">
          <label for="business" class="required">Business Name</label>
          <input v-model.trim="$v.profileInfo.businessName.$model" type="text" class="w-full bg-white p-2.5 block sm:text-sm mt-1 border border-gray-300 rounded-md" :class="{ invalid: $v.profileInfo.businessName.$error}" />
          <div v-if="$v.$anyDirty" class="mt-1">
            <small v-if="!$v.profileInfo.businessName.required" class="error text-gray-500">
              Field is required.
            </small>
          </div>
        </div>
        <div class="">
          <label for="location" class="required">Location</label>
          <input v-model.trim="$v.profileInfo.location.$model" type="text" class="w-full bg-white p-2.5 block sm:text-sm mt-1 border border-gray-300 rounded-md" :class="{ invalid: $v.profileInfo.location.$error}" />
          <div v-if="$v.$anyDirty" class="mt-1">
            <small v-if="!$v.profileInfo.location.required " class="error text-gray-500">
              Field is required.
            </small>
          </div>
        </div>
        <div class="">
          <label for="location" class="form-label">Profile Image</label>
          <div style="cursor: pointer" class="border-dashed flex items-center rounded p-3" @click="selectImage">
            <input
              ref="fileInput"
              type="file"
              name="image"
              class="hidden"
              accept="image/*"
              @change="onChange"
            />
            <div class="h-20 w-20">
              <img
                v-if="!profileInfo.profilePic"
                style="object-fit: cover"
                :class="[ 'p-2', 'rounded-full', 'w-full','h-full', 'border', 'bg-gray-200']"
                src="~/assets/img/avatar-placeholder.gif"
              >
              <img
                v-else
                :class="[ 'p-0', 'rounded-full', 'w-full','h-full', 'border', 'bg-gray-200']"
                style="object-fit: cover"
                :src="profileInfo.profilePic"
              >
            </div>
            <div class="ml-4">
              <template v-if="!profileInfo.profilePic">
                <small class="block"> Drop images here or <u>browse</u> </small>
                <small class="text-gray-400">Image format: jpeg, png or gif</small>
              </template>
              <template v-else>
                <small class="block"> <u>Upload a different image?</u> </small>
              </template>
            </div>
          </div>
        </div>
        <hr>
        <div>
          <label for="experience">Years of experience</label>
          <select
            id="experience"
            v-model="profileInfo.experience"
            type="text"
            class="w-full bg-white p-2.5 block sm:text-sm mt-1 border border-gray-300 rounded-md"
          >
            <option
              v-for="val in 50"
              :key="val"
              :value="parseInt(val) + 1"
            >
              {{ parseInt(val) + 1 }}
            </option>
          </select>
        </div>
        <div>
          <label for="specialise" class="form-label">What do you specialise in?</label>
            <TagInput v-model="profileInfo.specialization" :block="false" />
        </div>
        <div>
          <label for="accreditations" class="form-label">What are your Accreditations ?</label>
            <TagInput v-model="profileInfo.accreditations" :block="false" />
        </div>
        <div>
          <label for="accreditations" class="form-label">
            Do you use positive reinforcement, force free, trust based methods ?
          </label>
          <div class="mt-1">
            <input id="yes" v-model="profileInfo.useOfReinforcement" type="radio" value="true">
            <label for="yes">Yes</label> <br>
            <input id="no" v-model="profileInfo.useOfReinforcement" type="radio" value="false">
            <label for="no">No</label>
          </div>
        </div>
        <div class="flex justify-center">
          <button-spinner :loading="isLoading" :disabled="$v.$invalid" @click.prevent="createProfile">
            Proceed
          </button-spinner>
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
  layout: 'auth',
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
      experience: 0,
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
  mounted () {
    this.$lunaToast.show('Please complete your profile.')
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
      createTrainerProfile: 'profile/createTrainerProfile',
      uploadPicture: 'profile/uploadProfileImage'
    }),

    createProfile () {
      if (!this.disabled) {
        this.isLoading = true
        return this.createTrainerProfile(this.profileInfo).then(async (response) => {
          if (response.status === 'success') {
            this.$lunaToast.show('Profile creations successfully')

            if (this.profilePic) {
              this.$lunaToast.show('Uploading Profile Picture')
              response = await this.uploadProfileImage()
              if (response.success === true) {
                this.$lunaToast.show('Profile picture upload successfully')
              }
            }
            this.$lunaToast.success('Welcome')
            this.$router.push({ name: 'dashboard' })
          }
        }).catch((err) => {
          if (err.response) {
            this.$lunaToast.error(`${err.response.data.message}`)
          } else if (err.request) {
            this.$lunaToast.error('Something went wrong. Try again')
          } else {
            this.$lunaToast.error(`${err.message}`)
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
 .required:after {
    content:" *";
    @apply text-red-500 text-sm;
  }
</style>
