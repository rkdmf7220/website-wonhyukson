import {createStore} from 'vuex'
import axios from "axios";

export default createStore({
    state: {
        worksList: []
    },
    mutations: {
        worksList(state, list) {
            state.worksList = list;
        }
    },
    actions: {
        // updateWorksList({commit}, payload) {
        //   // console.log('commit은', commit)
        //   console.log('payload는', payload)
        //   commit('worksList', payload.list)
        // },
        loadWorksList({commit}) {
            axios.get("../mockup/data-result.json")
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
        }
    },
    modules: {}
})
