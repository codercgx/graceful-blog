<template>
    <div class="demo_detail">
        <div class="wrap">
             <div class="go_back" @click="goBack">
        <i class="el-icon-arrow-left"></i>
      </div>
      <el-card v-if="demoData.title">
        <h3>{{ demoData.title }}</h3>
        <h5>{{ demoData.description }}</h5>
        <div class="demo_desc">
          <span>发布时间: </span> <span>{{ demoData.create_time }}</span>
        </div>
        <div class="demo_label">
          <span>标签: </span
          ><el-tag
            v-for="(item, index) in demoData.label"
            :key="index"
            :type="labelTypes[Math.ceil(Math.random() * 5)]"
            >{{ item.name }}</el-tag
          >
        </div>

        <div class="demo_card">
          <el-card>
            <div class="demo_content">
              <p v-html="demoData.codeContent"></p>
            </div>
          </el-card>
        </div>
      </el-card>
        </div>
    </div>
</template>

<script>
import { defineComponent, onMounted, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { demoApi } from '@/utils/http/request'
export default defineComponent({
    setup(){
        const router=useRouter()
        const route=useRoute()
        const demoData=reactive({})
         const labelTypes=ref(['','success','wraning','danger','info'])
        onMounted(()=>{
            getDemoDetail()
        })

        const getDemoDetail= async ()=>{
            const id=route.params.id
            const result=await demoApi.getDemoDetail(id)
            const demoDetail=result.demoDetail
            Object.keys(result.demoDetail).forEach(key=>{
                demoData[key]=demoDetail[key]
            })
        }

        const goBack=()=>{
            router.push('/demo')
        }

        return {
            demoData,
            goBack,
            labelTypes
        }
    }
})
</script>

<style lang="scss" scoped>
.demo_detail {
  .wrap {
    .go_back {
      position: absolute;
      top: 100px;
      left: 185px;
      background-color: #eee;
      > i {
        font-size: 30px;
        color: orange;
        &:hover {
          cursor: pointer;
        }
      }
    }
    :deep() .el-card {
      padding: 0 150px;
    }
    h3 {
      text-align: center;
    }
    h5 {
      text-align: center;
    }

    .demo_desc {
      text-align: center;
      margin-bottom: 10px;
      color: #999;
      > span {
        margin-right: 10px;
      }
      i {
        margin-right: 5px;
      }
    }
    .demo_label {
      text-align: center;
      > span {
        margin-right: 5px;
      }
      .el-tag {
        margin-right: 10px;
      }
    }
    .demo_card {
      margin-top: 20px;
    }
  }
}
</style>