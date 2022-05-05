<template>
  <ul role="list">
    <li>
      <button
        type="button"
        class="group block w-full"
        @click.prevent="gotoRoute"
      >
        <div class="flex items-center py-4 px-3.5 rounded-md hover:bg-gray-100">
          <div class="min-w-0 flex-1 flex items-center">
            <div class="flex-shrink-0 h-12 w-12">
              <ClientAvatar
                class="group-hover:opacity-75"
                :client-info="client"
              />
            </div>
            <div class="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
              <div>
                <p class="font-medium capitalize truncate text-left">
                  {{ client.firstName }} {{ $utils.optional(client.lastName) }}
                </p>
                <p class="flex items-center text-sm text-gray-500">
                  <span
                    class="truncate font-extralight text-md text-gray-500 dot normal-case"
                  >
                    {{ client.email }}
                  </span>
                </p>
              </div>
            </div>
          </div>
          <button
            v-if="client.status === 'invited'"
            class="button-text button-sm"
            @click.stop="resendInvite"
          >
            <i class="fi-rr-refresh"></i>
            <span class="capitalize ml-2">resend invite</span>
          </button>
          <div v-else>
            <ClientActions :client-info="client" />
          </div>
        </div>
      </button>
    </li>
  </ul>
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
            this.$lunaToast.success(
              `Client invitation resent to ${this.client.email}`
            )
            this.$emit('close', false)
          } else {
            this.$lunaToast.error('Error resending invite. Retry!!!')
          }
        })
        .catch((err) => {
          if (err.response) {
            this.$lunaToast.error(`${err.response.data.message}`)
          } else if (err.request) {
            this.$lunaToast.error('Something went wrong. Try again')
          } else {
            this.$lunaToast.error(`${err.message}`)
          }
        })
    },
    async archiveClient () {
      try {
        await this.$store.dispatch('client/archive', { ...this.client })
        this.$lunaToast.success('Client Archived')
      } catch (e) {
        console.log({ e })
      }
    },
    gotoRoute () {
      this.$router.push({
        name: 'client-id-information', params: { id: this.client._id }
      })
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
    margin-left: 5px;
  }
}
</style>
