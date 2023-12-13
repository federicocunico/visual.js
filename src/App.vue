<script setup lang="ts">
import Image from './components/ImageViewer.vue'
import Plot3D from './components/Plot3D.vue'
</script>

<template lang="pug">
//- make two columns
.row
  //- first column
  .col
    //- use the component
    Image
  //- second column
  .col
    //- use the component
    Plot3D
</template>
