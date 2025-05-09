import { createSlice } from "@reduxjs/toolkit"
import { addToDo, deleteToDo, fetchToDos } from "./operations"
import toast from "react-hot-toast"

const initialState={
items:[],
isLoading:false,
isError:false,

}



const slice=createSlice({
  name:"todos",
  initialState,
  extraReducers: builder => {

    builder
    .addCase(fetchToDos.fulfilled, (state,action)=>{
state.items=action.payload;
state.isLoading=false;
    })
    .addCase(fetchToDos.pending, (state,action)=>{
 
      state.isLoading=true;
          })
          .addCase(deleteToDo.fulfilled,(state,action)=>{
            state.items=state.items.filter(item=>item._id!==action.payload);
            toast.success('The task is deleted!');
          })
          .addCase(addToDo.fulfilled,(state,action)=>{
            state.items.push(action.payload);
            toast.success('The task is deleted!');
          })
          .addCase(addToDo.rejected,(state,action)=>{
            state.isError = true;
            toast.error('Sorry, something went wrong, try again!');
          })



  }
});

export const toDoSliceReducer=slice.reducer;