import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import { toast } from "react-toastify"

const API_URL = import.meta.env.VITE_API_URL

// Send message
export const sendMessage = createAsyncThunk(
  "messages/sendMessage",
  async (messageData, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.token

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }

      const { data } = await axios.post(`${API_URL}/messages`, messageData, config)
      return data
    } catch (error) {
      const message = error.response && error.response.data.message ? error.response.data.message : error.message
      return rejectWithValue(message)
    }
  },
)

// Get conversations
export const getConversations = createAsyncThunk(
  "messages/getConversations",
  async (_, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.token

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }

      const { data } = await axios.get(`${API_URL}/messages`, config)
      return data
    } catch (error) {
      const message = error.response && error.response.data.message ? error.response.data.message : error.message
      return rejectWithValue(message)
    }
  },
)

// Get conversation messages
export const getConversationMessages = createAsyncThunk(
  "messages/getConversationMessages",
  async (userId, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.token

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }

      const { data } = await axios.get(`${API_URL}/messages/${userId}`, config)
      return { data, userId }
    } catch (error) {
      const message = error.response && error.response.data.message ? error.response.data.message : error.message
      return rejectWithValue(message)
    }
  },
)

// Mark messages as read
export const markMessagesAsRead = createAsyncThunk(
  "messages/markMessagesAsRead",
  async (userId, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.token

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }

      const { data } = await axios.put(`${API_URL}/messages/read/${userId}`, {}, config)
      return { data, userId }
    } catch (error) {
      const message = error.response && error.response.data.message ? error.response.data.message : error.message
      return rejectWithValue(message)
    }
  },
)

const initialState = {
  conversations: [],
  messages: {},
  currentConversation: null,
  loading: false,
  error: null,
}

const messageSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    clearMessageError: (state) => {
      state.error = null
    },
    setCurrentConversation: (state, action) => {
      state.currentConversation = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      // Send message
      .addCase(sendMessage.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.loading = false

        const { receiver } = action.payload.data
        const receiverId = receiver._id || receiver

        // Add message to conversation
        if (state.messages[receiverId]) {
          state.messages[receiverId].push(action.payload.data)
        } else {
          state.messages[receiverId] = [action.payload.data]
        }
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        toast.error(action.payload)
      })
      // Get conversations
      .addCase(getConversations.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(getConversations.fulfilled, (state, action) => {
        state.loading = false
        state.conversations = action.payload.data
      })
      .addCase(getConversations.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      // Get conversation messages
      .addCase(getConversationMessages.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(getConversationMessages.fulfilled, (state, action) => {
        state.loading = false
        state.messages[action.payload.userId] = action.payload.data.data
      })
      .addCase(getConversationMessages.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      // Mark messages as read
      .addCase(markMessagesAsRead.fulfilled, (state, action) => {
        // Update unread count in conversations
        state.conversations = state.conversations.map((conversation) => {
          if (conversation.user._id === action.payload.userId) {
            return { ...conversation, unreadCount: 0 }
          }
          return conversation
        })

        // Update isRead status in messages
        if (state.messages[action.payload.userId]) {
          state.messages[action.payload.userId] = state.messages[action.payload.userId].map((message) => {
            if (message.sender._id === action.payload.userId && !message.isRead) {
              return { ...message, isRead: true }
            }
            return message
          })
        }
      })
  },
})

export const { clearMessageError, setCurrentConversation } = messageSlice.actions

export default messageSlice.reducer
