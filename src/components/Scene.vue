<script setup lang="ts">
import { Color } from "three";
import { OrbitControls } from "@tresjs/cientos";
import { BasicShadowMap, NoToneMapping } from "three";
import { useCameraStore } from "../stores/camera";
import { extend } from "@tresjs/core";
import Clock from "./Clock.vue";
import Sun from "./Sun.vue";
import Moon from "./Moon.vue";
import Plane from "./Plane.vue";
import Pyramids from "./Pyramids.vue";
import { storeToRefs } from "pinia";

const { currentMode } = storeToRefs(useCameraStore());

const gl = {
  clearColor: "#2D2D2E",
  shadows: true,
  alpha: true,
  shadowMapType: BasicShadowMap,
  toneMapping: NoToneMapping,
};
extend({ Sun, Moon, Pyramids });
</script>

<template>
  <Clock />
  <TresCanvas v-bind="gl" shadows alpha>
    <TresPerspectiveCamera
      v-if="currentMode === 'free'"
      :position="[-50, 200, 10]"
      :look-at="[0, 0, 0]"
    />
    <OrbitControls v-if="currentMode === 'free'" />
    <Suspense>
      <Sun />
    </Suspense>
    <Suspense>
      <Moon />
    </Suspense>
    <Suspense>
      <Plane />
    </Suspense>
    <Suspense>
      <Pyramids />
    </Suspense>
    <TresMesh :rotate-x="-Math.PI / 2" receive-shadow>
      <TresPlaneGeometry :args="[100, 100]" />
      <TresMeshStandardMaterial :color="new Color('#F0ECC1')" />
    </TresMesh>
  </TresCanvas>
</template>
