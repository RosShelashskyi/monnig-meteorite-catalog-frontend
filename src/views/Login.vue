<template>
    <div>
        <div class="mainWindow">
            <div class = "top">
                <img src="../assets/TCU.jpg" class="logo">
                <div class="title">Monnig Meteorite Catalog</div>
            </div>
            <div class="bottom">
                
                <form @submit.prevent="login">
                    <div class="prompt">Enter the curator's login information</div>
                    <label for="name">Username:</label>
                    <input class="usernameIn" type="text" id="name" v-model="username">
                    <br>
                    <label for="monnig-number">Password:</label>
                    <input class="passwordIn" type="password" id="monnig-number" v-model="password">
                    <br>
                    <button @click="goToHome">Cancel</button>
                    <button class="addButton" type="submit">Log in</button>
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
                username: '',   //stores username
                password: ''    //stores password
            };
        },
        methods: {
            //makes a login request to the API
            async login(){
                try{
                    //base64-encodes username and password with for Basic Authorization
                    let info = btoa(this.username + ':' + this.password)
                    //makes a POST request to the API
                    let token = await axios.post('https://monnig-meteorite-catalog.azurewebapps.net/api/users/login', null, {
                        headers: {
                            //Authorization header with encoded username and password
                            'Authorization': 'Basic ' + info
                        }
                    });
                    //extract the jwt token from the API response
                    token = token.data;
                    token = token.data;
                    token = token.token;

                    //saves the token to local storage
                    cacheUtils.set(0, token)
                    //redirects the user home
                    this.$router.push('/');
                }catch(error){
                    console.error('Login error: ', error);
                }
            },
            //redirects the user home 
            goToHome(){
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
        display: flex;
        justify-content: center;
    }

    form{
        margin-top: 15%;
        justify-self: center;
    }

    input{
        margin-bottom: 5px;
    }

    .usernameIn{
        margin-left: 39px;
    }

    .passwordIn{
        margin-left: 42px;
    }

    .prompt{
        margin-bottom: 20px;
        font-size: large;
        font-weight: bold;;
    }

    .addButton{
        margin-left: 175px;
    }
</style>