import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    daysOfCalendar: 42,
    weekdays: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
    monthNames: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    visibleMonth: 0,
    visibleYear: 2009,
    today: new Date(),
    selectedDate: new Date(),
  },
  getters: {
    currentYear(state) {
      return state.today.getFullYear();
    },
    currentMonth(state) {
      return state.today.getMonth();
    },
    currentDate(state) {
      return state.today.getDate();
    },
  },
  mutations: {
    setVisibleMonth(state, month) {
      state.visibleMonth = month;
    },
    setVisibleYear(state, year) {
      state.visibleYear = year;
    },
    selectDate(state, date) {
      state.selectedDate = new Date(date);
    },
  },
  actions: {

  },
});
