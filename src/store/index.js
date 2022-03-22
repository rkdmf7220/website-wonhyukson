import {createStore} from 'vuex'
import axios from "axios";
import Constants from "../contants/constants";

export default createStore({
    state: {
        lang: Constants.lang.en,
        worksList: [],
        cv: {}
    },
    mutations: {
        lang(state, lang) {
            state.lang = lang;
        },
        worksList(state, list) {
            state.worksList = list;
        },
        cv(state, data) {
            state.cv = data
        }
    },
    actions: {
        setLang({commit, state, dispatch}, lang) {
            if(lang !== state.lang) {
                commit('lang', lang);
                dispatch('loadWorksList');
                dispatch('cv');
            }
        },
        loadWorksList({commit, state}) {
            console.log('<<<<<<<<<<<<<', "../sample/works-list-en.json")
            axios.get("../sample/" + state.lang + "/data-result.json")
                .then(response => {
                    console.log('response 내용은', response);
                    if (response.statusText === "OK") {
                        // this.listData = response.data;
                        // this.$store.dispatch('updateWorksList', {list: response.data})

                        commit('worksList', response.data)
                    } else {
                        // TODO: error handling.
                    }
                }).catch(error => {
                console.log('error', error);
                // TODO: error handling.
            });
        },
        loadCv({commit, state}) {
            axios.get("../sample/" + state.lang + "/cv.json")
                .then(response => {
                    console.log('response:', response)
                    commit('cv', response.data)

                })
        }
    },
    modules: {}
})
