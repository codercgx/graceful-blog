<template>
  <div id="Article">
   <div class="article_wrap">
     <el-card v-for="(item,index) in articleList">
       <div class="article_cover"> <img :src="item.cover_src" alt=""> </div>
       <div class="article_info">
         <div>{{item.title}}</div>
         <div>{{item.introduction}}</div>
         <div>
           
         </div>
       </div>
       <div class="article_desc"></div>
     </el-card>
   </div>
  </div>
</template>
<script>
import { defineComponent, onMounted, ref }  from 'vue'
import { articleApi } from '@/utils/http/request'
  export default defineComponent({
    setup(){
      let articleList=ref([])
      onMounted(()=>{
        getArticleList()
      })
      

      const getArticleList= async ( )=>{
       let result = await articleApi.getArticleList()
       console.log(result);
       articleApi.value=result.articles
      }
    }
    
  })

</script>