<template>
  <div id="album">
    <div class="card_item" v-for="(item, index) in albumList">
      <el-card
        @mouseenter="handleMouseEnter(index)"
        @mouseleave="handleMouseLeave(index)"
      >
        <div class="img_wrap">
          <img
            style="width: 200px; height: 200px;"
            :src="defineComputed(item.files)"
            alt=""
          />
        </div>
        <div class="tags_wrap">
          <el-tag
            v-for="(tag, index) in item.label"
            :type="label_type[Math.ceil(Math.random() * 5)]"
            :key="tag._id"
            >{{ tag.name }}</el-tag
          >
        </div>
        <div class="mask" v-show="item.isShowMask">
          <div class="view-icon">
            <i class="el-icon-view"  @click="handleClick(item)"></i>
          </div>
          <p class="album-count">当前相册总共: {{ item.files.length }}张</p>
          <p class="album-time">上传于:{{ item.create_time }}</p>
        </div>
      </el-card>
    </div>

    <div class="dialogVisible">
       <el-dialog title="当前相册" @close="closeDialogVisible"
        v-model="dialogVisible" width="50%" center>
        <el-carousel :interval="4000" type="card" height="400px">
          <el-carousel-item v-if="currentAlbumSrc"
            v-for="(file, current) in currentAlbumSrc"
            :key="file.file_url"
          >
            <img :src="file.file_url" alt="" />
          </el-carousel-item>
        </el-carousel>
    </el-dialog>
    </div>
  </div>
</template>
<script>
import { albumApi } from "@/utils/http/request";
import { computed, defineComponent, onMounted, ref } from "vue";
export default defineComponent({
  setup() {
    const albumList = ref([]);
    const label_type = ["", "success", "info", "warning", "danger"];
    const dialogVisible = ref(false);
    const previewPicData = ref([]);
    onMounted(() => {
      albumApi.albumList().then((res) => {
        albumList.value = res.albumList;
        albumList.value = albumList.value.map((item) => ({
          ...item,
          isShowMask: false,
        }));
        console.log(res);
      });
    });
    const defineComputed = computed(() => {
      return (files) => {
        let index = Math.floor(Math.random() * files.length);
        return files[index].file_url;
      };
    });
    const currentAlbumSrc=computed(()=>{
      return previewPicData.value.files
    })
    const isShowMask = ref(false);
    const handleMouseEnter = (index) => {
      const _albumList = albumList.value;
      _albumList[index].isShowMask = true;
      albumList.value = [..._albumList];
    };
    const handleMouseLeave = (index) => {
      const _albumList = albumList.value;
      _albumList[index].isShowMask = false;
      albumList.value = [..._albumList];
    };
    const handleClick = (item) => {
      previewPicData.value = JSON.parse(JSON.stringify(item));
      dialogVisible.value = true;
      console.log(previewPicData.value.files);
    };
    const closeDialogVisible=()=>{
       previewPicData.value.files=[]
       console.log('关闭 Dialog');
    }
    return {
      albumList,
      label_type,
      defineComputed,
      handleMouseEnter,
      handleMouseLeave,
      isShowMask,
      dialogVisible,
      previewPicData,
      handleClick,
      closeDialogVisible,
      currentAlbumSrc
    };
  },
});
</script>
<style lang="scss" scoped>
#album {
  padding: 0 150px;
  margin: 10px 0;
  display: flex;
  flex-wrap: wrap;
  // justify-content: space-between;
  :deep().el-card {
    position: relative;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    width: 260px;
    // height: 260px;
    border-radius: 6px;
    margin: 10px;
    box-sizing: border-box;
    z-index: 2;

    .img_wrap {
      text-align: center;
      img {
        border-radius: 5px;
      }
    }
    .tags_wrap {
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      flex-wrap: wrap;
      .el-tag {
        margin: 5px;
      }
    }
    .mask {
      width: 100%;
      height: 100%;
      position: absolute;
      // display: flex;
      // flex-direction: column;
      // align-items: center;
      // justify-content: space-around;
      z-index: 999;
      left: 0;
      top: 0;
      &:hover {
        transform: scale(0.95);
        background-color: rgba(0, 0, 0, 0.75);
      }
      .view-icon {
        position: absolute;
        width: 50px;
        height: 50px;
        line-height: 50px;
        text-align: center;
        left: 50%;
        top: 40%;
        transform: translate(-50%, -50%);
        color: #fff;
        font-size: 32px;
        &:hover{
          cursor: pointer;
        }
      }
      .album-count {
        position: absolute;
        left: 20px;
        bottom: 30px;
        color: red;
        text-align: center;
      }
      .album-time {
        position: absolute;
        left: 20px;
        bottom: 10px;
        color: orange;
        text-align: center;
        font-size: 14px;
      }

      // &:hover {
      //   background-color: rgba(0, 0, 0, 0.3);
      // }
    }
    :deep().el-card__body {
      display: inline-block;
      width: 260px;
      // height: 260px;
      > div {
        display: inline-block;
      }
    }
  }
  .dialogVisible{
    :deep() .is-in-stage{
      img{
          width: 100%;
          height: 100%;
      }
    }
  }
}
</style>
