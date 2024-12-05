import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import cookie from "cookie-universal";

export const fetchClient = createAsyncThunk(
  "clientDataSlice/fetchClient",
  async () => {
    const cookies = cookie();
    const token = cookies.get("token");
    try {
      const response = await axios.get(
        "https://egypt-logistics.vercel.app/api/user/client",
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

export const deleteClient = createAsyncThunk(
  "clientDataSlice/deleteClient",
  async (id) => {
    const cookies = cookie();
    const token = cookies.get("token");
    try {
      const response = await axios.delete(
        `https://egypt-logistics.vercel.app/api/user/client/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 201 || response.status === 200) {
        window.location.reload();
      }
    } catch (err) {
      console.log("Error:", err);
    }
  }
);

export const fetchClientById = createAsyncThunk(
  "HeadOfficeDataSlice/fetchClientById",
  async (id) => {
    const cookies = cookie();
    const token = cookies.get("token");
    try {
      const response = await axios.get(
        `https://egypt-logistics.vercel.app/api/user/client/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data.data;
    } catch (err) {
      console.log("Error:", err);
    }
  }
);

export const createClient = createAsyncThunk(
  "clientDataSlice/createClient",
  async (data, { rejectWithValue }) => {
    const cookies = cookie();
    const token = cookies.get("token");

    try {
      const response = await axios.post(
        `https://egypt-logistics.vercel.app/api/user/addAccount`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (err) {
      console.log("Error:", err);
      return rejectWithValue(err.response?.data);
    }
  }
);

const clientDataSlice = createSlice({
  name: "clientDataSlice",
  initialState: { client: [] },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchClient.fulfilled, (state, action) => {
      state.client = action.payload;
    });
    builder.addCase(deleteClient.fulfilled, (state, action) => {
      state.client = state.headOfficer.filter(
        (officer) => officer._id !== action.payload
      );
    });
    builder.addCase(fetchClientById.fulfilled, (state, action) => {
      state.client = action.payload || {};
    });
    builder.addCase(createClient.fulfilled, (state, action) => {
      state.client.push(action.payload);
    });
  },
});

export default clientDataSlice.reducer;
export { clientDataSlice }; // Named export of slice itself if needed
