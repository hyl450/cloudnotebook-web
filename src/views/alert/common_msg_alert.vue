<template>
  <div class="modal fade in" id="modalBasic_8" tabindex="-1" role="dialog" aria-labelledby="modalBasicLabel" aria-hidden="false">
    <div class="modal-dialog" style="width:350px;">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
          <h4 class="modal-title" id="modalBasicLabel_8">{{caption}}</h4>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <p style='word-wrap:break-word;text-align:justify;' id='error_info'>{{msg}}</p>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default cancle" data-dismiss="modal" @click="confirmClick">确 定</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  // import "@/views/css/icon.css"
  export default {
    name: 'commonMsgAlert',//组件递归必须有name属性 不然无法递归
    data() {
      return {
        caption:'',
        msg:''
      }
    },

    methods: {
      close() {
        this.$emit('close');
        this.$parent.commonMsgDialog=false;
        this.$parent.opacity_bg_show=false;//背景色隐藏
      },
      confirmClick() {
        this.$emit('close');
        this.$parent.commonMsgDialog=false;
        this.$parent.opacity_bg_show=false;//背景色隐藏
      }
    }
  }
</script>

<style scoped>

</style>
