import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../service/api";

export const getUjian = createAsyncThunk("/ujian", async (_, { getState, rejectWithValue }) => {
  try {
    const states = getState();
    const response = await api.get("/ujian", {
      headers: {
        Authorization: "Bearer " + states.auth.token, //the token is a variable which holds the token
      },
    });
    return response.data;
  } catch (error) {
    if (!error.response) {
      return (
        { message: error.message, status: "error" } &&
        rejectWithValue({ message: error.message, status: "error" })
      );
    }
    return rejectWithValue(error.response.data);
  }
});

export const postUjian = createAsyncThunk(
  "/ujian",
  async (payload, { getState, rejectWithValue }) => {
    try {
      const states = getState();
      const response = await api.post("/ujian", payload, {
        headers: {
          Authorization: "Bearer " + states.auth.token, //the token is a variable which holds the token
        },
      });
      return response.data;
    } catch (error) {
      if (!error.response) {
        return (
          { message: error.message, status: "error" } &&
          rejectWithValue({ message: error.message, status: "error" })
        );
      }
      return rejectWithValue(error.response.data);
    }
  }
);
export const deleteUjianById = createAsyncThunk(
  "/ujian",
  async (payload, { getState, rejectWithValue }) => {
    try {
      const states = getState();
      const response = await api.delete("/ujian/" + payload, {
        headers: {
          Authorization: "Bearer " + states.auth.token, //the token is a variable which holds the token
        },
      });
      return response.data;
    } catch (error) {
      if (!error.response) {
        return (
          { message: error.message, status: "error" } &&
          rejectWithValue({ message: error.message, status: "error" })
        );
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const actifkanUjian = createAsyncThunk(
  "/ujian/aktifkan",
  async (payload, { getState, rejectWithValue }) => {
    try {
      const states = getState();
      const response = await api.put(
        "/ujian/aktifkan/" + payload,
        {},
        {
          headers: {
            Authorization: "Bearer " + states.auth.token, //the token is a variable which holds the token
          },
        }
      );
      return response.data;
    } catch (error) {
      if (!error.response) {
        return (
          { message: error.message, status: "error" } &&
          rejectWithValue({ message: error.message, status: "error" })
        );
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const nonaktifkanUjian = createAsyncThunk(
  "/ujian/nonaktifkan",
  async (payload, { getState, rejectWithValue }) => {
    try {
      const states = getState();
      const response = await api.put(
        `/ujian/nonaktifkan/${payload}`,
        {},
        {
          headers: {
            Authorization: "Bearer " + states.auth.token, //the token is a variable which holds the token
          },
        }
      );
      return response.data;
    } catch (error) {
      if (!error.response) {
        return (
          { message: error.message, status: "error" } &&
          rejectWithValue({ message: error.message, status: "error" })
        );
      }
      return rejectWithValue(error.response.data);
    }
  }
);
