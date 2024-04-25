<template>
    <div>
        <div>
            <div v-for="(item, index) in samples" :key="index" class="tableRow">
                <div @click="goToView" class="nameCell">{{ item.name }}</div>
                <div>{{ item.monnig_number }}</div>
                <div>{{ item.country }}</div>
                <div>{{ item.sample_class }}</div>
                <div>{{ item.group }}</div>
                <div>{{ item.date_found_year }}</div>
                <div>{{ item.sample_weight_g }}</div>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';

    export default{
        data(){
            return {
                samples: []
            };
        },
        mounted(){
            this.fetchData();
        },
        methods: {
            async fetchData(){
                try{
                    const response = await axios.get('http://localhost:8080/api/samples/all');
                    this.samples = response.data;
                    this.samples = this.samples.data;
                }catch(error){
                    console.error('Error fetching data:', error);
                }
            },
            gotToView(){
                this.$router.push('/view-sample')
            }
        }
    };
</script>

<style scoped>
    .table{
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
    }

    .tableRow{
        display: grid;
        grid-template-columns: repeat(7, minmax(0, 1fr));
        background-color: #A9A9A9;
    }

    .nameCell{
        text-decoration: underline;
        cursor: pointer;
    }
</style>