<template>
    <div class="contianer">
        detailPage44444444444444
        <el-button type="primary" @click="saveInfo">保存信息</el-button>

    </div>
</template>
<script lang="ts" setup>
const props = defineProps(['conf', 'id'])
const emit = defineEmits(['removePage'])
const saveInfo = () => {
    emit('removePage', props.id, true)
}
</script>
<style lang="scss" scoped>
.contianer {
    height: 100%;
}
</style>