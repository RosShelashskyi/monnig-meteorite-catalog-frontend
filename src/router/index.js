import {createRouter, createMemoryHistory} from 'vue-router';

import MainMenu from "@/views/MainMenu.vue"
import AddPage from "@/views/AddPage.vue"
import ViewSample from '@/views/ViewSample.vue';

const router = createRouter({
    history: createMemoryHistory(),
    routes: [
        {path: '/', name: 'MainMenu', component: MainMenu},
        {path: '/add-sample', name: 'AddSample', component: AddPage},
        {path: '/view-sample/:sample_id', name: 'ViewSample', component: ViewSample}
    ]
});

export default router;