<template>
  <div class="col-md-6 offset-md-3">
    <error-alert v-if="error" v-bind:message="message"/>

    <h1>Edit {{this.item.name}}</h1>
    <form @submit.prevent="editItem" method="post" class="form-horizontal" @keydown="fieldErrors.clear($event.target.name)">
      <div class="form-group">
        <label for="name" class="col-sm-2 control-label">Name:</label>
        <div class="col-sm-6">
          <input data-test="name-item-input" type="text" id="name" name="name" v-model="item.name" class="form-control"/>
          <small data-test="name-error-message" v-if="fieldErrors.has('name')" class="text-danger" v-text="fieldErrors.get('name')"></small>
        </div>
      </div>
      <div class="form-group">
        <label for="comment" class="col-sm-2 control-label">Comment:</label>
        <div class="col-sm-6">
          <textarea data-test="comment-item-input" id="comment" name="comment" v-model="item.comment" rows="3" class="form-control"></textarea>
        </div>
      </div>
      <div class="form-group">
        <div class="col-sm-offset-2 col-sm-10">
          <input data-test="update-item-btn" type="submit" value="Update item" class="btn btn-outline-secondary" :disabled="fieldErrors.any()"/>
        </div>
      </div>
    </form>
    <ul class="list-inline">
      <back-to-list-button v-bind:list-id="this.item.listId"/>
      <all-lists-button/>
    </ul>
  </div>
</template>

<script>
import ErrorAlert from './ErrorAlert'
import AllListsButton from './AllListsButton'
import BackToListButton from './BackToListButton'
import FieldErrors from './classes/FieldErrors'
import Item from './classes/Item'
const ItemController = require('../controller/ItemController').ItemController

export default {
  name: 'EditItem',
  components: {BackToListButton, AllListsButton, ErrorAlert},
  props: ['itemId'],
  data () {
    return {
      item: {},
      error: false,
      fieldErrors: new FieldErrors(),
      message: ''
    }
  },
  mounted () {
    ItemController.getItemById(this.itemId)
      .then(response => {
        this.item = new Item(response.data)
        this.error = false
      })
      .catch(error => {
        console.log(error)
        this.error = true
      })
  },
  methods: {
    editItem: function () {
      ItemController.editItem(this.itemId, this.item.name, this.item.comment, this.item.listId)
        .then(() => {
          this.$router.push('/itemsList/' + this.item.listId)
        })
        .catch(error => {
          if (!error.response) {
            console.log(error)
            this.error = true
            this.message = error.toString()
          } else {
            this.fieldErrors.set(error.response.data)
            console.log(this.fieldErrors)
          }
        })
    }
  }
}
</script>
