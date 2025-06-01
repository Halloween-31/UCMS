import type { Chat } from "./Chat";

export interface Message {
    messageId: number,
    userRequest: string,
    aiResponse: string,

    chatId: number,
    chat: Chat,
};