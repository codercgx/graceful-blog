<template>
  <div class="artilce_list">
   <el-card>
      <el-form>
      <el-row
        type="flex"
        justify="space-between"
        align="middle"
        style="height: 30px;"
      >
        <el-col :span="6">
          <el-form-item label="文章标题: " label-width="80px">
            <el-input></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="6">
          <el-form-item label="文章简介: " label-width="80px">
            <el-input></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="6">
          <el-form-item label="文章标签: " label-width="80px">
            <el-input></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="6">
          <el-form-item label-width="80px">
            <el-button type="primary" size="medium" icon="el-icon-search"
              >查询</el-button
            >
            <el-button
              type="warning"
              size="medium"
              icon="el-icon-refresh
"
              >重置</el-button
            >
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <el-table :data="articleData" stripe>
      <el-table-column
        label="文章标题"
        prop="title"
        width="180px"
        align="center"
      ></el-table-column>
      <el-table-column
        label="文章简介"
        prop="introduction"
        width="240px"
        align="center"
      ></el-table-column>
      <el-table-column
        label="文章封面"
        prop="cover_src"
        width="240px"
        align="center"
      >
        <template #default="scope" style="height: 60px;">
          <img :src="scope.row.cover_src" alt="" />
        </template>
      </el-table-column>
      <el-table-column label="文章标签" align="center" width="360px">
        <template #default="scope">
          <el-tag
            :type="lable_type[Math.ceil(Math.random() * 5)]"
            v-for="(item, index) in scope.row.label"
            :key="index"
            >{{ item.name }}</el-tag
          >
        </template>
      </el-table-column>
      <el-table-column label="操作" width="240px" align="center">
        <template #default="scope">
          <el-button
            @click="previewArticle(scope.row)"
            type="warning"
            size="mini"
            icon="el-icon-view"
            >查看</el-button
          >
          <el-button
            @click="editArticle(scope.row)"
            type="success"
            size="mini"
            icon="el-icon-edit"
            >编辑</el-button
          >
          <el-button
            @click="delArticle(scope.row)"
            type="danger"
            size="mini"
            icon="el-icon-delete"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[100, 200, 300, 400]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400"
    >
    </el-pagination>
   </el-card>
  </div>
</template>

<script>
import { defineComponent, getCurrentInstance, onMounted, ref } from "vue";
import { articleApi } from "@/utils/http/request";
import { useRouter } from "vue-router";
export default defineComponent({
  name: "Article_List",
  components: {},
  setup() {
    const articleData = ref([]);

    const { ctx } = getCurrentInstance();

    const lable_type = ["", "success", "info", "warning", "danger"];
    const currentPage = ref(1);

    const router= useRouter()

    const handleSizeChange = () => {};
    const handleCurrentChange = () => {};

    const init = async () => {
      const result = await articleApi.articleList();
      console.log(result);
      articleData.value = result.articles;
    };

    const previewArticle = async (row) => {
      console.log(row);
      await articleApi.articleDetail(row._id)
      init()
    };
    const editArticle = (row) => {
      console.log(row);
      router.push(`/article/edit/${row._id}`)
    };
    const delArticle = async (row) => {
      console.log(row);
      ctx
        .$confirm("此操作将永久删除该文章, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
        .then(async () => {
          const result = await articleApi.articleDel(row._id);
          console.log(result);
          ctx.$message({
            type: "success",
            message: "删除成功!",
          });
          init()
        })
        .catch(() => {
          ctx.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    };

    onMounted(() => {
      init();
    });

    return {
      articleData,
      previewArticle,
      editArticle,
      delArticle,
      lable_type,
      currentPage,
      handleSizeChange,
      handleCurrentChange,
    };
  },
});
</script>

<style lang="scss" scoped>
.el-card{
  height: 1000px;
  :deep() .el-card__body{
    height: 100%;
  }
}
.el-form {
  margin: 10px 0 30px 0;
  .el-row {
    height: 40px;
    .el-col {
      height: 100%;
      .el-form-item {
        height: 100%;
        :deep() .el-form-item__label {
          height: 100%;
        }
        :deep() .el-form-item__content {
          height: 100%;
          .el-input {
            height: 100%;
            .el-input__inner {
              height: 100%;
              width: 200px;
            }
          }
        }
        .el-button {
          height: 30px;
          // line-height: 30px;
          text-align: center;
        }
      }
    }
  }
}
.el-table {
  .cell {
    img {
      height: 60px;
    }
    .el-button {
      width: 60px;
      text-align: center;
      padding: 5px;
      span{
        font-size: 14px;
      }
    }
    .el-tag {
      margin-right: 5px;
      margin-bottom: 5px;
    }
  }
}
.el-pagination {
  position: fixed;
  left: 200px;
  bottom: 20px;
}
</style>
