<template>
  <div class="goods">
    <div class="menu-wrapper" ref="menuWrapper">
      <ul>
        <li v-for="(item,index) in goods" class="menu-item" 
          :class="{'current':currentIndex===index}" ref="menulist" @click="selectMenu(index,$event)">
          <span class="text border-1px"> 
            <span class="icon" :class="classMap[item.type]" v-show="item.type>0"></span>
            {{ item.name }}
          </span>
          <span class="num" v-show="item.count>0">{{ item.count }}</span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" ref="foodWrapper">
      <ul>
        <li
          v-for="item in goods"
          class="food-list"
          ref="foodlist"
        >
          <h1 class="title">{{ item.name }}</h1>
          <ul>
            <li v-for="food in item.foods" class="food-item" :parant="item.name" >
              <div class="icon">
                <img
                  :src="food.icon"
                  alt=""
                  width="57"
                  height="57"
                >
              </div>
              <div class="content">
                <h2 class="name">{{ food.name }}</h2>
                <p class="desc">{{ food.description }}</p>
                <div class="extra">
                  <span class="count">月售{{ food.sellCount }}份</span>
                  <span>好评率{{  food.rating }}%</span>
                </div>
                <div class="price">
                  <span class="now">￥{{ food.price }}</span>
                  <span class="old" v-show="food.oldPrice">￥{{ food.oldPrice }}</span>
                </div>
                <div class="cartcontrol-wrapper">
                  <cart-control :food="food" @add="addGoods" ></cart-control>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <!-- <div class="scroll-nav-wrapper">

       <cube-scroll-nav
        :side="true"
        :data="goods"
        :options="scrollOptions"
        v-if="goods.length"
      >
        <cube-scroll-nav-panel
          v-for="(item,index) in goods"
          :key="item.name"
          :label="item.name"
          :title="item.name"
        >
          <ul>
            <li
              v-for="food in item.foods"
              :key="food.name"
              class="food-item"
              @click="addGoods"
            >
              <div class="icon">
                <img
                  :src="food.icon"
                  width="64"
                  height="64"
                >
              </div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <p class="desc">{{food.description}}</p>
                <p class="desc">
                  <span>月销售{{food.sellCount}}份</span>
                  <span>好评率{{food.rating}}%</span>
                </p>
                <p class="price">{{food.price}}￥</p>

                <div class="cartcontrol-wrapper" >
                  <cart-control :food="food"></cart-control>
                </div>
              </div>
            </li>
          </ul>
        </cube-scroll-nav-panel>

      </cube-scroll-nav> 

    </div> -->
    <shopcart ref="shopcart" :selectFoods="selectFoods" 
    :deliveryPrice="sellers.deliveryPrice" 
    :minPrice="sellers.minPrice"
    @emptyGoodsCount="emptyGoodsCount"
    ></shopcart>
  </div>

</template>
<script>
import Vue from 'vue'
import { getGoods } from "api";
import shopcart from "../shopcart/shopcart.vue";
import cartControl from "../cartcontrol/cartcontrol.vue";
import BScroll from 'better-scroll';
export default {
  name: "goods",
  props: {
    sellers: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      goods: [],
      currentName: "",
      scrollOptions: {
        click: false,
        probType: 3,
        directionLockThreshold: 0
      },
      // currentIndex:0,
      selectedFood:{},
      listHeight:[],
      scrollY:0
    };
  },
  created() {
    this.fetch();
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
  },
  computed: {
    // currentName:{
    //   get(){
    //     return this.goods[0].name
    //   }
    // }
    selectFoods(){
      let foods=[];
      this.goods.forEach((good)=>{
        good.foods.forEach((food)=>{
          if(food.count){
            foods.push(food);
          }
        });
      });
      return foods;
    },
    currentIndex(){
        for(let i=0;i<this.listHeight.length;i++){
          // debugger;
          let height1=this.listHeight[i];
          let height2=this.listHeight[i+1];
          if(!height2 || (this.scrollY>=height1 && this.scrollY<height2)){
            this._followScroll(i);
            return i;
          }
          
        }
        return 0;
     
    }
  },
  components: {
    shopcart,
    cartControl
  },
  methods: {
    changeHandler(label) {
      console.log("changed to:", label);
    },
    stickyChangeHandler(current) {
      console.log("sticky-change", current);
    },
    fetch() {
      //  debugger;
      getGoods().then(res => {
        // debugger;
        this.goods = res.goods;
        this.currentName = res.goods[0].name;
        this._initMenuCountAndParent();
        this.$nextTick(()=>{
          this._initScroll();
          this._calculateHeight();
        });
        // console.log(res.goods);
      });
    },
    addGoods(target,parentName) {
      // debugger;
      this._drop(target);
      // this.menuComputeCount();
      this.goods.forEach((good)=>{
        if(good.name === parentName){
          good.count++;
        }
      });
     
    },
    _drop(target){
      this.$nextTick(()=>{
        this.$refs.shopcart.drop(target);
      });
    },
    _initScroll(){
      this.menuScroll=new BScroll(this.$refs.menuWrapper,{
        click:true
      });
      this.foodScroll=new BScroll(this.$refs.foodWrapper,{
        click:true,
        probeType:3
      });

      // 监听右侧食物列表的滚动，以此来改变scrollY的数值，从而触发currentIndex值得改变，从而触发_followScroll()函数的执行
      this.foodScroll.on('scroll',(pos)=>{
        // debugger;
        if(pos.y<=0){
          this.scrollY=Math.abs(Math.round(pos.y));
        }
      });
    },
    _initMenuCountAndParent(){
      this.goods.forEach((good)=>{
        if(!good.count){
          Vue.set(good,"count",0);
        }
        let name=good.name
        good.foods.forEach((food)=>{
          if(!food.parentName){
            Vue.set(food,"parentName",name);
          }
        });
      });
    },
    menuComputeCount(){
      this.goods.forEach((good)=>{
        let count=0;
        good.foods.forEach((food)=>{
          if(food.count){
            count+=food.count;
          }
        });
        good.count=count;
      });
    },
    _calculateHeight(){
      let foodlist=this.$refs.foodlist;
      let height=0;
      this.listHeight.push(height);
      for(let i=0;i<foodlist.length;i++){
        let item=foodlist[i];
        height+=item.clientHeight;
        this.listHeight.push(height);
      }
    },
    _followScroll(index){
      // debugger;
      let menulist=this.$refs.menulist;
      let el=menulist[index];
      this.menuScroll.scrollToElement(el,300,0,-100);
    },
    // 点击左侧菜单，右侧跳到相应的分类
    selectMenu(index,event){
      if(!event._constructed){
        return;
      }
      // debugger;
      let foodlist=this.$refs.foodlist;
      let el=foodlist[index];
      this.foodScroll.scrollToElement(el,300);
      // this.currentIndex=index;
    },
    // 将goods的 count值置为0
    emptyGoodsCount(){
      this.goods.forEach((good)=>{
        good.count=0;
      });
    }
  }
};
</script>
<style lang="stylus" scoped>
@import '../../assets/common/stylus/minix.styl';
@import './goods.styl';
</style>