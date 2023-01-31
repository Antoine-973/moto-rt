import ChatbotService from "chatbot.service.js";
import { AuthStore } from '@/stores'

const PREFIX = 'chatbot:';
const socket = AuthStore.socket;
const service = new ChatbotService();
socket.on('connection', (socket) => {
  socket.on(`chatbot:ask`, async ({current, previous}) => {
    try {
      const chatbot_response = await service.chatbot(current, previous);
      socket.emit(`${PREFIX}answer`, chatbot_response);
    } catch (error) {
      socket.emit(`${PREFIX}error`, error);
    }
  });
});

export default AuthStore;
