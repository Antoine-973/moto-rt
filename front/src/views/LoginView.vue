<script setup>
import { Form, Field } from 'vee-validate';
import * as Yup from 'yup';

import { useAuthStore }  from '../stores/auth.store.js';

const schema = Yup.object().shape({
    email: Yup.string().required('Email is required').email('Email is not valid'),
    password: Yup.string().required('Password is required')
});

function onSubmit(values, { setErrors }) {
    const authStore = useAuthStore();
    const { email, password } = values;

    return authStore.login(email, password)
        .catch(error => setErrors({ apiError: error }));
}
</script>

<template>
    <div>
        <h2>Login</h2>
        <Form @submit="onSubmit" :validation-schema="schema" v-slot="{ errors, isSubmitting }">
            <div class="form-group">
                <label>Email</label>
                <Field name="email" type="text" class="form-control" :class="{ 'is-invalid': errors.email }" />
                <div class="invalid-feedback">{{errors.email}}</div>
            </div>
            <div class="form-group">
                <label>Password</label>
                <Field name="password" type="password" class="form-control" :class="{ 'is-invalid': errors.password }" />
                <div class="invalid-feedback">{{errors.password}}</div>
            </div>
            <div class="form-group">
                <button class="btn btn-primary" :disabled="isSubmitting">
                    <span v-show="isSubmitting" class="spinner-border spinner-border-sm mr-1"></span>
                    Login
                </button>
            </div>
            <div v-if="errors.apiError" class="alert alert-danger mt-3 mb-0">{{errors.apiError}}</div>
        </Form>
    </div>
</template>