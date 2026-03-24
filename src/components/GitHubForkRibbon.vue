<script setup lang="ts">
/**
 * Ribbon styles: [github-fork-ribbon-css](https://simonwhitaker.github.io/github-fork-ribbon-css/)
 * (MIT). Green bar + white text via scoped overrides below.
 */
import 'github-fork-ribbon-css/gh-fork-ribbon.css';

const href =
	import.meta.env.VITE_GITHUB_REPO_URL?.trim() ||
	'https://github.com/OpenAttitude/SenecaII-panel-flightgear';
</script>

<template>
  <a
    class="github-fork-ribbon fixed left-top openattitude-fork-ribbon"
    :href="href"
    data-ribbon="Fork me on GitHub"
    title="Fork me on GitHub"
    target="_blank"
    rel="noopener noreferrer"
  >
    Fork me on GitHub
  </a>
</template>

<style scoped>
/* Above Leaflet (~1000) and panel cutouts */
.openattitude-fork-ribbon.github-fork-ribbon {
	z-index: 10050;
}

/* White-on-green (library default is red #a00 on :before) */
.openattitude-fork-ribbon.github-fork-ribbon:before {
	background-color: #1a7f37;
	background-image: linear-gradient(to bottom, rgba(255, 255, 255, 0.14), rgba(0, 0, 0, 0.15));
}

.openattitude-fork-ribbon.github-fork-ribbon:after {
	color: #fff;
	text-shadow: 0 -0.08em rgba(0, 0, 0, 0.35);
}
</style>
