import * as actions from './actions';
import * as getters from './getters';
import * as mutations from "./mutations";
import * as state from "./state";

export default {
    namespaced: true,
    actions,
    state,
    getters,
    mutations
}
