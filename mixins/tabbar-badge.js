    import { mapGetters } from 'vuex'
export default{
    watch: {
      // 监听 total 值的变化
      total() {
        // 调用 methods 中的 setBadge 方法，重新为 tabBar 的数字徽章赋值
        this.setBadge()
      },
    },
    onShow() {
      if (this.total !== 0) {
       // 在页面刚展示的时候，设置数字徽标
       this.setBadge()
       }
    },
      computed: {
        // 将 m_cart 模块中的 total 映射为当前页面的计算属性
        ...mapGetters('m_cart', ['total']),
      },
      methods: {
        setBadge() {
           // 调用 uni.setTabBarBadge() 方法，为购物车设置右上角的徽标
           uni.setTabBarBadge({
              index: 2, // 索引
              text: this.total + '' // 注意：text 的值必须是字符串，不能是数字
           })
        },
      },
}