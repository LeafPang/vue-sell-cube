<template>
  <transition name="move">
    <div
      class="food"
      ref="food"
      v-show="showFlag"
    >
      <div class="food-content">
        <div class="image-header">
          <img
            :src="food.image"
            alt=""
          >
          <div class="back">
            <i class="icon-arrow_lift"></i>
          </div>
        </div>
        <div class="content">
          <h1 class="title">{{food.name}}}</h1>
          <div class="detail">
            <span class="sell-count">月售{{food.sellCount}}分</span>
            <span class="rating">好评率{{food.rating}}%</span>
          </div>
          <div class="price">
            <span class="now">￥{{food.price}}</span>
            <span
              class="old"
              v-show="food.oldPrice"
            >￥{{food.oldPrice}}</span>
          </div>
          <div class="cartcontrol-wrapper">
            <!-- <cartcontrol></cartcontrol> -->
          </div>
          <transition name="fade">
            <div class="buy">加入购物车</div>
          </transition>
        </div>
        <split></split>
        <div class="info">
          <h1 class="title">商品信息</h1>
          <p class="text">{{food.info}}</p>
        </div>
        <split></split>
        <div class="rating">
          <h1 class="title">商品评价</h1>
          <ratingselect></ratingselect>
        </div>
      </div>

    </div>
  </transition>
</template>
<script>
import cartcontrol from "../cartcontrol/cartcontrol.vue";
import split from "../split/split.vue";
import ratingselect from "../ratingselect/ratingselect.vue";
import BScroll from "better-scroll";
export default {
  props: {
    food: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      showFlag: false
    };
  },
  components: {
    cartcontrol,
    split,
    ratingselect
  },
  methods: {
    show() {
      this.showFlag = true;
      this.$nextTick(() => {
        debugger;
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.food, {
            click: true
          });
        } else {
          this.scroll.refresh();
        }
      });
    },
    hide() {
      this.showFlag = false;
    }
  }
};
</script>
<style lang="stylus" scoped>
@import 'food.styl';
</style>
// <style lang="stylus" scoped>



// @import './food.styl'



// </style>