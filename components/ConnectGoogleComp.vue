<template>
  <div>
    <div class="tail-py-6">
      <h3 class="tail-text-3xl tail-font-medium sec-color">
        Connect
      </h3>
    </div>
    <div class="tail-pb-4 tail-bg-white profile-form-size tail-px-6 tail-py-3">
      <form autocomplete="off" class="tail-grid tail-gap-6">
        <div><span>Connected accounts</span></div>
        <div class="tail-border tail-w-full tail-rounded tail-flex tail-justify-between tail-p-4">
          <div class="tail-flex tail-justify-between">
            <div>
              <img class="tail-w-full tail-h-full" src="~/assets/img/roundedWhitelogoGoogle.png" alt="google logo">
            </div>
            <div class="tail-px-4 tail-flex tail-justify-center tail-items-center">
              <span>Google</span>
            </div>
          </div>
          <div>
            <button class="tail-border-2 tail-p-2 tail-rounded">
              <span>Remove connection</span>
            </button>
          </div>
        </div>
        <div>Second square</div>
        <div class="tail-flex tail-justify-end">
          <button
            type="button"
            class="primary-color tail-text-white tail-border-0 tail-w-100 tail-mt-2 tail-rounded tail-p-1.5"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
