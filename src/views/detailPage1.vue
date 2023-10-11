<template>
    <div class="contianer">
        detailPage11111111111111111111111111111111
        <el-button type="success" @click="openDialog">打开第二个弹框</el-button>
        <el-button type="primary" @click="saveInfo">保存信息</el-button>
    </div>
</template>
<script lang="ts" setup>
import useDialogHooks from '@/hooks/dialog'
const { addDialog } = useDialogHooks()

const props = defineProps(['conf', 'id'])
const emit = defineEmits(['removePage'])

const openDialog = () => {
    addDialog({
        topTagName: '第二个明细内容',
        iconName: "form",
        component: () => import("@/views/detailPage2.vue"),
        data: {
        },
        collbackFn: () => { //弹框内部组件 保存成功后的回调函数
            console.log("当弹窗任务结束后，调用父页面的回掉函数。（比如我新增完成了需要刷新列表页面）--detailPage1");
        }
    })
}
console.log(props.conf) //上一层组件的值
const saveInfo = () => {
    emit('removePage', props.id, true)
}
</script>
<style lang="scss" scoped>
.contianer {
    height: 100%;
}
</style>