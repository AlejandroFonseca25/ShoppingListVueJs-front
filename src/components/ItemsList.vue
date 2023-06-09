<template>
  <div class="col-md-6 offset-md-3">
    <error-alert v-if="error" v-bind:message="message"/>

    <div v-if="loading">Loading...</div>
    <div class="list-group" data-test="list-group-items" v-else>
      <h1 class="list-group-item list-group-item-info" data-test='shopping-list-name'>{{ this.list.name }} <span class="badge badge-light" data-test='number-of-items'>{{ this.list.items.length }}</span></h1>
      <div class="list-group-item" v-for="(item, index) in this.list.items" v-bind:key="item.id" v-bind:class="{ 'list-group-item-success': item.bought }">
        <div class="row">
          <div class="col-md-7">
            <router-link data-test="item-name" v-bind:to="{ path: '/item/' + item.id }">{{ item.name }}</router-link>
            <small data-test="item-comment" class="clearfix" v-if="item.comment">{{ item.comment }}</small>
          </div>
          <div class="col-md-5">
            <ul class="list-inline text-right">
              <li class="list-inline-item">
                <a href="#" @click.prevent="buy(item.id, index)" data-test="buy-item" class="badge badge-success" role="button">
                  {{ item.bought ? 'Take out' : 'Buy' }}
                </a>
              </li>
              <li class="list-inline-item">
                <router-link data-test="edit-item" v-bind:to="{ path: '/editItem/' + item.id }" class="badge badge-warning" role="button">Edit</router-link>
              </li>
              <li class="list-inline-item">
                <a href="#" data-test="delete-item" class="badge badge-danger" role="button" @click.prevent="confirmDeleteItem(item.id, index)">Delete</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <ul class="list-inline">
      <li class="list-inline-item">
        <router-link data-test='add-item-button' v-bind:to="{ path: '/addItem/' + this.listId }" class="btn btn-success btn-sm" role="button" data-toggle="tooltip" data-placement="bottom" title="Add a new item">
          <span class="oi oi-plus"></span>
        </router-link>
      </li>
      <li class="list-inline-item">
        <router-link data-test='edit-button' v-bind:to="{ path: '/editItemsList/' + this.listId }" class="btn btn-warning btn-sm" role="button" data-toggle="tooltip" data-placement="bottom" title="Edit list">
          <span class="oi oi-pencil"></span>
        </router-link>
      </li>
      <li class="list-inline-item">
        <a data-test='delete-button' href="#" class="btn btn-danger btn-sm" role="button" data-toggle="tooltip" data-placement="bottom" title="Delete list" @click.prevent="confirmDeleteList(listId)">
          <span class="oi oi-x"></span>
        </a>
      </li>
      <all-lists-button/>
    </ul>
  </div>
</template>

<script>
import AllListsButton from './AllListsButton'
import ErrorAlert from './ErrorAlert'
import ItemsList from './classes/ItemsList'
import {ShoppingListController} from '../controller/ShoppingListController'
import {ItemController} from '../controller/ItemController'

export default {
  name: 'ItemsList',
  components: {AllListsButton, ErrorAlert},
  props: ['listId'],
  data () {
    return {
      list: {},
      loading: true,
      error: false,
      message: ''
    }
  },
  mounted () {
    ShoppingListController.getItemsListById(this.listId)
      .then(response => {
        this.list = new ItemsList(response.data)
        this.loading = false
        this.error = false
      })
      .catch(error => {
        console.log(error)
        this.error = true
        this.loading = false
      })
  },
  methods: {
    buy: function (id, index) {
      ItemController.buyItem(id)
        .then(() => {
          console.log('Buy clicked')
          this.error = false
          this.list.items[index].bought = !this.list.items[index].bought
        })
        .catch(error => {
          console.log(error)
          this.error = true
          this.message = error.toString()
        })
    },
    confirmDeleteItem: function (id, index) {
      this.$dialog.confirm('Are you sure you want to delete this item?')
        .then(() => {
          console.log('Delete clicked')
          ItemController.deleteItem(id)
            .then(() => {
              // remove item from array
              this.list.items.splice(index, 1)
              this.error = false
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
    },
    confirmDeleteList: function (id) {
      this.$dialog.confirm('Are you sure you want to delete this list?')
        .then(() => {
          console.log('Delete clicked')
          ShoppingListController.deleteItemsListById(id)
            .then(() => {
              this.$router.push('/')
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
