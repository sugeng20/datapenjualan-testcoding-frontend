import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Type {
  id: string;
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

export const fetchTypes = createAsyncThunk(
  "types/fetchTypes",
  async (page: number, { getState }) => {
    const { itemsPerPage } = (getState() as { types: typeState }).types;
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BACKEND}/type?page=${page}&limit=${itemsPerPage}`
    );
    const json = await response.json();
    if (json.status === "success") {
      return {
        data: json.data.data,
        total: json.data.total,
      };
    }
    throw new Error(json.message);
  }
);

export const addToType = createAsyncThunk(
  "types/addToType",
  async (typeData: { type: string }, { getState }) => {
    const formData = new FormData();
    formData.append("type", typeData.type);

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BACKEND}/type`,
      {
        method: "POST",
        body: formData,
      }
    );

    const json = await response.json();
    if (json.status === "success") {
      return json.data;
    }
    throw new Error(json.message);
  }
);

export const fetchTypeById = createAsyncThunk(
  "types/fetchTypeById",
  async (id: string) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BACKEND}/type/${id}`
    );
    const json = await response.json();
    if (json.status === "success") {
      return json.data;
    }
    throw new Error(json.message);
  }
);

export const updateType = createAsyncThunk(
  "types/updateType",
  async ({ id, type }: { id: string; type: string }) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BACKEND}/type/${id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type }),
      }
    );
    const json = await response.json();
    if (json.status === "success") {
      return json.data;
    }
    throw new Error(json.message);
  }
);

export const deleteType = createAsyncThunk(
  "types/deleteType",
  async (id: string, { dispatch, getState }) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BACKEND}/type/${id}`,
      {
        method: "DELETE",
      }
    );
    const json = await response.json();
    if (json.status === "success") {
      const { currentPage } = (getState() as { items: typeState }).items;
      dispatch(fetchTypes(currentPage));
      return id;
    }
    throw new Error(json.message);
  }
);

const typeSlice = createSlice({
  name: "types",
  initialState,
  reducers: {
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTypes.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTypes.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
        state.totalPages = Math.ceil(action.payload.total / state.itemsPerPage);
      })
      .addCase(fetchTypes.rejected, (state) => {
        state.loading = false;
      })
      .addCase(addToType.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToType.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(addToType.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to add type";
      })
      .addCase(fetchTypeById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTypeById.fulfilled, (state, action) => {
        state.loading = false;
        state.type = action.payload.type;
      })
      .addCase(fetchTypeById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Error";
      })
      .addCase(updateType.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateType.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateType.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Error";
      })
      .addCase(deleteType.fulfilled, (state, action) => {
        state.data = state.data.filter((type) => type.id !== action.payload);
      });
  },
});

export const { setCurrentPage } = typeSlice.actions;
export default typeSlice.reducer;
