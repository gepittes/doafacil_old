import moment from "moment";

export default {
  filters: {
    formatDate(value) {
      if (value) {
        return moment(String(value)).format("MM/DD/YYYY hh:mm");
      }
      return false;
    }
  },
  create(Vue) {
    Object.keys(this.filters).forEach(filter => {
      Vue.filter(filter, this.filters[filter]);
    });
  }
};

export const formatDateDMY = date => {
  let date_parts = date.match(/^(\d{4})-(\d+)-(\d+)(.*)$/);
  let year;
  let month;
  let day;

  if (date_parts) {
    year = ("00" + date_parts[1]).slice(-4);
    month = ("0" + date_parts[2]).slice(-2);
    day = ("0" + date_parts[3]).slice(-2);

    return month + "-" + day + "-" + year + date_parts[4];
  } else {
    return date;
  }
};
