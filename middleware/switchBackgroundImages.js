/* eslint-disable no-case-declarations */
export default function ({ store, route }) {
  const checkRoute = route.name
  switch (checkRoute) {
    case 'Auth-SignUp' || 'Auth-ProfileSetup':
      store.commit('SET_CLASS', {
        'background-image': "url('./../assets/img/image-dog-2.png')",
        'background-repeat': 'no-repeat',
        'background-position': 'right bottom'
      })
      break
    case 'Auth-ForgotPassword' || 'Auth-CreateNewPassword':
      store.commit('SET_CLASS', {
        'background-image': "url('./../assets/img/image-dog-3.png')",
        'background-repeat': 'no-repeat',
        'background-position': 'left bottom'
      })
      break
    default:
      store.commit('SET_CLASS', {
        'background-image': "url('./../assets/img/leftDogImg.png')",
        'background-repeat': 'no-repeat',
        'background-position': 'left bottom'
      })
      break
  }
}
