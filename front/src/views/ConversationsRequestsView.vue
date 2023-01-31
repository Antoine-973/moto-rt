<script setup>
import SideBarAdmin from '@/components/SideBarAdmin.vue'
import ConversationsRequestList from '@/components/ConversationsRequestList.vue'
</script>

<template>
    <main>
        <div class="grid grid-cols-12 grid-rows-1 w-screen h-screen bg-slate-900">
            <div class="h-full col-span-2">
                <SideBarAdmin />
            </div>
            <div class="col-span-10 flex flex-col w-full p-5">
                <h1 class='text-3xl text-white'>Demandes de contact</h1>
                <Suspense>
                    <ConversationsRequestList/>
                </Suspense>
            </div>
        </div>
    </main>
</template>