<template>
  <containers-summary-information-with-avatar
    url="client-id-information"
    :parameter="{ id: client._id }"
  >
    <template v-slot:avatar>
      <ClientAvatar :client-info="client" />
    </template>
    <template v-slot:content>
      <div class="font-medium capitalize">
        <div>{{ client.firstName }} {{ $utils.optional(client.lastName) }}</div>
       <div class="font-extralight text-md text-gray-500 dot normal-case">
         {{client.email}}
       </div>
      </div>
    </template>
    <template v-slot:button>
      <button
        v-if="client.status === 'invited'"
        type="button"
        class="button-text button-sm"
        @click="resendInvite"
      >
        <i class="ns-refresh"></i>
        <span class="capitalize ml-2">resend invite</span>
      </button>
      <div v-else>
        <button type="button" class="button-text button-sm w-8" @click="showDropdown">
          <i class="ns-ellipsis text-lg"></i>
        </button>
        <div
          v-show="showDropDown"
          class="origin-top-right absolute right-0 mt-2 p-1 min-w-[6rem] w-48 rounded-xl border shadow-lg bg-white z-40"
        >
          <div role="none">
            <nuxt-link
              :to="{ name: 'invoice', params: { pushedClient: client } }"
              class="block p-3 hover:bg-gray-100 rounded-md transition-all"
            >
              Create Invoice
            </nuxt-link>
            <a href="#" class="block p-3 hover:bg-gray-100 rounded-md transition-all" @click.prevent="archiveClient">Archive</a>
          </div>
        </div>
      </div>
    </template>
  </containers-summary-information-with-avatar>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'ClientCard',
  props: {
    client: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      showDropDown: false
    }
  },
  methods: {
    showDropdown () {
      this.showDropDown = !this.showDropDown
    },
    ...mapActions({ resendInvite: 'client/resendClientInvite' }),
    resendInvite () {
      return this.$axios
        .$get(
          `${process.env.BASEURL_HOST}/client/${this.client._id}/resend-invite`
        )
        .then((response) => {
          if (response && response.status === true) {
            this.$gwtoast.success(
              `Client invitation resent to ${this.client.firstName} ${this.client.lastName}`
            )
            this.$emit('close', false)
          } else {
            this.$gwtoast.error('Error resending invite. Retry!!!')
          }
        })
        .catch((err) => {
          if (err.response) {
            this.$gwtoast.error(
              `Something went wrong: ${err.response.data.message}`)
          } else if (err.request) {
            this.$gwtoast.error('Something went wrong. Try again')
          } else {
            this.$gwtoast.error(`Something went wrong: ${err.message}`)
          }
        })
    },
    async archiveClient () {
      try {
        await this.$store.dispatch('client/archive', { ...this.client })
        this.$gwtoast.success('Client Archived')
      } catch (e) {
        console.log({ e })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.dot {
  position: relative;
  &:after {
    content: "";
    position: absolute;
    height: 2px !important;
    width: 2px;
    background: #334155;
    border-radius: 50%;
    bottom: 10px;
    margin-left: 5px
  }
}
</style>
