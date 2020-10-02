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
  width: 8vw;
  height: 8vw;
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
}
</style>
