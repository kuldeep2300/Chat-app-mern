  import { useRef } from "react";
  import { Conversations } from "./Conversations";
  import { LogoutButton } from "./LogoutButton";
  import { SearchInput } from "./SearchInput";
  import { useConversation } from "../../zustand/useConversation";

  export const Sidebar = () => {
    // This creates an object with a .current property that we can dynamically add references to. Initially, conversationRefs.current is an empty object. Assign Refs in Conversations.jsx: In the Conversations component, we assign each conversation its own reference in conversationRefs.current based on its unique conversation._id. This is done with the ref prop in the map function:
    const conversationRefs = useRef({}); // Ref to hold all conversation references
    const { selectedConversation } = useConversation();

    return (
      <div
        className={`relative max-h-screen sm:w-[50vw] md:w-[35vw] lg:w-[30vw] xl:w-[20vw] w-full bg-white  border-r border-slate-500 pt-2 pl-3 flex flex-col duration-1000 transition-all  ${
          selectedConversation ? "hidden-sidebar" : "w-40%"
        }
        `
      }>
        <SearchInput conversationRefs={conversationRefs} />
        <div className="divider px-3"></div>
        <Conversations conversationRefs={conversationRefs} />
        <LogoutButton />
      </div>
    );
  };
