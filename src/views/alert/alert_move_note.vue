<template>
  <div class="modal fade in" id="modalBasic_11" tabindex="-1" role="dialog" aria-labelledby="modalBasicLabel" aria-hidden="false">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-hidden="true" @click="moveNoteClose">×</button>
          <h4 class="modal-title" id="modalBasicLabel_11">移动笔记</h4>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <label class="col-sm-3 control-label" style='margin-top:5px;'>移动至</label>
            <div class="col-sm-8">
              <select class="form-control" id="moveSelect">
                <option value="none">- 请选择 -</option>
                <option v-for="(movenote,o) in moveNotebookList" v-show="selectNoteBookId!=movenote.cnNotebookId" :key="o" :value="movenote.cnNotebookId">- {{ movenote.cnNotebookName }} -</option>
              </select>
            </div>
          </div>
        </div>
        <div class="modal-footer" style='margin-top:20px;'>
          <button type="button" class="btn btn-default cancle" data-dismiss="modal" @click="moveNoteClose">取 消</button>
          <button type="button" class="btn btn-primary sure" id="sure_move" @click="moveNote">确 定</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "moveNoteAlert",
    data() {
      return {
        moveNoteFrom:{
          cnNoteNewbookId:'',
          cnNoteId:''
        },
        //笔记本列表
        moveNotebookList: [],
        selectNoteBookId: '',
      }
    },
    methods: {
      //关闭移动笔记弹框
      moveNoteClose() {
        this.$parent.moveNoteDialog=false;
        this.$parent.opacity_bg_show=false;//背景色隐藏
      },
      //确定移动笔记
      moveNote() {
        var bookId = $("#moveSelect").val();
        if(bookId!='none') {
          this.moveNoteFrom.cnNoteNewbookId = bookId;
          this.$store.dispatch('MoveNote', this.moveNoteFrom).then(response => {
            //重新加载当前笔记本下的笔记
            this.$parent.reloadBookNotes();
            this.$parent.moveNoteDialog = false;
            this.$parent.opacity_bg_show = false;//背景色隐藏
          }).catch(() => {
          })
        } else {
          this.$parent.alert('提示','请选择要移动的笔记本', true);
        }
      }
    }
  }
</script>

<style scoped>

</style>
