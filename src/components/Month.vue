<template>
  <div
    class="month"
    :class="{ 'month--is-selected': isSelected }"
    @click="
      selectMonth(month);
      switchMode('year');
    "
  >
    {{ monthNames[month] }}
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
  name: 'Month',
  props: {
    month: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {};
  },
  computed: {
    ...mapState(['monthNames', 'visibleMonth']),
    isSelected() {
      return this.month === this.visibleMonth;
    },
  },
  methods: {
    ...mapMutations(['selectMonth', 'switchMode']),
  },
};
</script>

<style lang="scss" scoped>
.month {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 4vw;
  height: 4vw;
  border-radius: 50%;
  cursor: pointer;
  transition: 0.2s;

  &--is-selected {
    color: #ffffff;
    background: #db3d44;
  }

  &:not(&--is-selected) {
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
