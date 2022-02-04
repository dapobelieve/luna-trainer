<template>
  <div class="relative h-full" style="padding: 20px 0">
    <div class="flex justify-between" style="margin-bottom: 24px; padding-inline: 16px">
      <p>
        Send to
      </p>
      <i class="fi-rr-cross text-blue-500" @click="$emit('close')"></i>
    </div>
    <button
      v-for="client, index in acceptedClients"
      :key="index"
      type="button"
      class="clients-button"
      @click.prevent="select(index)"
    >
      <div class="flex items-center">
        <ClientAvatar
          :width="2.3"
          :height="2.3"
          :client-info="client"
          class="mr-2"
        />
        {{ client.firstName }} {{ client.lastName }}
      </div>
      <i :class="{ invisible: !selected.includes(index) }" class="fi-rr-check text-blue-500 text-sm"></i>
    </button>
    <div class="absolute bottom-3 right-3">
      <button :disabled="!selected.length" class="button-fill">
        Send
      </button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'SendingOptions',
  data () {
    return {
      selected: []
    }
  },
  computed: {
    ...mapGetters({
      acceptedClients: 'client/acceptedClients'
    })
  },
  methods: {
    select (c) {
      if (this.selected.includes(c)) {
        const index = this.selected.indexOf(c)
        if (index > -1) { this.selected.splice(index, 1) }
        return
      }
      this.selected.push(c)
    }
  }
}
</script>

<style lang="scss" scoped>
.clients-button {
  @apply flex items-center justify-start justify-between text-gray-700 font-normal block px-4 py-2 text-sm hover:bg-gray-100 w-full text-left;
}
</style>
