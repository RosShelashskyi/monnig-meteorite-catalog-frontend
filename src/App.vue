<script setup>
import MainMenu from './components/MainMenu.vue'
import AddPage from './components/AddPage.vue';
import {ref} from 'vue';

const menu = ref(true);
const add = ref(false);

const handleAddClick = () => {
  menu.value = false;
  add.value = true;
}

const handleExitAdd = () => {
  menu.value = true;
  add.value = false;
}

</script>

<template>
  <div>
    <MainMenu @add-clicked="handleAddClick" v-if="menu"/>
    <AddPage #@exit-add="handleExitAdd" v-if="add"></AddPage>
  </div>
</template>



<style scoped>
  
</style>