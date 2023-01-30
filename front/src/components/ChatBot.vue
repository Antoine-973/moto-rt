<script setup>

import { useAlertStore, useAuthStore } from '@/stores'
import { onMounted } from 'vue'

const authStore = useAuthStore()
const socket = authStore.socket
const adminSocket = authStore.adminSocket

</script>


<template>
    <div class="fixed bottom-5 right-5 z-50">
		<div class="dropdown dropdown-top dropdown-left">
			<label tabindex="0" class="btn btn-ghost btn-circle avatar online placeholder">
			<div class="bg-neutral-focus text-neutral-content rounded-full w-16">
				<span class="text-xl">CB</span>
			</div>
			</label>
			<div tabindex="0" class="menu menu-compact dropdown-content w-[32rem] h-[32rem] p-5 shadow bg-base-100 rounded-box w-52">
				<div class="t chat-start">
					<div class="chat-bubble chat-bubble-primary">Bonjour, en quoi puis-je vous aider aujourd'hui ?</div>
					
					<div v-for="message in messages" :key="message.id">
						<div class="chat chat-end">
							<div class="chat-bubble chat-bubble-secondary">{{ message.content }}</div>
						</div>
					</div>
					<div class="fixed bottom-5 right-5 z-50">
						<input type="text" placeholder="Type here" class="input w-full max-w-xs" id="user-message" v-model="userMessage"/>
						<button v-on:click="addNewDiv" class="btn btn-primary">Submit</button>
					</div>
				</div>
			</div>
		</div>
  	</div>
</template>

