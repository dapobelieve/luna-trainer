<template>
  <div>
    <h5 class="tail-font-medium tail-mb-2">
      Messages
    </h5>
    <div class="tail-rounded-md tail-bg-white tail-p-4 md:tail-h-full">
      <div
        v-if="1"
        class="tail-text-center tail-h-full tail-max-w-xs tail-m-auto"
      >
        <div class="tail-w-full tail-my-5">
          <img
            class="tail-text-center tail-inline-block"
            src="~/assets/img/low-dog.png"
            alt=""
            srcset=""
          />
        </div>
        <h5 class="tail-font-medium">
          No messages
        </h5>
        <p class="tail-px-5 tail-text-sm tail-mb-0">
          New messages will appear here when you invite and onboard a new
          client.
        </p>
      </div>
      <!-- <template v-else>
        <ul>
          <li
            v-for="messages in getTotalUnreadMessages.slice(0, 3)"
            :key="messages._id"
            class="tail-w-full"
          >
            <div class="tail-relative tail-px-0 tail-py-2 tail-flex tail-items-center tail-space-x-3 hover:tail-bg-gray-50 focus-within:tail-ring-2 focus-within:tail-ring-inset">
              <div class="tail-flex-shrink-0">
                <ClientAvatar :firstname="messages && messages.opponentFirstName" :lastname="messages && messages.opponentLastName" />
              </div>
              <div class="tail-flex-1 tail-min-w-0 tail-mr-auto">
                <div class="focus:tail-outline-none">
                  <p class="tail-text-sm tail-font-medium tail-text-gray-900">
                    {{ messages.opponentFirstName }} {{ messages.opponentLastName }}
                    <span class="tail-ml-2 tail-text-xs tail-text-gray-400">
                      {{ formatDistance(new Date(messages.updated_at), new Date(), { addSuffix: true }) }}
                    </span>
                  </p>
                  <p class="tail-text-sm tail-text-gray-500">
                    {{ messages.body ? messages.body : messages.last_message }}
                  </p>
                </div>
              </div>
              <button
                class="tail-border tail-capitalize tail-py-1 tail-px-2 tail-rounded-md tail-text-black tail-text-sm"
                @click="$router.push({
                  name: 'Clients-id-Messages',
                  params: {
                    id: messages.occupants[1][messages.occupants_ids[1]]._id
                  }
                })"
              >
                View
              </button>
            </div>
          </li>
        </ul>
      </template> -->
    </div>
  </div>
</template>

<script>
import { formatDistance } from 'date-fns'
export default {
  name: 'DbMessages',
  data () {
    return {
      formatDistance
    }
  }
}
</script>

<style lang="scss" scoped></style>
