<template>
  <div class="modal fade in" id="modalBasic_2" tabindex="-1" role="dialog" aria-labelledby="modalBasicLabel" aria-hidden="false">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-hidden="true" @click="delBookClose">×</button>
          <h4 class="modal-title" id="modalBasicLabel_2">新建笔记</h4>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <label class="col-sm-3 control-label" style='margin-top:5px;'>笔记名称</label>
            <div class="col-sm-8">
              <input type="text" class="form-control" v-model="newNoteFrom.cnNoteTitle" id="input_note">
            </div>
          </div>
        </div>
        <div class="modal-footer" style='margin-top:20px;'>
          <button type="button" class="btn btn-default cancle" data-dismiss="modal" @click="delBookClose">取 消</button>
          <button type="button" class="btn btn-primary sure" id="sure_addnote" @click="addNote">创 建</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {getCookie} from '@/utils/support'
  export default {
    name: "newNoteAlert",
    data() {
      return {
        newNoteFrom: {
          cnNotebookId: '',
          cnNoteTitle: '',
          cnUserId:getCookie("userId")
        }
      }
    },
    methods: {
      addNote() {
        this.$store.dispatch('AddNote', this.newNoteFrom).then(() => {
          //重新加载笔记
          this.$store.dispatch('LoadBookNotes', getCookie("cnNotebookId")).then(response => {
            this.$parent.cnBookNotesList = response.data;
          }).catch(() => {
          })
          this.$parent.alert('提示', '笔记创建成功');
          this.$parent.newNoteDialog = false;
          // this.$parent.inputNoteTitle = this.newNoteFrom.cnNoteTitle;
          // this.$parent.editor.setContent("");
        }).catch(() => {
          this.$parent.newNoteDialog = false;
          this.$parent.opacity_bg_show = false;//背景色隐藏
        });
      },
      delBookClose() {
        this.$parent.newNoteDialog = false;
        this.$parent.opacity_bg_show = false;//背景色隐藏
      }

    }
  }
</script>

<style scoped>

</style>
