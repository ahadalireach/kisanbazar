"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getConversations } from "../redux/slices/messageSlice";
import MessageItem from "../components/MessageItem";
import Loader from "../components/Loader";
import { FaComments } from "react-icons/fa";

const MessagesPage = () => {
  const dispatch = useDispatch();
  const { conversations, loading } = useSelector((state) => state.messages);

  useEffect(() => {
    dispatch(getConversations());
  }, [dispatch]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Messages</h1>

      {conversations.length > 0 ? (
        <div className="space-y-4">
          {conversations.map((conversation) => (
            <MessageItem
              key={conversation.user._id}
              conversation={conversation}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 glass rounded-xl">
          <FaComments className="text-green-500 text-5xl mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">No Messages Yet</h3>
          <p className="text-gray-600">
            You don't have any conversations yet. Start by messaging a farmer or
            responding to customer inquiries.
          </p>
        </div>
      )}
    </div>
  );
};

export default MessagesPage;
