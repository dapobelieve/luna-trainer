<template>
  <main>
    <header
      class="tail-bg-white tail-p-3 d-flex justify-content-between align-items-center tail-text-2xl tail-sticky tail-top-0 tail-z-10"
    >
      <img
        class="tail-h-10"
        src="~/assets/img/svgs/logo-xbox.svg"
        alt="getWelp logo"
      >
      <div
        class="tail-border rounded body-background tail-hidden md:tail-block md:tail-py-1 md:tail-px-3 d-flex align-items-center md:tail-w-4/12"
      >
        <i class="ns-search tail-mr-2 tail-hidden md:tail-block"></i>
        <input
          class="tail-outline-none tail-text-lg body-background w-100 tail-hidden md:tail-block"
          type="text"
          placeholder="Search"
        >
      </div>
      <div class="d-flex">
        <i class="ns-search border rounded p-1 tail-mr-2 md:tail-hidden"></i>
        <span class="position-relative d-flex border rounded tail-mr-2">
          <small
            class="position-absolute tail-right-0 tail-bg-red-700 text-white tail-text-xs tail-leading-none rounded-circle"
          >10</small>
          <i class="ns-comment-alt rounded p-1"></i>
        </span>
        <span class="position-relative d-flex border rounded tail-mr-2">
          <span
            class="p-1 tail-bg-red-700 position-absolute tail-right-1 tail-top-1 rounded-circle"
          />
          <i class="ns-bell-ring p-1"></i>
        </span>
        <i class="ns-user border rounded-circle p-1"></i>
      </div>
    </header>
    <div class=" tail-z-0 tail-h-full tail-grid md:tail-flex">
      <Navigation />
      <Nuxt class="views" />
    </div>
  </main>
</template>

<style lang="scss">
@media only screen and (min-width: 769px) {
  .views {
    margin-left: 99px;
    width: 100%;
  }
}
</style>
