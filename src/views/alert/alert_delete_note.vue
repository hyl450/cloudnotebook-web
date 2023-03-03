<template>
  <div class="modal fade in" id="modalBasic_7" tabindex="-1" role="dialog" aria-labelledby="modalBasicLabel" aria-hidden="false">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" @click="recyclenoteClose" aria-hidden="true">×</button>
          <h4 class="modal-title" id="modalBasicLabel_7">删除笔记</h4>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <p> 笔记将被删除至<strong>回收站</strong>，是否继续删除？</p>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default cancle" @click="recyclenoteClose" data-dismiss="modal">取 消</button>
          <button type="button" class="btn btn-primary sure" @click="recycleNote" id="sure_recyclenote">删 除</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  // import '../../../static/css/icon.css'
  import {getCookie} from '@/utils/support'
  export default {
    name: "deleteNoteAlert",
    data(){
      return {
        recycleNoteFrom:{
          cnNoteId:''
        }
      }
    },
    methods:{
      recycleNote() {
        this.$store.dispatch('RecycleNote', this.recycleNoteFrom).then(()=>{
          //清空编辑器
          this.$parent.clearUeditor();
          //重新加载笔记
          this.$store.dispatch('LoadBookNotes', getCookie("cnNotebookId")).then(response => {
            this.$parent.cnBookNotesList = response.data;
          }).catch(() => {
          })
          this.$parent.alert('提示', '删除笔记到回收站成功');
          this.$parent.recycleNoteDialog=false;
        }).catch(() => {
          this.$parent.recycleNoteDialog=false;
          this.$parent.opacity_bg_show=false;//背景色隐藏
        });
      },
      recyclenoteClose(){
        this.$parent.recycleNoteDialog=false;
        this.$parent.opacity_bg_show=false;//背景色隐藏
      }
    }
  }
</script>

<style scoped>

</style>
