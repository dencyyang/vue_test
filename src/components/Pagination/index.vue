<template>
  <!-- 分页器 -->
  <div class="pagination" >
    <button :disabled='pageNo==1' @click="$emit('pageNum',pageNo-1)">上一页</button>
    <button v-show="startNumAndEndNum.start > 1" @click="$emit('pageNum',pageNo-1)"> 1</button>
    <button v-show="startNumAndEndNum.start > 2">···</button>
    <!-- 中间部分 -->
    <button
      v-for="(page, index) in startNumAndEndNum.end"
      :key="index"
      v-show="page >= startNumAndEndNum.start"
      :class="{active:page==pageNo}"
      @click="$emit('pageNum',page)"
    >
      {{ page }}
    </button>

    <button v-show="startNumAndEndNum.end <totalPages-1  ">···</button>
    <button v-show="startNumAndEndNum.end <totalPages " @click="$emit('pageNum',totalPages)">{{totalPages}}</button>
    <button :disabled='pageNo==totalPages'  @click="$emit('pageNum',pageNo+1)" >下一页</button>
    <button style="margin-left: 30px">共 {{ total }} 条</button>
  </div>
</template>
<script>
export default {
  name: "Pagination",
  props: ["pageNo", "pageSize", "total", "continues","totalPages"],
  computed: {
   /*  totalPage() {
      //Math.ceil()向上取整
      return Math.ceil(this.total / this.pageSize);
    }, */
    //计算出来连续页码的起始数字和结束数字【连续页码的数字至少是5】
    startNumAndEndNum() {
      const { pageNo, continues, totalPages } = this;
      //先定义两个变量存储起始数字和结束数字
      let start = 0;
      let end = 0;
      //连续页码数字至少是5即至少是5页，若出现总共页数不足5，需要进行判断
      if (continues > totalPages) {
        //连续页码数少于5时
        start = 1;
        end = totalPages;
      } else {
        //连续页码数大于5时
        start = pageNo - Math.ceil(continues / 3);
        end = pageNo + Math.ceil(continues / 3);
        //出现不正常现象即start为0或负数
        if (start < 1) {
          start = 1;
          end = continues;
        }
        //出现不正常现象end大于totalPages
        if (end > totalPages) {
          end = totalPages;
          start = totalPages - continues + 1;
        }
      }
      return { start, end };
    },
  },
  methods:{
  
  },
};
</script>
<style lang="less" scoped>
.pagination {
  text-align: center;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
</style>