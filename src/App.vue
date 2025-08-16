<script setup lang="ts">
import { onLaunch, onShow, onHide } from '@dcloudio/uni-app'

onLaunch(() => {
  console.log('App Launch')
})
onShow(() => {
  console.log('App Show')
})
onHide(() => {
  console.log('App Hide')
})
</script>

<style lang="scss">
@use '@/styles/base.scss' as *;
@use '@/styles/iconfonts/iconfont.css' as *;

@font-face {
  font-family: 'YouSheBiaoTiHei';
  src: url('https://objectstorageapi.gzg.sealos.run/dxepxlzz-sealaf-h91gpva7y7-cloud-bin/YouSheBiaoTiHei.ttf');
}

page {
  background-color: $jel-pageBackGroundColor;
  height: 100%;
  overflow: hidden;
  box-sizing: border-box;
}
</style>
