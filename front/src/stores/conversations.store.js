import { defineStore } from "pinia";
import { ref } from "vue";

export const useConversationsStore = defineStore("conversations", () => {
    const conversations = ref({});

    function setConversation(conversation) {
        conversations.value[conversation.id] = conversation;
    }

    function setConversations(newConversations) {
        conversations.value = newConversations.reduce(
            (accumulator, conversation) => {
                accumulator[conversation.id] = {
                    messages: [],
                    ...conversation,
                };

                return accumulator;
            },
                Object.create(null)
        );
    }

    function updateConversations(newConversations) {
        conversations.value = newConversations.reduce(
            (accumulator, conversation) => {
                const existingConversation = accumulator[conversation.id];

                if (existingConversation) {
                    accumulator[conversation.id] = {
                        ...existingConversation,
                        ...conversation,
                    };
                } else {
                    accumulator[conversation.id] = {
                        messages: [],
                        ...conversation,
                    };
                }

                return accumulator;
            },
                conversations.value
        );
    }

    function updateConversation(conversation) {
        conversations.value[conversation.id] = {
            ...conversations.value[conversation.id],
            ...conversation,
        };
    }

    function addMessage(conversationId, message) {
        conversations.value[conversationId]?.messages?.push(message);
    }

    return {
        conversations,
        setConversation,
        setConversations,
        addMessage,
        updateConversation,
        updateConversations,
    };
});

