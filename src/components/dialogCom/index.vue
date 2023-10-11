<!-- 
* 全局挂载的弹框组件
*-->
<template>
    <el-dialog :fullscreen="dailogInfo.dialogFullscreen" v-model="dialogVisbled" :width="dailogInfo.dialogWidth"
        @closed="dialogClose" :append-to-body="false" draggable>
        <template #header>
            <!-- svg图标可自行使用符合项目的风格 -->
            <svg-icon name="module" />
            {{ dailogInfo.dialogTitle }}
        </template>

        <el-tabs type="card" v-model="dialogActiveTag" @tab-remove="tabClose" @tab-click="handTabClick">
            <el-tab-pane v-for="(item, index) in dailogInfo.children" :key="index" :name="index" :closable="index != 0">
                <template #label>
                    <svg-icon :name="item.iconName" />
                    {{ item.topTagName }}
                </template>
            </el-tab-pane>
        </el-tabs>
        <div class="dialogContianer">
            <template v-for="(item, index) in dailogInfo.children" :key="index">
                <transition name="fade-transform" mode="out-in">
                    <div v-show="index === dialogActiveTag">
                        <component @toCloseDialog="dialogClose" :is="item.component" :conf="item.data" :id="index"
                            @removePage="componentRemove" />
                    </div>
                </transition>
            </template>
        </div>
    </el-dialog>
</template>
<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { computed, ref, watch } from "vue";
import usedialogStore from '@/store/modules/dialog'

const dialogStore = usedialogStore()
const { dialogVisbled, activeComponent } = storeToRefs(dialogStore)
const dailogInfo = computed(() => {
    return dialogStore.dialogOption
})
/** 每当push子级页面时当前选中项都默认选中push后的组件 */
watch(
    () => activeComponent.value,
    (val) => {
        if (val != null && val != undefined) {
            dialogActiveTag.value = activeComponent.value
            dialogStore.initActiveComponent()
        }
    }
)

const dialogActiveTag = ref(0)
/**关闭弹框 并 重置store的状态 */
const dialogClose = () => {
    dialogStore.$reset()
    dialogActiveTag.value = 0
}
/**移除当前组件,重置激活项 */
const tabClose = (index: number) => {
    dialogStore.removeItem(index)
    // 激活项===删除项 直接删除
    if (dialogActiveTag.value === index) {
        dialogActiveTag.value = index - 1
    }
    //激活项>删除项 则直接赋删除项
    if (dialogActiveTag.value > index) {
        dialogActiveTag.value = index;
    }
    if (!dailogInfo.value.children.length) {
        dialogClose()
    }
}
/**设置激活的组件 */
const handTabClick = (tab: any) => {
    dialogActiveTag.value = Number(tab.index);
}
/**子级组件关闭
 * @params {id} 关闭项
 * @params {isSaveFn :true 嵌套的子级页面操作了表单,需要通知父级页面刷新列表之类的操作" }
 */
const componentRemove = (id: number, isSaveFn: boolean) => {
    if (isSaveFn) {
        dailogInfo.value.children.forEach((item, index) => {
            if (index === id && item.collbackFn) {
                //回调-通知上一级页面
                dialogStore.collbackFnList[index]()
            }
        })
    }
    if (id == 0) dialogClose()
    else tabClose(id)
}
</script>
<style scoped>
/* fade-transform */
.fade-transform-leave-active,
.fade-transform-enter-active {
    transition: all 0.5s;
}

.fade-transform-enter {
    opacity: 0;
    transform: translateX(-30px);
}

.fade-transform-leave-to {
    opacity: 0;
    transform: translateX(30px);
}
</style>