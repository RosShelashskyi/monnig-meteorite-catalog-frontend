

<template>
    <div class="mainWindow">
        <div class = "top">
            <img src="../assets/TCU.jpg" class="logo">
            <div class="title">Monnig Meteorite Catalog</div>
        </div>
        <div class="bottom">
            <div class="contentWindow"> 
                <div class="buttons">
                    <button @click="$emit('add-clicked')" class="add">Add</button>
                    <form action="" class="searchBar">
                        <input type="text" placeholder="Search" name="q">
                        <button type="submit">
                            <img src="../assets/search.png">
                        </button>
                    </form>
                </div>
                <div class="table">
                    <div class="tableTop">
                        <div class="tableTopElement">Name</div>
                        <div class="tableTopElement">Monnig Number</div>
                        <div class="tableTopElement">Country</div>
                        <div class="tableTopElement">Class</div>
                        <div class="tableTopElement">Group</div>
                        <div class="tableTopElement">Year</div>
                        <div class="tableTopElement">Weight</div>
                    </div>
                    <div class="tableContent">
                        <ContentTable/>
                    </div>
                    <div class="tableBottom">
                        <div>Results</div>
                        <div>1-n</div>
                        <div class="tableNavigation">
                            <div class="goTo"><</div>
                            <div class="goTo">1</div>
                            <div class="goTo">2</div>
                            <div class="goTo">></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import ContentTable from './ContentTable.vue';
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
            text-align: center;
            display: flex;
            flex-direction: column;
            height: 100%;
        }

        .buttons{
            display: flex;
            flex-direction: row;
            justify-content: space-between;
        }

        .add{
            background: #4D1979;
            color: white;
            padding-top: 5px;
            padding-bottom: 5px;
            padding-left: 15px;
            padding-right: 15px;
            text-decoration: underline;
            cursor: pointer;
        }

        .searchBar{
            display: flex;
            align-items: center;
            background: #4D1979;
        }

        .searchBar input{
            background: transparent;
            flex: 1;
            border: 0;
            outline: none;
            padding-top: 5px;
            padding-bottom: 5px;
            padding-left: 15px;
            padding-right: 15px;
            color: white;
        }

        ::placeholder{
            color: white;
        }

        .searchBar button img{
            height: 20px;
            background-color: #4D1979;
        }

        .searchBar button{
            border: 0;
            border-radius: 50%;
            background-color: #4D1979;
            height: 20px;
            cursor: pointer;
        }

        .table{
            background-color: #A9A9A9;
            flex-grow: 1;

        }

        .tableTop{
            display: grid;
            grid-template-columns: repeat(7, minmax(0, 1fr));
            background: #4D1979;
            padding-top: 7px;
            padding-bottom: 7px;
        }

        .tableTopElement{
            color: white;
            align-self: center;
        }

        .tableBottom{
            display: grid;
            grid-template-columns: repeat(7, minmax(0, 1fr));
            background-color: #4D1979;
            color: white;
        }

        .tableContent{
            background-color: #A9A9A9;
        }

        .tableNavigation{
            grid-column-start: 4;
            display: flex;
            justify-content: space-between;
        }

        .goTo{
            cursor: pointer;
        }
</style>