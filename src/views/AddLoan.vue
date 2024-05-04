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
                    <label for="name">Loanee name:</label>
                    <input class="nameIn" type="text" id="name" v-model="loanData.loanee_name">
                    <br>
                    <label for="email">Loanee email:</label>
                    <input class="emailIn" type="text" id="email" v-model="loanData.loanee_email">
                    <br>
                    <label for="institution">Loanee institution:</label>
                    <input class="institutionIn" type="text" id="institution" v-model="loanData.loanee_institution">
                    <br>
                    <label for="address">Loanee address:</label>
                    <input class="addressIn" type="text" id="address" v-model="loanData.loanee_address">
                    <br>
                    <label for="startDate">Loan start date:</label>
                    <input class="startDateIn" type="text" id="startDate" v-model="loanData.loan_start_date">
                    <br>
                    <label for="dueDate">Loan due date:</label>
                    <input class="dueDateIn" type="text" id="dueDate" v-model="loanData.loan_due_date">
                    <br>
                    <label for="notes">Loan notes:</label>
                    <input class="notesIn" type="text" id="notes" v-model="loanData.loan_notes">
                    <br>
                    <label for="samples">Monnig numbers of samples on loan:</label>
                    <input class="samplesIn" type="text" id="samples" v-model="loanData.samples_on_loan">
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
                    const request = await axios.post('https://monnig-meteorite-catalog.azurewebapps.net/api/loan/create', {
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
                this.$router.push('/loans')
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
        margin-left: 177px;
    }

    .emailIn{
        margin-left: 176px;
    }

    .institutionIn{
        margin-left: 146px;
    }

    .addressIn{
        margin-left: 163px;
    }

    .startDateIn{
        margin-left:167px;
    }

    .dueDateIn{
        margin-left: 172px;
    }
    
    .notesIn{
        margin-left: 192px;
    }

    .samplesIn{
        margin-left: 28px;
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