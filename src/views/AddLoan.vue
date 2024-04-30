<template>
    <div>
        <div class="mainWindow">
            <div class = "top">
                <div class="topLeft">
                    <img src="../assets/TCU.jpg" class="logo">
                    <div class="title">Monnig Meteorite Catalog</div>
                </div>
                <button @click="logout" class="loginButton">Log out</button>
            </div>
            <div class="bottom">
                <form @submit.prevent="addLoan">
                    <div class="prompt">Input the loan information:</div>
                    <label for="name">Loanee Name:</label>
                    <input class="nameIn" type="text" id="name" v-model="loanData.loanee_name">
                    <br>
                    <label for="monnig-number">Loanee email:</label>
                    <input class="monnigIn" type="text" id="monnig-number" v-model="loanData.loanee_email">
                    <br>
                    <label for="monnig-number">Loanee institution:</label>
                    <input class="monnigIn" type="text" id="monnig-number" v-model="loanData.loanee_institution">
                    <br>
                    <label for="country">Loanee address:</label>
                    <input class="countryIn" type="text" id="country" v-model="loanData.loanee_address">
                    <br>
                    <label for="sample-class">Loan start date:</label>
                    <input class="classIn" type="text" id="sample-class" v-model="loanData.loan_start_date">
                    <br>
                    <label for="group">Loan due date:</label>
                    <input class="groupIn" type="text" id="sample-class" v-model="loanData.loan_due_date">
                    <br>
                    <label for="year">Loan notes:</label>
                    <input class="yearIn" type="text" id="year" v-model="loanData.loan_notes">
                    <br>
                    <label for="weight">Monnig numbers of samples on loan:</label>
                    <input class="weightIn" type="text" id="weight" v-model="loanData.samples_on_loan">
                    <br>
                    <button @click="goToHome">Cancel submission</button>
                    <button class="addButton" type="submit">Add</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import cacheUtils from '@/utils/cacheUtils';
import axios from 'axios';

    export default{
        data(){
            return{
                //stores data that will be sent to the API
                loanData: {
                    loanee_name: '',
                    loanee_email: '',
                    loanee_institution: '',
                    loanee_address: '',
                    loan_start_date: '',
                    loan_due_date: '',
                    loan_notes: '',
                    samples_on_loan: []
                }
            };
        },
        methods: {
            //sends the user input data to the API
            async addLoan(){
                let temp = this.loanData.samples_on_loan
                this.loanData.samples_on_loan = temp.split(',')
                try{
                    //makes a POST request to the API
                    const request = await axios.post('http://localhost:8080/api/loan/create', {
                        //request body
                        loanee_name: this.loanData.loanee_name,
                        loanee_email: this.loanData.loanee_email,
                        loanee_institution: this.loanData.loanee_institution,
                        loanee_address: this.loanData.loanee_address,
                        loan_start_date: this.loanData.loan_start_date,
                        loan_due_date: this.loanData.loan_due_date,
                        loan_notes: this.loanData.loan_notes,
                        samples_on_loan: this.loanData.samples_on_loan,
                        isArchived: 'false'
                    }, {
                        headers: {
                            //sends the JWT token to the API for authorization
                            'Authorization': 'Bearer ' + cacheUtils.get(0)
                        }
                    });
                    this.$router.push('/loans');
                }catch(error){
                    console.error('POST request error: ', error);
                }
            },
            //redirects the user to the main menu
            goToHome(){
                this.$router.push('/')
            },
            //logs the user out and redirects them to the main menu
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

    form{
        margin-top: 10%;
        margin-left: 15%;
        margin-right: 15%;
    }

    input{
        margin-bottom: 5px;
    }

    .nameIn{
        margin-left: 89px;
    }

    .monnigIn{
        margin-left: 20px;
    }

    .countryIn{
        margin-left: 76px;
    }

    .classIn{
        margin-left: 94px;
    }

    .groupIn{
        margin-left: 88px;
    }

    .yearIn{
        margin-left: 58px;
    }
    
    .weightIn{
        margin-left: 32px;
    }

    .prompt{
        margin-bottom: 20px;
        font-size: large;
        font-weight: bold;;
    }

    .addButton{
        margin-left: 25%;
    }
</style>