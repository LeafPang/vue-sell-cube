<template>
  <div class="tab">
    <cube-tab-bar
      v-model="selectedLabelDefault"
      :data="tabs"
      :showSlider="true"
      ref="tabBar"
      :useTransition="false"
    >
     <cube-tab v-for="(item, index) in tabs"  :label="item.label" :key="item.label">
      </cube-tab>
    </cube-tab-bar>
     <cube-tab-panels v-model="selectedLabelDefault" ref="slide" >
       <cube-tab-panel v-for="(item,index) in tabs" :key="index" :label="item.label">
         <component :is="item.component" :comData="item.data" ref="component"></component>
       </cube-tab-panel>

     </cube-tab-panels>
    <!-- <div class="slide-wrapper">
      <cube-slide
        ref="slide"
        :initial-index="index"
        :loop="false"
        :auto-play="false"
        :showDots="false"
        @change="onChangeSlide"
        @scroll="onScrollSlide"
        :options="slideOptions"
      >
        <cube-slide-item v-for="(item,index) in tabs" :key="index">
          <component :is="item.component" :comData="item.data" ref="component"></component>
        </cube-slide-item>
       
      </cube-slide>
    </div> -->
  </div>
</template>
<script>

import shopcart from '../shopcart/shopcart.vue'
export default {
  props:{
    tabs:{
      type:Array,
      default(){
        return[]
      }
    },
    initalIndex:{
      type:Number,
      default:0
    }
  },
  data() {
    return {
      index:this.initalIndex,
      // tabs: [
      //   {
      //     label: "商品"
      //   },
      //   {
      //     label: "评价"
      //   },
      //   {
      //     label: "商家"
      //   }
      // ],
      slideOptions:{
        listenScroll: true,
        probeType: 3,
        threshold:0
      }
    };
  },
  components:{
    // Goods,
    // Ratings,
    // Seller
    shopcart
  },
  computed:{
    selectedLabelDefault:{
      get(){
        return this.tabs[this.index].label;
      },
      set(newVal){
        this.index=this.tabs.findIndex(val=>{
          return val.label === newVal
        });
      }
    }
  },
  created(){
    // this.onChangeSlide(this.index);
  },
  mounted(){
    this.onChangeSlide(this.index);
  },
  methods:{
    onChangeSlide(currentIndex){
      // debugger;
      this.index = currentIndex;
      const component=this.$refs.component[currentIndex];
      component.fetch && component.fetch()
    },
    onScrollSlide(pos){
      // console.log(pos.x);
      let x=pos.x;
      let tabBarWidth=this.$refs.tabBar.$el.clientWidth;
      let slideWidth=this.$refs.slide.slide.scrollerWidth;
      let transformX=-x/slideWidth*tabBarWidth;
      this.$refs.tabBar.setSliderTransform(transformX);
    }
  }
};
</script>
<style lang="stylus" scoped>
@import "../../assets/common/stylus";

.tab{
  >>> .cube-tab {
    padding:10px 0;
    flex:1;
    flex-direction:column;
    height:100%;

  }
  >>> .cube-tab_active {
    color:rgb(240,20,20)
  }
  >>> .cube-tab-bar-slider {
    background-color:rgb(240,20,20)
  }
  .slide-wrapper {
    flex:1;
    height:100%;
    overflow:hidden  
  }
}
</style>