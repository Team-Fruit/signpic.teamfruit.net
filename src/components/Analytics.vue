<template>
    <b-container>
        <h2 v-if="realtime">Real-time Analytics (WIP)</h2>
        <h2 v-else>Analytics (WIP)</h2>
        <section v-if="errored">
          <p>We're sorry, we're not able to retrieve this information at the moment, please try back later</p>
        </section>
        <section v-else>
          <div v-if="loading">Loading...</div>
          <section v-else>
            <div class="row justify-content-around">
              <analytics-tile title="User Count" description="Since November 2, 2018" v-bind:value="usercount"></analytics-tile>
              <analytics-tile title="Play Count" description="Since November 6, 2018" v-bind:value="playcount"></analytics-tile>
              <analytics-tile title="Most Used MC Version" description="Since November 6, 2018" v-bind:value="mcversion"></analytics-tile>
              <analytics-tile title="Most Used Mod Version" description="Since November 6, 2018" v-bind:value="modversion"></analytics-tile>
            </div>
            <bar-chart id="chart" :chartData="chartData" :options="options" :height=300></bar-chart>
          </section>
        </section>
    </b-container>
</template>

<script>
import axios from 'axios'
import AnalyticsTile from './AnalyticsTile.vue'
import BarChart from './BarChart.vue'

export default {
  name: 'Analytics',
  title: 'Analytics - SignPicture',
  components: {
    'analytics-tile': AnalyticsTile,
    'bar-chart': BarChart
  },
  data () {
    return {
      loading: true,
      errored: false,
      realtime: false,
      playcount: null,
      usercount: null,
      mcversion: null,
      modversion: null,
      chartData: {
        datasets: [{
          backgroundColor: 'rgba(0,192,255,0.5)',
          borderColor: 'rgba(0,192,255,0.5)',
          yAxisID: 'y-axes-1',
          label: 'New unique user per day',
          data: []
        },
        {
          backgroundColor: 'rgba(136,0,153,0.5)',
          borderColor: 'rgba(136,0,153,0.3)',
          yAxisID: 'y-axes-2',
          type: 'line',
          fill: false,
          label: 'Total unique user',
          data: []
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        elements: {
          line: {
            tension: 0
          }
        },
        scales: {
          xAxes: [{
            type: 'time',
            time: {
              displayFormats: {
                quarter: 'yyyy-hh-mm'
              }
            }
          }],
          yAxes: [{
            id: 'y-axes-1',
            type: 'linear',
            ticks: {
              beginAtZero: true
            }
          },
          {
            id: 'y-axes-2',
            type: 'linear',
            position: 'right',
            ticks: {
              beginAtZero: false
            }
          }]
        }
      }
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
        for (let line of response.data.user) {
          this.chartData.datasets[0].data.push({t: line.date, y: line.count})
          this.chartData.datasets[1].data.push({t: line.date, y: line.accum})
        }
        const ws = new WebSocket('wss://signpic.teamfruit.net/api/ws')
        ws.onopen = () => {
          this.realtime = true
          this.loading = false
          console.log('Connected')
        }
        ws.onclose = (e) => {
          this.realtime = false
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
        this.loading = false
      })
      // .finally(() => (this.loading = false))
  }
}
</script>

<style scoped>
#chart {
  margin-top: 1em;
}
</style>
