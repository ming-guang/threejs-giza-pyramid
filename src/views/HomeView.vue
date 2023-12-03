<script setup lang="ts">
import Scene from "../components/Scene.vue";
</script>

<template>
  <div class="inline-flex w-full">
    <div class="flex-initial w-screen h-screen">
      <Suspense>
        <Scene />
      </Suspense>
    </div>
  </div>
</template>
