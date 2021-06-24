<template>
  <div class="demo-block" :class="[blockClass]">
    <div class="source">
      <slot name="source"></slot>
    </div>
    <div class="meta" ref="meta">
      <div class="description" v-if="$slots.default">
        <slot></slot>
      </div>
      <div class="highlight">
        <slot name="highlight"></slot>
      </div>
    </div>
    <div class="demo-block-control"
         ref="control"
         @click="isExpanded = !isExpanded">
      <i :class="iconClass"></i>&nbsp;
      <span>{{ controlText }}</span>
    </div>
  </div>
</template>

<script>
import { nextTick } from 'vue'

export default {
  data() {
    return {
      isExpanded: false,
      fixedControl: false,
      scrollParent: null,
    }
  },
  computed: {
    blockClass() {
      return `demo-${this.$router.currentRoute.value.path.split('/').pop()}`
    },
    controlText() {
      return this.isExpanded ? '隐藏代码' : '显示代码'
    },
    codeArea() {
      return this.$el.getElementsByClassName('meta')[0]
    },
    iconClass() {
      return this.isExpanded ? 'b-iconfont b-icon-caret-up' : 'b-iconfont b-icon-caret-down'
    },
    codeAreaHeight() {
      if (this.$el.getElementsByClassName('description').length > 0) {
        return this.$el.getElementsByClassName('description')[0].clientHeight +
            this.$el.getElementsByClassName('highlight')[0].clientHeight + 20
      }
      return this.$el.getElementsByClassName('highlight')[0].clientHeight
    },
  },
  watch: {
    isExpanded(val) {
      this.codeArea.style.height = val ? `${this.codeAreaHeight + 1}px` : '0'
    },
  },
  mounted() {
    nextTick(() => {
      let highlight = this.$el.getElementsByClassName('highlight')[0]
      if (this.$el.getElementsByClassName('description').length === 0) {
        highlight.style.width = '100%'
      }
    })
  },
}
</script>

<style lang="stylus">
.demo-block {
  border: solid 1px #ebebeb;
  border-radius: 2px;
  code {
    font-family: Menlo, Monaco, Consolas, Courier, monospace;
  }
  .source {
    padding: 24px;
  }
  .meta {
    background-color: #fafafa;
    border-top: solid 1px #eaeefb;
    overflow: hidden;
    height: 0;
    transition: height .2s;
  }
  .description {
    padding: 10px;
    box-sizing: border-box;
    border: solid 1px #ebebeb;
    border-radius: 3px;
    font-size: 14px;
    line-height: 22px;
    color: #666;
    word-break: break-word;
    margin: 10px;
    background-color: #fff;
    p {
      margin: 0;
      line-height: 26px;
    }
    code {
      color: #5e6d82;
      background-color: #e6effb;
      margin: 0 4px;
      display: inline-block;
      padding: 1px 5px;
      font-size: 12px;
      border-radius: 3px;
      height: 18px;
      line-height: 18px;
    }
  }

  .highlight {
    pre {
      margin: 0;
    }
    code {
      &.hljs {
        margin: 0;
        border: none;
        max-height: none;
        border-radius: 0;
        &::before {
          content: none;
        }
      }
    }
  }
  .demo-block-control {
    display: flex;
    justify-content: center;
    align-items: center;
    border-top: solid 1px #eaeefb;
    height: 44px;
    box-sizing: border-box;
    background-color: #fff;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    text-align: center;
    margin-top: -1px;
    color: #d3dce6;
    cursor: pointer;
    i {
      font-size: 16px;
      line-height: 44px;
      transition: .3s;
    }
    > span {
      font-size: 14px;
      line-height: 44px;
      transition: .3s;
    }
    &:hover {
      color: #1089ff;
      background-color: #f9fafc;
    }
  }
}
</style>
