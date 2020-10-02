<template>
  <div class="date-picker">
    <h1>Select or type one date!</h1>
    <div class="input-wrapper">
      <input
        type="text"
        placeholder="YYYY-MM-DD"
        v-model="inputDate"
        @input="trySelectDate"
        @change="tryRevertDate"
      />
      <font-awesome-icon icon="calendar-alt" />
    </div>
    <Calendar />
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
    ...mapState(['selectedDate']),
    ...mapGetters(['currentYear', 'currentMonth', 'currentDate']),
  },
  methods: {
    ...mapMutations(['selectDate', 'setVisibleYear', 'setVisibleMonth']),
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
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
}
.input-wrapper {
  position: relative;

  input {
    border: 1px solid rgba(0, 0, 0, 0.4);
    font-size: 14px;
    padding: 8px;
    padding-left: calc(8px + 14px + 8px);
    border-radius: 8px;
    outline: none;

    &:focus {
      & + svg {
        color: rgba(0, 0, 0, 0.6);
      }
    }
  }

  svg {
    position: absolute;
    width: 14px;
    height: 14px;
    top: 50%;
    left: 8px;
    transform: translateY(-50%);
    color: rgba(0, 0, 0, 0.4);
    transition: 0.2s;
  }
}
</style>
