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

  &--is-selected {
    color: #ffffff;
    background: #db3d44;
  }
}
</style>
