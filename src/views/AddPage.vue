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
                <form @submit.prevent="addSample">
                    <div class="prompt">Input the meteorite sample data:</div>
                    <label for="name">Name:</label>
                    <input class="nameIn" type="text" id="name" v-model="sampleData.name">
                    <br>
                    <label for="monnig-number">Monnig Number:</label>
                    <input class="monnigIn" type="text" id="monnig-number" v-model="sampleData.monnig_number">
                    <br>
                    <label for="country">Country:</label>
                    <input class="countryIn" type="text" id="country" v-model="sampleData.country">
                    <br>
                    <label for="sample-class">Class:</label>
                    <input class="classIn" type="text" id="sample-class" v-model="sampleData.sample_class">
                    <br>
                    <label for="group">Group:</label>
                    <input class="groupIn" type="text" id="sample-class" v-model="sampleData.group">
                    <br>
                    <label for="year">Year found:</label>
                    <input class="yearIn" type="text" id="year" v-model="sampleData.date_found_year">
                    <br>
                    <label for="weight">Sample weight:</label>
                    <input class="weightIn" type="text" id="weight" v-model="sampleData.sample_weight_g">
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
                sampleData: {
                    name: '',
                    monnig_number: '',
                    country: '',
                    sample_class: '',
                    group: '',
                    date_found_year: '',
                    sample_weight_g: ''
                }
            };
        },
        methods: {
            //sends the user input data to the API
            async addSample(){
                try{
                    //makes a POST request to the API
                    const request = await axios.post('https://monnig-meteorite-catalog.azurewebapps.net/api/samples/add', {
                        //request body
                        "name": this.sampleData.name,
                        "monnig_number": this.sampleData.monnig_number,
                        "country": this.sampleData.country,
                        "sample_class": this.sampleData.sample_class,
                        "group": this.sampleData.group,
                        "date_found_year": this.sampleData.date_found_year,
                        "sample_weight_g": this.sampleData.sample_weight_g
                    }, {
                        headers: {
                            //sends the JWT token to the API for authorization
                            'Authorization': 'Bearer ' + cacheUtils.get(0)
                        }
                    });
                    this.$router.push('/');
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