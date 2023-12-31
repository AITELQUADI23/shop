import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
  user: null || JSON.parse(localStorage.getItem("user")),
  loading: "idle",
  error: null,
};

export const logoutUser = createAsyncThunk("auth/logout", async () => {
  localStorage.removeItem("user");
  return null; 
});

export const loginUser = createAsyncThunk("auth/login", async ({data,toast,nav}) => {
  try {
    const response = await axios.post(
      "http://localhost:8080/api/auth/login",
      data
    );
    toast.success(response.data.message);
    // Save user information to localStorage
    localStorage.setItem("user", JSON.stringify(response.data));
    nav('/')
    return response.data;
  } catch (error) {
    toast.error(error.response.data.message);

    console.error("Login Error:", error.message);
    throw error.response.data.message;
  }
});

export const registerUser = createAsyncThunk(
  "auth/register",
  async ({data,toast}) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/signup",
        data
      );
      toast.success(response.data.message);
      return response.data;
    } catch (error) {
      toast.error(error.response.data.message);

      console.error("Registration Error:", error.message);
      throw error.response.data.message;
    }
  }
);


const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = "loading";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message;
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = "loading";
      })
      .addCase(registerUser.fulfilled, (state,action) => {
        state.loading = "succeeded";
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message;
      })
      .addCase(logoutUser.pending, (state) => {
        state.loading = "loading";
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = "idle";
        state.user = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message;
      })

  },
});

const authReducer = authSlice.reducer;
const authActions = {
  loginUser,
  registerUser,
  logoutUser,
};

export { authActions, authReducer };
// export const { updatePhotoPorfile, update, updateInfoUser } = authSlice.actions;