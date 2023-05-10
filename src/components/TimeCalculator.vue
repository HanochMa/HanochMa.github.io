<template>
    <div class="time-search">
        <el-time-picker v-model="startWorkTime" :default-value="defaultTime" placeholder="输入上班打卡时间" />
        <el-button style="margin-left: 16px" type="primary" round @click="calEndTime">下班时间</el-button>
    </div>
    <div class="time-static" v-if="showTime">
        <el-statistic title="下班打卡" :value="endWorkTime" />
        <el-statistic title="免费晚餐" :value="freeDinerTime"></el-statistic>
    </div>
</template>
<script lang="ts" setup>
import { computed, ref } from 'vue'
import dayjs from 'dayjs'
const startWorkTime = ref('')
const getEndTime = (workTime: number) => {
    if (!startWorkTime.value) {
        return '--'
    } else {
        return dayjs(startWorkTime.value).add(workTime * 60, 'm').format('HH:mm:ss')
    }
}
const endWorkTime = computed(() => getEndTime(8.5))
const freeDinerTime = computed(() => getEndTime(11))
const showTime = ref(false)
const calEndTime = () => {
    showTime.value = true
}
const defaultTime = dayjs().set('hour', 9).set('minute', 0).set('second', 0)
</script>
<style lang="scss" scoped>
.time-search {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 64px;
    color: var(--vp-c-brand);
}

.time-static {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 16px;

    .el-statistic {
        margin: 0 24px;
        text-align: center;
    }
}
</style>
  