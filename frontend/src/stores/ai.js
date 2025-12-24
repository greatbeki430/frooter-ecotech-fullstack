
// src/stores/ai.js
import { defineStore } from "pinia";
export const useAiStore = defineStore("ai", {
  state: () => ({
    chatHistory: [],
    isTyping: false,
  }),
});
