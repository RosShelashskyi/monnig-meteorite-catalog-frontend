import {createRouter, createMemoryHistory} from 'vue-router';

import MainMenu from "@/views/MainMenu.vue"
import AddPage from "@/views/AddPage.vue"

const router = createRouter({
    history: createMemoryHistory(),
    routes: [
        {path: '/', name: 'MainMenu', component: MainMenu},
        {path: '/add', name: 'Add', component: AddPage}
    ]
});

export default router;