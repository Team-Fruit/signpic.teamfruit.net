<template>
  <b-container>
    <b-row>
      <b-col sm="4">
        <img src="../assets/logo.png" class="img-fluid mx-auto d-block" />
      </b-col>
      <b-col sm="8" class="heading">
        <h1>SignPicture</h1>
        <h2>The sign tells us how beautiful it is!</h2>
        <h4>This client-sided mod invites you into a world of image, in both singleplayer and multiplayer. It works out of the box, and will show you a new wonderful world!</h4>
        <ul class="buttons">
          <li><b-button size="lg" variant="warning" href="https://minecraft.curseforge.com/projects/signpicture">Download on CurseForge</b-button></li>
          <li><b-button size="lg" variant="dark" href="https://github.com/Team-Fruit/SignPicture"><font-awesome-icon :icon="{ prefix: 'fab', iconName: 'github' }" /> GitHub</b-button></li>
        </ul>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: 'home',
  title: 'SignPicture'
}
</script>

<style scoped>
h1 {
  font-size: 64px;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

.heading {
    font-family: 'Rajdhani', sans-serif;
}

.description {
  font-size: 24px;
  list-style: none;
}

.buttons {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  line-height: 64px;
}
</style>
