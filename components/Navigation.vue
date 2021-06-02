<template>
  <div class="nav md:tail-ml-1">
    <NuxtLink
      :to="{ name: 'Dashboard' }"
      class="d-flex flex-column align-items-center tail-px-4 tail-py-3"
      href=""
      exact-active-class="active"
    >
      <i class="ns-home tail-text-2xl"></i>
      <span class="tail-text-sm">
        home
      </span>
    </NuxtLink>
    <NuxtLink
      :to="{ name: 'Schedules' }"
      class="d-flex flex-column align-items-center tail-px-4 tail-py-3"
      href=""
      exact-active-class="active"
    >
      <i class="ns-calendar tail-text-2xl"></i>
      <span class="tail-text-sm">
        schedule
      </span>
    </NuxtLink>
    <NuxtLink
      :to="{ name: 'Clients' }"
      class="d-flex flex-column align-items-center tail-px-4 tail-py-3"
      href=""
      exact-active-class="active"
    >
      <i class="ns-users tail-text-2xl"></i>
      <span class="tail-text-sm">
        clients
      </span>
    </NuxtLink>
    <NuxtLink
      :to="{ name: 'Invoices' }"
      class="d-flex flex-column align-items-center tail-px-4 tail-py-3"
      href=""
      exact-active-class="active"
    >
      <i class="ns-receipt tail-text-2xl"></i>
      <span class="tail-text-sm">
        invoicing
      </span>
    </NuxtLink>
  </div>
</template>

<script>
export default {
  name: 'Navigation'
}
</script>

<style lang="scss" scoped>
a {
  // @apply tail-text-gray-500 tail-no-underline;
  text-decoration: none;
  color: gray;
}

@media only screen and (max-width: 768px) {
  .nav {
    display: flex;
    justify-content: space-evenly;
    background: white;
    order: 2;
    position: fixed;
    bottom: 0;
    width: 100%;
    text-transform: capitalize;
  }
}
.active {
  color: #000;
}
.active:focus {
  outline: none !important;
}

@media only screen and (min-width: 769px) {
  .nav {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: calc(100% - 64px);
    position: fixed;
    left: 0;
    text-transform: capitalize;
  }

  .active {
    border: 1px solid rgba(156, 163, 175) !important;
    border-radius: 0.375rem;
    background: #fff;
    border-radius: 0.5rem !important;
    background: #fff !important;
  }
}
</style>
