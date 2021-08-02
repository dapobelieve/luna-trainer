<template>
  <div>
    <PageHeader>
      <template v-slot:back-button>
        <svg
          role="button"
          width="7"
          height="14"
          viewBox="0 0 9 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          @click="$router.go(-1)"
        >
          <path d="M7.87878 18.0001C7.67989 18 7.48915 17.921 7.34853 17.7803L1.21953 11.6513C0.516515 10.9481 0.121582 9.99443 0.121582 9.00006C0.121582 8.0057 0.516515 7.05204 1.21953 6.34881L7.34853 0.219811C7.48998 0.0831927 7.67944 0.00759688 7.87608 0.0093057C8.07273 0.0110145 8.26084 0.0898912 8.3999 0.228947C8.53895 0.368003 8.61783 0.556113 8.61954 0.75276C8.62125 0.949408 8.54565 1.13886 8.40903 1.28031L2.28003 7.40931C1.85822 7.83125 1.62126 8.40344 1.62126 9.00006C1.62126 9.59668 1.85822 10.1689 2.28003 10.5908L8.40903 16.7198C8.51389 16.8247 8.58529 16.9583 8.61422 17.1038C8.64315 17.2493 8.62829 17.4 8.57154 17.5371C8.51479 17.6741 8.41868 17.7912 8.29538 17.8736C8.17207 17.956 8.02709 18 7.87878 18.0001Z" fill="black" />
        </svg>
      </template>
      <template v-slot:avatar>
        <span class="tail-rounded-full tail-border-2 tail-border-red-400 tail-p-1 tail-mr-1 tail-ml-4">
          <ClientAvatar firstname="get" lastname="welp" width="1.5" height="1.5" />
        </span>
      </template>
      <template v-slot:title>
        Abi Carpenter
      </template>
      <template v-slot:buttons>
        <button
          type="button"
          class="tail-bg-white tail-inline-flex tail-items-center tail-px-2 tail-py-1 tail-border-none tail-text-xs tail-font-medium tail-rounded tail-shadow-sm tail-text-black hover:tail-bg-gray-100 focus:tail-outline-none focus:tail-ring-2 focus:tail-ring-offset-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 512 512"><title>ionicons-v5-f</title><circle cx="256" cy="256" r="32" style="fill:none;stroke:#000;stroke-miterlimit:10;stroke-width:32px" /><circle cx="416" cy="256" r="32" style="fill:none;stroke:#000;stroke-miterlimit:10;stroke-width:32px" /><circle cx="96" cy="256" r="32" style="fill:none;stroke:#000;stroke-miterlimit:10;stroke-width:32px" /></svg>
        </button>
      </template>
    </PageHeader>
    <div
      class="tail-flex-1 tail-min-w-0 tail-flex tail-flex-col tail-overflow-hidden tail-px-5 tail-py-3"
    >
      <main class="tail-flex-1 tail-flex tail-overflow-hidden">
        <div
          class="tail-flex-1 tail-flex tail-flex-col tail-overflow-y-auto xl:tail-overflow-hidden"
        >
          <div class="tail-flex-1 tail-flex xl:tail-overflow-hidden">
            <nav
              aria-label="Sections"
              class="tail-hidden tail-flex-shrink-0 tail-w-96 xl:tail-flex xl:tail-flex-col"
            >
              <div class="tail-flex-1 tail-text-sm tail-text-gray-700">
                <div
                  class="tail-bg-white tail-rounded-lg tail-flex tail-justify-between tail-p-4 tail-mb-3"
                  aria-current="page"
                >
                  <div>
                    <p>
                      Dog: Diesel
                    </p>
                    <p>
                      Age: 9
                    </p>
                    <p>
                      Breed: Pitbull
                    </p>
                  </div>
                  <p>
                    2 courses
                  </p>
                </div>
                <client-card-navigation />
              </div>
            </nav>

            <!-- Main content -->
            <div class="tail-flex-1 tail-max-h-screen xl:tail-overflow-y-auto">
              <div
                class="tail-max-w-3xl tail-mx-auto tail-py-10 tail-px-4 sm:tail-px-6 lg:tail-py-12 lg:tail-px-8"
              >
                <nuxt-child />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Client'
}
</script>

<style lang="scss" scoped>
</style>
