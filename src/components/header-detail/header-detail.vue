<template>
   <transition name="fade">
      <div class="detail" v-show="detailShow">
        <div class="detail-wrapper clearfix">
          <div class="detail-main">
            <div class="name">{{seller.name}}</div>
            <div class="star-wrapper">
              <star :size="48" :score="seller.score"></star>
            </div>
            <div class="title">
              <div class="line"></div>
              <div class="text">优惠信息</div>
              <div class="line"></div>
            </div>
            <ul class="supports" v-if="seller.supports" >
              <li class="support-item" v-for="(item,index) in seller.supports" :key="index">
                <span class="icon" :class="classMap[seller.supports[index].type]"></span>
                <span class="text">{{seller.supports[index].description}}</span>
              </li>
              
            </ul>
            <div class="title">
              <div class="line"></div>
              <div class="text">优惠信息</div>
              <div class="line"></div>
            </div>
            <div class="bulletin">
              <div class="content">
                {{seller.bulletin}}
              </div>
            </div>
          </div>
        </div>
        <div class="detail-close" @click="hideDetail"><i class="icon-close"></i></div>
      </div>
    </transition>

</template>
<script>
import star from "components/star/star.vue"
export default {
  name:"header-detail",
  props:{
    seller:{
      type:Object,
      default(){
        return{}
      }
    }
  },
  data(){
    return {
      detailShow:false
    }
  },
   created(){
    this.classMap=['decrease', 'discount', 'special', 'invoice', 'guarantee'];
  },
  methods:{
    show(){
      this.detailShow=true;
    },
    hideDetail(){
      this.detailShow=false;
    }
  },
  components:{
    star
  }
}
</script>
<style lang="stylus" scoped>
@import "./header-detail.styl"
</style>