<template>
  <div
    class="year"
    :class="{
      'year--is-disabled': disabled,
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
  width: 4vw;
  height: 4vw;
  border-radius: 50%;
  cursor: pointer;
  transition: 0.2s;

  &--is-disabled {
    color: gray;
    cursor: not-allowed;
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
    width: 6vw;
    height: 6vw;
  }

  @media (min-width: 401px) and (max-width: 600px) {
    width: 8vw;
    height: 8vw;
  }

  @media (max-width: 400px) {
    width: 10vw;
    height: 10vw;
  }
}
</style>
