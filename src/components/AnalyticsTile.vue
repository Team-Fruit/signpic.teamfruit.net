<template>
  <b-card>
    <p class="title">{{ title }}</p>
    <p class="subtitle">{{ description }}</p>
    <p class="text">{{ value | numfilter }}</p>
  </b-card>
</template>

<script>
export default {
  name: 'AnalyticsTile',
  props: {
    title: String,
    description: String,
    value: [String, Number]
  },
  filters: {
    numfilter: value => {
      if (typeof value === 'string') {
        return value
      }
      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    }
  }
}
</script>

<style scoped>
p {
  margin: 0;
}

.card {
  width: 255px;
  max-width: 255px;
  height: 147px;
  box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.1),
    0 2px 2px -2px rgba(0, 0, 0, 0.02), 0 1px 4px 0 rgba(0, 0, 0, 0.04);
}

.title {
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
}

.subtitle {
  color: #6e6779;
  font-weight: 400;
  font-size: 14px;
  line-height: 21px;
}

.text {
  padding-top: 20px;
  color: #6441a4;
  font-weight: 600;
  font-size: 28px;
}
</style>
