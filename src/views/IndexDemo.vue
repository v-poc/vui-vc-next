<template>
  <div class="nav-wrapper">
    <p class="title">vui</p>
    <p>[Examples]</p>
    <ul>
      <li>
        <router-link to="/skeleton-demo">Skeleton</router-link>
      </li>
      <li>
        <router-link to="/tag-demo">Tag</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'index-demo'
})
</script>

<style scoped>
.nav-wrapper {
  margin: 0 auto;
  padding: 0;
  font-size: 0.4rem;
  width: 6rem;
}

.nav-wrapper p {
  padding: 0.2rem 0;
  font-size: 0.3rem;
}

.nav-wrapper .title {
  margin-right: 0.2rem;
  text-transform: uppercase;
  font-size: 0.5rem;
  font-weight: bold;
}

.nav-wrapper ul {
  list-style-type: none;
}

.nav-wrapper a {
  font-weight: bold;
  font-size: 0.3rem;
  color: #2c3e50;
}

.nav-wrapper a.router-link-exact-active {
  color: #42b983;
}
</style>
