<script lang="ts" setup>
import { computed } from "vue"

interface Props {
  prefix?: string
  name: string
}

const props = withDefaults(defineProps<Props>(), {
  prefix: "icon"
})

const symbolId = computed(() => `#${props.prefix}-${props.name}`)

defineOptions({
    name:"SvgIcon",
})
</script>

<template>
  <svg class="svg-icon" aria-hidden="true">
    <use :href="symbolId" />
  </svg>
</template>

<style lang="scss" scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  fill: currentColor;
  overflow: hidden;
  outline: none;
  font-size: 20px;
  vertical-align: sub;
  margin-right: 4px;
}
</style>
