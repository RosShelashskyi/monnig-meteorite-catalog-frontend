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
                <div class="details">History entry details:</div>
                <div class="entry">
                    <div>Date</div>
                    <div>{{historyEntry.date}}</div>
                </div>
                <div class="entry">
                    <div>Category</div>
                    <div>{{historyEntry.category}}</div>
                </div>
                <div class="entry">
                    <div>Notes</div>
                    <div>{{historyEntry.notes}}</div>
                </div>
                <div class="entry">
                    <button @click="goToHistory" class="backButton">Back</button>
                    <div>
                        <button @click="deleteEntry()">Delete history entry</button>
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
                historyEntry: '',     //stores sample data
                loggedIn: ''    //stores login state
            }
        },
        mounted() {
            this.fetchData(this.$route.params.entry_id);   //fetches samples from API
            //prints a login or a logout button depending on the login state
            if(cacheUtils.get(0) != null){
                this.loggedIn = true;
            }else{
                this.loggedIn = false;
            }
        },
        methods:{
            //fetches data from the API
            async fetchData(entry_id){
                try{
                    //GET request to the API
                    const response = await axios({
                        method: 'get',
                        url: 'https://monnig-meteorite-catalog.azurewebsites.net/api/history/' + entry_id,
                        headers :{
                            'Authorization': 'Bearer ' + cacheUtils.get(0)
                        }
                    })
                    this.historyEntry = response.data;
                    this.historyEntry = this.historyEntry.data;
                }catch(error){
                    console.error('Error fetching data:', error);
                }
            },
            //redirects the user to the main menu
            goToHistory(){
                this.$router.push('/view-sample/' + this.$route.params.sample_id + '/history')
            },
            //makes a request to the API to delete the sample if the user is logged in
            async deleteEntry(){
                try{
                    //makes a DELETE request to the API
                    await axios({
                        method: 'delete',
                        url: 'https://monnig-meteorite-catalog.azurewebsites.net/api/history/delete/' + this.$route.params.entry_id,
                        headers: {
                            'Authorization': 'Bearer ' + cacheUtils.get(0)
                        }
                    })
                    this.$router.push('/view-sample/' + this.$route.params.sample_id + '/history')
                }catch(error){
                    console.error('Delete Error:', error);
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