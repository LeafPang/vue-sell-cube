<template>
  <div id="app">
    <v-header :seller="sellers"></v-header>
    <div class="tab">
       <div class="tab-item">
         <router-link to='/goods'>商品</router-link>
       </div>
       <div class="tab-item">
         <router-link to='/ratings'>评论</router-link>
       </div>
       <div class="tab-item">
         <router-link to='/seller'>商家</router-link>
       </div>
    </div>
    <keep-alive>
      <router-view :sellers="sellers"></router-view>
    </keep-alive>
    
   
  </div>
</template>

<script>
import Header from "./components/header/header.vue";
import { getSeller } from "api";
import Tab from "components/tab/tab.vue";
import Goods from "components/goods/goods.vue"
import Ratings from "components/ratings/ratings.vue"
import Seller from "components/seller/seller.vue"

export default {
  // name: 'app',
  data() {
    return {
      sellers: {},
    };
  },
  components: {
    "v-header": Header,
    Tab,
    Goods,
    Ratings,
    Seller
  },
  created() {
    this._getSeller();
  },
  methods: {
    _getSeller() {
      getSeller().then(res => {
        this.sellers = res.seller;
        console.log(res);
      });
    }
  }
};
</script>

<style lang="stylus" scoped>
.tab {
  display:-webkit-box;
  display:-ms-flexbox;
  display:flex;
  width 100%;
  height:40px;
  line-height:40px;
  border-bottom:1px solid #ddd;
  position:relative;
  z-index:10;
  .tab-item {
    -webkit-box-flex:1;
    -ms-flex:1;
    flex:1;
    text-align:center;
    height:100%;
    background:#fff;
    & >a {
      display:block;
      width:100%;
      height:100%;
      font-size:14px;
      color:rgb(77, 85, 93)
      &.active {
        color: rgb(240, 20, 20);
        border-bottom:1px solid rgb(240, 20, 20);
      }
    }
  }

}
</style>
