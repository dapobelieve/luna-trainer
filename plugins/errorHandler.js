import ErrorHandler from '../utils/ErrorMessages'

export default (context, inject) => {
  inject('errorHandler', new ErrorHandler())
}
