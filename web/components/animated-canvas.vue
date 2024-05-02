<script setup lang="ts">
  import {useTheme} from "vuetify";
  import AnimatorService from "~/services/animations/animatorService";

  const width = ref(100)
  const height = ref(100)
  const theme = useTheme()
  const canvas: Ref<HTMLCanvasElement | undefined> = ref()
  let service: AnimatorService

  onMounted(() => {
    if(canvas.value == null){
      console.error("Canvas was not initialized")
      return
    }
    const ctx = canvas.value.getContext("2d")
    if(ctx == null){
      console.error("Ctx 2D is not available")
      return;
    }

    width.value = window.innerWidth
    height.value = window.innerHeight

    window.addEventListener("resize", event => {
      width.value = window.innerWidth
      height.value = window.innerHeight
    })
    service = new AnimatorService(ctx, width, height, theme)
    service.startFrameCycle()
  })
</script>

<template>
  <canvas :width="width" :height="height" ref="canvas"/>
  <slot/>
</template>

<style scoped>
  canvas {
    position: fixed;
    top: 0;
    left: 0;
  }
</style>