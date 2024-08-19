import PropTypes from "prop-types";
import { useChatStore } from "../../../libs/chatStore";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../../libs/firebase";
import { useUserStore } from "../../../libs/userStore";

const ChatItem = ({ chat }) => {
  const { changeChat, chatId } = useChatStore();
  const { currentUser } = useUserStore();

  const handleSelect = async (chat) => {
    // One way
    changeChat(chat.chatId, chat.user);
    const userChatsRef = doc(db, "userchats", currentUser.id);
    const userChatSnapshot = await getDoc(userChatsRef);

    if (userChatSnapshot.exists()) {
      const userChatsData = userChatSnapshot.data();

      const chatIndex = userChatsData.chats.findIndex((cht) => cht.chatId === chatId);

      userChatsData.chats[chatIndex].isSeen = true;
      await updateDoc(userChatsRef, {
        chats: userChatsData.chats,
      });
    }

    // Another way
  };

  console.log(chat, "<---dichatitem");

  return (
    <div className="userChat" style={{ backgroundColor: chat?.isSeen ? "transparent" : "#5183fe" }} onClick={() => handleSelect(chat)}>
      <img src={chat.user.blocked.includes(currentUser.id) ? "/noAvatar.png" : chat.user.avatar || "/noAvatar.png"} alt="User" />
      <div className="text">
        <span>{chat.user.blocked.includes(currentUser.id) ? "Blocked" : chat.user.username}</span>
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
      blocked: PropTypes.array,
    }).isRequired,
    lastMessage: PropTypes.string,
    isSeen: PropTypes.bool,
  }).isRequired,
};

export default ChatItem;
