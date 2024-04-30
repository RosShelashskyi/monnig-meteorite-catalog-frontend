<template>
    <div class="mainWindow">
        <div class = "top">
            <div class="topLeft">
                <img src="../assets/TCU.jpg" class="logo">
                <div class="title">Monnig Meteorite Catalog</div>
            </div>
            <button v-if=!loggedIn @click="goToLogin" class="loginButton">Curator login</button>
            <button v-if=loggedIn @click="logout" class="loginButton">Log out</button>
        </div>
        <div class="bottom">
            <div class="contentWindow"> 
                <div class="details">Loan details:</div>
                <div class="entry">
                    <div>Loanee Name</div>
                    <div>{{loan.loanee_name}}</div>
                </div>
                <div class="entry">
                    <div>Loanee email</div>
                    <div>{{loan.loanee_email}}</div>
                </div>
                <div class="entry">
                    <div>Loanee institution</div>
                    <div>{{loan.loanee_institution}}</div>
                </div>
                <div class="entry">
                    <div>Loanee address</div>
                    <div>{{loan.loanee_address}}</div>
                </div>
                <div class="entry">
                    <div>Loan start date</div>
                    <div>{{loan.loan_start_date}}</div>
                </div>
                <div class="entry">
                    <div>Loan due date</div>
                    <div>{{loan.loan_due_date}}</div>
                </div>
                <div class="entry">
                    <div>Loan notes</div>
                    <div>{{loan.loan_notes}}</div>
                </div>
                <div class="entry">
                    <div>Samples on loan:</div>
                    <div>{{loan.samples_on_loan}}</div>
                </div>
                <div class="entry">
                    <button @click="goToHome" class="backButton">Back</button>
                    <div>
                        <button @click="goToUpdate">Update loan</button>
                        <button @click="deleteLoan(this.loan.id)">Delete loan</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import cacheUtils from '@/utils/cacheUtils';
import axios from 'axios'

    export default {
        data(){
            return{
                loan: '',     //stores sample data
                loggedIn: ''    //stores login state
            }
        },
        mounted() {
            this.fetchData(this.$route.params.loan_id);   //fetches samples from API
            //prints a login or a logout button depending on the login state
            if(cacheUtils.get(0) != null){
                this.loggedIn = true;
            }else{
                this.loggedIn = false;
            }
        },
        methods:{
            //fetches data from the API
            async fetchData(loan_id){
                try{
                    //GET request to the API
                    const response = await axios({
                        method: 'get',
                        url: 'http://localhost:8080/api/loan/view/' + loan_id,
                        headers :{
                            'Authorization': 'Bearer ' + cacheUtils.get(0)
                        }
                    })
                    this.loan = response.data;
                    this.loan = this.loan.data;
                }catch(error){
                    console.error('Error fetching data:', error);
                }
            },
            //redirects the user to the main menu
            goToHome(){
                this.$router.push('/loans')
            },
            //makes a request to the API to delete the sample if the user is logged in
            async deleteLoan(loan_id){
                if(cacheUtils.get(0) == null){
                    alert('Curator priviledges are required');
                }else{
                    try{
                        //makes a DELETE request to the API
                        await axios({
                            method: 'delete',
                            url: 'http://localhost:8080/api/loan/delete/' + loan_id,
                            headers: {
                                'Authorization': 'Bearer ' + cacheUtils.get(0)
                            }
                        })
                        this.$router.push('/loans')
                    }catch(error){
                        console.error('Delete Error:', error);
                    }
                }
            },
            //redirects the user to the update page if they are logged in
            goToUpdate(){
                if(cacheUtils.get(0) == null){
                    alert('Curator priviledges are required');
                }else{
                    this.$router.push('/update-sample/' + this.sample.id);
                }
            },
            //redirects the user to the login page
            goToLogin(){
                this.$router.push('/login')  
            },
            //logs out the user
            logout(){
                localStorage.clear();
                alert("Successfully logged out");
                this.$router.push('/');
            }
        }   
    }
</script>

<style scoped>
    .mainWindow{
        display: flex;
        flex-direction: column;
        height: 100%;
    }

    .top{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }

    .topLeft{
        display: flex;
        flex-direction: row;
    }

    .loginButton{
        background: #4D1979;
        color: white;
        padding-top: 5px;
        padding-bottom: 5px;
        padding-left: 15px;
        padding-right: 15px;
        text-decoration: underline;
        cursor: pointer;
    }

    .title{
        color: #4D1979;
        font-weight: bold;
        font-size: x-large;
        margin-top: 1%;
        font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    }

    .logo{
        width: 70px;
    }

    .bottom{
        height: 100%;
    }

    .contentWindow{
        margin-top: 10%;
        margin-left: 15%;
        margin-right: 15%;
        display: flex;
        flex-direction: column;
        height: 100%;
    }

    .entry{
        margin-top: 10px;
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    .details{
        font-weight: bold;
    }
    .buttons{
        display: flex;
        margin-top: 10px;
    }
    .backButton{
        margin-right: 20px;
        width: 10%;
    }
</style>