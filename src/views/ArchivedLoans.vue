<!-- This is the main page that redirects the user to all other pages -->
<template>
    <div class="mainWindow">
        <div class = "top">
            <div class="topLeft">
                <img src="../assets/TCU.jpg" class="logo">
                <div class="title">Monnig Meteorite Catalog</div>
            </div>
            <button v-if=!loggedIn @click="goToLogin" class="add">Curator login</button>
            <button v-if=loggedIn @click="logout" class="add">Log out</button>
        </div>
        <div class="bottom">
            <div class="contentWindow"> 
                <div class="buttons">
                    <div>
                        <button @click="goToAdd" class="add">Add</button>
                        <button @click="goToHome" class="add">View Samples</button>
                        <button @click="goToLoans" class="add">View Loans</button>
                    </div>
                    <form action="" class="searchBar">
                        <input type="text" placeholder="Search" name="q">
                        <button type="submit">
                            <img src="../assets/search.png">
                        </button>
                    </form>
                </div>
                <div class="table">
                    <div class="tableTop">
                        <div class="tableTopElement">Name</div>
                        <div class="tableTopElement">Institution</div>
                        <div class="tableTopElement">Start Date</div>
                        <div class="tableTopElement">Due Date</div>
                    </div>
                    <div class="tableContent">
                        <div v-for="(item, index) in loans" :key="index" class="tableRow">
                            <div @click="goToView(item.id)" class="nameCell">{{ item.loanee_name }}</div>
                            <div>{{ item.loanee_institution }}</div>
                            <div>{{ item.loan_start_date }}</div>
                            <div>{{ item.loan_due_date }}</div>
                        </div>
                    </div>
                    <div class="tableBottom">
                        <div>Results</div>
                        <div>1-n</div>
                        <div class="tableNavigation">
                            <div class="goTo"><</div>
                            <div class="goTo">1</div>
                            <div class="goTo">2</div>
                            <div class="goTo">></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import cacheUtils from '@/utils/cacheUtils';

    export default{
        data(){
            return {
                loans: [],          //stores the loans fetched from backend
                loggedIn: ''        //stores login state
            };
        },
        mounted(){
            this.fetchData();       //fetches samples from API
            //prints a login or a logout button depending on the login state
            if(cacheUtils.get(0) != null){
                this.loggedIn = true;
            }else{
                this.loggedIn = false;
            }
        },
        methods:{
            //redirects the user to the add sample page if they are logged in
            goToAdd(){
                if(cacheUtils.get(0) == null){
                    alert('Curator priviledges are required');
                }else{
                    this.$router.push('/loans/add');
                }
            },
            //fetches data from the API
            async fetchData(){
                try{
                    //GET request to the API
                    const response = await axios({
                        method: 'get',
                        url: 'https://monnig-meteorite-catalog.azurewebsites.net/api/loan/view/all/archived',
                        headers: {
                            'Authorization': 'Bearer ' + cacheUtils.get(0)
                        }
                    });
                    this.loans = response.data;
                    this.loans = this.loans.data;
                }catch(error){
                    console.error('Error fetching data:', error);
                }
            },
            //redirects the user to the sample view page
            goToView(loan_id){
                this.$router.push('/loans/' + loan_id);
            },
            //redirects the user to the login page
            goToLogin(){
                this.$router.push('/login');
            },
            //logs out the user
            logout(){
                localStorage.clear();
                alert("Successfully logged out");
                this.loggedIn = false;
            },
            goToHome(){
                this.$router.push('/');
            },
            goToLoans(){
                this.$router.push('/loans');
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
            text-align: center;
            display: flex;
            flex-direction: column;
            height: 100%;
        }

        .buttons{
            display: flex;
            flex-direction: row;
            justify-content: space-between;
        }

        .add{
            background: #4D1979;
            color: white;
            padding-top: 5px;
            padding-bottom: 5px;
            padding-left: 15px;
            padding-right: 15px;
            text-decoration: underline;
            cursor: pointer;
        }

        .searchBar{
            display: flex;
            align-items: center;
            background: #4D1979;
        }

        .searchBar input{
            background: transparent;
            flex: 1;
            border: 0;
            outline: none;
            padding-top: 5px;
            padding-bottom: 5px;
            padding-left: 15px;
            padding-right: 15px;
            color: white;
        }

        ::placeholder{
            color: white;
        }

        .searchBar button img{
            height: 20px;
            background-color: #4D1979;
        }

        .searchBar button{
            border: 0;
            border-radius: 50%;
            background-color: #4D1979;
            height: 20px;
            cursor: pointer;
        }

        .table{
            background-color: #A9A9A9;
            flex-grow: 1;

        }

        .tableTop{
            display: grid;
            grid-template-columns: repeat(4, minmax(0, 1fr));
            background: #4D1979;
            padding-top: 7px;
            padding-bottom: 7px;
        }

        .tableTopElement{
            color: white;
            align-self: center;
        }

        .tableBottom{
            display: grid;
            grid-template-columns: repeat(7, minmax(0, 1fr));
            background-color: #4D1979;
            color: white;
        }

        .tableContent{
            background-color: #A9A9A9;
        }

        .tableNavigation{
            grid-column-start: 4;
            display: flex;
            justify-content: space-between;
        }

        .goTo{
            cursor: pointer;
        }

        .tableRow{
            display: grid;
            grid-template-columns: repeat(4, minmax(0, 1fr));
            background-color: #A9A9A9;
        }

        .nameCell{
            text-decoration: underline;
            cursor: pointer;
        }
</style>