<template>
  <div class="Orders">
    <!-- 面包屑 -->
    <div>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/Red/Shop/Goods' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>购物区</el-breadcrumb-item>
        <el-breadcrumb-item>订单列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
  

  <br>

  <!-- 删除批量选择的记录 -->
  <!-- <div style="position:relative; height: 30px;line-height:30px;">

    <div style="position:absolute;left:10px;top: 50%; transform: translateY(-50%);">
        <el-tag type="warning">
          <h2>提示：可批量选择进行删除</h2>
        </el-tag>
    </div>

    <div style="position:absolute;right:10px;top: 50%; transform: translateY(-50%);">
      <el-button type="success" plain @click="packageDelete()">删除选择记录</el-button>
    </div>
  </div> -->

  <br>
  
    <!-- 表格数据展示 -->
    <!-- <el-table :data="orders" stripe style="width: 100%"> -->
    <el-table :data="orders.slice((currentPage - 1) * pageSize, currentPage * pageSize)" stripe style="width: 100%; max-height: 700px; overflow: scroll;"
      @selection-change="handleSelectionChange"
      class="table_scrollbar"
      >

      <!-- 多选功能 -->
      <el-table-column type="selection" width="55">
      </el-table-column>

      <!-- 基本内容 -->
      <el-table-column prop="order_time" label="购买时间" width="170">
        <template v-slot="scope">
          {{ scope.row.created | dateFormat }}
        </template>
      </el-table-column>

      <!-- <el-table-column :prop="username" label="用户名" width="100">
      </el-table-column> -->

      <el-table-column prop="goodsName" label="商品名称" width="170">
      </el-table-column>

      <el-table-column prop="picture" label="商品图片" width="170">
        <template v-slot="scope">
          <img :src="scope.row.picture" alt="" style="width:80px;height: 80px; border-radius: 8px;">
        </template>
      </el-table-column>


      <!-- <el-table-column prop="goods_price" label="商品单价" width="100">
      </el-table-column> -->


      <el-table-column prop="count" label="数量" width="100">
      </el-table-column>


      <el-table-column prop="amount" label="金额" width="100">
        <template v-slot="scope">
          <el-tag type="success">{{ scope.row.amount }}</el-tag>
        </template>
      </el-table-column>

      <!-- <el-table-column prop="says" label="评价" width="190">
        <template v-slot="scope">
          <el-tag>{{ scope.row.says }}</el-tag>
        </template>
      </el-table-column> -->


      <el-table-column prop="address" label="操作">
        <template v-slot="scope">
          <!-- <el-button type="warning" plain @click="removeOrderByOrderId(scope.row.order_id)">删除</el-button> -->
          <el-button type="primary" plain @click="readyForComment(scope.$index)">添加评论</el-button>
        </template>
      </el-table-column>

    </el-table>
    <br>

    <!-- 分页 -->
    <div style="background-color:white; width: 100%; position: fixed; top: 90%" >
      <div class="block" >
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
          :page-sizes="[2, 4, 6, 8, 10]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper"
          :total="orders.length">
        </el-pagination>
      </div>
    </div>

    <br>

    <el-dialog title="添加评论" :visible.sync="centerDialogVisible" append-to-body width="40%" center >

      <div>
        <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="params.comment">
        </el-input>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addComment()">提 交</el-button>
      </span>
    </el-dialog>
  </div>
</template>
  
<script>

export default {
  data() {
    return {
      username: window.sessionStorage.getItem("username"),
      // 订单数据
      orders: [
        {
          "created": "2023-04-30T06:22:48.000+00:00",
          "updated": null,
          "id": 10,
          "goodsId": 1,
          "userId": 1,
          "goodsName": "创意家居生活用品",
          "picture": "https://tanhua-zxm.oss-cn-hangzhou.aliyuncs.com/%E5%B0%8F%E7%BA%A2%E4%B9%A6/%E5%95%86%E5%93%81/%E6%8E%A8%E8%8D%90/1/O1CN0160sQnm23r793wD3S8_%21%21267817308.jpg",
          "count": 1,
          "amount": 18.5,
          "deleted": 0
        }
      ],

      // 当前页码
      currentPage: 1,
      // 当前选择的每页多少条数据，来自:page-size里面数组选择项变化，触发的handleSizeChange()
      pageSize: 4,

      // 多选
      multipleSelection: [],

      // 控制 修改评论对话框 的展示
      centerDialogVisible: false,

      // 用于渲染对话框数据，以及后期发起网络请求用
      params: {
        id: 0,
        comment: ""
      }
    }
  },
  mounted() {
    this.getOrders()
  },
  methods: {
    // 获取用户相关的订单数据 http://localhost:8080/order
    getOrders() {
      this.$http({
        url: '/order',
        method: 'get'
      }).then(res => {
        this.orders = res.data.data;
      }).catch(res => {
        console.log(res);
      })
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
      // console.log(val)
    },

    // 评论订单操作前的预处理 
    readyForComment(index) {
      // 1、获得商品id
     this.params.order_id = this.orders[index].id;
     // 2、启用对话框
     this.centerDialogVisible = true
    },

    // 正式上交评论 http://localhost:8080/order/comment/{goodsId}
    addComment() {
      var _this = this;
      this.$http({
        url: '/order/comment/'+_this.params.id,
        params: {
          comment: _this.params.comment
        },
        method: 'post'
      }).then(res => {
        this.$message.error(res.data.data)
        _this.centerDialogVisible = false
      }).catch(res => {
        console.log(res);
      })
    },
  }
}
</script>

<style>
.Orders {
  width: 100%;
  height: 100%;
  overflow: scroll;
  position: relative;
}
.Orders::-webkit-scrollbar {
    width: 0;
    height: 0;
    background-color: transparent;
}
.table_scrollbar {
  margin-bottom: 150px;
  background-color: transparent;
}

</style>