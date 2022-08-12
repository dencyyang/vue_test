//对外暴露本地存储函数
export const setToken=(token) => {
    localStorage.setItem('TOKEN',token)
}
//对外暴露本地读取函数
export const getToken=() => {
    localStorage.getItem('TOKEN')
}
//清除本地存储token
export const removeToken= () => {
    localStorage.removeItem('TOKEN')
}