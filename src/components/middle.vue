<template>
  <div class="middle">
    <h2 className="message"><span @click="jumpClick()">时光不负，创作不停，本人正在参加2021年终总结征文大赛</span></h2>    
  </div>      
</template>
<script lang="ts" setup>
  // import axios from 'axios'

  // axios.get('http://139.159.245.209:5000/api/WeatherForecast/get')
  // .then(function (response) {
  //   // handle success
  //   console.log(response);
  // })
  // .catch(function (error) {
  //   // handle error
  //   console.log(error);
  // })
  // .then(function () {
  //   // always executed
  // });

  const jumpClick = () => window.open('https://juejin.cn/post/7036988966356123662','_blank')
</script>
<style lang="scss" scoped>
.middle {
  display: flex;
  align-items:center;
  justify-content: center;
  margin-top: 80px;
  color: var(--vp-c-brand);
  cursor: pointer;
  text-decoration: underline;
  &:hover {
    color: var(--vp-c-brand-dark);
  } 
}
</style>
