import { authService } from "@api/authService";
import { ILogin } from "@customTypes/index";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { changeAccessToken } from "@reducers/profile/profile.reducer";
import { AxiosError } from "axios";

export const signInThunk = createAsyncThunk(
  "auth/signInThunk",
  async (data: ILogin, { dispatch, rejectWithValue }) => {
    try {
      const response = await authService.signIn(data);
      dispatch(changeAccessToken(response.token));
    } catch (err) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const error: AxiosError = err as any;
      if (!error.response) {
        throw err;
      }
      return rejectWithValue(error.response.data);
    }
  }
);
