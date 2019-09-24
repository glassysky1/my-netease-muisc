<template>
  <section class="py-spin">
    <div class="py-img-container py-loading" v-if='spining'>
      <img src="../assets/images/loading.gif" class="py-loading-img" alt="">
    </div>
  </section>
</template>

<script>
export default {
  props:['spining']
}
</script>

<style lang="stylus" scoped>
.py-loading
  display flex
  justify-content center
  align-items center
  height 30vh
</style>