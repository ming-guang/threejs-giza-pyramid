<script setup lang="ts">
import { reactive } from "vue";
import { Color } from "three";
import { useRenderLoop } from "@tresjs/core";
import { models } from "../stores/models";
import { getCurrentTime } from "../stores/time";
const model = await models.sun.loadObject();
const phase = 18000;
const sunrise = 18000;
const noon = 36000;
const sunset = 54000;
const sun = reactive({
  x: 0,
  y: -120,
  z: 0,
  intensity: 0,
  key: Date.now.toString(),
});
const { onLoop } = useRenderLoop();
onLoop(({}) => {
  const now = getCurrentTime();
  if (now < sunrise || now > sunset) {
    const highRatio = (now >= sunset ? now - sunset : sunrise - now) / phase;
    sun.x = 0;
    sun.y = -120 * highRatio;
    sun.z =
      150 - 300 * ((now >= sunset ? now - sunset : phase + now) / (phase * 2));
    sun.intensity = Math.max(100 * highRatio, 15);
    sun.key = Date.now.toString();
  } else {
    const highRatio = (now <= noon ? now - sunrise : sunset - now) / phase;
    sun.x = 0;
    sun.y = 120 * highRatio;
    sun.z = -150 + 300 * ((now - sunrise) / (phase * 2));
    sun.intensity = Math.max(100 * highRatio, 15);
    sun.key = Date.now.toString();
  }
});
</script>

<template>
  <Suspense>
    <primitive
      :object="model"
      :position="[sun.x, sun.y, sun.z]"
      :key="sun.key"
    />
  </Suspense>
  <!-- Can't found a proper way to light up a single object only, so I did this -->
  <TresSpotLight
    :color="new Color('#FFFFFF')"
    :intensity="100"
    :distance="35"
    :angle="Math.PI / 2"
    :penumbra="0"
    :decay="1"
    :position="[sun.x, sun.y + 30, sun.z]"
    :target="model"
    :cast-shadow="true"
  />
  <TresSpotLight
    :color="new Color('#FFFFFF')"
    :intensity="100"
    :distance="35"
    :angle="Math.PI / 2"
    :penumbra="0"
    :decay="1"
    :position="[sun.x + 30, sun.y, sun.z]"
    :target="model"
    :cast-shadow="true"
  />
  <TresSpotLight
    :color="new Color('#FFFFFF')"
    :intensity="100"
    :distance="35"
    :angle="Math.PI / 2"
    :penumbra="0"
    :decay="1"
    :position="[sun.x, sun.y, sun.z + 30]"
    :target="model"
    :cast-shadow="true"
  />
  <TresSpotLight
    :color="new Color('#FFFFFF')"
    :intensity="100"
    :distance="35"
    :angle="Math.PI / 2"
    :penumbra="0"
    :decay="1"
    :position="[sun.x, sun.y - 30, sun.z]"
    :target="model"
    :cast-shadow="true"
  />
  <TresSpotLight
    :color="new Color('#FFFFFF')"
    :intensity="100"
    :distance="35"
    :angle="Math.PI / 2"
    :penumbra="0"
    :decay="1"
    :position="[sun.x - 30, sun.y, sun.z]"
    :target="model"
    :cast-shadow="true"
  />
  <TresSpotLight
    :color="new Color('#FFFFFF')"
    :intensity="100"
    :distance="35"
    :angle="Math.PI / 2"
    :penumbra="0"
    :decay="1"
    :position="[sun.x, sun.y, sun.z - 30]"
    :target="model"
    :cast-shadow="true"
  />
  <!-- Simulate sun light -->
  <TresSpotLight
    :color="new Color('#FFFFFF')"
    :intensity="sun.intensity"
    :distance="0"
    :position="[sun.x, sun.y - 30, sun.z]"
    :decay="0.7"
    :cast-shadow="true"
  />
</template>
