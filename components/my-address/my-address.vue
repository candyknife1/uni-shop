<template>
  <view>
    <!-- 选择收货地址 -->
    <view class="address-choose-box" v-if="JSON.stringify(address) === '{}'">
      <button type="primary" size="mini" class="addressChooseAddress" @click="chooseAddress">
        请选择收货地址+
      </button>
    </view>
    
    <!-- 渲染收货信息 -->
    <view class="address-info-box" v-else  @click="chooseAddress">
      <view class="row1">
        <view class="row1-left">
          <view class="username"> 收货人：{{address.userName}}</view>
        </view>
        <view class="row-right">
          <view class="Phone">电话：{{address.telNumber}}</view>
          <uni-icons type="arrowright" size="16"></uni-icons>
        </view>
      </view>
      <view class="row2">
        <view class="row2-left">收货地址： </view>
        <view class="row2-right">{{addstr}}</view>
      </view>
    </view>
    
    <!-- 底部边框线 -->
    <image src="/static/cart_border@2x.png" class="address-border">
  </view>
</template>

<script>
  import { mapState, mapMutations,mapGetters} from 'vuex'
  export default {
    name:"my-address",
    computed: {
      ...mapState('m_user',['address']),
      // 收货详细地址的计算属性
      ...mapGetters('m_user',['addstr'])
    },
    data() {
      return {
        // address:{}
      };
    },
    methods:{
      ...mapMutations('m_user',['updateAddress']),
      async chooseAddress() {
        try {
          // 调用 uni.chooseAddress() 方法
          const succ = await uni.chooseAddress();
          // 判断返回值是否成功
          if (succ && succ.errMsg === 'chooseAddress:ok') {
            // 为 data 中的收货地址对象赋值
            // this.address = succ;
            this.updateAddress(succ)
          } else {
            // 如果用户取消选择，记录日志或友好提示
            console.warn('用户取消了选择地址');
            uni.showToast({
              title: '取消选择地址',
              icon: 'none',
            });
          }
        } catch (err) {
          // 捕获错误，防止程序崩溃
          console.error('选择地址失败：', err);
          uni.showToast({
            title: '获取地址失败，请重试',
            icon: 'none',
          });
        }
      },
      
    }
  }
</script>

<style lang="scss">
  .address-border{
    display: block;
    width: 100%;
    height: 5px;
  }
  
  .address-choose-box{
    height: 90px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .address-info-box{
    font-size: 12px;
    height: 90px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0 5px;
    
    .row1{
      display: flex;
      justify-content: space-between;
      .row1-left{
        .username{}
      }
      .row-right{
        display: flex;
        justify-content: space-between;
        .Phone{}
      }
    }
    .row2{
      display: flex;
      align-items: center;
      margin-top: 10px;
      .row2-left{
        white-space: nowrap;
      }
      .row2-right{}
    }
  }

</style>