<script setup lang="ts">

</script>

<template>
  <animated-canvas>
    <v-main>
      <v-container>
        <v-card>
          <v-img color="yellow"
                 src="https://clipart-library.com/new_gallery/403950_construction-tape-png.png"
                 width="100%"
                 aspect-ratio="16/9"
                 max-height="700"
          />
          <v-card-title> In the mean time take a look at these pages:</v-card-title>
          <v-card-text class="buttons">
            <v-btn color="blue" prepend-icon="mdi-linkedin" href="https://www.linkedin.com/in/alen-mukaca/"> LinkedIn </v-btn>
            <v-btn color="black" prepend-icon="mdi-github" href="https://github.com/ShinzenATT"> Github </v-btn>
            <v-btn color="gray" prepend-icon="mdi-account" href="https://cv.shinzle.net/"> CV </v-btn>
          </v-card-text>
        </v-card>
      </v-container>
    </v-main>
  </animated-canvas>
</template>

<style scoped>
  .buttons .v-btn {
    margin: 5px;
  }
</style>
