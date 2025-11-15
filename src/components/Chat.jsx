import React, { useState } from "react";
import {
  Search,
  Send,
  Paperclip,
  Smile,
  Phone,
  Video,
  MoreHorizontal,
  Circle,
} from "lucide-react";

const Chat = () => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [message, setMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const chatList = [
    {
      id: 1,
      name: "Dr. Emily Carter",
      role: "Mentor",
      lastMessage: "How are you feeling today? Remember to take...",
      timestamp: "2m",
      unread: 2,
      online: true,
      avatar:
        "https://images.pexels.com/photos/33081680/pexels-photo-33081680.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&dpr=1",
    },
    {
      id: 2,
      name: "Michael Rodriguez",
      role: "Mentee",
      lastMessage: "Thank you for the advice yesterday!",
      timestamp: "15m",
      unread: 0,
      online: false,
      avatar:
        "https://images.pexels.com/photos/33081683/pexels-photo-33081683.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&dpr=1",
    },
    {
      id: 3,
      name: "Sarah Kim",
      role: "Mentor",
      lastMessage: "I've scheduled our next session for...",
      timestamp: "1h",
      unread: 1,
      online: true,
      avatar:
        "https://images.pexels.com/photos/33081681/pexels-photo-33081681.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&dpr=1",
    },
    {
      id: 4,
      name: "James Wilson",
      role: "Mentee",
      lastMessage: "Looking forward to our chat tomorrow",
      timestamp: "3h",
      unread: 0,
      online: false,
      avatar:
        "https://images.pexels.com/photos/33081684/pexels-photo-33081684.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&dpr=1",
    },
    {
      id: 5,
      name: "James Wilson",
      role: "Mentee",
      lastMessage: "Looking forward to our chat tomorrow",
      timestamp: "3h",
      unread: 0,
      online: false,
      avatar:
        "https://images.pexels.com/photos/33081684/pexels-photo-33081684.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&dpr=1",
    },
  ];

  const messages = [
    {
      id: 1,
      sender: "Dr. Emily Carter",
      content: "Hi there! How are you feeling today?",
      timestamp: "10:30 AM",
      isOwn: false,
    },
    {
      id: 2,
      sender: "You",
      content:
        "Much better, thank you for asking! The exercises you recommended are really helping.",
      timestamp: "10:32 AM",
      isOwn: true,
    },
    {
      id: 3,
      sender: "Dr. Emily Carter",
      content:
        "That's wonderful to hear! Consistency is key. Remember to take breaks when you need them and listen to your body.",
      timestamp: "10:35 AM",
      isOwn: false,
    },
    {
      id: 4,
      sender: "You",
      content: "Will do! I have a question about the meditation techniques...",
      timestamp: "10:37 AM",
      isOwn: true,
    },

    {
      id: 5,
      sender: "Dr. Emily Carter",
      content:
        "That's wonderful to hear! Consistency is key. Remember to take breaks when you need them and listen to your body.",
      timestamp: "10:35 AM",
      isOwn: false,
    },
    {
      id: 6,
      sender: "You",
      content: "Will do! I have a question about the meditation techniques...",
      timestamp: "10:37 AM",
      isOwn: true,
    },

    {
      id: 7,
      sender: "Dr. Emily Carter",
      content:
        "That's wonderful to hear! Consistency is key. Remember to take breaks when you need them and listen to your body.",
      timestamp: "10:35 AM",
      isOwn: false,
    },
    {
      id: 8,
      sender: "You",
      content: "Will do! I have a question about the meditation techniques...",
      timestamp: "10:37 AM",
      isOwn: true,
    },
  ];

  const sendMessage = () => {
    if (!message.trim()) return;
    setMessage("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="h-screen bg-gray-50 dark:bg-gray-900 p-2 overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 h-full">
        {/* Chat List Card */}
        <div className="lg:col-span-1 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              Conversations
            </h2>

            {/* Search */}
            <div className="relative">
              <Search
                size={16}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
              />
            </div>
          </div>

          {/* Chat List */}
          <div className="flex-1 overflow-y-auto p-2 space-y-1">
            {chatList.map((chat) => (
              <div
                key={chat.id}
                onClick={() => setSelectedChat(chat)}
                className={`p-2.5 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors rounded-lg ${
                  selectedChat?.id === chat.id
                    ? "bg-teal-50 dark:bg-teal-900/20"
                    : ""
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="relative flex-shrink-0">
                    <img
                      src={chat.avatar}
                      alt={chat.name}
                      className="w-10 h-10 rounded-full"
                    />
                    {chat.online && (
                      <Circle
                        size={8}
                        className="absolute bottom-0 right-0 text-green-500 fill-current border border-white dark:border-gray-800"
                      />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-sm text-gray-900 dark:text-white truncate">
                        {chat.name}
                      </h3>
                      <span className="text-xs text-gray-500 dark:text-gray-400 flex-shrink-0 ml-2">
                        {chat.timestamp}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <p className="text-xs text-gray-600 dark:text-gray-300 truncate">
                        {chat.lastMessage}
                      </p>
                      {chat.unread > 0 && (
                        <span className="ml-2 bg-teal-500 text-white text-xs rounded-full px-1.5 py-0.5 min-w-[18px] text-center">
                          {chat.unread}
                        </span>
                      )}
                    </div>
                    <span
                      className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-md mt-1 inline-block ${
                        chat.role === "Mentor"
                          ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                          : "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400"
                      }`}
                    >
                      {chat.role}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Window Card */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 flex flex-col overflow-hidden">
          {selectedChat ? (
            <>
              {/* Chat Header */}
              <div className="p-3 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between flex-shrink-0">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <img
                      src={selectedChat.avatar}
                      alt={selectedChat.name}
                      className="w-9 h-9 rounded-full"
                    />
                    {selectedChat.online && (
                      <Circle
                        size={9}
                        className="absolute bottom-0 right-0 text-green-500 fill-current border-2 border-white dark:border-gray-800"
                      />
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold text-base text-gray-900 dark:text-white">
                      {selectedChat.name}
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {selectedChat.online ? "Online" : "Offline"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center">
                  <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors">
                    <Phone
                      size={16}
                      className="text-gray-500 dark:text-gray-400"
                    />
                  </button>
                  <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors">
                    <Video
                      size={16}
                      className="text-gray-500 dark:text-gray-400"
                    />
                  </button>
                  <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors">
                    <MoreHorizontal
                      size={16}
                      className="text-gray-500 dark:text-gray-400"
                    />
                  </button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex items-end gap-2 ${
                      msg.isOwn ? "justify-end" : "justify-start"
                    }`}
                  >
                    {!msg.isOwn && (
                      <img
                        src={selectedChat.avatar}
                        alt={selectedChat.name}
                        className="w-6 h-6 rounded-full self-start flex-shrink-0"
                      />
                    )}
                    <div
                      className={`max-w-lg px-3 py-2 rounded-xl ${
                        msg.isOwn
                          ? "bg-teal-500 text-white rounded-br-none"
                          : "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-bl-none"
                      }`}
                    >
                      <p className="text-sm leading-relaxed">{msg.content}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <div className="p-2 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 flex-shrink-0">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Type a message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="w-full pl-10 pr-20 py-2 bg-gray-100 dark:bg-gray-700 border-none rounded-full text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
                  />
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                    <button className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full">
                      <Paperclip
                        size={18}
                        className="text-gray-500 dark:text-gray-400"
                      />
                    </button>
                  </div>
                  <div className="absolute right-1.5 top-1/2 transform -translate-y-1/2 flex items-center gap-1">
                    <button className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full">
                      <Smile
                        size={18}
                        className="text-gray-500 dark:text-gray-400"
                      />
                    </button>
                    <button
                      onClick={sendMessage}
                      disabled={!message.trim()}
                      className="flex items-center justify-center w-8 h-8 bg-teal-500 hover:bg-teal-600 disabled:bg-gray-400 dark:disabled:bg-gray-600 text-white rounded-full transition-colors shadow-sm"
                    >
                      <Send size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </>
          ) : (
            /* Empty State */
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <Send size={36} className="text-white" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">
                  Choose a conversation
                </h3>
                <p className="text-gray-500 dark:text-gray-400 max-w-sm">
                  Select someone from your conversations to start messaging and
                  get the support you need
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Chat;
