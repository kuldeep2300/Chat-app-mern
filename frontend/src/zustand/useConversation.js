import { create } from "zustand";

//* This code is using the Zustand library to create a global state store, similar to useState but it can be used across different components without needing to pass props. Here's a breakdown of the key parts: Zustand: A state management library for React that allows you to create a store (similar to Redux but simpler). useConversation: This is the store created using Zustand.

// Purpose: This store lets you manage conversations and messages globally across your app, allowing you to easily access and update this data from any component without passing props down through many layers. This is useful for managing chat state in a chat application

export const useConversation = create((set) => ({
  selectedConversation: null,   // This is like useState hook, inputs, setInputs
  setSelectedConversation: (selectedConversation) =>
    set({ selectedConversation }),
  messages: [],
  setMessages: (messages) => set({ messages }),
}));
