<template>
  <div class="header" @click="showDetail">
    <div class="content-wrap">
      <div class="avatar">
        <img
          :src="seller.avatar"
          alt=""
          width="64"
          height="64"
        >
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{ seller.name }}</span>
        </div>
        <div class="description"> {{seller.description}}/{{seller.deliveryTime}}分钟送达</div>
        <div class="support" v-if="seller.supports">
          <span class="icon" :class="classMap[seller.supports[0].type]"></span>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
      </div>
      <div v-if="seller.supports" class="support-count" @click="showDetail">
        <span class="count">{{seller.supports.length}}个</span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
    </div>
    <div class="bulletin-wrap">
      <span class="bulletin-title"></span>
      <span class="bulletin-text">{{seller.bulletin}}</span>
      <i class="icon-keyboard_arrow_right"></i>
    </div>
    <div class="background">
      <img
        :src="seller.avatar"
        alt=""
      >
    </div>
   
  </div>
</template>
<script>
import star from "components/star/star.vue"
export default {
  //  props:['seller'],
  props: {
    seller: {
      type: Object,
      // default () {
      //   return {}
      // }
    }
  },
  data () {
    return {
      detailShow: false,
      // seller:{}
    }
  },
  components:{
    star
  },
  created(){
    this.classMap=['decrease', 'discount', 'special', 'invoice', 'guarantee'];
  },
  methods: {
    showDetail () {
      // debugger;
      this.HeaderDetailComp=this.HeaderDetailComp || this.$createHeaderDetail({
        $props:{
          seller:'seller'
        }
      })
      this.HeaderDetailComp.show();
      
    },
    hideDetail () {
      this.detailShow = false
    },
  }
}
</script>
<style lang="stylus" scoped>
@import '../../assets/common/stylus/minix.styl';
@import './header.styl';

</style>
