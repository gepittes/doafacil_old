import moment from 'moment';

export default {
    filters: {
        formatDate(value) {
            if (value) {
                return moment(String(value)).format('MM/DD/YYYY hh:mm');
            }
            return false;
        },
    },
    create(Vue) {
        Object.keys(this.filters).forEach((filter) => {
            Vue.filter(filter, this.filters[filter]);
        });
    },
};
