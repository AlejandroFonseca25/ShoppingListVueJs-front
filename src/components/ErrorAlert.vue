<template>
  <div>
    <div class="alert alert-danger" role="alert">
      <strong>{{ message }}</strong>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ErrorAlert',
  props: ['message']
}
</script>
