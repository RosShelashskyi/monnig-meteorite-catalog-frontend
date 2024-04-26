<template>
    <div>
        <div class="mainWindow">
            <div class = "top">
                <img src="../assets/TCU.jpg" class="logo">
                <div class="title">Monnig Meteorite Catalog</div>
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

    export default{
        data(){
            return{
                sample: ''
            };
        },
        mounted(){
            this.fetchData(this.$route.params.sample_id)
        },
        methods: {
            async fetchData(sample_id){
                try{
                    const response = await axios.get('http://localhost:8080/api/samples/view/' + sample_id);
                    this.sample = response.data;
                    this.sample = this.sample.data;
                }catch(error){
                    console.error('Error fetching data:', error);
                }
            },
            async updateSample(){
                try{
                    const request = await axios.put('http://localhost:8080/api/samples/update' + this.$route.params.sample_id, {
                        name: this.sample.name,
                        monnig_number: this.sample.monnig_number,
                        country: this.sample.country,
                        class: this.sample.class,
                        group: this.sample.group,
                        date_found_year: this.sample.date_found_year,
                        sample_weight_g: this.sample.sample_weight_g
                    });
                    console.log(request);
                }catch(error){
                    console.error('PUT request error: ', error);
                }
            },
            goToView(){
                this.$router.push('/view-sample/' + this.$route.params.sample_id);
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