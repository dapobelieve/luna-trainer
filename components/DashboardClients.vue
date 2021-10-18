<template>
  <containers-summary-card-with-notifications
    :display-view-all-button="Boolean(acceptedClients.length)"
    url="Clients"
  >
    <template v-slot:icon>
      <i
        class="ns-users tail-bg-indigo-50 tail-p-1 tail-rounded-full tail-text-indigo-500 tail-text-2xl tail-h-12 tail-w-12 tail-flex tail-items-center tail-justify-center tail-flex-shrink-0"
      ></i>
    </template>
    <template v-slot:title>
      recently accepted clients
    </template>
    <template v-slot:notifications>
      {{ acceptedClients.length }} new request{{
      acceptedClients.length > 1 ? "s" : ""
      }}
    </template>
    <template v-slot:content>
      <div
        v-if="$store.state.client.isLoading"
        class="tail-flex tail-place-content-center tail-mt-16"
      >
        <SingleLoader />
      </div>
      <template v-else>
        <ul v-if="acceptedClients.length" role="list" class="tail-relative tail-z-0 tail-px-1">
          <li v-for="client in acceptedClients" :key="client.index">
            <containers-summary-information-with-avatar :show-chevron-right="false">
              <template v-slot:avatar>
                <ClientAvatar :client-info="client" />
              </template>
              <template v-slot:content>
                <span class="tail-font-medium tail-capitalize">{{ client.firstName }}</span> has accepted your invitation.
              </template>
              <template v-slot:date>
                {{ client.updatedAt | howLongAgo }}
              </template>
            </containers-summary-information-with-avatar>
          </li>
        </ul>
        <div
          v-else
          class="tail-text-center tail-pt-8 tail-pb-12 tail-px-4 tail-text-gray-500 tail-text-sm"
        >Newly accepted client requests will be displayed here.</div>
      </template>
    </template>
  </containers-summary-card-with-notifications>
</template>

<script>
export default {
  name: 'DashboardClients',
  props: {
    acceptedClients: {
      type: Array,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped></style>
