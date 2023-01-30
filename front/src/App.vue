<script setup>
import AppRouter from './AppRouter.vue'
import { useAlertStore } from '@/stores'

const alertStore = useAlertStore()
const alert = alertStore.alert
</script>

<template>
    <div class='w-full h-full overflow-x-hidden'>
        <AppRouter />
        <div v-if='alert'>
            <div v-if="alert.type === 'alert-success'" class="toast">
                <div class="alert alert-success">
                    <div>
                        <span>{{ alert.message }}</span>
                    </div>
                </div>
            </div>
            <div v-if="alert.type === 'alert-error'" class="toast">
                <div class="alert alert-error">
                    <div>
                        <span>{{ alert.message }}</span>
                    </div>
                </div>
            </div>
            <div v-if="alert.type === 'alert-warning'" class="toast">
                <div class="alert alert-warning">
                    <div>
                        <span>{{ alert.message }}</span>
                    </div>
                </div>
            </div>
            <div v-if="alert.type === 'alert-info'" class="toast">
                <div class="alert alert-info">
                    <div>
                        <span>{{ alert.message }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
