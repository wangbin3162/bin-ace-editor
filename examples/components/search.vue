<template>
  <Teleport to="body">
    <transition name="zoom-in" mode="out-in" @after-leave="showScroll">
      <div class="search-modal" @click.stop v-if="visible">
        <div class="search-modal-content" v-click-outside="handleClose">
          <div class="search-modal-input__wrapper">
            <b-input ref="inputRef" size="large" v-model="query" placeholder="搜索" class="input-item" clearable>
              <template #prefix>
                <b-icon name="search" size="22"></b-icon>
              </template>
            </b-input>
          </div>
          <ul class="search-modal-list" v-no-data:[dataText]="filterList.length===0">
            <li
              v-for="item in filterList"
              :key="item.path"
              class="list-item"
            >
              <a @click="handleClick(item.path)">
                <i :class="`b-iconfont b-icon-${item.icon}`"></i>
                <span>{{ item.label }}</span>
                <i class="b-iconfont b-icon-enter"></i>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </transition>
  </Teleport>
</template>

<script>
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import navConf from '../nav.config.json'
import { useRoute, useRouter } from 'vue-router'
import { on, off } from 'bin-ui-next/src/utils/dom'

export default {
  name: 'Search',
  setup() {
    const visible = ref(false)
    const inputRef = ref(null)
    const dataText = ref('暂无搜索结果')
    const query = ref('')
    const compList = ref([])
    const $route = useRoute()
    const $router = useRouter()

    const filterList = computed(() => {
      const text = query.value
      return compList.value.filter(comp => comp.label.includes(text) || comp.path.includes(text))
    })

    function getComponentsOptions() {
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
            if (['guide', 'install', 'start', 'theme', 'color', 'logs'].indexOf(route.name) === -1) {
              compList.value.push({
                path: route.path,
                label: route.desc,
                icon: route.icon,
              })
            }
          }
        })
      }
      addComponent(routes)
    }

    getComponentsOptions()

    function handleOpen() {
      visible.value = true
      nextTick(() => {
        hideScroll()
        inputRef.value && inputRef.value.focus()
      })
    }

    function handleClick(path) {
      if ($route.path !== path) {
        $router.push(path)
      }
      handleClose()
    }

    function handleClose() {
      visible.value = false
    }

    function hideScroll() {
      document.body.classList.add('bin-popup-parent--hidden')
    }

    function showScroll() {
      query.value = ''
      document.body.classList.remove('bin-popup-parent--hidden')
    }


    // ctrl + f 全局呼出搜索面板
    const keydownEvent = (e) => {
      const { ctrlKey, code } = e
      // 面板打开
      if (visible.value) {
        if (code === 'Escape') {
          e.preventDefault()
          handleClose()
        }
      } else {
        if (ctrlKey && code === 'KeyF') {
          e.preventDefault()
          handleOpen()
        }
      }
    }

    onMounted(() => {
      on(document, 'keydown', keydownEvent)
    })

    onBeforeUnmount(() => {
      off(document, 'keydown', keydownEvent)
    })

    return {
      visible,
      inputRef,
      query,
      filterList,
      dataText,
      handleOpen,
      handleClose,
      showScroll,
      handleClick,
    }
  },
}
</script>

<style scoped lang="stylus">
.search-modal {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 800;
  display: flex;
  width: 100%;
  height: 100%;
  padding-top: 50px;
  background-color: rgba(0, 0, 0, .25);
  justify-content: center;
  &-content {
    position: relative;
    width: 632px;
    margin: 0 auto auto auto;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: inset 1px 1px 0 0 hsla(0, 0%, 100%, 0.5), 0 3px 8px 0 #555a64;
    flex-direction: column;
  }
  &-input__wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px 16px 0;
    :deep(.bin-input-large) {
      height: 48px;
      border-radius: 6px;
      padding-left: 40px;
    }
    :deep(.bin-input-prefix) {
      left: 6px;
    }
  }
  &-list {
    max-height: 472px;
    padding: 8px 16px;
    padding-bottom: 20px;
    margin: 0 auto;
    margin-top: 14px;
    overflow: auto;
    .list-item {
      border-radius: 4px;
      display: flex;
      padding-bottom: 4px;
      position: relative;
      a {
        cursor: pointer;
        display: flex;
        align-items: center;
        width: 100%;
        height: 56px;
        box-shadow: 0 1px 3px 0 #d4d9e1;
        border-radius: 4px;
        color: rgba(0, 0, 0, .85);
        padding: 0 6px;
        > span {
          flex: 1;
        }
        i {
          font-size: 20px;
          margin: 0 8px;
        }
        &:hover {
          background: #1089ff;
          color: #fff;
        }
      }
    }
  }
}
</style>
