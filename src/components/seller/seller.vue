<template>
  <div class="seller" ref="sellCom">
    <div class="seller-content">
      <div class="overview">
        <h1 class="title">{{sellers.name}}</h1>
        <div class="desc">
          <star
            :size="36"
            :score="sellers.score"
          ></star>
          <span class="text">({{sellers.ratingCount}})</span>
          <span class="text">月销售{{sellers.sellCount}}份</span>
        </div>
        <ul class="remark">
          <li class="block">
            <h2 class="">起送价</h2>
            <div class="content">
              <span class="stress">{{sellers.minPrice}}</span>元
            </div>
          </li>
          <li class="block">
            <h2 class="">商家配送</h2>
            <div class="content">
              <span class="stress">{{sellers.deliveryPrice}}</span>元
            </div>
          </li>
          <li class="block">
            <h2 class="">平均配送时间</h2>
            <div class="content">
              <span class="stress">{{sellers.deliveryTime}}</span>分钟
            </div>
          </li>
        </ul>
        <div class="favorite" @click="toggleFavorite">
          <span class="icon-favorite" :class="{'active':favorite}"></span>
          <span class="text">{{favoriteText}}</span>
        </div>
      </div>
      <split></split>
      <div class="bulletin">
        <h2 class="title">公告与活动</h2>
        <div class="content-wrapper">
          {{sellers.bulletin}}
        </div>
        <ul class="supports">
          <li class="support-item" v-for="(item,index) in sellers.supports">
            <span class="icon" :class="classMap[item.type]"></span>
            <span class="text">{{item.description}}</span>
          </li>
        </ul>
      </div>
      <split></split>
      <div class="pics">
        <h1 class="title">商家实景</h1>
        <div class="pic-wrapper" ref="picWrapper">
          <ul class="pic-list" ref="picList">
            <li class="pic-item" v-for="pic in sellers.pics">
              <img
                :src="pic"
                alt=""
                width="120"
                height="90"
              >
            </li>
          </ul>
        </div>
      </div>
      <split></split>
      <div class="info">
        <h1 class="title">商家信息</h1>
        <ul>
          <li class="info-item" v-for="info in sellers.infos">{{info}}</li>
        </ul>
      </div>
    </div>
  </div>

</template>
<script>
import star from "../star/star.vue";
import split from "../split/split.vue";
import BScroll from 'better-scroll';
export default {
  props:{
    sellers:{
      type:Object,
      default(){
        return {}
      }
    }
  },
  data() {
    return {
      favorite:false
    };
  },
  components: {
    star,
    split
  },
  created(){
    this._initScroll();
    this._initPics();
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
  },
  computed:{
    favoriteText(){
      return this.favorite?'已收藏':'收藏';
    }
  },
  watch:{
    'sellers'(){
      this.$nextTick(()=>{
        this._initScroll();
        this._initPics();
      });
    }
  },
  methods:{
    _initScroll(){
      this.$nextTick(()=>{
         if(!this.sellerScroll){
            this.sellerScroll = new BScroll(this.$refs.sellCom, {
                click: true
            });
          }
      });
     
    },
    _initPics(){
      // debugger;
      if(this.sellers.pics){
        let picWidth=120;
        let margin=6;
      
        let width=(picWidth+margin)*this.sellers.pics.length-margin;
        
        this.$nextTick(()=>{
          this.$refs.picList.style.width=width+"px";
          if(!this.picScroll){
            this.picScroll = new BScroll(this.$refs.picWrapper,{
              scrollX:true,
              eventPassthrough:'vertical'
            });
          }
        });

      }
    },
    toggleFavorite(){
      this.favorite=!this.favorite
    }
  }
};
</script>
<style lang="stylus" scoped>
@import '../../assets/common/stylus/minix.styl';
@import 'seller.styl';
</style>