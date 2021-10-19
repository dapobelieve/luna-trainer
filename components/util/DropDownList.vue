<template>
  <div>
    <div
      v-for="client in options"
      :key="client.firstName"
      class="dropdown-Client"
      :class="[client._id === selectedItemId ? 'tail-bg-blue-50' : 'tail-bg-white']"
      @click="test(client)"
    >
      <div class="tail-flex tail-justify-between tail-min-w-full tail-items-center">
        <div class="tail-flex">
          <ClientAvatar :client-info="client" />
          <div class="tail-flex tail-flex-col tail-ml-2">
            <p> {{ client.firstName }}</p>
            <p> {{ client.email }}</p>
          </div>
        </div>
        <div v-if="client._id === selectedItemId">
          <i class="ns-check tail-text-blue-500 tail-text-lg"></i>
        </div>
      </div>
    </div>
    <button type="button" class="tail-py-4 tail-pl-3" @click="$emit('displayModal')">
      <div class="tail-flex">
        <div class="tail-rounded-full tail-px-2 tail-py-1 tail-flex tail-items-center tail-justify-center">
          <i class="ns-plus tail-text-base tail-rounded-full tail-text-blue-500 tail-p-1" />
          <span class="text-primary-color tail-text-base tail-pl-2">Add new client </span>
        </div>
      </div>
    </button>
  </div>
</template>

<script>
export default {
  props: {
    options: {
      type: Array,
      required: true
    },
    selectedItemId: {
      type: [Number, String],
      default: ''
    }
  },
  mounted () {
    console.log(this.selectedItemId)
  },
  methods: {
    test (client) {
      this.$emit('has-selected-client', client)
    }
  }
}
</script>

<style>

</style>
