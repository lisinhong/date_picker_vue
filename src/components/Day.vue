<template>
  <div
    class="day"
    :class="{
      'day--is-disabled': disabled,
      'day--is-today': isToday,
      'day--is-selected': isSelected,
    }"
    @click="handleClick"
  >
    {{ day }}
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex';

export default {
  name: 'Day',
  data() {
    return {};
  },
  props: {
    day: {
      type: Number,
      required: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ...mapState(['visibleMonth', 'visibleYear', 'selectedDate']),
    ...mapGetters(['currentYear', 'currentMonth', 'currentDate']),
    dayObject() {
      return new Date(this.visibleYear, this.visibleMonth, this.day);
    },
    isToday() {
      return this.disabled
        ? false
        : new Date(this.visibleYear, this.visibleMonth, this.day).getTime()
            === new Date(
              this.currentYear,
              this.currentMonth,
              this.currentDate,
            ).getTime();
    },
    isSelected() {
      if (this.disabled) return false;
      return this.dayObject.getTime() === this.selectedDate.getTime();
    },
  },
  methods: {
    ...mapMutations([
      'selectDate',
      'hideCalendar',
      'setVisibleYear',
      'setVisibleMonth',
      'setYearsRange',
    ]),
    handleClick() {
      if (this.disabled) return;
      const year = new Date(this.dayObject).getFullYear();
      const month = new Date(this.dayObject).getMonth();

      this.setVisibleYear(year);
      this.setVisibleMonth(month);
      this.selectDate(this.dayObject);
      setTimeout(() => {
        document.querySelector('.calendar').classList.remove('is-open');
        this.hideCalendar();
      }, 200);
    },
  },
};
</script>

<style lang="scss" scoped>
.day {
  margin: 0.2em 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 3vw;
  height: 3vw;
  border-radius: 50%;
  cursor: pointer;
  transition: 0.2s;

  &--is-disabled {
    color: gray;
    cursor: not-allowed;
  }

  &--is-today {
    color: #db3d44;
  }

  &--is-selected {
    color: #ffffff;
    background: #db3d44;
  }

  &:not(&--is-disabled):not(&--is-selected) {
    &:hover {
      background: rgba(#db3d44, 0.2);
    }
  }

  @media (min-width: 601px) and (max-width: 768px) {
    width: 5vw;
    height: 5vw;
  }

  @media (min-width: 401px) and (max-width: 600px) {
    width: 6vw;
    height: 6vw;
  }

  @media (max-width: 400px) {
    width: 8vw;
    height: 8vw;
  }
}
</style>
