<script setup>
import { Field, Form } from 'vee-validate'
import * as Yup from 'yup'

import { useAlertStore } from '../stores'
import { useRouter } from 'vue-router'
import RoomsService from '@/services/rooms.service'

const router = useRouter();

    const schema = Yup.object().shape({
        name: Yup.string()
            .required('Le nom de la salle est requis')
            .min(2, 'Le nom de la salle doit faire au moins 2 caractères')
            .max(50, 'Le nom de la salle doit faire au maximum 50 caractères'),
        limit: Yup.number()
            .required("Le nombre d'utilisateurs maximum est requis")
            .min(2, 'Le minimum est de 2 utilisateurs')
            .max(20, 'Le maximum est de 20 utilisateurs'),
        description: Yup.string()
            .max(255, 'La description de la salle ne doit pas dépasser 255 caractères')
    });

    const createRoom = async (room) => {
        return RoomsService.createRoom(room).then((response) => {
            return response.data;
        })
    }

    async function onSubmit(values, { setErrors } ) {
        const alertStore = useAlertStore();
        createRoom(values).then(async () => {
            await router.push('/rooms').then(() => {
                alertStore.success("Salle créée avec succès !");
            }
            );
        }).catch(error => setErrors({ apiError: error.response.data.message }));
    }
</script>

<template>
    <label for="my-modal-4" class="btn w-full h-full">Créer une salle</label>

    <input id="my-modal-4" type="checkbox" class="modal-toggle" />
    <label for="my-modal-4" class="modal cursor-pointer">
        <label class="modal-box relative flex flex-col items-center" for="">
            <h2 class="card-title">Création d'une salle de discussion</h2>
            <Form v-slot="{ errors, isSubmitting }" :validation-schema="schema" @submit="onSubmit">
                <div class='flex flex-col gap-2'>
                    <div class="form-control w-full max-w-xs">
                        <label class='label'><span class="label-text">Nom de la salle</span></label>
                        <Field name="name" type="text" class="input input-bordered w-full max-w-xs" :class="{ 'is-invalid': errors.name }" />
                        <label class="label">
                            <span class="label-text-alt text-red-500">{{ errors.name }}</span>
                        </label>
                    </div>
                    <div class="form-control w-full max-w-xs">
                        <label class='label'><span class="label-text">Nombre maximum d'utilisateurs</span></label>
                        <Field name="limit" type="number" class="input input-bordered w-full max-w-xs" :class="{ 'is-invalid': errors.limit }" />
                        <label class="label">
                            <span class="label-text-alt text-red-500">{{ errors.limit }}</span>
                        </label>
                    </div>
                    <div class="form-control w-full max-w-xs">
                        <label class='label'><span class="label-text">Description</span></label>
                        <Field name="description" type="text" as='textarea' class="textarea textarea-bordered h-24" :class="{ 'is-invalid': errors.description }" />
                        <label class="label">
                            <span class="label-text-alt text-red-500">{{ errors.textarea }}</span>
                        </label>
                    </div>
                    <div class="form-control w-full max-w-xs">
                        <button class="btn btn-primary" :disabled="isSubmitting">
                            <span v-show="isSubmitting" class="spinner-border spinner-border-sm mr-1"></span>
                            Créer
                        </button>
                    </div>
                    <div v-if="errors.apiError" class="form-control w-full max-w-xs alert alert-error shadow-lg text-white">{{errors.apiError}}</div>
                </div>
            </Form>
        </label>
    </label>
</template>