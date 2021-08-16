<template>
  <div ref="scrollBox">
    <main-header/>
    <div class="main-cnt">
      <side-nav class="nav" :show-menu="showMenu" @toggle="toggleMenu"/>
      <div class="page-container" :style="{marginLeft:showMenu?'256px':'0'}" ref="containerRef">
        <div class="global-anchor" v-if="anchors.length">
          <b-scrollbar>
            <b-anchor :scroll-offset="100" ref="anchorRef">
              <template v-for="item in anchors" :key="item.id">
                <b-anchor-link
                  :href="`#${item.id}`"
                  :title="item.text"
                ></b-anchor-link>
              </template>
            </b-anchor>
          </b-scrollbar>
        </div>
        <router-view/>
        <main-footer/>
      </div>
      <b-back-top></b-back-top>
    </div>
  </div>
</template>

<script>
import { watch, ref, onMounted, nextTick } from 'vue'
import { useRoute } from 'vue-router'

const cfg = require('/package.json')

export default {
  name: 'App',
  setup() {
    const route = useRoute()
    const containerRef = ref(null)
    const anchorRef = ref(null)
    const anchors = ref([])
    const showMenu = ref(true)

    function toggleMenu() {
      showMenu.value = !showMenu.value
    }

    function fetchAnchors() {
      if (!containerRef.value) return
      const content = containerRef.value.querySelector('.content.element-doc.content')
      if (!content) return
      const h3 = content.querySelectorAll('h3')
      anchors.value = Array.from(h3).map(item => {
        const text = item.innerText.trim()
        const id = item.getAttribute('id')
        return { id, text }
      })
    }

    watch(() => route.path, () => {
      anchors.value = []
      if (route.meta.desc) {
        document.title = route.meta.desc + ' | ' + cfg.name.toUpperCase()
        document.scrollingElement.scrollTop = 0
      }
      nextTick(() => {
        fetchAnchors()
      })
    })
    onMounted(() => {
      if (route.meta.desc) {
        document.title = route.meta.desc + ' | ' + cfg.name.toUpperCase()
        document.scrollingElement.scrollTop = 0
      }
      fetchAnchors()
    })

    return {
      containerRef,
      anchorRef,
      anchors,
      showMenu,
      toggleMenu,
    }
  },
}
</script>

<style lang="stylus">
#app {
  width: 100%;
  min-height: 100vh;
  overflow-x: hidden;
}
.main-cnt {
  position: relative;
  padding-top: 80px;
  width: 100%;
  height: 100%;
  .page-container {
    box-sizing: border-box;
    transition: margin-left .15s ease;
    margin-left: 256px;
    background: #fff;
  }
}
</style>
