<template>
  <containers-summary-card-with-notifications
    :display-view-all-button="Boolean(acceptedClients.length)"
    url="Clients"
  >
    <template v-slot:icon>
      <i
        class="ns-users bg-indigo-50 p-1 rounded-full text-indigo-500 text-2xl h-12 w-12 flex items-center justify-center flex-shrink-0"
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
        class="flex place-content-center mt-16"
      >
        <SingleLoader />
      </div>
      <template v-else>
        <ul v-if="acceptedClients.length" role="list" class="relative z-0 px-1">
          <li v-for="client in acceptedClients" :key="client.index">
            <containers-summary-information-with-avatar
              :show-chevron-right="false"
              url="client-id-Information"
              :parameter="{ id: client._id }"
            >
              <template v-slot:avatar>
                <ClientAvatar :client-info="client" />
              </template>
              <template v-slot:content>
                <span class="font-medium capitalize">{{
                  client.firstName
                }}</span>
                has accepted your invitation.
              </template>
              <template v-slot:date>
                {{ client.updatedAt | howLongAgo }}
              </template>
            </containers-summary-information-with-avatar>
          </li>
        </ul>
        <div v-else class="text-center pt-8 pb-12 px-4 text-gray-500 text-sm">
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
