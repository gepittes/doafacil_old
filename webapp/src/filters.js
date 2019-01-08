import moment from 'moment'

export default {
  filters: {
    formatDate: function(value) {
      if (value) {
        return moment(String(value)).format('MM/DD/YYYY hh:mm')
      }
    },
  },
  create: function(Vue) {
    Object.keys(this.filters).forEach(function (filter,k) {
      Vue.filter(filter, this.filters[filter])
    }.bind(this))
  }
}
