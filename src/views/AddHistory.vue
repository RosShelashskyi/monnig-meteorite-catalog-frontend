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
                <form @submit.prevent="addEntry">
                    <div class="prompt">Input the sample history entry:</div>
                    <label for="name">Date:</label>
                    <input class="nameIn" type="text" id="name" v-model="entryData.date">
                    <br>
                    <label for="email">Category:</label>
                    <input class="emailIn" type="text" id="email" v-model="entryData.category">
                    <br>
                    <label for="institution">Notes:</label>
                    <input class="institutionIn" type="text" id="institution" v-model="entryData.notes">
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
                entryData: {
                    date: '',
                    category: '',
                    notes: ''
                }
            };
        },
        methods: {
            //sends the user input data to the API
            async addEntry(){
                try{
                    //makes a POST request to the API
                    await axios.post('https://monnig-meteorite-catalog.azurewebapps.net/api/samples/history/add/' + this.$route.params.sample_id, {
                        //request body
                        date: this.entryData.date,
                        category: this.entryData.category,
                        notes: this.entryData.notes
                    }, {
                        headers: {
                            //sends the JWT token to the API for authorization
                            'Authorization': 'Bearer ' + cacheUtils.get(0)
                        }
                    });
                    this.$router.push('/view-sample/' + this.$route.params.sample_id + '/history');
                }catch(error){
                    console.error('POST request error: ', error);
                }
            },
            //redirects the user to the main menu
            goToHome(){
                this.$router.push('/view-sample/' + this.$route.params.sample_id + '/history');
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