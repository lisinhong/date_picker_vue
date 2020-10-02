<template>
  <div class="date-picker">
    <h1>Select or type one date!</h1>
    <div class="input-wrapper">
      <input
        id="input-date"
        type="text"
        placeholder="YYYY-MM-DD"
        v-model="inputDate"
        @input="trySelectDate"
        @change="tryRevertDate"
        @focus="showCalendar"
      />
      <font-awesome-icon icon="calendar-alt" />
    </div>
    <Calendar v-if="shouldCalendarShow" />
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex';
import Calendar from './Calendar.vue';

export default {
  name: 'DatePicker',
  components: {
    Calendar,
  },
  data() {
    return {
      inputDate: '',
    };
  },
  computed: {
    ...mapState(['selectedDate', 'shouldCalendarShow']),
    ...mapGetters(['currentYear', 'currentMonth', 'currentDate']),
  },
  methods: {
    ...mapMutations([
      'selectDate',
      'setVisibleYear',
      'setVisibleMonth',
      'showCalendar',
    ]),
    dateFormatter(data) {
      const year = data.getFullYear().toString();
      const month = data.getMonth() + 1 > 9
        ? (data.getMonth() + 1).toString()
        : `0${(data.getMonth() + 1).toString()}`;
      const date = data.getDate() > 9
        ? data.getDate().toString()
        : `0${data.getDate().toString()}`;
      return `${year}-${month}-${date}`;
    },
    checkIsDate() {
      return (
        new Date(this.inputDate).toString() !== 'Invalid Date'
        && this.inputDate.length === 10
      );
    },
    trySelectDate() {
      if (!this.checkIsDate()) return;
      this.selectDate(new Date(this.inputDate).setHours(0, 0, 0));
    },
    tryRevertDate() {
      if (this.checkIsDate()) return;
      this.inputDate = this.dateFormatter(this.selectedDate);
    },
  },
  created() {
    this.selectDate(
      new Date(this.currentYear, this.currentMonth, this.currentDate),
    );
    this.inputDate = this.dateFormatter(this.selectedDate);
  },
  watch: {
    inputDate(inputDate) {
      const year = new Date(inputDate).getFullYear();
      const month = new Date(inputDate).getMonth();

      this.setVisibleYear(year);
      this.setVisibleMonth(month);
    },
    selectedDate(selectedDate) {
      this.inputDate = this.dateFormatter(selectedDate);
    },
  },
};
</script>

<style lang="scss" scoped>
.date-picker {
  margin: 0 auto;
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
  max-width: 50vw;

  @media (min-width: 601px) and (max-width: 768px) {
    max-width: 80vw;
  }

  @media (max-width: 600px) {
    max-width: 90vw;
  }

  h1 {
    margin: 3.6vw 0;
    font-size: 2em;

    @media (max-width: 480px) {
      font-size: 1.5em;
    }
  }
}
.input-wrapper {
  position: relative;
  width: 50%;

  @media (max-width: 600px) {
    width: 60%;
  }

  input {
    display: flex;
    align-items: center;
    border: 1px solid rgba(0, 0, 0, 0.2);
    font-size: 1em;
    padding: 1vw;
    padding-left: calc(1vw + 1em + 1vw);
    border-radius: 8px;
    width: 100%;

    &:focus {
      & + svg {
        color: rgba(0, 0, 0, 0.6);
      }
    }
  }

  svg {
    position: absolute;
    width: 1em;
    height: 1em;
    top: 50%;
    left: 1.2vw;
    transform: translateY(-50%);
    color: rgba(0, 0, 0, 0.4);
    transition: 0.2s;
  }
}
</style>
