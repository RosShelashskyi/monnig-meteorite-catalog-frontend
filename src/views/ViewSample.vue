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
                <div class="details">Sample details:</div>
                <div class="entry">
                    <div>Name:</div>
                    <div>{{sample.name}}</div>
                </div>
                <div class="entry">
                    <div>Monnig number: </div>
                    <div>{{sample.monnig_number}}</div>
                </div>
                <div class="entry">
                    <div>Country</div>
                    <div>{{sample.country}}</div>
                </div>
                <div class="entry">
                    <div>Class</div>
                    <div>{{sample.sample_class}}</div>
                </div>
                <div class="entry">
                    <div>Group</div>
                    <div>{{sample.group}}</div>
                </div>
                <div class="entry">
                    <div>Year found</div>
                    <div>{{sample.date_found_year}}</div>
                </div>
                <div class="entry">
                    <div>Sample weight (g)</div>
                    <div>{{sample.sample_weight_g}}</div>
                </div>
                <div class="entry">
                    <button @click="goToHome" class="backButton">Back</button>
                    <div>
                        <button @click="goToHistory(this.sample.id)">Sample history</button>
                        <button @click="goToUpdate">Update sample</button>
                        <button @click="deleteSample(this.sample.id)">Delete sample</button>
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
                sample: '',     //stores sample data
                loggedIn: ''    //stores login state
            }
        },
        mounted() {
            this.fetchData(this.$route.params.sample_id);   //fetches samples from API
            //prints a login or a logout button depending on the login state
            if(cacheUtils.get(0) != null){
                this.loggedIn = true;
            }else{
                this.loggedIn = false;
            }
        },
        methods:{
            //fetches data from the API
            async fetchData(sample_id){
                try{
                    //GET request to the API
                    const response = await axios.get('http://localhost:8080/api/samples/view/' + sample_id);
                    this.sample = response.data;
                    this.sample = this.sample.data;
                }catch(error){
                    console.error('Error fetching data:', error);
                }
            },
            //redirects the user to the main menu
            goToHome(){
                this.$router.push('/')
            },
            //makes a request to the API to delete the sample if the user is logged in
            async deleteSample(sample_id){
                if(cacheUtils.get(0) == null){
                    alert('Curator priviledges are required');
                }else{
                    try{
                        //makes a DELETE request to the API
                        await axios({
                            method: 'delete',
                            url: 'http://localhost:8080/api/samples/delete/' + sample_id,
                            headers: {
                                'Authorization': 'Bearer ' + cacheUtils.get(0)
                            }
                        })
                        this.$router.push('/')
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
                this.loggedIn = false;
            },
            goToHistory(sample_id){
                if(cacheUtils.get(0) == null){
                    alert('Curator priviledges are required')
                }else{
                    this.$router.push('/view-sample/' + sample_id + '/history')
                }
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