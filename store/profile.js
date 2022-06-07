import Vue from 'vue'

export const state = () => ({
  user: {},
  loading: false,
  currency: 'GBP'
})

export const mutations = {
  SET_PROFILE (state, user) {
    state.user = {
      ...user
    }
  },
  SET_STATE (state, data) {
    Object.keys(data).forEach(key => (state[key] = data[key]))
  },
  SET_USER (state, user) {
    this.$auth.setUser(user)
    Vue.set(state, 'user', user)
  }
}

export const actions = {
  clearGetWelpUser({ commit, getters }) {
    commit("SET_USER", {});
  },
  async updateProfile({ dispatch, commit }, payload) {
    const res = await this.$axios.$put(
      `${process.env.BASEURL_HOST}/profile`,
      payload
    );
    await dispatch("getUserProfile");
    return res.data;
  },
  async getUserProfile({ commit }) {
    const res = await this.$axios.$get(`${process.env.BASEURL_HOST}/profile`);
    if (res.status === "success") {
      commit("SET_USER", res.data);
      return res.data;
    }
    return res;
  },
  uploadProfileImage({ commit }, payload) {
    const formdata = new FormData();
    formdata.append("file", payload);
    return this.$axios
      .$patch(`${process.env.BASEURL_HOST}/profile/upload-image`, formdata, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((response) => {
        commit("SET_USER", response.data);
        return response;
      });
  },
  async getServices({ commit }, payload) {
    return await this.$axios.$get(
      `${process.env.BASEURL_HOST}/profile/services`
    );
  },
  async deleteService({ dispatch, commit }, serviceId) {
    await this.$axios.$delete(
      `${process.env.BASEURL_HOST}/profile/services/${serviceId}`
    );
    await dispatch("getUserProfile");
  },
  // reporting should have its own store
  async clientReportSummary() {
    // day, month, week quarter
    const res = await this.$axios.$get(
      `${process.env.REPORTING_HOST}/reporting/client/summary?q=month`
    );
    return res.data[0];
  },
  async clientReport() {},

  userFinancials() {
    return {};
  },
  async reportPreference() {},
};
export const getters = {
  getLoading: state => state.loading,
  getUser: state => state.user,
  getServices: state => state.user.services
}
