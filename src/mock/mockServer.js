//引入mockjs
import Mock from 'mockjs'
//把json数据格式引入
//webpack当中一些模块：图片、json，不需要对外暴露，因为默认就是对外暴露。
import banner from './banner.json'
import floor from './floor.json'
//mock数据:第一个参数:请求地址  第二个参数:请求数据
Mock.mock('/mock/banner',{code:200,data:banner})//模拟首页的大的轮播图数据
Mock.mock('/mock/floor',{code:200,data:floor})//模拟floor数据