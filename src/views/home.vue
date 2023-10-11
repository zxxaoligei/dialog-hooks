<template>
    <div class="contianer">
        <el-button type="success" @click="openDialog">打开弹框</el-button>
    </div>
</template>
<script lang="ts" setup>
import useDialogHooks from '@/hooks/dialog'

const { initDialog } = useDialogHooks()

const openDialog = () => {
    initDialog({
        dialogFullscreen: false,
        dialogWidth: '50%',
        dialogTitle: '明细',
        children: [{
            topTagName: "新增",
            iconName: "form",
            // detailPage1 就是这次要打开的弹窗内容
            component: () => import("@/views/detailPage1.vue"),
            data: {
                params: {
                    aa: 11,
                    bb: 22,
                },
                edit: 'add'
            },
            collbackFn: () => { //弹框内部组件 保存成功后的回调函数
                console.log("当弹窗任务结束后，调用父页面的回掉函数。（比如我新增完成了需要刷新列表页面）--Home");
            }
        }],
    })
}
</script>
<style scoped>
.contianer {
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>