<template>
  <header class="page-header">
    <div class="header-container" flex="main:justify">
      <div class="left" style="width: 480px;" flex="main:justify cross:center">
        <div class="logo">Bin Ace Editor</div>
      </div>
      <div class="link">
        <a href="https://github.com/wangbin3162/bin-ace-editor" class="github" target="_blank">GitHub</a>
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
        components: []
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
                  label: route.desc
                })
              }
            }
          })
        }
        addComponent(routes)
      }
    }
  }
</script>

<style lang="stylus">
  .page-header {
    background-color: #fff;
    border-bottom: 1px solid #eeeeee;
    position: fixed !important;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 80px;
    transition: all .3s;
    z-index: 10;
    .header-container {
      width: 100%;
      margin: 0 auto;
      height: 80px;
      .logo {
        color: #409EFF;
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
        .bin-dropdown {
          line-height: 1.5;
        }
      }
    }
    .bin-select-single .bin-select-selection {
      border-color: transparent;
      .bin-select-arrow {
        opacity: 0;
      }
    }
  }
</style>
