import { Component } from 'vue';

export interface childrensType {
  topTagName: string;
  iconName: string;
  data?: any;
  component: Component; //声明异步组件类型
  collbackFn?: () => void;
}
export interface dialogOptionsType {
  dialogFullscreen: boolean;
  dialogWidth: string;
  dialogTitle: string;
  dialogClass?: string;
  children: childrensType[];
}
export interface indexType {
  [key: string]: any;
}

export interface dialogStateType {
  dialogVisbled: boolean;
  dialogOptions: dialogOptionsType;
  activeComponent: string | number;
  children?: childrensType[];
  collbackFnList: indexType;
}
