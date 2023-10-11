<template>
  <div class="talk">
    <div class="title"><span class="iconfont icon-41shuoshuo"> 说说</span></div>
    <div class="content">
      <table border="0">
        <tr class="item">
          <td>
            <el-tag class="ml-2" type="success"
              ><span class="date">{{ '01月01日 02:04' }}</span></el-tag
            >
          </td>
          <td>
            <div class="content">
              {{
                '黄河长江经济就将计就计酷酷酷酷酷酷靠靠靠靠靠靠靠黄河长江经济就将计就计酷酷酷酷酷酷靠靠靠靠靠靠靠'
              }}
            </div>
            <span></span>
          </td>
        </tr>
        <tr class="item">
          <td>
            <el-tag class="ml-2" type="success"
              ><span class="date">{{ '01月01日 02:04' }}</span></el-tag
            >
          </td>
          <td>
            <div class="content">
              {{
                '黄河长江经济就将计就计酷酷酷酷酷酷靠靠靠靠靠靠靠黄河长江经济就将计就计酷酷酷酷酷酷靠靠靠靠靠靠靠'
              }}
            </div>
            <span></span>
          </td>
        </tr>
        <tr class="item">
          <td>
            <el-tag class="ml-2" type="success"
              ><span class="date">{{ '01月01日 02:04' }}</span></el-tag
            >
          </td>
          <td>
            <div class="content">
              {{
                '黄河长江经济就将计就计酷酷酷酷酷酷靠靠靠靠靠靠靠黄河长江经济就将计就计酷酷酷酷酷酷靠靠靠靠靠靠靠'
              }}
            </div>
            <span></span>
          </td>
        </tr>
        <tr class="item">
          <td>
            <el-tag class="ml-2" type="success"
              ><span class="date">{{ '01月01日 02:04' }}</span></el-tag
            >
          </td>
          <td>
            <div class="content">
              {{
                '黄河长江经济就将计就计酷酷酷酷酷酷靠靠靠靠靠靠靠黄河长江经济就将计就计酷酷酷酷酷酷靠靠靠靠靠靠靠'
              }}
            </div>
            <span></span>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Talk',
  setup() {}
})
</script>

<style lang="scss" scoped>
.talk {
  padding: 1rem;
  border-radius: 1.5rem;
  background-color: violet;
  .title {
    font-size: 1.5rem;
    margin: 0 1rem;
    font-weight: bold;
  }
  .item {
    margin: 0.7rem 0;
    font-size: 1.2rem;

    .date {
    }

    .content {
      text-overflow: ellipsis;
      overflow: hidden;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1; /*显示行数*/
    }
  }
}
</style>
