<script setup lang="ts">
import { reactive } from "vue";
import { Color, Vector3 } from "three";
import { useRenderLoop } from "@tresjs/core";
import { models } from "../stores/models";
import { getCurrentTime } from "../stores/time";
import { storeToRefs } from "pinia";
import { useCameraStore } from "@/stores/camera";

const { currentMode } = storeToRefs(useCameraStore());

const model = await models.plane.loadObject();
const plane = reactive({
  x: -50,
  y: 50,
  z: -50,
  key: Date.now.toString(),
});
const tripsPerDay = 3;
const start = new Vector3(-50, 50, -50);
const end = new Vector3(50, 50, 50);
const day = 72000;
const planeTripTime = Math.floor(day / tripsPerDay);
const { onLoop } = useRenderLoop();
onLoop(({}) => {
  const now = getCurrentTime();
  const planeTime = now % planeTripTime;
  const tripFinishRatio = planeTime / planeTripTime;
  plane.x = start.x + (end.x - start.x) * tripFinishRatio;
  plane.y = start.y + (end.y - start.y) * tripFinishRatio;
  plane.z = start.z + (end.z - start.z) * tripFinishRatio;
  plane.key = Date.now.toString();
});
</script>

<template>
  <TresPerspectiveCamera
    v-if="currentMode === 'planeTrip'"
    :position="[plane.x, plane.y, plane.z]"
    :look-at="[plane.x, 0, plane.z]"
  />

  <Suspense>
    <primitive
      :object="model"
      :position="[plane.x, plane.y, plane.z]"
      :scale="[0.05, 0.05, 0.05]"
      :rotateY="Math.PI * 0.25"
      :key="plane.key"
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
    :position="[plane.x, plane.y + 30, plane.z]"
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
    :position="[plane.x + 30, plane.y, plane.z]"
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
    :position="[plane.x, plane.y, plane.z + 30]"
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
    :position="[plane.x, plane.y - 30, plane.z]"
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
    :position="[plane.x - 30, plane.y, plane.z]"
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
    :position="[plane.x, plane.y, plane.z - 30]"
    :target="model"
    :cast-shadow="true"
  />
</template>
