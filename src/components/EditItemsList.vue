<template>
  <div class="col-md-6 offset-md-3">
    <error-alert v-if="error" v-bind:message="message"/>

    <h1 data-test="edit-title">Edit {{this.list.name}}</h1>
    <form @submit.prevent="updateItemsList" method="post" class="form-horizontal" @keydown="fieldErrors.clear($event.target.name)">
      <div class="form-group">
        <label for="name" class="col-sm-1 control-label">Name:</label>
        <div class="col-sm-6">
          <input type="text" id="name" name="name" v-model="list.name" class="form-control" data-test='name-shopping-list'/>
          <small data-test="edit-error-message" v-if="fieldErrors.has('name')" class="text-danger" v-text="fieldErrors.get('name')"></small>
        </div>
      </div>
      <div class="form-group">
        <div class="col-sm-offset-1 col-sm-10">
          <input type="submit" value="Update list" class="btn btn-outline-secondary" :disabled="fieldErrors.any()" data-test="update-shopping-list-btn"/>
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
import ItemsList from './classes/ItemsList'
import {ShoppingListController} from '../controller/ShoppingListController'

export default {
  name: 'EditItemsList',
  components: {AllListsButton, ErrorAlert},
  props: ['listId'],
  data () {
    return {
      list: {},
      error: false,
      fieldErrors: new FieldErrors(),
      message: ''
    }
  },
  mounted () {
    ShoppingListController.getItemsListById(this.listId)
      .then(response => {
        this.list = new ItemsList(response.data)
        this.error = false
      })
      .catch(error => {
        console.log(error)
        this.error = true
      })
  },
  methods: {
    updateItemsList: function () {
      ShoppingListController.updateItemsList(this.listId, this.list.name)
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
