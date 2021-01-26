<template>
  <div id="album">
    <div class="card_item" v-for="(item, index) in albumList">
      <el-card>
       <div class="img_wrap">
          <img
          style="width: 200px; height: 200px;"
          :src="item.files[0].file_url"
          alt=""
        />
       </div>
        <div class="tags_wrap">
          <el-tag v-for="(tag, index) in item.label" :key="tag._id">{{
            tag.name
          }}</el-tag>
        </div>
      </el-card>
    </div>
  </div>
</template>
<script>
import { albumApi } from "@/utils/http/request";
import { defineComponent, onMounted, ref } from "vue";
export default defineComponent({
  setup() {
    const albumList = ref([]);

    onMounted(() => {
      albumApi.albumList().then((res) => {
        albumList.value = res.albumList;
        console.log(res);
      });
    });
    return {
      albumList,
    };
  },
});
</script>
<style lang="scss" scoped>
#album {
  padding: 0 150px;
  margin: 10px 0;
  display: flex;
  :deep().el-card {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width: 300px;
    height: 300px;
    border-radius: 6px;
    margin: 10px;
    .tags_wrap{
      display: flex;
      justify-content: space-evenly;
      align-items: center;
    }
    :deep().el-card__body {
      display: inline-block;
      width: 300px;
      height: 300px;
      > div {
        display: inline-block;
      }
    }
  }
}
</style>
