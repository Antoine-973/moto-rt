<script setup>
import { Form, Field } from 'vee-validate';
import * as Yup from 'yup';

import { useAuthStore }  from '../stores';
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'

const authStore = useAuthStore();
const auth = storeToRefs(authStore);
const isLogged = auth.loggedIn.value;
const router = useRouter();

onMounted(() => {
    if (isLogged) {
        router.push({ name: 'HomeView' });
    }
})

const schema = Yup.object().shape({
    email: Yup.string().required('Email is required').email('Email is not valid'),
    password: Yup.string().required('Password is required')
});

function onSubmit(values, { setErrors }) {
    const { email, password } = values;
    return authStore.login(email, password)
        .then(() => router.push({ name: 'HomeView' }))
        .catch(error => setErrors({ apiError: error.response.data.message }));
}
</script>

<template>
    <div class='w-screen h-screen bg-slate-900 flex flex-col items-center justify-center gap-5'>
        <div class="card w-96 bg-base-100 shadow-xl">
            <div class="card-body">
                <h2 class="card-title">Connexion</h2>
                <Form v-slot="{ errors, isSubmitting }" :validation-schema="schema" @submit="onSubmit">
                    <div class='flex flex-col gap-2'>
                        <div class="form-control w-full max-w-xs">
                            <label class='label'><span class="label-text">Adresse email</span></label>
                            <Field name="email" type="text" class="input input-bordered w-full max-w-xs" :class="{ 'is-invalid': errors.email }" />
                            <label class="label">
                                <span class="label-text-alt text-red-500">{{ errors.email }}</span>
                            </label>
                        </div>
                        <div class="form-control w-full max-w-xs">
                            <label class='label'><span class="label-text">Mot de passe</span></label>
                            <Field name="password" type="password" class="input input-bordered w-full max-w-xs" :class="{ 'is-invalid': errors.password }" />
                            <label class="label">
                                <span class="label-text-alt text-red-500">{{ errors.password }}</span>
                            </label>
                        </div>
                        <div class="form-control w-full max-w-xs">
                            <button class="btn btn-primary" :disabled="isSubmitting">
                                <span v-show="isSubmitting" class="spinner-border spinner-border-sm mr-1"></span>
                                Connexion
                            </button>
                        </div>
                        <div v-if="errors.apiError" class="form-control w-full max-w-xs alert alert-error shadow-lg text-white">{{errors.apiError}}</div>
                    </div>
                </Form>
            </div>
        </div>
        <div class='flex gap-2 items-center'>
            <h3>Vous n'avez pas de compte ?</h3>
            <router-link to="register" class="btn-link">Inscrivez vous</router-link>
        </div>
    </div>
</template>