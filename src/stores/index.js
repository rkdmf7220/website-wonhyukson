import axios from "axios";
import Constants from "../contants/constants";
import {defineStore} from "pinia";

export const useStore = defineStore('store', {
  state: () => ({
    lang: Constants.lang.en,
    worksList: [],
    cv: {},
    review: [],
    filterList: {},
    searchKeyword: '',
  }),
  getter: {},
  actions: {
    // mutations
    updateLang(lang) {
      this.lang = lang;
    },
    updateWorksList(list) {
      this.worksList = list;
    },
    updateCv(data) {
      this.cv = data;
    },
    updateReview(data) {
      this.review = data;
    },
    updateFilterList(data) {
      this.filterList = data;
    },
    updateSearchKeyword(text) {
      this.searchKeyword = text;
    },
    //actions
    setLang(lang) {
      if (lang !== this.lang) {
        this.updateLang(lang);
        this.loadWorksList();
        this.loadCv();
        this.loadReview();
        this.loadFilterList();
      }
    },
    loadWorksList() {
      axios
          .get("../sample/" + this.lang + "/data-result.json")
          .then((response) => {
            if (response.statusText === "OK" || response.status === 200) {
              this.updateWorksList(response.data);
            } else {
              // TODO: error handling.
            }
          })
          .catch((error) => {
            console.log("error", error);
            // TODO: error handling.
          });
    },
    loadCv() {
      axios
          .get("../sample/" + this.lang + "/cv.json")
          .then((response) => {
            if (response.statusText === "OK" || response.status === 200) {
              this.updateCv(response.data);
            } else {
              // TODO: error handling.
            }
          })
          .catch((error) => {
            console.log("error", error);
          });
    },
    loadReview() {
      axios
          .get("../sample/" + this.lang + "/review.json")
          .then((response) => {
            if (response.statusText === "OK" || response.status === 200) {
              this.updateReview(response.data);
            } else {
              //TODO: error handling
            }
          })
          .catch((error) => {
            console.log("error", error);
          });
    },
    loadFilterList() {
      axios
          .get("../sample/" + this.lang + "/filter-list.json")
          .then((response) => {
            if (response.statusText === "OK" || response.status === 200) {
              this.updateFilterList(response.data);
            } else {
              //TODO: error handling
            }
          })
          .catch((error) => {
            console.log("error", error);
          });
    },
  }
})