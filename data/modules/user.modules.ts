import { defineStore } from "pinia";
const state = () => ({
  user: {},
  isAuthenticated: false,
});

const getters = {
  getUser: (state) => state.user,
  getUserRole: (state) => {
    return state.user.role || null;
  },
};

const actions: any = {};

const persist = {
  pick: ["user", "isAuthenticated"],
  // storage: piniaPluginPersistedstate.localStorage(),
};

export const useUserStore = defineStore("user-store", {
  state,
  getters,
  actions,
  persist,
});
