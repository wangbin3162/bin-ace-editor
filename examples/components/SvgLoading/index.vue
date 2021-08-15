<template>
  <div class="svg-loading-wrapper" :style="loadingStyle">
    <component :is="name"></component>
  </div>
</template>

<script>
import Loading01 from '@/components/SvgLoading/loading/loading01'
import Loading02 from '@/components/SvgLoading/loading/loading02'
import Loading03 from '@/components/SvgLoading/loading/loading03'
import Loading04 from '@/components/SvgLoading/loading/loading04'
import Loading05 from '@/components/SvgLoading/loading/loading05'
import Loading06 from '@/components/SvgLoading/loading/loading06'
import Loading07 from '@/components/SvgLoading/loading/loading07'
import Loading08 from '@/components/SvgLoading/loading/loading08'
import Loading09 from '@/components/SvgLoading/loading/loading09'
import Loading10 from '@/components/SvgLoading/loading/loading10'
import Loading11 from '@/components/SvgLoading/loading/loading11'
import Loading12 from '@/components/SvgLoading/loading/loading12'
import LoadingText from '@/components/SvgLoading/loading/loading-text'

/**
 * design by https://loading.io/
 */
export default {
  name: 'SvgLoading',
  components: {
    Loading01,
    Loading02,
    Loading03,
    Loading04,
    Loading05,
    Loading06,
    Loading07,
    Loading08,
    Loading09,
    Loading10,
    Loading11,
    Loading12,
    LoadingText
  },
  props: {
    name: {
      type: String,
      required: true
    },
    width: {
      type: Number,
      default: 200
    },
    height: {
      type: Number
    },
    background: {
      type: String,
      default: 'transparent'
    }
  },
  computed: {
    loadingStyle() {
      return {
        width: `${this.width}px`,
        height: `${this.height ? this.height : this.width}px`,
        background: this.background
      }
    }
  }
}
</script>

<style scoped lang="stylus">
.svg-loading-wrapper {
}
</style>
