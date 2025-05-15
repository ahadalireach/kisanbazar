import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import { toast } from "react-toastify"
import { clearCart } from "./cartSlice"

const API_URL = import.meta.env.VITE_API_URL

// Create order
export const createOrder = createAsyncThunk(
  "orders/createOrder",
  async (orderData, { rejectWithValue, getState, dispatch }) => {
    try {
      const token = getState().auth.token

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }

      const { data } = await axios.post(`${API_URL}/orders`, orderData, config)

      // Clear cart after successful order
      dispatch(clearCart())

      return data
    } catch (error) {
      const message = error.response && error.response.data.message ? error.response.data.message : error.message
      return rejectWithValue(message)
    }
  },
)

// Get consumer orders
export const getConsumerOrders = createAsyncThunk(
  "orders/getConsumerOrders",
  async (_, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.token

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }

      const { data } = await axios.get(`${API_URL}/orders/consumer`, config)
      return data
    } catch (error) {
      const message = error.response && error.response.data.message ? error.response.data.message : error.message
      return rejectWithValue(message)
    }
  },
)

// Get farmer orders
export const getFarmerOrders = createAsyncThunk("orders/getFarmerOrders", async (_, { rejectWithValue, getState }) => {
  try {
    const token = getState().auth.token

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }

    const { data } = await axios.get(`${API_URL}/orders/farmer`, config)
    return data
  } catch (error) {
    const message = error.response && error.response.data.message ? error.response.data.message : error.message
    return rejectWithValue(message)
  }
})

// Get order details
export const getOrderDetails = createAsyncThunk("orders/getOrderDetails", async (id, { rejectWithValue, getState }) => {
  try {
    const token = getState().auth.token

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }

    const { data } = await axios.get(`${API_URL}/orders/${id}`, config)
    return data
  } catch (error) {
    const message = error.response && error.response.data.message ? error.response.data.message : error.message
    return rejectWithValue(message)
  }
})

// Update order status (farmer only)
export const updateOrderStatus = createAsyncThunk(
  "orders/updateOrderStatus",
  async ({ id, status }, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.token

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }

      const { data } = await axios.put(`${API_URL}/orders/${id}`, { status }, config)
      return data
    } catch (error) {
      const message = error.response && error.response.data.message ? error.response.data.message : error.message
      return rejectWithValue(message)
    }
  },
)

// Get all orders (admin only)
export const getAllOrders = createAsyncThunk("orders/getAllOrders", async (_, { rejectWithValue, getState }) => {
  try {
    const token = getState().auth.token

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }

    const { data } = await axios.get(`${API_URL}/orders`, config)
    return data
  } catch (error) {
    const message = error.response && error.response.data.message ? error.response.data.message : error.message
    return rejectWithValue(message)
  }
})

const initialState = {
  orders: [],
  farmerOrders: [],
  adminOrders: [],
  order: null,
  loading: false,
  error: null,
  success: false,
}

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    clearOrderError: (state) => {
      state.error = null
    },
    resetOrderSuccess: (state) => {
      state.success = false
    },
    clearOrderDetails: (state) => {
      state.order = null
    },
  },
  extraReducers: (builder) => {
    builder
      // Create order
      .addCase(createOrder.pending, (state) => {
        state.loading = true
        state.error = null
        state.success = false
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.order = action.payload.data
        toast.success("Order placed successfully!")
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        toast.error(action.payload)
      })
      // Get consumer orders
      .addCase(getConsumerOrders.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(getConsumerOrders.fulfilled, (state, action) => {
        state.loading = false
        state.orders = action.payload.data
      })
      .addCase(getConsumerOrders.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      // Get farmer orders
      .addCase(getFarmerOrders.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(getFarmerOrders.fulfilled, (state, action) => {
        state.loading = false
        state.farmerOrders = action.payload.data
      })
      .addCase(getFarmerOrders.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      // Get order details
      .addCase(getOrderDetails.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(getOrderDetails.fulfilled, (state, action) => {
        state.loading = false
        state.order = action.payload.data
      })
      .addCase(getOrderDetails.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      // Update order status
      .addCase(updateOrderStatus.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        state.loading = false
        state.order = action.payload.data

        // Update order in farmerOrders array
        if (state.farmerOrders.length > 0) {
          state.farmerOrders = state.farmerOrders.map((order) =>
            order._id === action.payload.data._id ? action.payload.data : order,
          )
        }

        // Update order in adminOrders array
        if (state.adminOrders.length > 0) {
          state.adminOrders = state.adminOrders.map((order) =>
            order._id === action.payload.data._id ? action.payload.data : order,
          )
        }

        toast.success(`Order status updated to ${action.payload.data.status}`)
      })
      .addCase(updateOrderStatus.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        toast.error(action.payload)
      })
      // Get all orders (admin)
      .addCase(getAllOrders.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(getAllOrders.fulfilled, (state, action) => {
        state.loading = false
        state.adminOrders = action.payload.data
      })
      .addCase(getAllOrders.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export const { clearOrderError, resetOrderSuccess, clearOrderDetails } = orderSlice.actions

export default orderSlice.reducer
