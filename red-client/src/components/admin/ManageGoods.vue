<template>
  <div class="man_note">
      <div class="title">
        <div>管理商品</div>
        <div style="margin-right: 10px;">
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
      </div>

      <!-- 核心内容区 -->
      <br>

      <el-table :data="goodsMan_data.records.slice((currentPage - 1) * pageSize, currentPage * pageSize)" stripe style="width: 100%; max-height: 700px; overflow: scroll;"
      @selection-change="handleSelectionChange"
      class="table_scrollbar"
      >

      <!-- 多选功能 -->
      <el-table-column type="selection" width="55">
      </el-table-column>

      <!-- 基本内容 -->
      <el-table-column prop="created" label="创建时间" width="170">
        <template v-slot="scope">
          {{ scope.row.created | dateFormat }}
        </template>
      </el-table-column>

      <el-table-column prop="goodsName" label="商品名称" width="170">
      </el-table-column>

      <el-table-column prop="picture" label="商品图片" width="170">
        <template v-slot="scope">
          <img :src="scope.row.picture" alt="" style="width:80px;height: 80px; border-radius: 8px;">
        </template>
      </el-table-column>

      <el-table-column prop="goodsContent" label="内容介绍" width="100">
        <template v-slot="scope">
          {{ scope.row.goodsContent.slice(0, 10) }}·····
        </template>
      </el-table-column>


      <el-table-column prop="price" label="价格" width="100">
        <template v-slot="scope">
          <el-tag type="success">{{ scope.row.price }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column prop="returnRate" label="返利比" width="100">
        <template v-slot="scope">
          <el-tag type="error">{{ scope.row.returnRate }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column prop="address" label="操作">
        <template v-slot="scope">
          <el-button type="warning" plain @click="delete_ById(scope.row.id)">删除</el-button>
          <el-button type="primary" plain @click="prepare_alter(scope.$index)">修改</el-button>
        </template>
      </el-table-column>

    </el-table>
    <br>

    <!-- 分页 -->
    <div style="background-color:white; width: 100%; position: fixed; top: 75%">
      <div class="block" >
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
          :page-sizes="[2, 4, 6, 8, 10]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper"
          :total="goodsMan_data.records.length">
        </el-pagination>
      </div>
    </div>

    
    <el-drawer
      title="修改商品内容"
      :visible.sync="drawer"
      :with-header="false"
      append-to-body
      >

      <h1 style="text-align: center">修改商品内容</h1>

      <div style="padding: 20px; margin-top: 60px;">
        
      <div style="margin-bottom: 10px;">
          <el-input
            placeholder="请输入内容"
            v-model="alter_data.goodsName">
            <template slot="prepend">商品名</template>
          </el-input>
      </div>

      <div style="margin-bottom: 10px;">
        <el-input
          placeholder="请输入内容"
          v-model="alter_data.goodsContent">
          <template slot="prepend">商品内容</template>
        </el-input>
      </div>

      <div style="margin-bottom: 10px;">
        <el-input
          placeholder="请输入内容"
          v-model="alter_data.price">
          <template slot="prepend">商品价格</template>
        </el-input>
      </div>

      <div style="margin-bottom: 10px;">
        <el-input
          placeholder="请输入内容"
          v-model="alter_data.returnRate">
          <template slot="prepend">返利率</template>
        </el-input>
      </div>

      <div style="margin-bottom: 10px;">
        <el-select v-model="alter_data.goodsTag" placeholder="请选择标签">
          <el-option
            v-for="item in options2"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
     
      <el-button type="primary" plain @click="send_alter">提交修改</el-button>
 
      </div>

      
    </el-drawer>

  </div>
</template>

<script>
export default {
data() {
  return {
    // 多选框 用于选择分页
    options: [{
          value: '1',
          label: '第一页'
        }, {
          value: '2',
          label: '第二页'
        }
      ],
      // 当前多选框的值
      value: '1',

      // 商品管理内容
      goodsMan_data: {
        "records": [
          {
            "created": "2023-04-30T06:19:17.000+00:00",
            "updated": null,
            "id": 1,
            "goodsName": "创意家居生活用品",
            "price": 18.5,
            "goodsContent": "品牌: 小凡家居风格: 时尚包装种类:",
            "goodsTag": "家居",
            "picture": "https://tanhua-zxm.oss-cn-hangzhou.aliyuncs.com/%E5%B0%8F%E7%BA%A2%E4%B9%A6/%E5%95%86%E5%93%81/%E6%8E%A8%E8%8D%90/1/O1CN0160sQnm23r793wD3S8_%21%21267817308.jpg",
            "returnRate": 0.3,
            "deleted": 0
          }
        ],
        "total": 50,
        "size": 10,
        "current": 1,
        "orders": [],
        "optimizeCountSql": true,
        "hitCount": false,
        "countId": null,
        "maxLimit": null,
        "searchCount": true,
        "pages": 5
      },
      // 当前页码
      currentPage: 1,
      // 当前选择的每页多少条数据，来自:page-size里面数组选择项变化，触发的handleSizeChange()
      pageSize: 4,
      // 多选
      multipleSelection: [],
      // 控制 修改评论对话框 的展示
      centerDialogVisible: false,

      // 多选框
      options2: [{
          value: '推荐',
          label: '推荐'
        }, {
          value: '家居',
          label: '家居'
        }, {
          value: '评价',
          label: '评价'
        }, {
          value: '潮流',
          label: '潮流'
        }, {
          value: '其他',
          label: '其他'
      }],

      // 修改内容
      alter_data: {
        id: 0,
        goodsContent: '',
        goodsName: '',
        goodsTag: '',
        picture: '',
        price: '',
        returnRate: '',
      },
      // 抽屉控制
      drawer: false,
  }
},
watch: {
  // 当多选框的值发生变化，重新请求数据
  'value'(newVal, oldVal) {
    this.get_goodsMan_data(newVal,2)
    this.$message.success("切换页成功")
  }
},
mounted(){
  this.get_goodsMan_data(1,2)
},
methods: {
  // 商品分页列表 http://localhost:8080/backend
  get_goodsMan_data (num1,num2) {
      this.$http({
        url: '/backend',
        params: {
          //键值对
          page: num1, // 当前页
          pageSize: num2 // 页尺寸
        },
        method: 'get'
      }).then(res => {
        if (res.status !== 200) {
          return this.$message.error('获取商品后台数据失败')
        } else {
          this.$message.success("获取商品后台数据成功")
          this.goodsMan_data = res.data.data
        }
      }).catch(res => {
        console.log(res);
      })
    },

    // 删除笔记 http://localhost:8080/backend/delete/{goodsId}
    delete_ById (id) {
      this.$http({
        url: '/backend/delete/'+id,
        method: 'put'
      }).then(res => {
        if (res.status !== 200) {
          return this.$message.error(res.data.data)
        } else {
          this.$message.success(res.data.data)
          this.get_goodsMan_data(1,2)
          this.value = '1'
        }
      }).catch(res => {
        console.log(res);
      })
    },

    // 修改内容前的预备操作
    prepare_alter (content) {
      this.alter_data.id = this.goodsMan_data.records[content].id
      this.alter_data.goodsContent = this.goodsMan_data.records[content].goodsContent
      this.alter_data.goodsName = this.goodsMan_data.records[content].goodsName
      this.alter_data.goodsTag = this.goodsMan_data.records[content].goodsTag
      this.alter_data.picture = this.goodsMan_data.records[content].picture
      this.alter_data.price = this.goodsMan_data.records[content].price
      this.alter_data.returnRate = this.goodsMan_data.records[content].returnRate
      this.drawer = true

    },

    // 提交修改内容 http://localhost:8080/backend/update/{goodsId}
    send_alter () {
      this.$http({
        url: '/backend/update/'+this.alter_data.id,
        data:{
          goodsContent: this.alter_data.goodsContent,
          goodsName: this.alter_data.goodsName,
          goodsTag: this.alter_data.goodsTag,
          picture: this.alter_data.picture,
          price: this.alter_data.price,
          returnRate: this.alter_data.returnRate,
        },
        method: 'put'
      }).then(res => {
        if (res.status !== 200) {
          return this.$message.error(res.data.data)
        } else {
          this.$message.success(res.data.data)
          this.get_goodsMan_data(1,2)
          this.value = '1'

          this.alter_data = {
            id: 0,
            goodsContent: '',
            goodsName: '',
            goodsTag: '',
            picture: '',
            price: '',
            returnRate: '',
          }
        }
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
}
}
</script>

<style lang="less" scoped>
.man_note {
width: 98%;
height: 98%;
background-color: white;
border-radius: 20px;
overflow: hidden;
position: absolute;
top: 50%;
left: 50%;
transform: translate(-50%,-50%);
padding-top: 10px;
padding-left: 20px;
// padding-bottom: 240px;
overflow: scroll;
}
.man_note::-webkit-scrollbar {
  width: 0;
  height: 0;
  background-color: transparent;
}

.title {
display: flex;
-webkit-box-pack: justify;
justify-content: space-between;
-webkit-box-align: center;
align-items: center;
position: relative;
height: 32px;
font-size: 24px;
// margin-top: 10px;
// margin-left: 20px;
padding-left: 12px;
}
.title::before {
position: absolute;
left: 0px;
width: 5px;
top: 4px;
bottom: 4px;
background-color: rgb(58, 100, 255);
content: "";
border-radius: 16px;
}

</style>