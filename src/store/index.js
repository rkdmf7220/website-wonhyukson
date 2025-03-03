import { createStore } from "vuex";
import axios from "axios";
import Constants from "../contants/constants";

export default createStore({
  state: {
    lang: Constants.lang.en,
    worksList: [],
    cv: {},
    review: [],
    filterList: {},
  },
  mutations: {
    lang(state, lang) {
      state.lang = lang;
    },
    worksList(state, list) {
      state.worksList = list;
    },
    cv(state, data) {
      state.cv = data;
    },
    review(state, data) {
      state.review = data;
    },
    filterList(state, data) {
      state.filterList = data;
    },
  },
  actions: {
    /**
     *
     * @param commit
     * @param state
     * @param dispatch
     * @param lang
     */
    setLang({ commit, state, dispatch }, lang) {
      if (lang !== state.lang) {
        commit("lang", lang);
        dispatch("loadWorksList");
        dispatch("loadCv");
        dispatch("loadReview");
        dispatch("loadFilterList");
      }
    },
    loadWorksList({ commit, state }) {
      return axios
        .get("../sample/" + state.lang + "/data-result.json")
        .then((response) => {
          if (response.statusText === "OK" || response.status === 200) {
            commit("worksList", response.data);
          } else {
            // TODO: error handling.
          }
        })
        .catch((error) => {
          console.log("error", error);
          // TODO: error handling.
        });
    },
    loadCv({ commit, state }) {
      axios
        .get("../sample/" + state.lang + "/cv.json")
        .then((response) => {
          if (response.statusText === "OK" || response.status === 200) {
            commit("cv", response.data);
          } else {
            // TODO: error handling.
          }
        })
        .catch((error) => {
          console.log("error", error);
        });
    },
    loadReview({ commit, state }) {
      axios
        .get("../sample/" + state.lang + "/review.json")
        .then((response) => {
          if (response.statusText === "OK" || response.status === 200) {
            commit("review", response.data);
          } else {
            //TODO: error handling
          }
        })
        .catch((error) => {
          console.log("error", error);
        });
    },
    loadFilterList({ commit, state }) {
      axios
        .get("../sample/" + state.lang + "/filter-list.json")
        .then((response) => {
          if (response.statusText === "OK" || response.status === 200) {
            commit("filterList", response.data);
          } else {
            //TODO: error handling
          }
        })
        .catch((error) => {
          console.log("error", error);
        });
    },
  },
  modules: {},
});
