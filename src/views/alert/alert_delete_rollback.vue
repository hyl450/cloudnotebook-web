<template>
  <div class="modal fade in" id="modalBasic_10" tabindex="-1" role="dialog" aria-labelledby="modalBasicLabel" aria-hidden="false">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-hidden="true" @click="rollbackClose">×</button>
          <h4 class="modal-title" id="modalBasicLabel_10">彻底删除笔记</h4>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <p> 该笔记将被<strong>彻底删除</strong>，是否继续？</p>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default cancle" data-dismiss="modal" @click="rollbackClose">取 消</button>
          <button type="button" class="btn btn-primary sure" id="sure_del_note" @click="deleteBackNote">继 续</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  // import "@/views/css/icon.css"
  export default {
    name: "deleteRollbackAlert",
    data(){
      return {
        delBackNoteFrom:{
          cnNoteId:''
        }
      }
    },
    methods:{
      deleteBackNote(){
        this.$store.dispatch('DeleteBackNote', this.delBackNoteFrom).then(()=>{
          this.$parent.clearBackNotePage();
          //重新加载回收站笔记
          this.$parent.rollBack();
          this.$parent.alert('提示', '删除笔记成功');
          this.$parent.rollbackDialog=false;
        }).catch(() => {
          this.$parent.rollbackDialog=false;
          this.$parent.opacity_bg_show=false;//背景色隐藏
        });
      },
      rollbackClose(){
        this.$parent.rollbackDialog=false;
        this.$parent.opacity_bg_show=false;//背景色隐藏
      }
    }
  }
</script>

<style scoped>

</style>
