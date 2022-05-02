<template>
  <div class="flex flex-col gap-6">
    <div class="flex flex-col gap-1.5">
      <label>Profile image</label>
      <div
        class="border-dashed cursor-pointer flex items-center rounded p-2"
        @dragenter.prevent="dragging = true"
        @dragend.prevent="dragging = false"
        @dragover.prevent
        @drop.prevent="onDropImage($event)"
        @click="() => $refs.fileInput.click()"
      >
        <div
          v-if="dragging"
          class="dragEnter"
          @dragleave.prevent="dragging = false"
        >
          Drop Image Here
        </div>
        <input
          ref="fileInput"
          type="file"
          name="image"
          class="hidden"
          accept="image/*"
          @change="profileImageChange"
        />
        <ClientAvatar
          v-if="!profileImageUrl"
          :width="4.5"
          :height="4.5"
          :client-info="
            !profile.firstName && !profile.lastName
              ? { firstName: 'Get', lastName: 'Welp' }
              : profile
          "
        />
        <img
          v-else
          :class="[
            'p-0',
            'rounded-full',
            'w-16',
            'h-16',
            'border',
            'bg-gray-200',
          ]"
          style="object-fit: cover"
          :src="profileImageUrl"
        />
        <div class="info ml-2">
          <template v-if="!profileImageUrl">
            <p class="">
              Drop images here or <u>browse</u>
            </p>
            <p class="">
              Image format: jpeg, png or gif
            </p>
          </template>
          <template v-else>
            <p>
              <u>Upload a different image?</u>
            </p>
          </template>
        </div>
      </div>
    </div>
    <div class="flex gap-4">
      <div class="flex flex-col gap-1.5 flex-grow">
        <label for="first-name" class="required">First name</label>
        <div class>
          <input
            id="first-name"
            v-model="profile.firstName"
            type="text"
            name="first-name"
            class="bg-white h-10 flex justify-center py-2 px-3 w-full border shadow-sm rounded-md focus:outline-none focus:bg-white focus:border-blue-500"
            :class="{ 'border-red-500': $v.profile.firstName.$invalid }"
          />
        </div>
      </div>
      <div class="flex flex-col gap-1.5 flex-grow">
        <label for="last-name" class="required">Last name</label>
        <div class>
          <input
            id="last-name"
            v-model="profile.lastName"
            type="text"
            name="last-name"
            class="bg-white h-10 flex justify-center py-2 px-3 w-full border shadow-sm rounded-md focus:outline-none focus:bg-white focus:border-blue-500"
            :class="{ 'border-red-500': $v.profile.lastName.$invalid }"
          />
        </div>
      </div>
    </div>
    <div class="flex flex-col gap-1.5">
      <PhoneComponent v-model="profile.phoneNumber" />
    </div>
    <div class="flex flex-col gap-1.5">

        <label for="pronouns" class="">
          <span>
            <span class="text-sm md:gap-3">Preferred pronouns</span>
            <span class="text-sm md:gap-3">This helps us understand the best way to address you.</span>
          </span>
        </label>
        <select
          v-model="pronouns"
          autocomplete="country"
          class="bg-white h-10 flex justify-center py-2 px-3 w-full border shadow-sm rounded-md focus:outline-none focus:bg-white focus:border-blue-500"
        >
          <option value="She / Her">
            She / Her
          </option>
          <option value="They / Them">
            They / Them
          </option>
          <option value="He / Him">
            He / Him
          </option>
        </select>
    </div>
    <div class="flex flex-col gap-1.5">
      <label for="country" class="required">Where are you based?</label>
      <select
        v-model="profile.businessCountry"
        autocomplete="country"
        class="bg-white h-10 flex justify-center py-2 px-3 w-full border shadow-sm rounded-md focus:outline-none focus:bg-white focus:border-blue-500"
        :class="{'border-red-500' : $v.profile.businessCountry.$invalid}"
      >
        <option v-for="country in countries" :key="country.numericCode">
          {{ country.name }}
        </option>
      </select>
    </div>
  </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
import countries from '~/countries.json'
export default {
  name: 'AboutYou',
  props: ['value'],
  data () {
    return {
      countries,
      profile: this.value,
      profileImageUrl: this.$auth.user.imgURL,
      profileImageData: null,
      dragging: false
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
      location: {
        required
      },
      businessCountry: {
        required
      }
    }
  },
  watch: {
    profile: {
      handler (newValue) {
        this.$emit('change', newValue)
        this.$emit('validation', this.$v.$invalid)
      },
      immediate: true,
      deep: true
    }
  },
  computed: {
     pronouns: {
      get () { return this.profile.pronouns },
      set (val) {
        this.profile.pronouns = val
      }
    },
  },
  methods: {
    onDropImage (event) {
      const fileType = event.dataTransfer.files[0].type.split('/')[0] === 'image'
      if (fileType) {
        const files = event.dataTransfer.files
        const reader = new FileReader()
        this.profileImageData = files[0]
        reader.onload = (e) => {
          this.profileImageUrl = e.target.result
          this.$emit('change-image', files[0])
        }
        reader.readAsDataURL(this.profileImageData)
      } else {
        this.$lunaToast.error('File is not an image')
      }
      this.dragging = false
    },
    profileImageChange (e) {
      const files = e.target.files
      const reader = new FileReader()
      this.profileImageData = files[0]
      reader.onload = (e) => {
        this.profileImageUrl = e.target.result
        this.$emit('change-image', files[0])
      }
      reader.readAsDataURL(this.profileImageData)
    }
  }
}
</script>

<style lang="scss" scoped></style>
