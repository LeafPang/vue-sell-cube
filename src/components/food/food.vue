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
          <div class="back" @click="hide">
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
            <cartcontrol :food="food" @add="addFood"></cartcontrol>
          </div>
          <transition name="fade">
            <div class="buy" @click="addFirst" v-show="!food.count || food.count === 0">加入购物车</div>
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
          <ratingselect :selectType="selectType" 
          :onlyContent="onlyContent" :desc="desc" 
          :ratings="food.ratings"
          @select="selectHead"
          @toggle="toggleCon"
          ></ratingselect>
          <div class="rating-wrapper">
            <ul>
              <li class="rating-item" v-for="rating in computerRatings">
                <div class="user">
                  <span class="name">{{rating.username}}</span>
                  <img :src="rating.avatar" alt="" width="12" height="12">
                </div>
                <div class="time">{{rating.rateTime}}</div>
                <div class="text">
                  <span :class="{'icon-thumb_up':rating.rateType === 0,'icon-thumb_down':rating.rateType === 1}"></span>
                  {{rating.text}}
                </div>
              </li>  
            </ul>  
            <div class="no-rating" v-show="!food.ratings">暂无评价</div>
          </div> 
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

const ALL=2;
export default {
  props: {
    food: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      showFlag: false,
      selectType:ALL,//商品评价类型
      onlyContent:true,//只看有内容评价
      //评价选择文字
      desc:{
        all: '全部',
        positive: '推荐',
        negative: '吐槽'
      }

    };
  },
  components: {
    cartcontrol,
    split,
    ratingselect
  },
  computed:{
    ratings(){
      return this.food.ratings
    },
    computerRatings(){
      let ret=[];
      this.ratings.forEach((rating)=>{
        if(this.onlyContent && !rating.text){
          return;
        }
        if(this.selectType === ALL || this.selectType === rating.rateType){
          ret.push(rating);
        }
      });
      return ret;
    }
  },
  methods: {
    show() {
      this.showFlag = true;
      this.$nextTick(() => {
        // debugger;
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
    },
    // 点击购物车
    addFirst(event){
      this.$set(this.food,'count',1);
      this.$emit("add",event.target);
    },
    // 添加食物
    addFood(target){
      this.$emit('add',event.target);
    },
    // 评论头部切换，改变选择类型
    selectHead(type){
      this.selectType=type;
    },
    //只看有评论内容的评论
    toggleCon(){
      // debugger;
      this.onlyContent=!this.onlyContent;
    }
  }
};
</script>
<style lang="stylus" scoped>
@import 'food.styl';
</style>