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
        <div class="tail-flex">
          <p class="tail-capitalize tail-font-normal tail-mr-3">
            Address:
          </p>
          <span class="tail-capitalize tail-text-gray-500">
            {{ client.location.address }}
          </span>
        </div>
        <div class="tail-flex">
          <p class="tail-capitalize tail-font-normal tail-mr-3">
            Zip code:
          </p>
          <span class="tail-capitalize tail-text-gray-500">
            {{ client.location.zip }}
          </span>
        </div>
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
        <div class="tail-flex">
          <p class="tail-capitalize tail-font-normal tail-mr-3">
            Name:
          </p>
          <span class="tail-capitalize tail-text-gray-500">
            {{ client.pet[0].name }}
          </span>
        </div>
        <div class="tail-flex">
          <p class="tail-capitalize tail-font-normal tail-mr-3">
            Age:
          </p>
          <span class="tail-capitalize tail-text-gray-500">
            {{ client.pet[0].age }}
          </span>
        </div>
        <div class="tail-flex">
          <p class="tail-capitalize tail-font-normal tail-mr-3">
            Breed:
          </p>
          <span class="tail-capitalize tail-text-gray-500">
            {{ client.pet[0].breed }}
          </span>
        </div>
        <div class="tail-flex">
          <p class="tail-capitalize tail-font-normal tail-mr-3">
            Gender:
          </p>
          <span class="tail-capitalize tail-text-gray-500">
            {{ client.pet[0].gender }}
          </span>
        </div>
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
