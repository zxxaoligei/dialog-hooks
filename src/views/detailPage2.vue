<template>
    <div class="contianer">
        detailPage2222222222222222222222
        <el-button type="success" @click="openDialog">打开第三个弹框</el-button>
        <el-button type="primary" @click="saveInfo">保存信息</el-button>

    </div>
</template>
<script lang="ts" setup>
import useDialogHooks from '@/hooks/dialog'
const { addDialog } = useDialogHooks()
const props = defineProps(['conf', 'id'])
const emit = defineEmits(['removePage'])
const saveInfo = () => {
    emit('removePage', props.id, true)
}

const openDialog = () => {
    addDialog({
        topTagName: '第三个明细内容',
        iconName: "form",
        component: () => import("@/views/detailPage3.vue"),
        data: {
        },
        collbackFn: () => { //弹框内部组件 保存成功后的回调函数
            console.log("当弹窗任务结束后，调用父页面的回掉函数。（比如我新增完成了需要刷新列表页面）--detailPage2");
        }
    })
}

</script>
<style lang="scss" scoped>
.contianer {
    height: 100%;
}
</style>