export default class FieldErrors {
  constructor () {
    this.fieldErrors = {}
  }

  get (field) {
    return this.fieldErrors[field]
  }

  set (fieldErrors) {
    this.fieldErrors = fieldErrors
  }

  clear (field) {
    delete this.fieldErrors[field]
  }

  has (field) {
    return this.fieldErrors.hasOwnProperty(field)
  }

  any () {
    return Object.keys(this.fieldErrors).length > 0
  }
}
