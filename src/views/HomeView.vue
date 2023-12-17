<script setup lang="ts">
import { storeToRefs } from "pinia";
import Scene from "../components/Scene.vue";
import { CameraMode, useCameraStore } from "@/stores/camera";
</script>

<script lang="ts">
export default {
  el: "#app",
  mounted: function () {
    const cameraKeyMap: { [key: string]: CameraMode } = {
      "1": "free",
      "2": "planeTrip",
    };
    const { setCamera } = useCameraStore();
    window.addEventListener("keyup", (e: KeyboardEvent) => {
      if (!(e.key in cameraKeyMap)) {
        return;
      }
      setCamera(cameraKeyMap[e.key]);
    });
  },
};
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
