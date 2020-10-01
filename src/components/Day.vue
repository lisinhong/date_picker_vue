<template>
  <div
    class="day"
    :class="{
      'day--disabled': disabled,
      'day--is-today': isToday,
      'day--is-selected': isSelected,
    }"
    @click="disabled ? '' : selectDate(dayObject)"
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
      if (this.disabled) return false;
      return (
        new Date(this.visibleYear, this.visibleMonth, this.day).getTime()
        === new Date(
          this.currentYear,
          this.currentMonth,
          this.currentDate,
        ).getTime()
      );
    },
    isSelected() {
      if (this.disabled) return false;
      return this.dayObject.getTime() === this.selectedDate.getTime();
    },
  },
  methods: {
    ...mapMutations(['selectDate']),
  },
  created() {},
};
</script>

<style lang="scss" scoped>
.day {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 6vw;
  height: 6vw;
  border-radius: 50%;
  cursor: pointer;

  &--disabled {
    color: gray;
  }

  &--is-today {
    color: #db3d44;
  }

  &--is-selected {
    color: #ffffff;
    background: #db3d44;
  }
}
</style>
