<template>
  <div class="share">
    <div class="title">
      <span class="iconfont icon-41shuoshuo"></span>
    </div>
    <div class="content">
      {{
        '哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈斤斤计较急急急急急急斤斤计较急急急急急急酷酷酷酷酷酷酷酷酷酷酷酷酷酷啦啦啦啦啦了了了了了了'
      }}
      <!-- <table border="0">
        <tr class="item">
          <td class="category">
            <el-tag class="ml-2" type="success">好句</el-tag>
          </td>
          <td>
            <span class="content"
              >哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈</span
            >
          </td>
        </tr>
        <tr class="item">
          <td class="category">
            <el-tag class="ml-2" type="success">好句</el-tag>
          </td>
          <td>
            <span class="content"
              >哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈</span
            >
          </td>
        </tr>
        <tr class="item">
          <td class="category">
            <el-tag class="ml-2" type="success">好句</el-tag>
          </td>
          <td>
            <span class="content"
              >哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈</span
            >
          </td>
        </tr>

        <tr class="item">
          <td class="category">
            <el-tag class="ml-2" type="success">好句</el-tag>
          </td>
          <td>
            <span class="content"
              >哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈</span
            >
          </td>
        </tr>
      </table> -->
    </div>
    <div class="more">
      <span class="iconfont icon-guanyu"></span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Share',
  setup() {}
})
</script>

<style lang="scss" scoped>
.iconfont {
  // padding: 0;
  // margin: 0;
  font-size: 1.5rem;
}
.share {
  font-size: 1.2rem;
  padding: 0.6rem 1.2rem;
  border-radius: 1.5rem;
  background-color: burlywood;

  display: flex;

  .content {
    line-height: 1.8rem;
    padding: 0 2rem;
    text-overflow: ellipsis;
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1; /*显示行数*/
  }
  // .title {
  //   font-size: 1.5rem;
  //   font-weight: bold;
  // }
  // .item {
  //   font-size: 1.2rem;
  //   .category {
  //     margin-right: 1rem;
  //     font-weight: bold;
  //   }
  //   .content {
  //     text-overflow: ellipsis;
  //     overflow: hidden;
  //     display: -webkit-box;
  //     -webkit-box-orient: vertical;
  //     -webkit-line-clamp: 1; /*显示行数*/
  //   }
  // }
}
</style>
