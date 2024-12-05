// MessageSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import cookie from "cookie-universal";

export const fetchMessageData = createAsyncThunk(
  "messageDataSlice/fetchMessageData",
  async () => {
    const cookies = cookie();
    const token = cookies.get("token");
    try {
      const response = await axios.get(
        "https://egypt-logistics.vercel.app/api/message",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

export const messageDataSlice = createSlice({
  name: "messageData",
  initialState: { messages: [] }, // Initial state with 'message' array
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchMessageData.fulfilled, (state, action) => {
      state.messages = action.payload; // Ensure data is stored in 'message'
    });
  },
});
export const {} = messageDataSlice.actions;

export default messageDataSlice.reducer;
