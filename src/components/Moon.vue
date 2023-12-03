<script setup lang="ts">
import { reactive } from "vue";
import { Color } from "three";
import { useRenderLoop } from "@tresjs/core";
import { models } from "../stores/models";
import { getCurrentTime } from "../stores/time";
const model = await models.moon.loadObject();
const phase = 18000;
const sunrise = 18000;
const noon = 36000;
const sunset = 54000;
const moon = reactive({
  x: 0,
  y: -150,
  z: 0,
  intensity: 0.7,
  key: Date.now.toString(),
});
const { onLoop } = useRenderLoop();
onLoop(({}) => {
  const now = getCurrentTime();
  if (now >= sunrise + 4500 && now <= sunset - 4500) {
    moon.intensity = 0;
  } else {
    moon.intensity = 0.7;
  }
  if (now >= sunrise && now <= sunset) {
    const highRatio = (now <= noon ? now - sunrise : sunset - now) / phase;
    moon.x = 0;
    moon.y = -120 * highRatio;
    moon.z = 120 - 240 * ((now - sunrise) / (phase * 2));
    moon.key = Date.now.toString();
  } else {
    const highRatio = (now > sunset ? now - sunset : sunrise - now) / phase;
    moon.x = 0;
    moon.y = 120 * highRatio;
    moon.z =
      -120 + 240 * ((now > sunset ? now - sunset : phase + now) / (phase * 2));
    moon.key = Date.now.toString();
  }
});
</script>

<template>
  <Suspense>
    <primitive
      :object="model"
      :position="[moon.x, moon.y, moon.z]"
      :key="moon.key"
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
    :position="[moon.x, moon.y + 30, moon.z]"
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
    :position="[moon.x + 30, moon.y, moon.z]"
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
    :position="[moon.x, moon.y, moon.z + 30]"
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
    :position="[moon.x, moon.y - 30, moon.z]"
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
    :position="[moon.x - 30, moon.y, moon.z]"
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
    :position="[moon.x, moon.y, moon.z - 30]"
    :target="model"
    :cast-shadow="true"
  />
  <!-- Simulate  moon light -->
  <TresAmbientLight :color="new Color('#FFFFFF')" :intensity="moon.intensity" />
</template>
