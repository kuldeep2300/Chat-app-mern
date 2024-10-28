import { useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { useConversation } from "../../zustand/useConversation";
import { useGetConversations } from "../../hooks/useGetConversations";
import toast from "react-hot-toast";

export const SearchInput = ({ conversationRefs }) => {
  const [search, setSearch] = useState("");
  const { setSelectedConversation } = useConversation();
  const { conversations } = useGetConversations();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!search) return;
    if (search.length <= 3)
      return toast.error("Search must be at least 3 characters long");

    const conversation = conversations.find((c) =>
      c.fullName.toLowerCase().includes(search.toLowerCase().trim())
    );

    if (conversation) {
      setSelectedConversation(conversation);
      setSearch("");

      const clearInterval = setTimeout(() => {
        // How is the scrolling working here properly let's understand this => First we have created conversationRefs using useRef() hook in the Sidebar.jsx component, and we pass this conversationRefs to both SearchInput component and Conversatons Components, so that when in the Conversations.jsx component we are map all the conversation for Conversation.jsx component here we write Conversation.jsx component inside the div inwhich we pass the key and reference of each conversation in conversationRefs.current object using ref prop and it will also update the SideBar.jsx and SearchInput.jsx component. After this insde the SearchInput.jsx component we write this -> conversationRefs.current[conversation._id]?.scrollIntoView({}), meaning after finding conversation check in the .current object and scroll to the conversation._id in the Conversations.jsx component..
        conversationRefs.current[conversation._id]?.scrollIntoView({
          behavior: "smooth", // Scroll to the conversation in the sidebar
          // block: "center", // Center the conversation in the sidebar
        });
      }, 100); // Delay the scroll to the user from sidebar for 100ms

      return () => clearTimeout(clearInterval);
    } else {
      toast.error("No such user found!");
      setSearch("");
    }
  };

  return (
    <form
      className="flex items-center gap-1 justify-evenly"
      onSubmit={handleFormSubmit}
    >
      <input
        type="text"
        id="search"
        placeholder="Search..."
        className="input input-bordered rounded-full text-black input-size bg-slate-200"
        autoComplete="off"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button
        type="submit"
        className="btn btn-circle bg-red-400 hover:bg-red-700 text-white font-bold"
      >
        <IoSearchOutline className="w-6 h-6 outline-none" />
      </button>
    </form>
  );
};
