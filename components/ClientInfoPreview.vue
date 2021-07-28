<template>
  <div>
    <div class="tail-flex tail-mb-5">
      <div class="tail-mr-5 tail-pt-1">
        <img
          class="tail-hidden md:tail-block"
          src="~/assets/img/user.png"
          alt="cancel"
          width="20px"
          height="auto"
        >
      </div>
      <div class="tail-flex tail-flex-col">
        <p class="tail-capitalize tail-font-normal">
          Dog Owner
        </p>
        <div class="tail-flex tail-items-center">
          <ClientAvatar :firstname="client.firstName" :lastname="client.lastName" />
          <div class="tail-ml-4 tail-truncate tail-mr-2 md:tail-mr-0">
            <h3 class="tail-capitalize tail-font-medium">
              {{ client.firstName }} {{ client.lastName }}
            </h3>
            <div class="tail-flex tail-items-center">
              <div>
                <img
                  class="tail-bg-green-700 tail-rounded-full"
                  src="~/assets/img/dog-paw.svg"
                  alt="dog paw"
                />
              </div>
              <span
                class="tail-capitalize tail-ml-1 tail-text-gray-500 tail-truncate"
              >
                  {{ client.pet[0].name }},  {{ client.pet[0].breed }}.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="tail-flex tail-mb-5">
      <div class="tail-mr-5 tail-text-xl">
        <i
          class="ns-envelope tail-mt-1 tail-text-gray-500"
        ></i>
      </div>
      <div class="tail-flex tail-flex-col">
        <p class="tail-capitalize tail-font-normal">
          Email
        </p>
        <p class="tail-font-medium tail-text-gray-500">
          {{ client.email }}
        </p>
      </div>
    </div>
    <div class="tail-flex tail-mb-5">
      <div class="tail-mr-5 tail-text-xl">
        <i class="ns-location-alt tail-mt-1 tail-text-gray-500"></i>
      </div>
      <div class="tail-flex tail-flex-col">
        <p class="tail-capitalize tail-font-normal">
          Location
        </p>
        <div class="tail-flex">
          <p class="tail-capitalize tail-font-light tail-mr-1">
            Address:
          </p>
          <span class="tail-capitalize tail-text-gray-500 tail-font-normal">
            {{ client.location.address }}
          </span>
        </div>
        <div class="tail-flex">
          <p class="tail-capitalize tail-font-light tail-mr-1">
            Zip Code:
          </p>
          <span class="tail-capitalize tail-text-gray-500 tail-font-normal">
            {{ client.location.zip }}
          </span>
        </div>
      </div>
    </div>
    <div class="tail-flex">
      <div class="tail-mr-5 tail-pt-1">
        <img
          class="tail-hidden md:tail-block"
          src="~/assets/img/black-dog.png"
          alt="cancel"
          width="20px"
          height="auto"
        >
      </div>
      <div class="tail-flex tail-flex-col">
        <p class="tail-capitalize tail-font-normal">
          Pet details
        </p>
        <div class="tail-flex">
          <p class="tail-capitalize tail-font-light tail-mr-1">
            Name:
          </p>
          <span class="tail-capitalize tail-text-gray-500 tail-font-normal">
            {{ client.pet[0].name }}
          </span>
        </div>
        <div class="tail-flex">
          <p class="tail-capitalize tail-font-light tail-mr-1">
            Age:
          </p>
          <span class="tail-capitalize tail-text-gray-500 tail-font-normal">
            {{ client.pet[0].age }}
          </span>
        </div>
        <div class="tail-flex">
          <p class="tail-capitalize tail-font-light tail-mr-1">
            Breed:
          </p>
          <span class="tail-capitalize tail-text-gray-500 tail-font-normal">
            {{ client.pet[0].breed }}
          </span>
        </div>
        <div class="tail-flex">
          <p class="tail-capitalize tail-font-light tail-mr-1">
            Gender:
          </p>
          <span class="tail-capitalize tail-text-gray-500 tail-font-normal">
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
