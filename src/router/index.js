import {createRouter, createMemoryHistory} from 'vue-router';

import MainMenu from "@/views/MainMenu.vue"
import AddPage from "@/views/AddPage.vue"
import ViewSample from '@/views/ViewSample.vue'
import UpdateSample from '@/views/UpdateSample.vue'
import Login from '@/views/Login.vue';
import Loans from '@/views/Loans.vue';
import ViewLoan from '@/views/ViewLoan.vue';

const router = createRouter({
    history: createMemoryHistory(),
    routes: [
        {path: '/', name: 'MainMenu', component: MainMenu},
        {path: '/add-sample', name: 'AddSample', component: AddPage},
        {path: '/view-sample/:sample_id', name: 'ViewSample', component: ViewSample},
        {path: '/update-sample/:sample_id', name: 'UpdateSample', component: UpdateSample},
        {path: '/login', name: 'Login', component: Login},
        {path: '/loans', name: 'Loans', component: Loans},
        {path: '/loans/:loan_id', name: 'ViewLoan', component: ViewLoan}
    ]
});

export default router;