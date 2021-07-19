import { mapState, mapMutations } from 'vuex'
export default {
  computed: {
    ...mapState('qb', {
      qbSessionToken: state => state.QBSessionToken,
      qbUser: state => state.qbUser
    })
  },
  mounted () {
    const dialogs = this.$axios.$get(
            `${process.env.BASEURL_HOST}/qb/dialogs`
    )
    dialogs.then(({ result }) => {
      const trainerQbId = this.qbUser.id
      const arr = []
      const qbUsers = []
      result.forEach((element) => {
        if (element.occupants_ids[0] === trainerQbId) {
          qbUsers.push(element.occupants_ids[1])
          arr.push({
            ...element,
            opponentFirstName:
                  element.occupants[1][element.occupants_ids[1]].firstName,
            opponentLastName:
                  element.occupants[1][element.occupants_ids[1]].lastName
          })
        }
      })
      const arrayToObject = (array, keyField) =>
        array.reduce((obj, item) => {
          obj[item[keyField]] = item
          return obj
        }, {})
      const dialogList = arrayToObject(arr, '_id')
      // set the results in store
      this.setDialogs(dialogList)
      // set users i have open dialogs with
      this.setOpenChatUsers(qbUsers)
    }).catch((err) => {
      if (err.response) {
        this.$toast.error(`Session Error: ${err.response.data.errors.base}`, { position: 'bottom-right' })
      } else if (err.request) {
        this.$toast.error('Something went wrong. Try again', { position: 'bottom-right' })
      } else {
        this.$toast.error(`Something went wrong: ${err.message}`, { position: 'bottom-right' })
      }
    })
  },
  methods: {
    ...mapMutations({
      setDialogs: 'qb/SET_DIALOGS',
      setOpenChatUsers: 'qb/SET_OPEN_CHAT_USERS',
      setqbSessionToken: 'qb/SET_QB_SESSION_TOKEN'
    })
  }
}
