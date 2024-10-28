import { VscSend } from "react-icons/vsc";
import { useSendMessage } from "../../hooks/useSendMessage";
import { useState } from "react";

export const MessageInput = () => {
  const [message, setMessage] = useState("");
  const {sendMesssage, loading} = useSendMessage();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    
    if(!message) return;
    await sendMesssage(message);
    setMessage("");
  };
  return (
    <form className="w-full p-2 fixed" onSubmit={handleFormSubmit}>
      <div className="w-full relative pl-1">
        <input
          type="text"
          id="message"
          autoFocus
          className=" text-lg block w-full p-2 pb-5 outline-none bg-white boder-gray-600 text-black pt-3"
          placeholder="Send a message" 
          autoComplete="off"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          type="submit"
          className="absolute inset-y-0 end-0 flex items-center pe-3 pr-6 text-xl"
        >
          {loading ? <div className="loading loading-spinner"></div> : <VscSend size={30} className="hover:text-primary"/> }
        </button>
      </div>
    </form>
  );
};
