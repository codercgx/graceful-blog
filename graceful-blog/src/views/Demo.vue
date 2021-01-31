<template>
  <div id="demo">
    <div class="wrap">
      <el-card v-for="(item, index) in demoData">
        <div class="card_item">
          <div class="demo_img">
            <img
              @click="previewDemoFile(item)"
              class="img_box"
              v-if="item.files.length > 0"
              :src="item.files[0].file_url"
              alt=""
            />
            <img v-else src="../assets/logo.png" alt="" />
          </div>
          <div class="demo_desc">
            <div class="demo_title" @click="previewDemo(item._id)">
              <p>{{ item.title }}</p>
            </div>
            <div class="demo_description">
              <span>{{ item.description }}</span>
            </div>
            <div class="demo_label">
              <el-tag
                v-for="tag in item.label"
                :key="tag._id"
                :type="labelTypes[Math.ceil(Math.random() * 5)]"
                >{{ tag.name }}</el-tag
              >
            </div>
            <div class="demo_create">发布于: {{ item.create_time }}</div>
          </div>
        </div>
      </el-card>
      <el-dialog title="预览"  width="50%" center  v-model="dialogVisible">
        <el-carousel trigger="click" height="500px">
          <el-carousel-item v-for="item in previewDemoFileData" :key="item.file_url">
            <img :src="item.file_url" alt="">
          </el-carousel-item>
        </el-carousel>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import { defineComponent, onMounted, ref } from "vue";
import { demoApi } from "@/utils/http/request";
import { useRouter } from "vue-router";
export default defineComponent({
  setup() {
    const demoData = ref([]);
    const router = useRouter();
    const labelTypes = ref(["", "success", "wraning", "danger", "info"]);
    const previewDemoFileData = ref([]);
    const dialogVisible=ref(false)
    const previewDemoFile = (item) => {
      console.log(item);
      dialogVisible.value=true
      previewDemoFileData.value=item.files
    };
    onMounted(() => {
      getDemoList();
    });

    const getDemoList = async () => {
      const result = await demoApi.getDemoList();
      console.log(result);
      demoData.value = result.demoList;

      // demoData.value = result.demoList.map(item=> ({
      //   ...item,
      //   files: item.files.length>0 ? item.files : [{
      //     file_url: '../assets/logo.png'
      //   }]
      // }));
    };
    const previewDemo = (id) => {
      router.push(`/demo/${id}`);
    };

    return {
      demoData,
      previewDemo,
      labelTypes,
      previewDemoFileData,
      previewDemoFile,
      dialogVisible
    };
  },
});
</script>
<style lang="scss" scoped>
#demo {
  .wrap {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    :deep() .el-card {
      margin: 10px;
      border-radius: 10px;
      &:hover {
        transform: scale(0.97);
      }
    }
    padding: 10px 100px;
    .card_item {
      display: flex;
      align-items: center;
      .demo_img {
        width: 100px;
        height: 100px;
        img {
          width: 100%;
          height: 100%;
          border-radius: 10px;
        }
        .img_box {
          position: relative;
          width: 100%;
          height: 100%;
          &:hover {
            position: relative;
            cursor: pointer;
            // transform: scale(0.95);
            &::after {
              content: "查看";
              color: #fff;
              display: block;
              position: absolute;
              z-index: 999;
              top: 0;
              left: 0;
              width: 100px;
              height: 100px;
              background-color: rgba(255, 255, 255, 0.1);
            }
          }
        }
      }
      .demo_desc {
        margin-left: 20px;
        .demo_title {
          &:hover {
            cursor: pointer;
          }
          p {
            font-size: 14px;
            margin: 5px 0 5px 0;
          }
        }
        .demo_description {
          font-size: 13px;
          color: #999;
        }
        .demo_label {
          margin: 5px 0;
          .el-tag {
            margin-right: 5px;
          }
        }
        .demo_create {
          font-size: 13px;
          color: #999;
        }
      }
    }
  }
  :deep().el-dialog{
    :deep().el-carousel__item{
      img{
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
