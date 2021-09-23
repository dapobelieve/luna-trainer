<template>
  <div class="tail-grid tail-gap-7 tail-text-sm">
    <h2 class="tail-font-semibold">
      Information
    </h2>
    <!-- owner details -->
    <div class="tail-text-gray-700">
      <div class="tail-flex tail-flex-col tail-items-center tail-mb-5">
        <ClientAvatar
          :client-info="client"
        />
        <p class="tail-capitalize tail-font-semibold tail-mt-2">
          {{ fullName }}
        </p>
      </div>
      <dl class="tail-grid tail-grid-cols-1 tail-gap-x-4 tail-gap-y-8 sm:tail-grid-cols-2">
        <div class="sm:tail-col-span-1 tail-flex">
          <i class="ns-envelope tail-text-2xl tail-text-gray-500"></i>
          <div class="tail-ml-4">
            <dt class="tail-text-sm tail-font-medium tail-text-gray-500">
              Telephone
            </dt>
            <dd class="tail-mt-1 tail-text-sm tail-text-gray-900 tail-capitalize">
              {{ client && client.phoneNumber || 'Not Available' }}
            </dd>
          </div>
        </div>

        <div class="sm:col-span-1">
          <dt class="tail-text-sm tail-font-medium tail-text-gray-500">
            Email
          </dt>
          <dd class="tail-mt-1 tail-text-sm tail-text-gray-900">
            {{ client && client.email }}
          </dd>
        </div>

        <div class="sm:tail-col-span-2 tail-flex">
          <i class="ns-envelope tail-text-2xl tail-invisible"></i>
          <div class="tail-ml-4">
            <dt class="tail-text-sm tail-font-medium tail-text-gray-500">
              Post Code
            </dt>
            <dd class="tail-mt-1 tail-text-sm tail-text-gray-900 tail-capitalize">
              {{ client && client.zip || 'Not Available' }}
            </dd>
          </div>
        </div>

        <div class="sm:tail-col-span-1 tail-flex">
          <i class="ns-location-alt tail-text-2xl tail-text-gray-500"></i>
          <div class="tail-ml-4">
            <dt class="tail-text-sm tail-font-medium tail-text-gray-500">
              Address
            </dt>
            <dd class="tail-mt-1 tail-text-sm tail-text-gray-900 tail-capitalize">
              {{ client && client.location || 'Not Available' }}
            </dd>
          </div>
        </div>

        <div class="sm:col-span-1">
          <dt class="tail-text-sm tail-font-medium tail-text-gray-500">
            City
          </dt>
          <dd class="tail-mt-1 tail-text-sm tail-text-gray-900 tail-capitalize">
            {{ client && client.city || 'Not Available' }}
          </dd>
        </div>

        <div class="sm:tail-col-span-2 tail-flex">
          <i class="ns-envelope tail-text-2xl tail-invisible"></i>
          <div class="tail-ml-4">
            <dt class="tail-text-sm tail-font-medium tail-text-gray-500">
              Post Code
            </dt>
            <dd class="tail-mt-1 tail-text-sm tail-text-gray-900 tail-capitalize">
              {{ client && client.zip || 'Not Available' }}
            </dd>
          </div>
        </div>
      </dl>
    </div>
    <!-- dog details -->
    <div>
      <h3 class="tail-mb-3">
        DOG DETAILS
      </h3>
      <dl class="tail-grid tail-grid-cols-1 tail-gap-x-4 tail-gap-y-8 sm:tail-grid-cols-2">
        <div class="sm:tail-col-span-1 tail-flex">
          <i class="ns-time-add tail-text-2xl tail-text-gray-500"></i>
          <div class="tail-ml-4">
            <dt class="tail-text-sm tail-font-medium tail-text-gray-500">
              Dog name
            </dt>
            <dd class="tail-mt-1 tail-text-sm tail-text-gray-900 tail-capitalize">
              {{ client.pet[0] && client.pet[0].name }}
            </dd>
          </div>
        </div>

        <div class="sm:col-span-1">
          <dt class="tail-text-sm tail-font-medium tail-text-gray-500">
            Breed
          </dt>
          <dd class="tail-mt-1 tail-text-sm tail-text-gray-900 tail-capitalize">
            {{ client.pet[0] && client.pet[0].breed }}
          </dd>
        </div>

        <div class="sm:tail-col-span-2 tail-flex">
          <i class="ns-envelope tail-text-2xl tail-invisible"></i>
          <div class="tail-ml-4">
            <dt class="tail-text-sm tail-font-medium tail-text-gray-500">
              Age
            </dt>
            <dd class="tail-mt-1 tail-text-sm tail-text-gray-900 tail-capitalize">
              {{ client && client.pet[0] && client.pet[0].age }} weeks
            </dd>
          </div>
        </div>

        <div class="sm:tail-col-span-2 tail-flex">
          <i class="ns-building tail-text-2xl tail-text-gray-500"></i>
          <div class="tail-ml-4">
            <dt class="tail-text-sm tail-font-medium tail-text-gray-500">
              Training or Behavioural Type
            </dt>
            <dd class="tail-mt-1 tail-text-sm tail-text-gray-900 tail-capitalize">
              Not Available
            </dd>
          </div>
        </div>

        <div class="sm:tail-col-span-2 tail-flex">
          <i class="ns-notebook tail-text-2xl tail-text-gray-500"></i>
          <div class="tail-ml-4">
            <dt class="tail-text-sm tail-font-medium tail-text-gray-500">
              Note
            </dt>
            <dd class="tail-mt-1 tail-text-sm tail-text-gray-900">
              Not Available
            </dd>
          </div>
        </div>
      </dl>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ClientInformation',
  props: {
    client: {
      type: Object,
      required: true
    }
  },
  computed: {
    firstName () {
      return this.client ? this.client.firstName : ''
    },
    lastName () {
      return this.client ? this.client.lastName : ''
    },
    fullName () {
      return this.firstName + ' ' + this.lastName
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
