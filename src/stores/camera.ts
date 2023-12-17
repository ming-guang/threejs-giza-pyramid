import { defineStore } from "pinia";
import { ref } from "vue";

export const cameraMode = ["free", "planeTrip"] as const;
export type CameraMode = (typeof cameraMode)[number];

export const useCameraStore = defineStore("camera", () => {
  const currentMode = ref<CameraMode>("free");
  function switchCamera() {
    const currentIndex = cameraMode.findIndex(
      (value) => value === currentMode.value,
    );
    currentMode.value = cameraMode[(currentIndex + 1) % cameraMode.length];
  }
  function setCamera(mode: CameraMode) {
    currentMode.value = mode;
  }
  return {
    currentMode,
    switchCamera,
    setCamera,
  };
});
