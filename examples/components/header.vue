<template>
  <header class="page-header">
    <div class="header-container">
      <div class="left" style="width: 480px;" flex="main:justify cross:center">
        <div class="logo">Bin Ace Editor</div>
      </div>
      <div class="link">
        <router-link :to="{ name: 'guide' }" class="active">指南</router-link>
        <a
          href="https://github.com/wangbin3162/bin-ace-editor"
          class="github"
          target="_blank"
        >GitHub</a
        >
      </div>
    </div>
  </header>
</template>

<script>
import navConf from '../nav.config.json'

export default {
  name: 'MainHeader',
  data() {
    return {
      components: [],
    }
  },
  created() {
    this.getComponentsOptions()
  },
  methods: {
    getComponentsOptions() {
      let routes = []
      Object.keys(navConf).forEach((header) => {
        routes = routes.concat(navConf[header])
      })

      let addComponent = (router) => {
        router.forEach((route) => {
          if (route.items) {
            addComponent(route.items)
            routes = routes.concat(route.items)
          } else {
            // 如果是组件路由
            if (['guide', 'install', 'start', 'theme', 'logs'].indexOf(route.name) === -1) {
              this.components.push({
                value: route.path,
                label: route.desc,
                icon: route.icon,
              })
            }
          }
        })
      }
      addComponent(routes)
    },
    handleComponentChange(val) {
      if (!val || val.length === 0) {
        return
      }
      if (this.$route.path !== val) {
        this.$router.push(val)
      }
    },
  },
}
</script>

<style lang="stylus" scoped>
.page-header {
  background-color: #fff;
  border-bottom: 1px solid #eeeeee;
  position: fixed !important;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 80px;
  transition: all 0.3s;
  z-index: 100;
  .header-container {
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin: 0 auto;
    height: 80px;
    .logo {
      color: #1089ff;
      font-weight: bold;
      font-family: helvetica;
      text-align: center;
      font-size: 40px;
      margin-left: 30px
      height: 80px;
      line-height: 80px;
      background-size: 220px 80px;
    }
    .link {
      padding: 0 20px;
      line-height: 80px;
      a {
        text-decoration: none;
        color: #1989fa;
        display: inline-block;
        line-height: 1.5;
        padding: 0 22px;
        font-size: 15px;
        &.github {
          color: #636363;
        }
      }
    }
  }
  :deep(.bin-select) {
    .bin-input.bin-input-default {
      border-color: transparent;
    }
    .bin-input-suffix {
      opacity: 0;
    }
  }
}
</style>
