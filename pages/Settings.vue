<template>
  <div>
    <div class="tail-py-5">
      <div class="tail-flex tail-justify-between tail-px-24">
        <div class="tail-relative">
          <div class="tail-sticky">
            <h3 class="tail-text-2xl tail-font-medium sec-color">
              Settings
            </h3>
            <div class="tail-pt-5">
              <SettingsNav />
            </div>
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
              <ProfileForm id="profile" />
              <ServicesComp id="services" />
              <SecurityComp id="security" />
              <BankDetails v-if="$store.state.authorize.stripeConnected" id="bankDeets" />
              <ConnectGoogleComp id="connect" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Settings'
}
</script>

<style></style>
