<template>
  <div>
    <div class="shopcart">
      <div class="content">
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
        <div class="content-right">
          <div class="pay" :class="payClass">{{payDesc}}</div>
        </div>
      </div>
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
  </div>
</template>
<script>
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
    }
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
    }
  }
}
</script>
<style lang="stylus" scoped>
@import './shopcart.styl'
</style>