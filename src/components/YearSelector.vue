<template>
  <div class="year-selector">
    <div class="year-wrapper" v-for="(year, index) in yearsRange" :key="year">
      <Year
        :year="year"
        :disabled="index === 0 || index === yearsRange.length - 1"
      />
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import Year from './Year.vue';

export default {
  name: 'YearSelector',
  components: {
    Year,
  },
  data() {
    return {};
  },
  computed: {
    ...mapState(['visibleYear', 'yearsRange']),
  },
  methods: {
    ...mapMutations(['setVisibleYear', 'switchMode']),
  },
};
</script>

<style lang="scss" scoped>
.year-selector {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.year-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 0 0 calc(100% / 4);
}
</style>
