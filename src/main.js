import { createApp } from 'vue'
import App from './App.vue'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { OhVueIcon, addIcons } from "oh-vue-icons";
import { IoClose, HiSolidPlus, LaTrashAltSolid, MdModeeditOutlined } from "oh-vue-icons/icons";



addIcons(IoClose, HiSolidPlus, LaTrashAltSolid, MdModeeditOutlined);

const app = createApp(App);

app.component("v-icon", OhVueIcon);
app.use(ElementPlus)
app.mount('#app');