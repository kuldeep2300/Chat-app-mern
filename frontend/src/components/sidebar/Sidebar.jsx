import { useRef } from "react";
import { Conversations } from "./Conversations";
import { LogoutButton } from "./LogoutButton";
import { SearchInput } from "./SearchInput";

export const Sidebar = () => {
  // This creates an object with a .current property that we can dynamically add references to. Initially, conversationRefs.current is an empty object. Assign Refs in Conversations.jsx: In the Conversations component, we assign each conversation its own reference in conversationRefs.current based on its unique conversation._id. This is done with the ref prop in the map function:

  const conversationRefs = useRef({});  // Ref to hold all conversation references


  return (
    <div className="bg-white border-r border-slate-500 p-4 flex flex-col">
      <SearchInput conversationRefs={conversationRefs} />
      <div className="divider px-3"></div>
      <Conversations conversationRefs={conversationRefs} />
      <LogoutButton />
    </div>
  );
};
