<template>
    <!-- 最外层的容器 -->
    <view class="my-settle-container">
      <!-- 全选 -->
      <label class="radio" @click="changeAllState">
        <radio color="#c00000" :checked="isFullCheck"  /><text>全选</text>
      </label>
      
      <!-- 合计 -->
      <view class="amount-box">
        合计：<text class="amount">¥{{checkedGoodsAmount}}</text>
      </view>
      <!-- 结算按钮 -->
      <view class="btn-settle">结算({{checkedCount}})</view>
    </view>
</template>

<script>
  import {mapGetters,mapMutations} from 'vuex'
import { compile, computed } from "vue";
  
  export default {
    name:"my-settle",
    data() {
      return {
        
      };
    },

  computed:{
    ...mapGetters('m_cart',['checkedCount','total','checkedGoodsAmount']),
    isFullCheck(){
      return this.total === this.checkedCount
    }
  },
  methods:{
    ...mapMutations('m_cart' , ['updateAllGoodsState']),
    changeAllState(){
      this.updateAllGoodsState(!this.isFullCheck)
    }
  }
}
</script>

<style lang="scss">
.my-settle-container{
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: white;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-left: 5px;
  .radio{
    display: flex;
    align-items: center;
  }
  
  .amount-box{
    .amount{
      color: red;
      font-weight: bold;
    }
  }
  
  .btn-settle{
    background-color: red;
    height: 50px;
    color: white;
    line-height: 50px;
    padding: 0 10px;
    min-width: 100px;
    text-align: center;
  }
}
</style>