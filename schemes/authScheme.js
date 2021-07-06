/* eslint-disable no-undef */
/* eslint-disable require-await */
import { LocalScheme } from '~auth/runtime'

export default class CustomScheme extends LocalScheme {
  // Override `fetchUser` method of `local` scheme
  async fetchUser (endpoint = `${process.env.BASEURL_HOST}/profile`) {
    if (!this.options.endpoints.user) {
      console.log('user endpoint')
      this.$auth.setUser({})
      return
    }

    // Try to fetch user and then set
    return this.$auth
      .requestWith(this.name, endpoint, this.options.endpoints.user)
      .then((response) => {
        console.log('request from scheme', response)
        const user = getProp(response.data, this.options.user.property)

        // Transform the user object
        const customUser = {
          ...user,
          fullName: user.firstName + ' ' + user.lastName,
          roles: ['user']
        }


        this.$auth.setUser(customUser)

        return response
      })
      .catch((error) => {
        console.log('error from scheme', error)
        this.$auth.callOnError(error, { method: 'fetchUser' })
      })
  }
}
