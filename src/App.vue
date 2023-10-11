<template>
    <div>
        <router-view></router-view>
        <!-- 全局挂载弹框 -->
        <dialog-com />
    </div>
</template>
<script lang="ts" setup>
import dialogCom from '@/components/dialogCom/index.vue'
</script>
<style scoped></style>