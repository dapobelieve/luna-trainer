<template>
  <client-only>
    <div>
      <PageHeader>
        <template v-slot:title>
          Settings
        </template>
      </PageHeader>
      <div class="tail-py-5">
        <div class="tail-flex tail-justify-between tail-px-10">
          <div class="tail-relative">
            <div class="tail-sticky tail-top-6 tail-pt-10">
              <SettingsNavigation />
            </div>
          </div>

          <div class="tail-w-4/5">
            <div>
              <div>
                <h3 class="tail-text-2xl tail-font-medium sec-color">
                  Profile
                </h3>
                <small
                  class="tail-text-gray-500 tail-text-xs"
                >Your personal information will be public to your clients,
                  kindly ensure it is as accurate as possible</small>
              </div>
              <div class="tail-pt-4 tail-my-3 tail-max-w-xl tail-rounded-md">
                <ProfileForm id="profile" v-model="user" />
                <SettingsServices id="services" :services="user.services" />
                <SettingsSecurity id="security" v-model="user" />
                <!-- <BankDetails v-if="this.user.stripeConnected" id="bankDetails" /> -->
                <SettingsIntegration id="connect" :user="user" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </client-only>
</template>

<script>

import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Settings',
  head () {
    return {
      title: 'Settings'
    }
  },
  computed: {
    ...mapGetters({
      user: 'authorize/getUser'
    })
  },
  async mounted () {
    await this.getUserProfile()
  },
  methods: {
    ...mapActions({
      getUserProfile: 'authorize/getUserProfile'
    })
  }
}
</script>

<style></style>
