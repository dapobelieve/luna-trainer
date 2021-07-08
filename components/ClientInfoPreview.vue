<template>
  <div class="w-full bg-red-300">
    <h2 class="tail-text-2xl tail-font-normal tail-mb-3 text-center">
      Preview information for {{ client.firstName }} {{ client.lastName }}
    </h2>
    <div>
      <div class="tail-my-3">
        <h3 class="tail-capitalize tail-font-medium">
          Email
        </h3>
        <span class="tail-capitalize tail-text-gray-500">
          {{ client.email }}
        </span>
      </div>

      <div class="tail-my-3">
        <h3 class="tail-capitalize tail-font-medium">
          Location
        </h3>
        <span class="tail-capitalize tail-text-gray-500">
          Address: {{ client.location.address }}
        </span>
        <span class="tail-capitalize tail-text-gray-500">
          Zipcode: {{ client.location.zip }}
        </span>
      </div>

      <div class="tail-my-3">
        <h3 class="tail-capitalize tail-font-medium">
          Status
        </h3>
        <span class="tail-capitalize tail-text-gray-500">
          {{ client.status }}
        </span>
      </div>

      <div class="tail-my-3">
        <h3 class="tail-capitalize tail-font-medium">
          Pet Info
        </h3>
        <span class="tail-capitalize tail-text-gray-500">
          Name: {{ client.pet[0].name }}
        </span>
        <span class="tail-capitalize tail-text-gray-500">
          Age: {{ client.pet[0].age }}
        </span>
        <span class="tail-capitalize tail-text-gray-500">
          Breed: {{ client.pet[0].breed }}
        </span>
        <span class="tail-capitalize tail-text-gray-500">
          Gender: {{ client.pet[0].gender }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ClientInfoPreview',
  props: {
    client: {
      type: Object,
      required: true
    }
  }
}
</script>

<style>

</style>
