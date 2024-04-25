<template>
    <div>
        <div class="mainWindow">
        <div class = "top">
            <img src="../assets/TCU.jpg" class="logo">
            <div class="title">Monnig Meteorite Catalog</div>
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
                        <button>Update sample</button>
                        <button>Delete sample</button>
                    </div>
                    
                </div>
            </div>
        </div>
    </div>
    </div>
</template>

<script>
import axios from 'axios'
    export default {
        data(){
            return{
                sample: ''
            }
        },
        mounted() {
            this.fetchData(this.$route.params.sample_id);
        },
        methods:{
            async fetchData(sample_id){
                try{
                    const response = await axios.get('http://localhost:8080/api/samples/view/' + sample_id);
                    this.sample = response.data;
                    this.sample = this.sample.data;
                }catch(error){
                    console.error('Error fetching data:', error);
                }
            },
            goToHome(){
                this.$router.push('/')
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