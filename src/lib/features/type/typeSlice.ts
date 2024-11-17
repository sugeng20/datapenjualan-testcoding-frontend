import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Type {
  id: string;
  type: string;
}

interface TypeRequest {
  type: string;
}

interface typeState {
  data: Type[];
  type: string;
  loading: boolean;
  error: string | null;
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
}

const initialState: typeState = {
  data: [],
  type: "",
  error: null,
  loading: false,
  currentPage: 1,
  totalPages: 1,
  itemsPerPage: 10,
};

const typeSlice = createSlice({
  name: "types",
  initialState,
  reducers: {
    fetchTypesRequest: (state, action: PayloadAction<number>) => {
      state.loading = true;
    },
    fetchTypesSuccess: (
      state,
      action: PayloadAction<{
        data: { id: string; type: string }[];
        totalPages: number;
      }>
    ) => {
      state.data = action.payload.data;
      state.totalPages = action.payload.totalPages;
      state.loading = false;
    },
    fetchTypesFailure: (state) => {
      state.loading = false;
    },
    fetchTypeByIdRequest: (state, action: PayloadAction<string>) => {
      state.loading = true;
      state.error = null;
    },
    fetchTypeByIdSuccess: (state, action: PayloadAction<string>) => {
      state.type = action.payload;
      state.loading = false;
    },
    fetchTypeByIdFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    addTypeRequest: (state, action: PayloadAction<TypeRequest>) => {
      state.loading = true;
      state.error = null;
    },
    addTypeSuccess: (state, action: PayloadAction<Type>) => {
      state.data.push(action.payload);
      state.loading = false;
    },
    addTypeFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateTypeRequest: (
      state,
      action: PayloadAction<{ id: string; type: string }>
    ) => {
      state.loading = true;
      state.error = null;
    },
    updateTypeSuccess: (
      state,
      action: PayloadAction<{ id: string; type: string }>
    ) => {
      const index = state.data.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index !== -1) {
        state.data[index].type = action.payload.type;
      }
      state.loading = false;
    },
    updateTypeFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteTypeRequest: (state, action: PayloadAction<string>) => {
      state.loading = true;
    },
    deleteTypeSuccess: (state, action: PayloadAction<string>) => {
      state.data = state.data.filter((type) => type.id !== action.payload);
      state.loading = false;
    },
    deleteTypeFailure: (state) => {
      state.loading = false;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
  },
});

export const {
  setCurrentPage,
  fetchTypesRequest,
  fetchTypesSuccess,
  fetchTypesFailure,
  addTypeRequest,
  addTypeSuccess,
  addTypeFailure,
  fetchTypeByIdRequest,
  fetchTypeByIdSuccess,
  fetchTypeByIdFailure,
  updateTypeRequest,
  updateTypeSuccess,
  updateTypeFailure,
  deleteTypeRequest,
  deleteTypeSuccess,
  deleteTypeFailure,
} = typeSlice.actions;
export default typeSlice.reducer;
