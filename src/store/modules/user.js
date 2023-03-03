import { login, logout, getInfo,register,updatePassword} from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'
import {setSupport,getSupport,setCookie,getCookie} from '@/utils/support'
import {loadUserBooks,loadBookNotes,loadNote,newbook,deleteBook,addNote,saveNote,deleteBackNote,recyclenote,loadbacknotes,replayNote} from '@/api/notebook'

const user = {
  state: {
    token: getToken(),
    name: '',
    avatar: '',
    roles: []
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        login(userInfo).then(response => {
          const data = response.data
          console.log(data)
          // debugger;
          // const tokenStr = data.tokenHead+data.token
          // setToken(tokenStr)
          // commit('SET_TOKEN', tokenStr)
          setCookie("userId",data,2);
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 注册
    Register({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        register(userInfo).then(response => {
          // const data = response.data
          // const tokenStr = data.tokenHead+data.token
          // setToken(tokenStr)
          // commit('SET_TOKEN', tokenStr)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    LoadUserBooks({commit}, userId) {
      return new Promise((resolve, reject) => {
        loadUserBooks(userId).then(response => {
          const data = response.data
          resolve(response)
          console.log(data);
        }).catch(error => {
          reject(error)
        })
      })
    },
    LoadBookNotes({commit}, noteBookId) {
      return new Promise((resolve, reject) => {
        loadBookNotes(noteBookId).then(response => {
          const data = response.data
          resolve(response)
          console.log(data);
        }).catch(error => {
          reject(error)
        })
      })
    },

    //加载笔记内容
    LoadNote({commit}, cnNoteId) {
      return new Promise((resolve, reject) => {
        loadNote(cnNoteId).then(response => {
          const data = response.data
          resolve(response)
          console.log(data);
        }).catch(error => {
          reject(error)
        })
      })
    },

    //新建笔记本
    Newbook({commit}, notebook) {
      return new Promise((resolve, reject) => {
        newbook(notebook).then(response => {
          const data = response.data
          resolve(response)
          console.log(data);
        }).catch(error => {
          reject(error)
        })
      })
    },

    //删除笔记本
    DeleteBook({commit}, notebook) {
      return new Promise((resolve, reject) => {
        deleteBook(notebook).then(response => {
          const data = response.data
          resolve(response)
          console.log(data);
        }).catch(error => {
          reject(error)
        })
      })
    },

    //创建笔记
    AddNote({commit}, note) {
      return new Promise((resolve, reject) => {
        addNote(note).then(response => {
          const data = response.data
          resolve(response)
          console.log(data);
        }).catch(error => {
          reject(error)
        })
      })
    },

    //保存笔记
    SaveNote({commit}, note) {
      return new Promise((resolve, reject) => {
        saveNote(note).then(response => {
          const data = response.data
          resolve(response)
          console.log(data);
        }).catch(error => {
          reject(error)
        })
      })
    },

    //将回收站笔记彻底删除
    DeleteBackNote({commit}, note) {
      return new Promise((resolve, reject) => {
        deleteBackNote(note).then(response => {
          const data = response.data
          resolve(response)
          console.log(data);
        }).catch(error => {
          reject(error)
        })
      })
    },

    //将笔记删除到回收站
    RecycleNote({commit}, note) {
      return new Promise((resolve, reject) => {
        recyclenote(note).then(response => {
          const data = response.data
          resolve(response)
          console.log(data);
        }).catch(error => {
          reject(error)
        })
      })
    },

    //查询回收站笔记
    LoadBackNotes({commit}, userInfo) {
      return new Promise((resolve, reject) => {
        loadbacknotes(userInfo).then(response => {
          const data = response.data
          resolve(response)
          console.log(data);
        }).catch(error => {
          reject(error)
        })
      })
    },

    //还原回收站笔记
    ReplayNote({commit}, noteInfo) {
      return new Promise((resolve, reject) => {
        replayNote(noteInfo).then(response => {
          const data = response.data
          resolve(response)
          console.log(data);
        }).catch(error => {
          reject(error)
        })
      })
    },


    // 获取用户信息
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getInfo().then(response => {
          const data = response.data
          if (data.roles && data.roles.length > 0) { // 验证返回的roles是否是一个非空数组
            commit('SET_ROLES', data.roles)
          } else {
            reject('getInfo: roles must be a non-null array !')
          }
          commit('SET_NAME', data.username)
          commit('SET_AVATAR', data.icon)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    Logout({ commit}, logOutInfo) {
      return new Promise((resolve, reject) => {
        setCookie("userId", "");
        logout(logOutInfo).then(() => {
        }).catch(error => {
          reject(error)
        })
      })
    },

    //add by huangyl 修改密码
    UpdatePassword({ commit }, userInfo) {
      // debugger;
      console.log("userInfo:"+userInfo);
      return new Promise((resolve, reject) => {
        updatePassword(userInfo).then(response => {
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },


    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    }
  }
}

export default user
