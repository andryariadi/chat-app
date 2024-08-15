import PropTypes from "prop-types";
import { useChatStore } from "../../../libs/chatStore";

const ChatItem = ({ chat }) => {
  const { changeChat } = useChatStore();

  const handleSelect = (chat) => {
    changeChat(chat.chatId, chat.user);
  };
  return (
    <div className="userChat" onClick={() => handleSelect(chat)}>
      <img src={chat.user.avatar || "/noAvatar.png"} alt="User" />
      <div className="text">
        <span>{chat.user.username}</span>
        <p>{chat.lastMessage || "Say hi to your new friend"}</p>
      </div>
    </div>
  );
};

// Menambahkan validasi tipe untuk props 'chat'
ChatItem.propTypes = {
  chat: PropTypes.shape({
    chatId: PropTypes.string.isRequired,
    user: PropTypes.shape({
      avatar: PropTypes.string,
      username: PropTypes.string.isRequired,
    }).isRequired,
    lastMessage: PropTypes.string,
  }).isRequired,
};

export default ChatItem;
