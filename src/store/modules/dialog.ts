import { reactive, ref, watch } from 'vue';
import { defineStore } from 'pinia';
import { type dialogOptionsType, type childrensType } from '@/store/types';

const usedialogStore = defineStore('dialogStore', () => {
  const dialogVisbled = ref<boolean>(false);
  const activeComponent = ref(); //子级激活项
  const collbackFnList = ref({}); //保存表单信息后外界刷新列表数据的回调函数
  const initOptions = {
    dialogFullscreen: false, //是否全屏
    dialogWidth: '30%', //弹窗宽度
    dialogTitle: '', //标题
    children: [],
  }
  let dialogOption = reactive<dialogOptionsType>({
    ...initOptions
  });

  const initDialog = (options: dialogOptionsType) => {
    Object.assign(dialogOption, options);
    dialogVisbled.value = true;
  };

  const removeItem = (index: number) => {
    dialogOption.children.splice(index, 1);
  };
  /**在第一个弹框中再次新增一个同级的页面 */
  const addDialog = (childrenOption: childrensType) => {
    if (!dialogOption.dialogTitle) {
      return console.error('请确保是否含有初始弹框容器,再添加新的弹框页面');
    }

    // 此处使用名称作为唯一标识 若二次弹框的名称一致,可自定义id 属性区分
    const obj = dialogOption.children.find(
      (item) => item.topTagName === childrenOption.topTagName
    );
    activeComponent.value = dialogOption.children.length;
    if (obj) {
      //如果已经存在了某个页面 但是没有关闭  再次点击则不新增新页面 而是回到旧页面
      activeComponent.value = dialogOption.children.findIndex(
        (item) => item.topTagName === childrenOption.topTagName
      );
      return;
    }
    dialogOption.children.push(childrenOption);
  };

  /**为每个组件添加回调 */
  const addCollBackFn = () => {
    dialogOption.children.forEach((item,index) => {
      if (
        item.collbackFn
      ) {
        collbackFnList.value[index] = item.collbackFn;
      }
    });
  };
  /**重置子级激活项 */
  const initActiveComponent = () => {
    activeComponent.value = null;
  };
  /**监听组件列表是否被移除/添加:以便收集回调 */
  watch(
    () => dialogOption.children,
    () => {
      addCollBackFn();
    },
    {
      deep:true,
    }
)
  return {
    dialogVisbled,
    dialogOption,
    activeComponent,
    collbackFnList,
    removeItem,
    initDialog,
    addDialog,
    initActiveComponent,
    $reset: () => {
      //重写重置方法
      dialogVisbled.value = false;
      Object.assign(dialogOption,initOptions)
      activeComponent.value = null;
      collbackFnList.value = {};
    },
  };
});

export default usedialogStore;
