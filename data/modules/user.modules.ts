const state = () => ({
  user: null,
});

const getters = {};

const actions: any = {};

const persisted = {
  pick: ["user"],
  storage: piniaPluginPersistedstate.localStorage(),
};

export const useUserStore = defineStore("user-store", {
  state,
  getters,
  actions,
  persisted,
});
