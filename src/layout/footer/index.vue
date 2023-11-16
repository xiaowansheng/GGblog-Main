<template>
  <div id="footer">
    <p><span>©</span>{{dateStr}} By {{ author.nickname }}</p>
    <p>
      <a class="link" href="https://beian.miit.gov.cn/" target="_blank">{{
        website.recordNumber
      }}</a>
    </p>
  </div>
</template>

<script lang='ts' setup>
import { computed, ref, watch } from "vue";
import { useConfigStoreHook } from "@/store/modules/config"
defineOptions({
  name: 'Footer'
})
const website = computed(() => {
  return useConfigStoreHook().website
})
const author = computed(() => {
  return useConfigStoreHook().author
})
const dateStr=ref("")
watch(website.value,()=>{
  if(website.value.createTime){
    let timeStr = website.value.createTime
  let str=timeStr.replace(/-/g,"/")
  let date:Date=new Date(str)
    let start=date.getFullYear()
    let now=new Date().getFullYear()
     dateStr.value=start+" - "+now
  }
})
</script>

<style lang='scss' scoped>
#footer {
  padding: 1.5rem 2rem;
  background: linear-gradient(to right, #9df4d0, #e990d7, #dbaf8f, #85c0db);

  text-align: center;
  font-size: 1.1rem;
  p {
    padding: 0.2rem 0;
    margin: 0;
  }
  .link{
    color: black;
  }
}

.dark #footer {
  background: linear-gradient(to right, #252a28, #56364f, #524034, #2f4853);
  p,.link{
    color: rgb(191, 188, 188);
  }
}
</style>