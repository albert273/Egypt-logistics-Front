import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import cookie from "cookie-universal";

export const fetchHeadOffice = createAsyncThunk(
  "HeadOfficeDataSlice/fetchHeadOffice",
  async () => {
    const cookies = cookie();
    const token = cookies.get("token");
    try {
      const response = await axios.get(
        "https://egypt-logistics.vercel.app/api/user/headOffice",
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

export const deleteHeadOfficer = createAsyncThunk(
  "HeadOfficeDataSlice/deleteHeadOfficer",
  async (id) => {
    const cookies = cookie();
    const token = cookies.get("token");
    try {
      const response = await axios.delete(
        `https://egypt-logistics.vercel.app/api/user/headOffice/${id}`,
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

export const fetchHeadOfficeById = createAsyncThunk(
  "HeadOfficeDataSlice/fetchHeadOfficeById",
  async (id) => {
    const cookies = cookie();
    const token = cookies.get("token");
    try {
      const response = await axios.get(
        `https://egypt-logistics.vercel.app/api/user/headOffice/${id}`,
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

export const createHeadOfficer = createAsyncThunk(
  "HeadOfficeDataSlice/createHeadOfficer",
  async (data, { rejectWithValue }) => {
    data.accountType = "headOffice";
    const cookies = cookie();
    const token = cookies.get("token");

    try {
      const response = await axios.post(
        `https://egypt-logistics.vercel.app/api/user/addAccount`,
        data, // Include the data here
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

const headOfficeDataSlice = createSlice({
  name: "headOfficeData",
  initialState: { headOfficer: [] },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchHeadOffice.fulfilled, (state, action) => {
      state.headOfficer = action.payload;
    });
    builder.addCase(deleteHeadOfficer.fulfilled, (state, action) => {
      state.headOfficer = state.headOfficer.filter(
        (officer) => officer._id !== action.payload
      );
    });
    builder.addCase(fetchHeadOfficeById.fulfilled, (state, action) => {
      state.headOfficer = action.payload || {};
    });
    builder.addCase(createHeadOfficer.fulfilled, (state, action) => {
      state.headOfficer.push(action.payload);
    });
  },
});

export default headOfficeDataSlice.reducer;
export { headOfficeDataSlice }; // Named export of slice itself if needed
