<template>
    <b-container>
        <h2 v-if="realtime">Real-time Analytics (WIP)</h2>
        <h2 v-else>Analytics (WIP)</h2>
        <section v-if="errored">
          <p>We're sorry, we're not able to retrieve this information at the moment, please try back later</p>
        </section>
        <section v-else>
          <div v-if="loading">Loading...</div>
          <div v-else class="row justify-content-around">
            <analytics-tile title="User Count" description="Since November 2, 2018" v-bind:value="usercount"></analytics-tile>
            <analytics-tile title="Play Count" description="Since November 6, 2018" v-bind:value="playcount"></analytics-tile>
            <analytics-tile title="Most Used MC Version" description="Since November 6, 2018" v-bind:value="mcversion"></analytics-tile>
            <analytics-tile title="Most Used Mod Version" description="Since November 6, 2018" v-bind:value="modversion"></analytics-tile>
          </div>
        </section>
    </b-container>
</template>

<script>
import axios from 'axios'
import AnalyticsTile from './AnalyticsTile.vue'

export default {
  name: 'Analytics',
  title: 'Analytics - SignPicture',
  components: {
    'analytics-tile': AnalyticsTile
  },
  data () {
    return {
      loading: true,
      errored: false,
      realtime: false,
      playcount: null,
      usercount: null,
      mcversion: null,
      modversion: null
    }
  },
  mounted () {
    axios
      .get('https://signpic.teamfruit.net/api/analytics')
      .then(response => {
        this.usercount = response.data.usercount
        this.playcount = response.data.playcount
        this.mcversion = response.data.mcversion
        this.modversion = response.data.modversion
        const ws = new WebSocket('wss://signpic.teamfruit.net/api/ws')
        ws.onopen = () => {
          this.realtime = true
        }
        ws.onerror = event => {
          this.realtime = false
          this.errored = true
        }
        ws.onmessage = event => {
          const data = JSON.parse(event.data)
          this.usercount = data.usercount
          this.playcount = data.playcount
          this.mcversion = data.mcversion
          this.modversion = data.modversion
        }
      })
      .catch(error => {
        console.log(error)
        this.errored = true
      })
      .finally(() => (this.loading = false))
  }
}
</script>

<style>

</style>
