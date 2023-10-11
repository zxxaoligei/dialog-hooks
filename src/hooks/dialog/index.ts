import usedialogStore from '@/store/modules/dialog';
import { defineAsyncComponent, shallowRef } from 'vue';
import { type dialogOptionsType, type childrensType } from '@/store/types';
import { AsyncComponentLoader } from 'vue';

const dialogStore = usedialogStore();

export const useDialogHooks = () => {
  const initDialog = (options: dialogOptionsType) => {
    const { children } = options;
    children.forEach((item) => {
      item.component = shallowRef(
        defineAsyncComponent(item.component as AsyncComponentLoader)
      );
    });
    dialogStore.initDialog(options);
  };

  const addDialog = (options: childrensType) => {
    options.component = shallowRef(
      defineAsyncComponent(options.component as AsyncComponentLoader)
    );
    dialogStore.addDialog(options);
  };
  return {
    initDialog,
    addDialog,
  };
};

export default useDialogHooks;
