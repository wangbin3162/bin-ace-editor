<template>
  <div class="side-nav">
    <b-scrollbar>
      <div v-for="title in (Object.keys(data))" class="group-container" :key="title">
        <p class="side-nav-title">{{ title }}</p>
        <div class="side-nav-items" v-for="(nav,index) in data[title]" :key="index">
          <router-link v-if="nav.name" :class="$route.name===nav.name ? 'active' : ''" :to="{name: nav.name}">
            {{ nav.desc }}
          </router-link>
          <p v-else class="side-nav-group">{{ nav.desc }}</p>
          <div v-for="item in nav.items" :key="item.name">
            <router-link :to="{name: item.name}" :class="$route.name===item.name ? 'active' : ''"
                         class="slid-nav-component">
              <i :class="['b-iconfont','b-icon-'+item.icon]" v-if="item.icon"></i>
              <div style="position: relative;">{{ item.desc }}
                <b-icon class="writing-icon" name="Field-time" v-if="item.writing"></b-icon>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </b-scrollbar>
  </div>
</template>

<script>
import navConf from '../nav.config.json'

export default {
  data() {
    return {
      data: navConf,
    }
  },
}
</script>

<style lang="stylus">
.side-nav {
  position: fixed;
  top: 80px;
  width: 260px;
  height: calc(100vh - 80px);
  overflow: hidden;
  box-sizing: border-box;
  color: #3F536E;
  background-color: #fff;
  border-right: 1px solid #dcdee2;
  z-index: 99;
  &:hover {
    overflow-y: auto;
  }
  &::-webkit-scrollbar {
    display: none;
  }
  .group-container {
    margin-bottom: 12px;
  }
  .side-nav-title {
    margin: 12px 0;
    padding: 0 12px;
    color: #2a3040;
    font-size: 16px;
    font-weight: bold;
    letter-spacing: 1px;
    text-transform: uppercase;
  }
  .side-nav-items {
    font-size: 14px;
    font-weight: normal;
    line-height: 1.8;
    a {
      display: block;
      position: relative;
      padding: 8px 24px;
      color: #3f536e;
      font-weight: normal;
      cursor: pointer;
      &:hover {
        color: #2d8cf0;
      }
    }
    .side-nav-group {
      padding: 4px 0 4px 24px;
      font-size: 14px;
      color: #999;
      margin: 0;
    }
    .slid-nav-component {
      display: flex;
      align-items: center;
      position: relative;
      padding: 8px 24px 8px 35px;
      color: #3f536e;
      font-size: 14px;
      .b-iconfont {
        position: relative;
        top: 1px;
        font-size: 16px;
        margin-right: 8px;
      }
      .writing-icon {
        position absolute;
        right: -14px;
        top: -4px;
        font-size: 12px;
        color: red;
        margin: 0;
      }
    }
    .active {
      color: #2d8cf0;
      background: #f0faff;
      &::after {
        content: "";
        display: block;
        width: 2px;
        position: absolute;
        top: 0;
        bottom: 0;
        right: 0;
        background: #2d8cf0;
      }
    }
  }
  .bin-scrollbar__wrap {
    overflow-x: hidden;
  }
}
</style>
