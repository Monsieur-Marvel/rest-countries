import { create } from "zustand"

export const useFilterStore = create((set) => ({
  search: "",
  region: "",

  setSearch: (value) => set({ search: value }),
  setRegion: (value) => set({ region: value }),
}))