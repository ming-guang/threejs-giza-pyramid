<script setup lang="ts">
import { Color } from "three";
import { OrbitControls } from "@tresjs/cientos";
import { BasicShadowMap, NoToneMapping } from "three";
import { extend } from "@tresjs/core";
import Sun from "./Sun.vue";
import Moon from "./Moon.vue";

const gl = {
  clearColor: "#2D2D2E",
  shadows: true,
  alpha: true,
  shadowMapType: BasicShadowMap,
  toneMapping: NoToneMapping,
};
extend({ Sun, Moon });
</script>

<template>
  <TresCanvas v-bind="gl" shadows alpha>
    <TresPerspectiveCamera :position="[-50, 200, 10]" :look-at="[0, 0, 0]" />
    <OrbitControls />
    <Suspense>
      <Sun />
    </Suspense>
    <Suspense>
      <Moon />
    </Suspense>
    <TresMesh :rotate-x="-Math.PI / 2" receive-shadow>
      <TresPlaneGeometry :args="[100, 100]" />
      <TresMeshStandardMaterial :color="new Color('#FFFFFF')" />
    </TresMesh>
  </TresCanvas>
</template>
