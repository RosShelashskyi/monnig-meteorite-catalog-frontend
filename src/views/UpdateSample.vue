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
                <form @submit.prevent="updateSample">
                    <div class="prompt">Input the meteorite sample data:</div>
                    <label for="name">Name:</label>
                    <input class="nameIn" type="text" id="name" v-model="sample.name">
                    <br>
                    <label for="monnig-number">Monnig Number:</label>
                    <input class="monnigIn" type="text" id="monnig-number" v-model="sample.monnig_number">
                    <br>
                    <label for="country">Country:</label>
                    <input class="countryIn" type="text" id="country" v-model="sample.country">
                    <br>
                    <label for="sample-class">Class:</label>
                    <input class="classIn" type="text" id="sample-class" v-model="sample.sample_class">
                    <br>
                    <label for="group">Group:</label>
                    <input class="groupIn" type="text" id="sample-class" v-model="sample.group">
                    <br>
                    <label for="year">Year found:</label>
                    <input class="yearIn" type="text" id="year" v-model="sample.date_found_year">
                    <br>
                    <label for="weight">Sample weight:</label>
                    <input class="weightIn" type="text" id="weight" v-model="sample.sample_weight_g">
                    <br>
                    <button @click="goToView">Cancel submission</button>
                    <button class="addButton" type="submit">Update</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import cacheUtils from '@/utils/cacheUtils';

    export default{
        data(){
            return{
                sample: ''      //stores fetched sample data
            };
        },
        mounted(){
            //fetch sample data from API
            this.fetchData(this.$route.params.sample_id)
        },
        methods: {
            //gets sample data from API
            async fetchData(sample_id){
                try{
                    //GET request to the API
                    const response = await axios.get(import.meta.env.VITE_API_ENDPOINT + '/samples/view/' + sample_id);
                    this.sample = response.data;
                    this.sample = this.sample.data;
                }catch(error){
                    console.error('Error fetching data:', error);
                }
            },
            //makes an API request to update the sample with user input
            async updateSample(){
                try{
                    //makes a PUT request to the API
                    const request = await axios.put(import.meta.env.VITE_API_ENDPOINT + '/samples/update/' + this.$route.params.sample_id, {
                        //request body
                        name: this.sample.name,
                        monnig_number: this.sample.monnig_number,
                        country: this.sample.country,
                        sample_class: this.sample.sample_class,
                        group: this.sample.group,
                        date_found_year: this.sample.date_found_year,
                        sample_weight_g: this.sample.sample_weight_g
                    }, {
                        headers: {
                            //sends the JWT token to the API for authorization
                            'Authorization': 'Bearer ' + cacheUtils.get(0)
                        }
                    });
                    this.$router.push('/');
                }catch(error){
                    console.error('PUT request error: ', error);
                }
            },
            goToView(){
                //redirects the user back to sample view page
                this.$router.push('/view-sample/' + this.$route.params.sample_id);
            },
            logout(){
                //logs the user out
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