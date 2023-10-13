<template>
  <blockquote class="max-w-2xl text-2xl italic font-semibold text-gray-900">
    <p>
      {{ answer }}
    </p>
  </blockquote>
</template>

<script setup>
  defineProps(['answer'])
</script>

<style lang="scss" scoped></style>
