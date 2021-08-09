<template>
  <async-view>
    <div>
      <client-information :client="client" />
    </div>
  </async-view>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'Information',
  data () {
    return {
      client: null,
      id: this.$route.params.id
    }
  },
  mounted () {
    this.getClientProfile(this.id).then((response) => {
      this.client = response
    }).catch(err => console.log('error fetching client', err))
  },
  methods: {
    ...mapActions({
      getClientProfile: 'client/getSingleClient'
    })
  }
}
</script>

<style lang="scss" scoped>

</style>
