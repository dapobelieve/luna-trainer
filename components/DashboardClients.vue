<template>
  <containers-summary-card-with-notifications
    :display-view-all-button="Boolean(acceptedClients.length)"
    url="Clients"
  >
    <template v-slot:icon>
      <i
        class="ns-users tail-bg-blue-50 tail-p-1 tail-rounded-full tail-text-blue-500 tail-text-2xl"
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
      <div v-if="$store.state.client.isLoading" class="tail-flex tail-place-content-center tail-mt-16">
        <SingleLoader />
      </div>
      <template v-else>
        <ul
          v-if="acceptedClients.length"
          role="list"
          class="tail-relative tail-z-0 tail-mx-0.5"
        >
          <li v-for="client in acceptedClients" :key="client.index">
            <containers-summary-information-with-avatar
              :show-chevron-right="false"
            >
              <template v-slot:avatar>
                <ClientAvatar :client-info="client" />
              </template>
              <template v-slot:content>
                <span class="tail-font-medium tail-capitalize">{{ client.firstName }}</span> has accepted your invitation.
              </template>
              <template v-slot:date>
                {{ new Date().toDateString() }}
              </template>
            </containers-summary-information-with-avatar>
          </li>
        </ul>
        <div v-else class="tail-text-center tail-mt-10 tail-px-4">
          Newly accepted client requests will be displayed here.
        </div>
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
