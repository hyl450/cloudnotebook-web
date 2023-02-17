<template>
  <div class="modal fade in" id="modalBasic_6" tabindex="-1" role="dialog" aria-labelledby="modalBasicLabel" aria-hidden="false">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-hidden="true" @click="deleteBook">×</button>
          <h4 class="modal-title" id="modalBasicLabel_6">删除笔记本</h4>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <p> 笔记本将被<strong>彻底删除</strong>，是否继续？</p>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default cancle" data-dismiss="modal" @click="delBookClose">取 消</button>
          <button type="button" class="btn btn-primary sure" id="sure_del_book" @click="deleteBook">删 除</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  // import "@/views/css/icon.css"
  export default {
    name: "deleteNotebookAlert",
    data() {
      return {
        delBookFrom:{
          cnNotebookId: ''
        }
      }
    },
    methods:{
      deleteBook(){
        console.log("cnNotebookId:"+this.cnNotebookId);
        this.$store.dispatch('DeleteBook', this.delBookFrom).then(()=>{
          this.$parent.loadUserBooks();
          this.$parent.cnBookNotesList=[];
          this.$parent.alert('提示', '删除笔记本成功');
          this.$parent.deleteBookDialog=false;
        }).catch(() => {
          this.$parent.deleteBookDialog=false;
          this.$parent.opacity_bg_show=false;//背景色隐藏
        });
      },
      delBookClose(){
        this.$parent.deleteBookDialog=false;
        this.$parent.opacity_bg_show=false;//背景色隐藏
      }
    }
  }
</script>

<style scoped>

</style>
