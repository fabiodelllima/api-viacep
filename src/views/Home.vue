<template>
  <Header/>
  <Search/>
</template>

<script>
import Header from '@/components/Header.vue'
import Search from '@/components/Search.vue'
export default {
  name: 'Home',
  components: {
    Header,
    Search
  }
}
</script>
