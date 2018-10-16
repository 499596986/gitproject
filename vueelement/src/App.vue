<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style lang="less">
#app {
 
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}


.fade-enter,.fade-leave-active{
  opacity:0;
}
.fade-enter-active,.fade-leave-active{
  transition:all 0.2s;
}

/**数据管理**/
.datamanage thead tr th{
  background:#eef1f6;
  color:#000;
}
.datamanage tbody tr td{
  padding:8px 0px;
  border-right:0px;
  color:#303030;
}
.datamanage .pagination{
  padding-top:20px;
  padding-bottom:20px;
  button{
    border:1px solid #999;
    padding-right:6px;
    &:last-child{
      border-left:0px;
      padding-left:6px;
    }
  }
  li{
    border:1px solid #999;
    border-left:0px;
    font-weight:400;
    &.active{
      background:#20a0ff;
      color:#fff;
    }
  }
}
.datamanage{
  tbody .el-table_1_column_1 .el-table__expand-icon i{
    transform:scale(1.5);
    -webkit-transform:scale(1.5);
    -ms-transform:scale(1.5);
  }
}

/**添加数据**/
.adddata{
  width:50%;
  min-width:500px;
  margin:0px auto;
  .el-input__inner{
    border:1px solid #999;
  }
  .el-table td, .el-table th{
    padding:6px 0px;
  }
  .el-table th{
    background:#eef1f6;
    color:#000;
  }
  .el-table--border td{border-right:0px;}
}
</style>
