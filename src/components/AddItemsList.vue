<template>
  <div class="col-md-6 offset-md-3">
    <error-alert v-if="error" v-bind:message="message"/>

    <h1>Add a new shopping list</h1>
    <form @submit.prevent="addItemsList" method="post" class="form-horizontal" @keydown="fieldErrors.clear($event.target.name)">
      <div class="form-group">
        <label for="name" class="col-sm-1 control-label">Name:</label>
        <div class="col-sm-6">
          <input type="text" id="name" name="name" v-model="name" class="form-control" data-test="name-shopping-list"/>
          <small data-test="add-error-message" v-if="fieldErrors.has('name')" class="text-danger" v-text="fieldErrors.get('name')"></small>
        </div>
      </div>
      <div class="form-group">
        <div class="col-sm-offset-1 col-sm-10">
          <input type="submit" value="Add list" class="btn btn-outline-secondary" :disabled="fieldErrors.any()" data-test="add-shopping-list-btn"/>
        </div>
      </div>
    </form>

    <ul class="list-inline">
      <all-lists-button/>
    </ul>
  </div>
</template>

<script>
import ErrorAlert from './ErrorAlert'
import AllListsButton from './AllListsButton'
import FieldErrors from './classes/FieldErrors'
import {ShoppingListController} from '../controller/ShoppingListController'

export default {
  name: 'AddItemsList',
  components: {AllListsButton, ErrorAlert},
  data () {
    return {
      name: '',
      error: false,
      fieldErrors: new FieldErrors(),
      message: ''
    }
  },
  methods: {
    addItemsList: function () {
      ShoppingListController.createItemsList(this.name)
        .then(() => {
          this.$router.push('/')
        })
        .catch(error => {
          if (!error.response) {
            // global error, for example: backend is not running
            console.log(error)
            this.error = true
            this.message = error.toString()
          } else {
            // validation errors, for example: name must not be blank
            this.fieldErrors.set(error.response.data)
            console.log(this.fieldErrors)
          }
        })
    }
  }
}
</script>
