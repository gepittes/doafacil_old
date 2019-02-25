import * as actions from './actions';
import * as getters from './getters';
import mutations from './mutations';
import state from './state';
import { userService } from './service';

export default {
    namespaced: true,
    actions,
    state,
    getters,
    mutations,
    userService,
};
