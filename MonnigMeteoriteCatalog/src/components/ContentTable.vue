<template>
    <div>
        <div>
            <div v-for="(item, index) in tableData" :key="index" class="table-row">
                <div>{{ item.mame }}</div>
                <div>{{ item.monnig_number }}</div>
                <div>{{ item.country }}</div>
                <div>{{ item.sample_class }}</div>
                <div>{{ item.group }}</div>
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
                    const response = axios.get('localhost:8080/api/samples');
                    this.samples = response.data;
                }catch(error){
                    console.error('Error fetching data:', error);
                }
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
</style>