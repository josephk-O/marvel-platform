import { createSlice } from '@reduxjs/toolkit';

import fetchTools from '../thunks/tools';

const toolsState = {
  data: null,
  loading: true,
  error: null, // General error state for tools
};

const communicator = {
  prompt: null,
  response: null,
  communicatorLoading: false,
  formOpen: true,
  communicatorError: null, // Specific error for communicator actions
};

const initialState = {
  ...toolsState,
  ...communicator,
};

const tools = createSlice({
  name: 'tools',
  initialState,
  reducers: {
    reset: () => initialState,
    resetCommunicator: (state) => ({ ...state, ...communicator }),
    setCommunicatorLoading: (state, action) => {
      state.communicatorLoading = action.payload;
    },
    setPrompt: (state, action) => {
      state.prompt = action.payload;
    },
    setFormOpen: (state, action) => {
      state.formOpen = action.payload;
    },
    setResponse: (state, action) => {
      state.response = action.payload;
    },
    setError: (state, action) => {
      state.communicatorError = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTools.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTools.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(fetchTools.rejected, (state) => {
        state.error = 'Could not get tools';
        state.loading = false;
      });
  },
});

export const {
  reset,
  setCommunicatorLoading,
  setPrompt,
  setResponse,
  setFormOpen,
  resetCommunicator,
  setError, // New action for setting communicator errors
} = tools.actions;

export default tools.reducer;
