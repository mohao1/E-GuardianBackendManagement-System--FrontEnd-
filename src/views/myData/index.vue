<template>
  <div class="dataIndex">
    <div class="box-card">
      <img src="https://tupian.qqw21.com/article/UploadPic/2015-3/201531721351158436.gif" alt="" class="imgs">
      <div class="card-Itme">
        <div>
          <div class="title">

          </div>
          <div class="bodlay">

          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  
<script>
export default {
  name: "myData",
  data() {
    return {

    }
  },
  methods: {

  },
}
</script>
  
<style lang="less" scoped>
.dataIndex{
  display: flex;
  justify-content: center;
  .text {
    font-size: 14px;
  }

  .item {
    padding: 18px 0;
  }

  .box-card {
    width: 80%;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-width: 1px;
    border-style: solid;
    .imgs{
      width: 30%;
    }
    .card-Itme{
      border-block-color: #000;
      border-width: 1px;
      border-style: solid;
      width: 600px;
      .bodlayz{
        
      }
      .title{

      }
    }
  }
}
</style>