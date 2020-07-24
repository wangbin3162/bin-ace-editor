<template>
  <div class="side-nav">
    <div v-for="title in (Object.keys(data))" class="group-container" :key="title">
      <p class="side-nav-title">{{ title }}</p>
      <div class="side-nav-items" v-for="(nav,index) in data[title]" :key="index">
        <router-link v-if="nav.name" :class="$route.name===nav.name ? 'active' : ''" :to="{name: nav.name}">
          {{ nav.desc }}
        </router-link>
        <p v-else class="side-nav-group">{{nav.desc}}</p>
        <div v-for="item in nav.items" :key="item.name">
          <router-link :to="{name: item.name}" :class="$route.name===item.name ? 'active' : ''"
                       class="slid-nav-component">
            <b-icon :name="item.icon" v-if="item.icon" style="margin-right: 5px;" size="16"></b-icon>
            {{item.desc}}
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import navConf from '../nav.config.json'

  export default {
    data() {
      return {
        data: navConf
      }
    }
  }
</script>

<style lang="stylus">
  .side-nav {
    position: fixed;
    top: 80px;
    width: 260px;
    height: calc(100vh - 80px);
    overflow: hidden;
    padding-top: 20px
    box-sizing: border-box;
    color: #3F536E;
    background-color: #fff;
    border-right: 1px solid #dcdee2;
    z-index: 10;
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
      margin: 6px 0;
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
        line-height: 1.5;
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
        display: block;
        position: relative;
        padding: 8px 24px 8px 35px;
        color: #3f536e;
        font-size: 14px;
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
  }
</style>
