import * as actions from './actions';
import * as getters from './getters';
import * as fakeBackend from './fake-backend';
import {mutations, state} from "./mutations";

export default {
    namespaced: true,
    actions,
    state,
    getters,
    mutations,
    fakeBackend
}
