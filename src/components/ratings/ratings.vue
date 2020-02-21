<template>
<div class="ratings" ref="ratings">
  <div class="ratings-content">
    <div class="overview">
      <div class="overview-left">
        <h1 class="score">{{sellers.score}}</h1>
        <div class="title">综合评分</div>
        <div class="rank">高于周边商家{{sellers.rankRate}}%</div>
      </div>
      <div class="overview-right">
        <div class="score-wrapper">
          <span class="title">服务态度</span>
          <star :score="sellers.serviceScore" :size="36"></star>
          <span class="score">{{sellers.serviceScore}}</span>
        </div>
        <div class="score-wrapper">
          <span class="title">商品评分</span>
          <star :score="sellers.foodScore" :size="36"></star>
          <span class="score">{{sellers.foodScore}}</span>
        </div>
        <div class="delivery-wrapper">
          <span class="title">送达时间</span>
          <span class="delivery">{{sellers.deliveryTime}}分钟</span>
        </div>
      </div>
    </div>
    <split></split>
    <ratingselect :selectType="selectType" 
    :onlyContent="onlyContent" 
    :desc="desc" 
    :ratings="ratings"
    @select="selectHead"
    @toggle="toggleCon"
    v-if="ratings || ratings.length"
    ></ratingselect>
    <div class="rating-wrapper" v-if="computedRatings || computedRatings.length">
      <ul>
        <li class="rating-item" v-for="rating in computedRatings">
          <div class="avatar">
            <img :src="rating.avatar" alt="" width="28" height="28">
          </div>
          <div class="content">
            <h1 class="name">{{rating.username}}</h1>
            <div class="star-wrapper">
              <star :size="24" :score="rating.score"></star>
              <span class="delivery" v-if="rating.deliveryTime">送达时间：{{rating.deliveryTime}}</span>
            </div>
            <div class="text">{{rating.text}}</div>
            <div class="recommend">
              <span :class="{'icon-thumb_up':rating.rateType === 0,'icon-thumb_down':rating.rateType === 1}"></span>
              <span class="item" v-for="recom in rating.recommend"> {{recom}}</span>
            </div>
            <span class="time">{{formatTime(rating.rateTime)}}</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</div>
  
</template>
<script>
import star from '../star/star.vue';
import split from '../split/split.vue';
import { getRatings } from 'api';
import BScroll from 'better-scroll';
import moment from 'moment';
import ratingselect from '../ratingselect/ratingselect.vue';
import myMixins from '../mixins/mixins.js';
const ALL=2;
export default {
  props:{
    sellers:{
      type:Object,
      default(){
        return {}
      }
    }
  },
  mixins:[myMixins],
  data(){
    return{
      ratings:[],
      //评价选择文字
      desc:{
        all: '全部',
        positive: '满意',
        negative: '不满意'
      }
    }
  },
  components:{
    star,
    split,
    ratingselect
  },
  created(){
    this.fetch();
  },
  computed:{
    computedRatings(){
      let ret=[];
      this.ratings.forEach((rating)=>{
        if(this.onlyContent && !rating.text){
          return
        }
        if(this.selectType === ALL || this.selectType === rating.rateType){
          ret.push(rating);
        }
      });
      return ret;
    }
  },
  methods:{
    fetch(){
      getRatings().then((res)=>{
        this.ratings=res.ratings;
        this.$nextTick(()=>{
          if(!this.scroll){
            this.scroll=new BScroll(this.$refs.ratings,{
              click:true
            });
          }
        });
      });
    },
    formatTime (time){
      return moment(time).format('YYYY-MM-DD hh:mm');
    }
  }
}
</script>
<style lang="stylus" scoped>
@import 'rating.styl'
</style>