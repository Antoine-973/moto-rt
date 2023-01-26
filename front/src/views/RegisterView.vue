<script setup>
import { Form, Field } from 'vee-validate';
import * as Yup from 'yup';

import { useUsersStore, useAlertStore } from '../stores';
import router from '../router/router';

const schema = Yup.object().shape({
    username: Yup.string()
        .required('Username is required'),
    email: Yup.string()
        .email('Email is not valid')
        .required('Email is required'),
    password: Yup.string()
        .required('Password is required')
        .min(6, 'Password must be at least 6 characters')
});

async function onSubmit(values) {
    const usersStore = useUsersStore();
    const alertStore = useAlertStore();
    try {
        await usersStore.register(values);
        await router.push('/login');
        alertStore.success('Registration successful');
    } catch (error) {
        alertStore.error(error);
    }
}
</script>

<template>
    <div class='w-screen h-screen bg-slate-900 flex flex-col items-center justify-center gap-5'>
        <div class="card w-96 bg-base-100 shadow-xl">
            <div class="card-body">
                <h2 class="card-title">Inscription</h2>
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
                            <label class='label'><span class="label-text">Nom d'utilisateur</span></label>
                            <Field name="username" type="text" class="input input-bordered w-full max-w-xs" :class="{ 'is-invalid': errors.username }" />
                            <label class="label">
                                <span class="label-text-alt text-red-500">{{ errors.username }}</span>
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
                                Register
                            </button>
                        </div>
                    </div>
                </Form>
            </div>
        </div>
        <div class='flex gap-2 items-center'>
            <h3>Vous avez déjà un compte ?</h3>
            <router-link to="login" class="btn-link">Connectez vous</router-link>
        </div>
    </div>
</template>