<template>
  <div class="ShopCar">
    <!-- 面包屑 -->
    <div>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/Red/Shop/Goods' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>购物区</el-breadcrumb-item>
        <el-breadcrumb-item>购物小车</el-breadcrumb-item>
      </el-breadcrumb>

    </div>
    .
    <br>

    <div style="position:relative; height: 30px;line-height:30px;">

      <!-- <div style="position:absolute;left:10px;top: 50%; transform: translateY(-50%);">
        <el-tag type="warning">
          欢迎： {{ userInformation.username}}
        </el-tag>
        &nbsp;&nbsp;
        <el-tag>
          账户余额： {{ userInformation.wallet}} 元
        </el-tag>
      </div> -->

      <div style="position:absolute;right:10px;top: 50%; transform: translateY(-50%);">
        <!-- <el-button type="success" plain @click="warnShow()">结算购物车</el-button> -->
        <el-button type="primary" plain  @click="totalBuy()">结算购物车</el-button>
      </div>

    </div>

    <br>
    <el-table :data="shop_cart.slice((currentPage - 1) * pageSize, currentPage * pageSize)" 
    stripe style="width: 100%; text-align: center;" 
    @selection-change="handleSelectionChange" 
    >

      <!-- 多选功能 -->
      <el-table-column type="selection" width="55">
      </el-table-column>

      <el-table-column prop="picture" label="图片" width="180">
        <template v-slot="scope">
          <img :src="scope.row.picture" alt="" style="width:80px;height: 80px; border-radius: 8px;">
        </template>
      </el-table-column>

      <el-table-column prop="goodsName" label="名称" width="180">
      </el-table-column>


      <el-table-column prop="price" label="单价">
      </el-table-column>


      <el-table-column  prop="count" label="数量">
        <template v-slot="scope">
          <el-input-number 
            v-model="shop_cart[scope.$index].count" :min="1" :max="10" label="购买数量"  
            @change="(currentValue, oldValue) => handleChange(currentValue, oldValue, scope.row)">
          </el-input-number>
        </template>
      </el-table-column>


      <el-table-column prop="amount" label="金额">
        <template v-slot="scope">
          <el-tag>{{ shop_cart[scope.$index].amount }}</el-tag>
        </template>
      </el-table-column>


      <el-table-column prop="shopping_cart_id" label="操作">
        <template v-slot="scope">
          <el-button type="danger" plain @click="removeShopCartByIndex(scope.$index)">删除</el-button>
          <!-- <el-button type="primary" plain @click="simpleBuy(scope.$index)">购买</el-button> -->
        </template>
      </el-table-column>

    </el-table>
    
    <!-- 分页 -->
    <div style="background-color:white; width: 100%; position: fixed; top: 90%">
      <div class="block" >
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
          :page-sizes="[2, 4, 6, 8, 10]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper"
          :total="shop_cart.length">
        </el-pagination>
      </div>
    </div>
  </div>
</template>
  
<script>


export default {
  data() {
    return {
      // 购物车数据
      shop_cart: [
        {
            "created": "2023-04-29T14:47:35.000+00:00",
            "updated": "2023-04-29T16:36:10.000+00:00",
            "id": 8,
            "userId": 1,
            "goodsId": 1,
            "goodsName": "创意家居生活用品",
            "price": 18.5,
            "picture": "https://tanhua-zxm.oss-cn-hangzhou.aliyuncs.com/%E5%B0%8F%E7%BA%A2%E4%B9%A6/%E5%95%86%E5%93%81/%E6%8E%A8%E8%8D%90/1/O1CN0160sQnm23r793wD3S8_%21%21267817308.jpg",
            "count": 1,
            "amount": 18.5,
            "deleted": 0
        }
      ],
      // 个人信息
      userInformation: {
        "grade": "vip",
        "level": 1,
        "password": "123456",
        "state_message": "这个人很懒，什么都没有留下",
        "type": "root",
        "user_id": 4,
        "user_picture": "http://192.168.123.53:8888/sports_shop_backend_war/users_picture/kzb68up.jpg",
        "username": "冰镇生鲜",
        "wallet": -2995
      },
      // 当前页码
      currentPage: 1,
      // 当前选择的每页多少条数据，来自:page-size里面数组选择项变化，触发的handleSizeChange()
      pageSize: 4,
  
      // 多选
      multipleSelection: [],
      }
  },
  mounted () {
    this.getShopCart();
    // this.getUserInfo();
  },
  methods: {

    // 网络请求，获取购物车数据 http://localhost:3000/shoppingCart 后端会自己从token里面拿到userID
    getShopCart () {
      this.$http({
        url: '/shoppingCart',
        method: 'get'
      }).then(res => {
        this.shop_cart = res.data.data
      }).catch(res => {
        console.log(res);
      })
    },

    // 删除 购物车数据 （通过利用索引获得目标数组的 shopping_cart_id ）
    // http://localhost:8080/shoppingCart/remove/{goodsId}
    removeShopCartByIndex (index) {
      // console.log(this.shop_cart[index].shopping_cart_id)
      this.$http({
        url: '/shoppingCart/remove/' + this.shop_cart[index].id,
        method: 'put'
      }).then(res => {
        this.$message.error(res.data.data)
      }).catch(res => {
        console.log(res);
      })
    },

    // 计数器触发，改变购物车数据
    handleChange(currentValue, oldValue,rowData) {
      //  console.log(currentValue) // 新数据
      //  console.log(oldValue) // 旧数据
      //  console.log(rowData) // 本行数据 id为rowData.id

      // 增加购物车数量 http://localhost:8080/shoppingCart/addCount/{goodsId}
      if (currentValue - oldValue > 0) {
          this.$http({
            url: '/shoppingCart/addCount/'+rowData.id,
            method: 'post'
          }).then(res => {
            this.$message.success(res.data.data)
          }).catch(res => {
            console.log(res);
          })
      }
      // 减少购物车数量 http://localhost:8080/shoppingCart/reduceCount/{goodsId}
      else if (currentValue - oldValue < 0) {
          this.$http({
              url: '/shoppingCart/reduceCount/'+rowData.id,
              method: 'post'
            }).then(res => {
              this.$message.success(res.data.data)
            }).catch(res => {
              console.log(res);
            })
      }
      // 重新加载购物车数据
      this.getShopCart()
    },

    // 修改每页多少条数据
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.pageSize = val;
    },

    // 当前页编号
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.currentPage = val;
    },

    // 多选功能
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },

    // 批量删除订单
    // packageDelete() {
    //   for (var i = 0; i < this.multipleSelection.length; i++) {
    //     // this.removeOrderByOrderId(this.multipleSelection[i].order_id)
    //     this.deleteOrdersById (this.multipleSelection[i].order_id)
    //   }
    // },

    // 购物车结算商品 http://localhost:8080/shoppingCart/settlement
    totalBuy () {
      const mylist = []
      for (var i = 0; i < this.multipleSelection.length; i++) {
        mylist.push(this.multipleSelection[i].id)
      }
      console.log(mylist)
      this.$http({
        url: '/shoppingCart/settlement',
        params: {
          goodsIdList: mylist
        },
        method: 'post'
      }).then(res => {
        this.$message.success(res.data.data)
      }).catch(err => {
        console.log(err);
      })
    },
  }
}
</script>

<style>
.ShopCar {
  width: 100%;
  height: 100%;
  overflow: scroll;
  position: relative;
  overflow: scroll;
}
.table_scrollbar {
  margin-bottom: 150px;
}
.ShopCar::-webkit-scrollbar {
    width: 0;
    height: 0;
    background-color: transparent;
}
</style>