<script setup>
    import { storeToRefs } from 'pinia';

    import { useAuthStore } from '../stores';

    const authStore = useAuthStore();
    const { user: authUser } = storeToRefs(authStore);

    const user = authUser.value.user;
</script>

<template>
    <div class="navbar bg-base-100 absolute z-40">
        <div class="flex-1">
            <a class="btn btn-ghost normal-case text-xl">MotoRT</a>
        </div>
        <div v-if="user" class="flex-none">
            <div class="dropdown dropdown-end">
                <label tabindex="0" class="btn btn-ghost btn-circle avatar">
                    <div class="w-10 rounded-full">
                        <img src="https://placeimg.com/80/80/people" />
                    </div>
                </label>
                <ul
                    tabindex="0"
                    class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
                >
                    <li>
                        <a class="justify-between">
                            Profile
                        </a>
                    </li>
                    <li><a>Settings</a></li>
                    <li><a>Logout</a></li>
                </ul>
            </div>
        </div>
        <div v-else>
            <router-link :to="{ name: 'LoginView'}" class="btn btn-ghost normal-case">Connexion</router-link>
        </div>
    </div>
</template>
