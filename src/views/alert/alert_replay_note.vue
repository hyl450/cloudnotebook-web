<template>
  <div class="modal fade in" id="modalBasic_3" tabindex="-1" role="dialog" aria-labelledby="modalBasicLabel" aria-hidden="false">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-hidden="true" @click="replayNoteClose">×</button>
          <h4 class="modal-title" id="modalBasicLabel_3">恢复笔记</h4>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <label class="col-sm-3 control-label" style='margin-top:5px;'>恢复至</label>
            <div class="col-sm-8">
              <select class="form-control" id="replaySelect" >
                <option :value="defaultBookId">- 默认笔记本 -</option>
                <option v-for="(replaynote,o) in replayNotebookList" :key="o" :value="replaynote.cnNotebookId">- {{ replaynote.cnNotebookName }} -</option>
              </select>
            </div>
          </div>
        </div>
        <div class="modal-footer" style='margin-top:20px;'>
          <button type="button" class="btn btn-default cancle" data-dismiss="modal" @click="replayNoteClose">取 消</button>
          <button type="button" class="btn btn-primary sure" id="sure_replay" @click="replayNote">恢 复</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "replayNoteAlert",
    data() {
      return{
        replayNotebookList:[],
        defaultBookId:'',
        replayForm:{
          cnNoteNewbookId:'',
          cnNoteId:''
        }
      }
    },
    methods:{
      //回收站笔记还原
      replayNote() {
        this.replayForm.cnNoteNewbookId=$("#replaySelect").val();
        this.$store.dispatch('ReplayNote', this.replayForm).then(response => {
          //重新加载回收站笔记
          this.$parent.rollBack();
          this.$parent.replayNoteDialog=false;
          this.$parent.opacity_bg_show=false;//背景色隐藏
        }).catch(() => {
        })
      },
      replayNoteClose(){
        this.$parent.replayNoteDialog=false;
        this.$parent.opacity_bg_show=false;//背景色隐藏
      }
    }
  }
</script>

<style scoped>

</style>
