import { createSlice } from "@reduxjs/toolkit";
import widgetsData from "@/data/widgetsData.json";

const generateId = () => new Date().getTime();

const categorySlice = createSlice({
  name: "categories",
  initialState: {
    categories: widgetsData.categories,
    isWidgetModalOpen: false,
    isCategoryModalOpen: false,
    newWidgetName: "",
    searchQuery: "",
    selectedCategoryId: null,
    newCategoryName: "",
  },
  reducers: {
    setWidgetModalOpen: (state, action) => {
      state.isWidgetModalOpen = action.payload;
    },

    setCategoryModalOpen: (state, action) => {
      state.isCategoryModalOpen = action.payload;
    },

    setNewWidgetName(state, action) {
      state.newWidgetName = action.payload;
    },

    selectCategory(state, action) {
      state.selectedCategoryId = action.payload;
    },

    addWidget(state) {
      const category = state.categories.find(
        (cat) => cat.id === state.selectedCategoryId
      );
      if (category) {
        const newWidget = {
          title: state.newWidgetName || "New Widget",
          type: "",
          data: {},
          id: generateId(),
        };
        category.widgets.push(newWidget);
        state.isWidgetModalOpen = false;
        state.newWidgetName = "";
        state.selectedCategoryId = null;
      }
    },

    deleteWidget(state, action) {
      const { categoryId, widgetId } = action.payload;
      const category = state.categories.find((cat) => cat.id === categoryId);
      if (category) {
        category.widgets = category.widgets.filter(
          (widget) => widget.id !== widgetId
        );
      }
    },

    setNewCategoryName(state, action) {
      state.newCategoryName = action.payload;
    },

    addCategory(state) {
      const newCategory = {
        name: state.newCategoryName || "New Category",
        id: generateId(),
        widgets: [],
      };
      state.categories.unshift(newCategory);
      state.isCategoryModalOpen = false;
      state.newCategoryName = "";
    },

    deleteCategory(state, action) {
      const categoryId = action.payload;
      state.categories = state.categories.filter(
        (cat) => cat.id !== categoryId
      );
    },

    setSearchQuery(state, action) {
      state.searchQuery = action.payload;
    },
    toggleWidgetVisibility: (state, action) => {
      const { categoryId, widgetId } = action.payload;
      const category = state.categories.find((cat) => cat.id === categoryId);
      if (category) {
        const widget = category.widgets.find((wid) => wid.id === widgetId);
        if (widget) {
          widget.hidden = !widget.hidden;
        }
      }
    },
  },
});

export const {
  setCategoryModalOpen,
  setWidgetModalOpen,
  setNewWidgetName,
  selectCategory,
  addWidget,
  deleteWidget,
  setNewCategoryName,
  addCategory,
  deleteCategory,
  setSearchQuery,
  toggleWidgetVisibility,
} = categorySlice.actions;

export default categorySlice.reducer;
