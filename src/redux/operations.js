import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../config/api";

export const fetchToDos = createAsyncThunk('fetchToDos', async (_, thunkAPI) => {
    try {
      const { data } = await  api.get('api/todos');
      return data; 
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  });
  
  
  export const deleteToDo = createAsyncThunk('deleteToDo', async (todoId, thunkAPI) => {
    try {
      await api.delete(`api/todos/${todoId}`);
      return todoId;  
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  });
  export const addToDo = createAsyncThunk('addToDo', async (body, thunkAPI) => {
    try {
      const { data } = await api.post('api/todos', body);
      return data;
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        
        return thunkAPI.rejectWithValue(error.response.data.message);
      }
      
      return thunkAPI.rejectWithValue(error.message || 'Something went wrong');
    }
  });
  

  export const editToDo = createAsyncThunk(
  'editToDo',
  async ({ todoId, updatedData }, thunkAPI) => {
    try {
      const { data } = await api.patch(`api/todos/${todoId}`, updatedData);
      return data;
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        return thunkAPI.rejectWithValue(error.response.data.message);
      }
      return thunkAPI.rejectWithValue(error.message || 'Something went wrong');
    }
  }
);
