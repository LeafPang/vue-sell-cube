<template>
  <div class="goods">
    <div class="menu-wrapper">
      <ul>
        <li v-for="(item,index) in goods" class="menu-item" :class="{'current':currentIndex===index}">
          <span class="text border-1px"> 
            <span class="icon" :class="classMap[item.type]" v-show="item.type>0"></span>
            {{ item.name }}
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper">
      <ul>
        <li
          v-for="item in goods"
          class="food-list"
        >
          <h1 class="title">{{ item.name }}</h1>
          <ul>
            <li v-for="food in item.foods" class="food-item">
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
                  <cart-control :food="food" @add="addGoods"></cart-control>
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
    <shopcart ref="shopcart" :selectFoods="selectFoods" :deliveryPrice="sellers.deliveryPrice" :minPrice="sellers.minPrice"></shopcart>
  </div>

</template>
<script>
import { getGoods } from "api";
import shopcart from "../shopcart/shopcart.vue";
import cartControl from "../cartcontrol/cartcontrol.vue";
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
      currentIndex:0,
      selectedFood:{}
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

        console.log(res.goods);
      });
    },
    addGoods(target) {
      // debugger;
      this._drop(target);
    },
    _drop(target){
      this.$nextTick(()=>{
        this.$refs.shopcart.drop(target);
      });
    }
  }
};
</script>
<style lang="stylus" scoped>
@import '../../assets/common/stylus/minix.styl';
@import './goods.styl';
</style>