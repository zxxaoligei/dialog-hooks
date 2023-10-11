import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import ElementPlus from 'element-plus';
import pinia from '@/store';
import router from './router'
import 'element-plus/dist/index.css';
//引入svg组件，并把svg-icon挂载为全局的vue组件
import svgIcon from "./icons"
createApp(App).use(pinia).use(router).use(ElementPlus).use(svgIcon).mount('#app');
