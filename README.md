# dialog-hooks
### 
#### 介绍

### 
dialog弹窗组件的解决方案

![输入图片说明](noPrintSmall.gif)


### 1.  全局挂载弹窗组件后,调用对应的hooks 传入基础配置

```

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
```

### 2.  在原有的弹窗新增一个弹窗

```
import useDialogHooks from '@/hooks/dialog'
const { addDialog } = useDialogHooks()

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

```


### 3.关闭当前弹窗


```
const props = defineProps(['conf', 'id'])
const emit = defineEmits(['removePage'])

emit('removePage', props.id, true)    //关闭
```


### 4. 最后： 根据 component 属性传入异步组件，将弹窗页面 视为一个.vue文件 就已将dailog 的逻辑与当前页面相隔离



