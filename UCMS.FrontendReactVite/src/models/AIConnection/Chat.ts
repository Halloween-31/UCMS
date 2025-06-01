import { UserDefaultState, type User } from "../siteContentCreation/User";
import type { Message } from "./Message";

export interface Chat {
    chatId: number,

    userId: number,
    user: User,

    messages: Message[],
};

export const ChatDefaultState: Chat = {
    chatId: 0,
    userId: 0,
    user: UserDefaultState,
    messages: [],
};