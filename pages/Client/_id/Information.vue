<template>
  <div>
    Information {{ client }}
  </div>
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
      console.log('response fetching client', response)
      this.client = response
      this.$emit('clientName', { firstName: response.firstName, lastName: response.lastName })
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
