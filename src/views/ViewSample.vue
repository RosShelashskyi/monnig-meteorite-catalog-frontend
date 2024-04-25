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
                    <div>{{}}</div>
                </div>
                <div class="entry">
                    <div>Monnig number: </div>
                    <div>{{}}</div>
                </div>
                <div class="entry">
                    <div>Stuff</div>
                    <div>{{}}</div>
                </div>
                <div class="entry">
                    <div>Stuff</div>
                    <div>{{}}</div>
                </div>
                <div class="entry">
                    <div>Stuff</div>
                    <div>{{}}</div>
                </div>
                <div class="entry">
                    <div>Stuff</div>
                    <div>{{}}</div>
                </div>
                <div class="buttons">
                    <button>Update sample</button>
                    <button>Delete sample</button>
                </div>
            </div>
        </div>
    </div>
    </div>
</template>

<script>
    export default {
        mounted() {
            const sampleId = this.$route.params.userId;
            console.log(sampleId);
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
</style>