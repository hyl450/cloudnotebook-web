import request from '@/utils/request'

export function loadUserBooks(cnUserId) {
  return request({
    url: '/notebook/loadbooks.do',
    method: 'post',
    data: {
      cnUserId
    }
  })
}

export function loadBookNotes(cnNotebookId) {
  return request({
    url: '/notebook/loadnotes.do',
    method: 'post',
    data: {
      cnNotebookId
    }
  })
}
export function loadNote(cnNoteId) {
  return request({
    url: '/notebook/loadnote.do',
    method: 'post',
    data: {
      cnNoteId
    }
  })
}
//创建笔记本
export function newbook(notebook) {
  return request({
    url:'/notebook/notebookadd.do',
    method:'post',
    data:notebook
  })
}
//删除笔记本
export function deleteBook(notebook) {
  return request({
    url:'/notebook/delbook.do',
    method:'post',
    data:notebook
  })
}
//添加笔记标题
export function addNote(note) {
  return request({
    url:'/notebook/addNote.do',
    method:'post',
    data:note
  })
}
//保存笔记
export function saveNote(note) {
  return request({
    url:'/notebook/saveNote.do',
    method:'post',
    data:note
  })
}
//将回收站笔记彻底删除
export function deleteBackNote(note) {
  return request({
    url:'/notebook/delbacknote.do',
    method:'post',
    data:note
  })
}
//将笔记移到回收站
export function recyclenote(note) {
  return request({
    url:'/notebook/recyclenote.do',
    method:'post',
    data:note
  })
}
export function loadbacknotes(userInfo) {
  return request({
    url:'/notebook/loadbacknotes.do',
    method:'post',
    data:userInfo
  })
}
export function replayNote(noteInfo) {
  return request({
    url:'/notebook/replayNote.do',
    method:'post',
    data:noteInfo
  })
}




