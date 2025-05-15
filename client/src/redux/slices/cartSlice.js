import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

// Get cart from localStorage
const cartItemsFromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const initialState = {
  cartItems: cartItemsFromStorage,
  farmerId:
    cartItemsFromStorage.length > 0 ? cartItemsFromStorage[0].farmerId : null,
  farmerName:
    cartItemsFromStorage.length > 0 ? cartItemsFromStorage[0].farmerName : null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { product, quantity } = action.payload;

      if (
        state.cartItems.length === 0 ||
        product.farmer._id === state.farmerId
      ) {
        const existItem = state.cartItems.find(
          (item) => item.productId === product._id
        );

        if (existItem) {
          state.cartItems = state.cartItems.map((item) =>
            item.productId === product._id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );
          toast.info(`Updated ${product.name} quantity in your cart`);
        } else {
          state.cartItems.push({
            productId: product._id,
            name: product.name,
            image:
              product.images && product.images.length > 0
                ? product.images[0]
                : null,
            price: product.price,
            quantity,
            farmerId: product.farmer._id,
            farmerName: product.farmer.name,
          });

          if (state.farmerId === null) {
            state.farmerId = product.farmer._id;
            state.farmerName = product.farmer.name;
          }

          toast.success(`Added ${product.name} to your cart`);
        }
      } else {
        toast.error(
          "You can only order from one farm at a time. Please clear your cart first."
        );
        return;
      }

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    removeFromCart: (state, action) => {
      const productId = action.payload;
      state.cartItems = state.cartItems.filter(
        (item) => item.productId !== productId
      );

      if (state.cartItems.length === 0) {
        state.farmerId = null;
        state.farmerName = null;
      }

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      toast.info("Item removed from cart");
    },
    updateCartQuantity: (state, action) => {
      const { productId, quantity } = action.payload;

      state.cartItems = state.cartItems.map((item) =>
        item.productId === productId ? { ...item, quantity } : item
      );

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    clearCart: (state) => {
      state.cartItems = [];
      state.farmerId = null;
      state.farmerName = null;

      localStorage.removeItem("cartItems");
      toast.info("Cart cleared");
    },
  },
});

export const { addToCart, removeFromCart, updateCartQuantity, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
