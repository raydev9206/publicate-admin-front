<template>
  <q-layout view="hHh lpR fFf">
    <q-page-container>
      <q-page class="flex flex-center" style="background-color: #fff">
        <transition enter-active-class="animated slideInRight" leave-active-class="animated fadeOut" mode="out-in">
          <router-view></router-view>
        </transition>
      </q-page>
    </q-page-container>
  </q-layout>
</template>
<script setup lang="ts">

</script>
