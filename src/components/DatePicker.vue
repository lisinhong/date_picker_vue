<template>
  <div class="date-picker">
    <h1>Select or type one date!</h1>
    <div class="input-wrapper">
      <input type="text" placeholder="YYYY-MM-DD" />
      <font-awesome-icon icon="calendar-alt" />
    </div>
  </div>
</template>

<script>
import Calendar from './Calendar.vue';

export default {
  name: 'DatePicker',
  components: {
    Calendar,
  },
  data() {
    return {};
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
