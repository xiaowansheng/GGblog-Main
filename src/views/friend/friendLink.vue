<template>
  <div class="friend" @click="detailShow = true">
    <div class="icon">
      <el-avatar shape="square" :size="70" fit="fit" :src="friend.icon" />
    </div>
    <div class="content">
      <div class="title">
        {{ friend.name }}
      </div>
      <div class="author">
        {{ friend.author }}
      </div>
      <div class="intro">
        {{ friend.introduction }}
        <!-- {{ friend.introduction }}
        {{ friend.introduction }}
        {{ friend.introduction }} -->
      </div>
    </div>
    <div class="detail">
      <el-dialog
        v-model="detailShow"
        :title="$t('blogroll.detail.detail')"
        id="fridend-link-detail-dialog"
      >
        <div>
          <table>
            <tr>
              <th>{{ $t('blogroll.detail.icon') }}</th>
              <td>
                <el-avatar shape="square" :size="70" fit="fit" :src="friend.icon" />
              </td>
            </tr>
            <tr>
              <th>{{ $t('blogroll.detail.name') }}</th>
              <td>{{ friend.name }}</td>
            </tr>
            <tr>
              <th>{{ $t('blogroll.detail.author') }}</th>
              <td>{{ friend.author }}</td>
            </tr>
            <tr>
              <th>{{ $t('blogroll.detail.introduction') }}</th>
              <td>
                {{ friend.introduction }}{{ friend.introduction }}{{ friend.introduction
                }}{{ friend.introduction }}{{ friend.introduction }}{{ friend.introduction }}
              </td>
            </tr>
            <tr>
              <th>{{ $t('blogroll.detail.link') }}</th>
              <td>{{ friend.address }}</td>
            </tr>
          </table>
        </div>
        <template #footer>
          <span class="dialog-footer">
            <el-button type="primary" @click="toNewWeb(friend.address)">
              {{ '点击跳转' }}
            </el-button>
          </span>
        </template>
      </el-dialog>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { toRefs, ref } from 'vue'

const props = defineProps({
  friend: {
    type: Object,
    required: true
  }
})
const {friend}=toRefs(props)
const detailShow = ref(false)
const toNewWeb = (url: string) => {
  window.open(url, '_blank')
}
</script>

<style lang="scss" scoped>
.friend {
  cursor: pointer;
  background-color: rgb(225, 237, 240);
  border-radius: 15px;
  padding: 0.8rem;
  display: flex;
  .icon {
  }
  .content {
    padding: 0 1.5rem;
    .title {
      font-size: 1.4rem;
      font-weight: bold;
    }
    .author {
      display: none;
      font-size: 1.4rem;
    }
    .intro {
      font-size: 1.2rem;
      margin-top: 0.3rem;
      text-overflow: ellipsis;
      overflow: hidden;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 3; /*显示行数*/
    }
  }
  .detail {
    tr {
      // box-sizing: border-box;
      th {
        width: 5rem;
        font-size: 1.4rem;
        padding: 0.5rem 0;
      }
      td {
        font-size: 1.3rem;
        padding-left: 2rem;
      }
    }
  }
}
</style>
<style lang="scss">
#fridend-link-detail-dialog {
  border-radius: 1.5rem;
  background-color: rgba(255, 255, 255, 0.9);
}
@media screen and (max-width: 768px) {
  #fridend-link-detail-dialog {
    --el-dialog-width: 85%;
  }
}
@media screen and (min-width: 768px) and (max-width: 992px) {
  #fridend-link-detail-dialog {
    --el-dialog-width: 55%;
  }
}
@media screen and (min-width: 992px) {
  #fridend-link-detail-dialog {
    --el-dialog-width: 40%;
  }
}
.dark {
  .friend {
    background-color: rgb(6, 43, 48) !important;
  }
  #fridend-link-detail-dialog {
    background-color: rgba(0, 0, 0, 0.9);
  }
}
</style>
