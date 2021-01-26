<template>
 <div id="app">
   <Index></Index>
 </div>
</template>

<script>
import { defineComponent } from 'vue'

import Index from '@/views/Index' 

export default defineComponent({
  components: { Index },
  setup(){
    
  }
})
</script>

<style lang="scss">
body{
  margin: 0;
}

</style>
