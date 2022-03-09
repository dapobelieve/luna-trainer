<template>
  <div class="parent-container bg-white rounded-xl min-h-screen">
    <h2 class="heading text-xl text-gray-700 font-normal pb-4 p-4">
      Profile
    </h2>
    <tabbed-items :links="['About You', 'Business Info', 'As a trainer', 'Localization']">
      <template v-slot:tabviews="{ tab }">
        <div class="mx-auto" style="max-width: 448px">
          <profile-settings-about-you v-if="tab === 1" v-model="profile" @change="profile = $event" @validation="disableButton = $event" />
          <profile-settings-business-info v-if="tab === 2" v-model="profile" @change="profile = $event" @validation="disableButton = $event" />
          <profile-settings-trainer-info v-if="tab === 3" v-model="profile" @change="profile = $event" @validation="disableButton = $event" />
          <profile-settings-localization-info v-if="tab === 4" v-model="profile" @change="profile = $event" @validation="disableButton = $event" />
          <div class="flex justify-end mt-6">
            <button-spinner
              style="width:fit-content"
              :disabled="disableButton"
              :loading="isLoading"
              @click="update"
            >
              Update
            </button-spinner>
          </div>
        </div>
      </template>
    </tabbed-items>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      profile: JSON.parse(JSON.stringify(this.$auth.user)),
      isLoading: false,
      disableButton: true
    }
  },
  methods: {
    ...mapActions('profile', {
      updateProfile: 'updateProfile',
      uploadPicture: 'uploadProfileImage'
    }),
    async update () {
      this.isLoading = true
      return await this.updateProfile(this.profile).then(async (response) => {
        if (response.status === 'success') {
          if (this.profileImageUrl !== this.profile.imgURL) {
            await this.uploadProfileImage()
            this.$gwtoast.success('Updated profile successfully')
          } else {
            this.$gwtoast.success('Updated profile successfully')
          }
        }
      }).catch((err) => {
        if (err.response) {
          this.$gwtoast.error(`Something went wrong: ${err.response.data.error || err.response.data.message}`, { position: 'bottom-right' })
        }
      }).finally(() => {
        this.isLoading = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.parent-container {
  border: 1px solid #e2e8f0;
}

.heading {
  line-height: 28px;
}

.content {
  @apply mx-auto;
  width: 448px;

  .section-title {
    @apply text-gray-500 text-xs font-medium pb-6;
    line-height: 16px;
  }
}

.border-dashed {
  @apply p-2 rounded-md relative;
    border: 1px dashed #E2E8F0;
    border-style: dashed;

    .info {
      @apply ml-4;
      p:first-child {
        @apply text-gray-700 text-base font-normal;
        line-height: 24px;
      }
      p{
        @apply font-normal text-gray-500 text-sm;
        line-height: 20px;
      }
    }
}

.dragEnter {
  @apply rounded-md absolute bg-gray-100 grid place-content-center;
  border: 1px dashed #E2E8F0;
  padding: 0.5em;
  inset: 0.5em;
}
</style>
