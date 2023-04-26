<template>
  <div class="col-md-6 offset-md-3">
    <error-alert v-if="error" v-bind:message="message"/>

    <div v-if="loading">Loading...</div>
    <div class="list-group" v-else>
      <h1 v-text="this.item.name" class="list-group-item list-group-item-info"></h1>
      <div class="list-group-item">
        <div class="row">
          <div class="col-md-7">
            <strong>ID</strong>
          </div>
          <div class="col-md-5">
            <strong v-text="itemId"></strong>
          </div>
        </div>
      </div>
      <div class="list-group-item" v-if="this.item.comment">
        <div class="row">
          <div class="col-md-7">
            <strong>Comment</strong>
          </div>
          <div class="col-md-5">
            <em v-text="this.item.comment"></em>
          </div>
        </div>
      </div>
      <div class="list-group-item">
        <div class="row">
          <div class="col-md-7">
            <strong>Bought</strong>
          </div>
          <div class="col-md-5">
            <strong>{{ this.item.bought ? 'Yes' : 'No' }}</strong>
          </div>
        </div>
      </div>
    </div>
    <ul class="list-inline">
      <back-to-list-button v-bind:list-id="this.item.listId"/>
      <all-lists-button/>
      <li class="list-inline-item">
        <router-link v-bind:to="{ path: '/editItem/' + itemId }" class="btn btn-warning btn-sm" role="button" data-toggle="tooltip" data-placement="bottom" title="Edit item">
          <span class="oi oi-pencil"></span>
        </router-link>
      </li>
      <li class="list-inline-item">
        <a href="#" class="btn btn-danger btn-sm" role="button" data-toggle="tooltip" data-placement="bottom" title="Delete item" @click.prevent="confirmDeleteItem(itemId)">
          <span class="oi oi-x"></span>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
import {AXIOS} from './http-common'
import ErrorAlert from './ErrorAlert'
import AllListsButton from './AllListsButton'
import BackToListButton from './BackToListButton'
import Item from './classes/Item'

export default {
  name: 'Item',
  components: {BackToListButton, AllListsButton, ErrorAlert},
  props: ['itemId'],
  data () {
    return {
      item: {},
      loading: true,
      error: false,
      message: ''
    }
  },
  mounted () {
    AXIOS.get('/item/' + this.itemId)
      .then(response => {
        this.item = new Item(response.data)
        this.loading = false
        this.error = false
      })
      .catch(error => {
        console.log(error)
        this.loading = false
        this.error = true
        this.message = error.toString()
      })
  },
  methods: {
    confirmDeleteItem: function (id) {
      this.$dialog.confirm('Are you sure you want to delete this item?')
        .then(() => {
          console.log('Delete clicked')
          AXIOS.delete('/item/' + id)
            .then(() => {
              this.$router.push('/itemsList/' + this.item.listId)
            })
            .catch(error => {
              console.log(error)
              this.error = true
              this.message = error.toString()
            })
        })
        .catch(function () {
          console.log('Cancel delete clicked')
        })
    }
  }
}
</script>
