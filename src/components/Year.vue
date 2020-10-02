<template>
  <div
    class="year"
    :class="{
      'year--disabled': disabled,
      'year--is-selected': isSelected,
    }"
    @click="
      disabled ? '' : selectYear(year);
      switchMode('day');
    "
  >
    {{ year }}
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex';

export default {
  name: 'Year',
  data() {
    return {};
  },
  props: {
    year: {
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
    isSelected() {
      return this.disabled ? false : this.year === this.visibleYear;
    },
  },
  methods: {
    ...mapMutations(['selectYear', 'switchMode']),
  },
  created() {},
};
</script>

<style lang="scss" scoped>
.year {
  margin: 2em 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 8vw;
  height: 8vw;
  border-radius: 50%;
  cursor: pointer;

  &--disabled {
    color: gray;
  }

  &--is-selected {
    color: #ffffff;
    background: #db3d44;
  }
}
</style>
