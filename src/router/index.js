import {createRouter, createMemoryHistory} from 'vue-router';

import MainMenu from "@/views/MainMenu.vue"
import AddPage from "@/views/AddPage.vue"
import ViewSample from '@/views/ViewSample.vue'
import UpdateSample from '@/views/UpdateSample.vue'
import Login from '@/views/Login.vue';
import Loans from '@/views/Loans.vue';
import ViewLoan from '@/views/ViewLoan.vue';
import AddLoan from '@/views/AddLoan.vue'
import UpdateLoan from '@/views/UpdateLoan.vue'
import SampleHistory from '@/views/SampleHistory.vue';
import ViewHistory from '@/views/ViewHistory.vue'
import AddHistory from '@/views/AddHistory.vue';
import ArchivedLoans from '@/views/ArchivedLoans.vue';

const router = createRouter({
    history: createMemoryHistory(),
    routes: [
        {path: '/', name: 'MainMenu', component: MainMenu},
        {path: '/add-sample', name: 'AddSample', component: AddPage},
        {path: '/view-sample/:sample_id', name: 'ViewSample', component: ViewSample},
        {path: '/update-sample/:sample_id', name: 'UpdateSample', component: UpdateSample},
        {path: '/login', name: 'Login', component: Login},
        {path: '/loans', name: 'Loans', component: Loans},
        {path: '/loans/:loan_id', name: 'ViewLoan', component: ViewLoan},
        {path: '/loans/add', name:'AddLoan', component: AddLoan},
        {path: '/loans/update/:loan_id', name: 'UpdateLoan', component: UpdateLoan},
        {path: '/view-sample/:sample_id/history', name: 'SampleHistory', component: SampleHistory},
        {path: '/view-sample/:sample_id/history/:entry_id', name: 'ViewHistory', component: ViewHistory},
        {path: '/view-sample/:sample_id/history/add', name: 'AddHistory', component: AddHistory},
        {path: '/loans/archived', name: 'ArchivedLoans', component: ArchivedLoans}
    ]
});

export default router;