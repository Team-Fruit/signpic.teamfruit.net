<template>
    <b-container>
        <b-card>
            <p class="title">Play Count</p>
            <p class="subtitle">Since November 6, 2018</p>
            <p class="text">{{ playcount }}</p>
        </b-card>
    </b-container>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Analytics',
  data () {
    return {
      playcount: null
    }
  },
  mounted () {
    axios
      .get('https://signpic.teamfruit.net/api/playcount')
      .then(response => (this.playcount = response.data.count.toLocaleString()))
  }
}
</script>

<style scoped>
p {
    margin: 0;
}

.card {
    width: 255px;
    height: 147px;
    box-shadow: 0 2px 4px -1px rgba(0,0,0,.1),0 2px 2px -2px rgba(0,0,0,.02),0 1px 4px 0 rgba(0,0,0,.04);
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
