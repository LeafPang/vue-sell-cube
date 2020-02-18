<template>
  <div>
    <div class="shopcart">
      <div class="content" @click="togglelist">
        <div class="content-left">
          <div class="logo-wrapper">
            <div class="logo" :class="{'highlight': totalCount>0}">
              <i class="icon-shopping_cart" :class="{'highlight':totalCount>0}"></i>
            </div>
            <div class="num" v-show="totalCount>0">{{ totalCount }}</div>
          </div>
          <div class="price" :class="{'highlight':totalPrice>0}">￥{{totalPrice}}</div>
          <div class="desc">另需配送费￥{{deliveryPrice}}元</div>
        </div>
        <div class="content-right" @click.stop.prevent="pay">
          <div class="pay" :class="payClass">{{payDesc}}</div>
        </div>
      </div>
      <transition name="fold">
        <div class="shopcart-list" v-show="listShow">
          <div class="list-header">
            <h2 class="title">购物车</h2>
            <span class="empty" @click="empty">清空</span>
          </div>
          <div class="list-content" ref="listcontent">
            <ul>
              <li class="food" v-for="food in selectFoods ">
                <span class="name">{{ food.name }}</span>
                <div class="price">
                  <span>￥{{ food.price* food.count }}</span>  
                </div> 
                <div class="cartcontrol-wrapper">
                  <cart-control :food="food" @add="addGoods"></cart-control>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </transition>
      <div class="ball-container">
        <div v-for="ball in balls">
          <transition name="drop" @before-enter="beforeDrop" @enter="dropping" @after-enter="afterDrop">
            <div class="ball" v-show="ball.show">
              <div class="inner inner-hook"></div>
            </div>
          </transition>
        </div>
      </div>
    </div>
    <transition name="fade">
      <div class="list-mask" v-show="listShow" @click="hideList"></div>
    </transition>
  </div>
</template>
<script>
import cartControl from "../cartcontrol/cartcontrol.vue";
import BScroll from 'better-scroll';
export default {
  props:{
    selectFoods:{
      type:Array,
      default(){
        return [
          {
            price:10,
            count:1
          }
        ]
      }
    },
    deliveryPrice:{
      type:Number,
      default:0
    },
    minPrice:{
      type:Number,
      default:0
    }
  },
  data(){
    return {
      balls:[
        {
          show:false,
        },
        {
          show:false,
        },
        {
          show:false,
        },
        {
          show:false,
        },
        {
          show:false,
        },
        {
          show:false,
        },
      ],
      dropBalls:[],
      fold:true,
    }
  },
  computed:{
    totalCount(){
      let count=0;
      this.selectFoods.forEach((food)=>{
        count+=food.count;
      });
      return count;
    },
    totalPrice(){
      let price=0;
      this.selectFoods.forEach((food)=>{
        price+=food.price*food.count;
      });
      return price;
    },
    payClass(){
      if(this.totalPrice < this.minPrice){
        return 'not-enough'
      }else {
        return 'enough'
      }
    },
    payDesc(){
      if(this.totalPrice ===0){
        return `￥${this.minPrice}元起送`
      }else if(this.totalPrice<this.minPrice){
        let diff=this.minPrice-this.totalPrice;
        return `还差${diff}元起送`
      }else {
        return '去结算'
      }
    },
    listShow(){
      // debugger;
      if(!this.totalCount){
        this.fold=true;
        return false;
      }
      let show=!this.fold;
      // 购物车列表变成可滚动
      if(show){
        this.$nextTick(()=>{
          if(!this.listconscroll){
            this.listconscroll=new BScroll(this.$refs.listcontent,{
              click:true
            });
          }else {
            this.listconscroll.refresh();
          }
        });
        
      }
      return show;
    },
  },
  components:{
    cartControl
  },
  methods:{
    drop(el){
      //  debugger;
      for(let i=0;i<this.balls.length;i++){
        let ball=this.balls[i];
        if(!ball.show){
          ball.show=true;
          ball.el=el;
          this.dropBalls.push(ball);
          return;
        }
      }
    },
    beforeDrop(el){
      // console.log(el);
      let count=this.balls.length;
      while(count--){
        let ball=this.balls[count];
        if(ball.show){
          let rect=ball.el.getBoundingClientRect();
          let x=rect.left-32;
          let y=-(window.innerHeight - rect.top - 22);
          el.style.display='';
          el.style.webkitTransform=`translate3d(0,${y}px,0)`;
          el.style.transform=`translate3d(0,${y}px,0)`;
          let inner=el.getElementsByClassName('inner-hook')[0];
          inner.style.webkitTransform=`translate3d(${x}px,0,0)`;
          inner.style.transform=`translate3d(${x}px,0,0)`;
        }
      }
    },
    dropping(el,done){
      let rf=el.offsetHeight;
      this.$nextTick(()=>{
        el.style.webkitTransform=`translate3d(0,0,0)`;
        el.style.transform=`translate3d(0,0,0)`;
        let inner=el.getElementsByClassName("inner-hook")[0];
        inner.style.webkitTransform=`translate3d(0,0,0)`;
        inner.style.transform=`translate3d(0,0,0)`;
        el.addEventListener('transitionend', done);
      });
    },
    afterDrop(el){
      let ball=this.dropBalls.shift();
      if(ball){
        ball.show=false;
        el.style.display="none";
      }
    },
    togglelist(){
      // debugger;
      if(!this.totalCount){
        return;
      }
      this.fold=!this.fold;
    },
    hideList(){
      this.fold=true;
    },
    empty(){
      this.selectFoods.forEach((food)=>{
        food.count=0;
      });
      // 清空操作，有以下两个方法
      // 方法一：子组件派发事件
      // 方法二：直接调用父组件里面的方法
      // this.$emit("emptyGoodsCount");
      this.$parent.emptyGoodsCount();
      
    },
    pay(){
      if(this.totalPrice < this.minPrice){
        return;
      }
      // 引用cubeui的dilog组件，该组件基于create-api实现
      this.dialogCom=this.$createDialog({
        type:"alert",
        title:"支付",
        content:`一共支付${this.totalPrice}元`,
        onConfirm:()=>{
          this.empty();
        }
      }
     );
      this.dialogCom.show();
      
      // window.alert(`共支付${this.totalPrice}元`);
    },
    // 购物车列表点击增加商品时，也有小球动效
    addGoods(el,name){
      this.drop(el);
    }
  }
}
</script>
<style lang="stylus" scoped>
@import './shopcart.styl'
</style>