import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Item {
  id: string;
  name: string;
  stock: number;
  type: {
    type: string;
  };
}

interface ItemState {
  data: Item[];
  loading: boolean;
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
}

const initialState: ItemState = {
  data: [],
  loading: false,
  currentPage: 1,
  totalPages: 1,
  itemsPerPage: 10,
};

export const fetchItems = createAsyncThunk(
  "items/fetchItems",
  async (page: number, { getState }) => {
    const { itemsPerPage } = (getState() as { items: ItemState }).items;
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BACKEND}/item?page=${page}&limit=${itemsPerPage}`
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

export const deleteItem = createAsyncThunk(
  "items/deleteItem",
  async (id: string, { dispatch, getState }) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BACKEND}/item/${id}`,
      {
        method: "DELETE",
      }
    );
    const json = await response.json();
    if (json.status === "success") {
      const { currentPage } = (getState() as { items: ItemState }).items;
      dispatch(fetchItems(currentPage));
      return id;
    }
    throw new Error(json.message);
  }
);

const itemSlice = createSlice({
  name: "items",
  initialState,
  reducers: {
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchItems.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
        state.totalPages = Math.ceil(action.payload.total / state.itemsPerPage);
      })
      .addCase(fetchItems.rejected, (state) => {
        state.loading = false;
      })
      .addCase(deleteItem.fulfilled, (state, action) => {
        state.data = state.data.filter((item) => item.id !== action.payload);
      });
  },
});

export const { setCurrentPage } = itemSlice.actions;
export default itemSlice.reducer;
