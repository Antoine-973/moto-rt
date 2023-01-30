<script setup>

import { useCustomersStore } from '@/stores/customers.store'

const customersStore = useCustomersStore()
await customersStore.getCustomers().then(async () => {
    console.log('Customers loaded')
})
const customers = customersStore.customers
</script>

<template>
    <div v-if='customers !== null' class='grid grid-cols-12 grid-rows-4 bg-grey-800 w-full p-5 gap-5'>
        <div v-for='customer in customers' :key='customer.id' class='col-span-2'>
            <div class="card w-84 bg-gray-800 text-primary-content">
                <div class="card-body">
                    <h2 class="card-title">{{customer.username}}</h2>
                    <div class="card-actions justify-end">
                        <button class="btn">Discuter</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div v-else class='flex flex-col items-center justify-center h-2/3 gap-3'>
        <h2 class='text-2xl text-white'>Il n'y aucun client</h2>
    </div>
</template>