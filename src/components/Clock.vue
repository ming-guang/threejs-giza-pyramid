<script setup lang="ts">
import { reactive } from "vue";
import { getCurrentTime } from "@/stores/time";
function getReadableTime(): string {
  const now = getCurrentTime();
  const hours = Math.floor(now / 3000);
  const minutes = Math.floor((now % 3000) / 50);
  const displayHours = hours > 12 ? hours % 12 : hours;
  const segment = hours >= 12 ? "PM" : "AM";
  return `${displayHours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")} ${segment}`;
}
const time = reactive({
  time: getReadableTime(),
});
function updateTime() {
  time.time = getReadableTime();
  setTimeout(() => {
    updateTime();
  }, 300);
}
updateTime();
</script>

<template>
  <div
    class="absolute top-5 left-12 z-50 px-5 py-2 bg-black/50 rounded-md text-gray-200"
  >
    {{ time.time }}
  </div>
</template>
