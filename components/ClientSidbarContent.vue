<template>
  <nav class="flex min-h-full text-sm">
    <div class="flex-grow flex flex-1 flex-col space-y-4 ">
      <client-card-navigation />
      <client-card-invoices :clientUserId="client.userId"/>
      <!-- <client-card-sessions /> -->
    </div>
  </nav>
</template>
<script>
export default {
  name: 'ClientSidebarContent',
  props: {
    client: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
 .payment-tab__hidden {
    display: none;
  }
@media only screen and (min-width: 1024px) {
 .payment-tab__hidden {
    display: block;
  }
}
</style>
