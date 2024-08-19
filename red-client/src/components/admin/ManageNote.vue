<template>
    <div class="man_note">
        <div class="title">
          <div>管理笔记</div>
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
        <div class="note_item" v-for="item in Notes_Data.records">
           <div class="item_image">
             <img :src="item.surfacePicture" alt="" srcset="">
           </div>
           <div class="item_content">
                <div class="item_content_title">
                  <h3>{{ item.title }}</h3>
                </div>

                <div style="color: #999;padding-top: 2px;">
                  <i class="el-icon-time"></i> 创建: {{item.created | dateFormat}} &nbsp; &nbsp;
                  <i class="el-icon-collection-tag"></i>标签：{{item.tag}} &nbsp; &nbsp;
                  <i class="el-icon-circle-check"></i>点赞：{{item.praisenum}} &nbsp; &nbsp;
                </div>

                <div style="padding-top: 1px;">
                  <span style="color: #42c9a0;"> 已发布 &nbsp; &nbsp;</span> <br>
                  <span style="color: #999;"><i class="el-icon-edit-outline "></i>修改：{{ item.updated | dateFormat }}</span>
                </div>

                <div>
                  <el-button type="primary" icon="el-icon-delete" plain @click="delete_noteById(item.id)">删除笔记</el-button>
                  <!-- <el-link icon="el-icon-delete" :underline="false">删除笔记</el-link> -->
                </div>
           </div>
           <div class="item_imfo">
            <h3>笔记内容：</h3>  
            {{ item.content }}
           </div>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {

      Notes_Data: {
        "records": [
          {
            "created": "2023-04-25T12:14:30.000+00:00",
            "updated": "2023-04-25T12:14:30.000+00:00",
            "id": 1,
            "userId": 1,
            "username": "xm",
            "title": "趁天还没热再来叠穿下",
            "content": "不然就来不及了",
            "tag": "推荐",
            "surfacePicture": "https://tanhua-zxm.oss-cn-hangzhou.aliyuncs.com/%E5%B0%8F%E7%BA%A2%E4%B9%A6/%E7%AC%94%E8%AE%B0/%E6%8E%A8%E8%8D%90/%E8%A7%86%E9%A2%91/1/%E5%B0%81%E9%9D%A2.png",
            "praisenum": 34244,
            "deleted": 0
          }
        ],
        "total": 14,
        "size": 10,
        "current": 1,
        "orders": [],
        "optimizeCountSql": true,
        "hitCount": false,
        "countId": null,
        "maxLimit": null,
        "searchCount": true,
        "pages": 2
      },
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
      value: '1'
    }
  },
  watch: {
    // 当多选框的值发生变化，重新请求数据
    'value'(newVal, oldVal) {
      this.get_Notes_Data(newVal,2)
      this.$message.success("切换页成功")
    }
  },
  mounted(){
    this.get_Notes_Data(1,2)
  },
  methods: {
    // 管理员按页码获取笔记数据 http://localhost:8080/manage
    get_Notes_Data (num1,num2) {
      this.$http({
        url: '/manage',
        params: {
          //键值对
          page: num1, // 当前页
          pageSize: num2 // 页尺寸
        },
        method: 'get'
      }).then(res => {
        if (res.status !== 200) {
          return this.$message.error('获取笔记内容失败')
        } else {
          this.$message.success('获取笔记内容成功')
          this.Notes_Data = res.data.data
        }
      }).catch(res => {
        console.log(res);
      })
    },

    // 删除笔记 http://localhost:8080/manage/remove/{noteId}
    delete_noteById (id) {
      this.$http({
        url: '/manage/remove/'+id,
        method: 'put'
      }).then(res => {
        if (res.status !== 200) {
          return this.$message.error('删除失败')
        } else {
          this.$message.success('删除成功')
          this.get_Notes_Data(1,2)
          this.value = '1'
        }
      }).catch(res => {
        console.log(res);
      })
    }
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

.note_item {
  height: 160px;
  width: 100%;
  display: flex;
  padding: 20px;
  flex-basis: 20%;
  border-bottom: 1px solid rgb(238, 241, 248);;
  .item_image {
    height: 120px;
    width: auto;
    img {
      width: 120px;
    }
    padding-right: 25px;
  }
  .item_content {
    height: 30px;
    line-height: 30px;
    flex-basis: 30%;
    // background-color: aquamarine;
    .item_content_title {
      // font-size: 16px;
      // color: #2d2d2d;
      // font-weight: 700;
      h3 {
        height: 30px;
        line-height: 30px;
        margin: 0;
        padding: 0;
      }
    }
  }
  .item_imfo {
    padding-left: 10px;
    padding-top: 20px;
    flex-basis: 50%;
  }
}
</style>