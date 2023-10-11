/**
 * 注册Svg图标，采用app.use()安装
 */
import { type App } from 'vue';
import 'virtual:svg-icons-register';
import SvgIcon from '@/components/SvgIcon/index.vue'; // Svg Component
export default {
  install(app: App) {
    app.component('svg-icon', SvgIcon);
  },
};
