<script setup>
import { useRoute, useRouter } from 'vue-router'
import { onMounted } from 'vue'
import { useRoomsStore } from '@/stores/rooms.store'
import * as Yup from 'yup'
import { useAuthStore } from '@/stores'
import { Form, Field } from 'vee-validate';

const route = useRoute()
const roomId = route.params.id
const roomsStore = useRoomsStore()

onMounted(await roomsStore.getRoom(roomId).then(async () => {
    console.log('Room loaded')
}))

const room = roomsStore.currentRoom;

const schema = Yup.object().shape({
    message: Yup.string().required('Le message est requis')
});

const authStore = useAuthStore()
const router = useRouter()

function onSubmit(values, { setErrors }) {
    const { email, password } = values;
    return authStore.login(email, password)
        .then(() => router.push({ name: 'HomeView' }))
        .catch(error => setErrors({ apiError: error.response.data.message }));
}
</script>

<template>
    <div>
        <h1 class='text-3xl text-white'>{{room.name}}</h1>
        <p>{{room.description}}</p>
        <div class='bg-gray-800 rounded-lg w-full h-full mt-5 relative'>
            <div class='p-5'>
            <div class="chat chat-start">
                <div class="chat-bubble">It's over Anakin, <br/>I have the high ground.</div>
            </div>
            <div class="chat chat-end">
                <div class="chat-bubble">You underestimate my power!</div>
            </div>
            <div class="chat chat-start">
                <div class="chat-bubble">It's over Anakin, <br/>I have the high ground.</div>
            </div>
            <div class="chat chat-end">
                <div class="chat-bubble">You underestimate my power!</div>
            </div>
            <div class="chat chat-start">
                <div class="chat-bubble">It's over Anakin, <br/>I have the high ground.</div>
            </div>
            <div class="chat chat-end">
                <div class="chat-bubble">You underestimate my power!</div>
            </div>
            <div class="chat chat-start">
                <div class="chat-bubble">It's over Anakin, <br/>I have the high ground.</div>
            </div>
            <div class="chat chat-end">
                <div class="chat-bubble">You underestimate my power!</div>
            </div>
            <div class="chat chat-start">
                <div class="chat-bubble">It's over Anakin, <br/>I have the high ground.</div>
            </div>
            <div class="chat chat-end">
                <div class="chat-bubble">You underestimate my power!</div>
            </div>
            </div>
            <div class='absolute bottom-0 w-full'>
                <Form v-slot="{ errors, isSubmitting }" :validation-schema="schema" @submit="onSubmit">
                    <div v-if="errors.apiError" class="label-text-alt text-red-500">{{errors.apiError}}</div>
                    <label class="label">
                        <span class="label-text-alt text-red-500">{{ errors.message }}</span>
                    </label>
                    <div class='grid grid-cols-12 grid-rows-1 w-full'>
                        <div class="col-span-11 w-full">
                            <Field name="message" type="text" class="rounded-none input input-bordered w-full" :class="{ 'is-invalid': errors.message }" />
                        </div>
                        <div class="col-span-1 w-full">
                            <button class="rounded-none btn w-full" :disabled="isSubmitting">
                                <span v-show="isSubmitting" class="spinner-border spinner-border-sm mr-1"></span>
                                Envoyer
                            </button>
                        </div>
                    </div>
                </Form>
            </div>
        </div>
    </div>
</template>