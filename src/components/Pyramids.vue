<script setup lang="ts">
import { useLoader } from "@tresjs/core";
import { TextureLoader } from "three";
const texture = await useLoader(TextureLoader, "assets/textures/pyramid.jpeg");
</script>

<template>
  <TresMesh
    :position="[32, 10.45, 32]"
    :cast-shadow="true"
    :receive-shadow="true"
  >
    <TresConeGeometry
      :args="[16, 20.9, 4, 1, false, -Math.PI / 4, 2 * Math.PI]"
    />
    <TresMeshStandardMaterial :map="texture" />
  </TresMesh>

  <TresMesh
    :position="[-10, 10, -5]"
    :cast-shadow="true"
    :receive-shadow="true"
  >
    <TresConeGeometry
      :args="[15, 20, 4, 1, false, -Math.PI / 4, 2 * Math.PI]"
    />
    <TresMeshStandardMaterial :map="texture" />
  </TresMesh>

  <TresMesh
    :position="[-33, 4.5, -33]"
    :cast-shadow="true"
    :receive-shadow="true"
  >
    <TresConeGeometry :args="[7, 9, 4, 1, false, -Math.PI / 4, 2 * Math.PI]" />
    <TresMeshStandardMaterial :map="texture" />
  </TresMesh>
</template>
