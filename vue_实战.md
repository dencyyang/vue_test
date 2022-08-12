# 项目创建
## 1. vue-cli脚手架初始化项目
 cmd  vue create 项目名

 脚手架目录:
        node_modules:放置项目依赖的地方
        public:一般放置一些共用的静态资源，打包上线的时候，public文件夹里面资源原封不动打包到dist文件夹里面
        public + assets文件夹区别
        src：程序员源代码文件夹
          -----assets文件夹：经常放置一些全部组件公用的静态资源（图片），assets文件夹里面资源webpack会进行打包为一个模块（js文件夹里面）
          -----components文件夹:一般放置非路由组件（或者项目共用的组件）
          -----pages/views文件夹：路由组件
          -----utils文件夹：存放功能模块比如正则、token、临时身份   
                App.vue 唯一的根组件
                main.js 入口文件【程序最先执行的文件】
                babel.config.js:babel配置文件
                package.json：看到项目描述、项目依赖、项目运行指令
                README.md:项目说明文件
## 2. 项目配置
2.1 项目运行时，浏览器自动打开
    package.json 中"scripts" 中的"serve": "vue-cli-service serve"改为"serve": "vue-cli-service serve --open"
2.2  vue.config.js配置
            module.exports = {
              pages: {
                index: {
                  // page 的入口
                  entry: './src/main.js',
                }
              },
                lintOnSave:false,//关闭语法检查
                //开启代理服务器(方式一)
                /* devServer: {
                  proxy: 'http://localhost:5000'
                }, */
                //开启代理服务器(方式二)
              /*   devServer:{
                  proxy:{
                    //若请求前缀为api则走代理服务器 比如            http:localhost:8080/api/student
                    '/api':{
                      target:'http://localhost:5000',
                      pathRewrite:{'^/api':''},//重写路径
                      ws:true,//用于支持websocket
                      changeOrigin:true
                    },
                    '/ap':{
                      target:"http://localhost:5001",
                      pathRewrite:{'^/ap':''},
                      changeOrigin:true,
                      ws:true
                    }
                  }
                } */
              }

关闭语法检查(eslint)
    module.exports={
        //关闭语法检查eslint
        lintOnSave:false
        }
2.3 src文件夹简写方法(现版本自带)，配置别名@。
在js文件中使用，在样式当中也可以使用@,在样式当中使用@，前面加上~
jsconfig.json文件
            {
              "compilerOptions": {
                "target": "es5",
                "module": "esnext",
                "baseUrl": "./",
                "moduleResolution": "node",
                "paths": {
                  "@/*": [
                    "src/*"
                  ]
                },
                "lib": [
                  "esnext",
                  "dom",
                  "dom.iterable",
                  "scripthost"
                ]
              }
## 3. 项目路由分析
 vue-router 
 前端路由：KV键值对，
 key:URL(地址栏中的路径)
 value:相应的路由组件
 
 路由组件 
 确定项目结构顺序:上中下 -----只有中间部分的V在发生变化，中间部分应该使用的是路由组件
 Home 首页路由组件、Search路由组件、login登录路由、、Refister注册路由
 非路由组件：
 Header(只在首页、搜索页)
 Footer(在首页、搜索页，登录、注册页面没有)
## 4. 创建非路由组件（2个：Header、Footer）
    非路由组件使用分为几步:
    第一步：定义
    第二步：引入
    第三步：注册
    第四步:使用
    项目开发步骤：(1)书写静态页面
               (2)拆分组件
               (3)获取服务器数据，动态展示
               (4)完成相应的动态业务逻辑
    注意:
        1.创建组件的时候，组件结构+组件样式+图片资源
        2.项目采用的less样式,浏览器不识别less语法，需要一些loader进行处理，把less语法转换为CSS语法
            1)：安装less less-loader@5
            切记less-loader安装5版本的，不要安装在最新版本，安装最新版本less-loader会报错，报的错误setOption函数未定义
            2):需要在style标签的身上加上lang="less",不添加样式不生效
## 5. 路由组件搭建
    vue-router
     -components文件夹放置非路由组件  Header、Footer
     -pages|views文件夹放置路由组件    Home首页路由组件、Search路由组件、login登录路由、、Refister注册路由

     router 存放路由配置，路由组件都要在路由配置中进行注册(注册的时候使用组件的名字)
     配置完成的router在main.js中引入并注册
    //重定向，在项目运行的时候访问 /，定向到首页
         {
             path: '*',
             redirect: "home"
          }

     路由属性：
         $route：一般用来获取路由信息【路径、query、params等】
         $router：一般进行编程式导航进行路由跳转【push|replace】(replace 替换 浏览器的前进后退键不可以实现路由切 push 压栈 换)
## 单页面应用：将非路由组件在App组件引入并注册，路由组件在App组件添加路由出口<router-view></router-view>
## 6. 路由的跳转
    声明式导航 router-link(务必要有to属性)
    编程式导航 $router.push|replace 
    声明式导航能做的，编程式导航都能做的。但是编程式导航除了能够进行路由跳转还能进行其他业务逻辑(比如登录页面挑战时还需要接收用户输入所以编程式更好)

    1)编程式导航
        $router:进行编程式导航的路由跳转
        this.$router.push|this.$router.replace 路由跳转
        $route:可以获取路由的信息|参数
        this.$route.path  当前路由组件路径
        this.$route.params|query 路由组件params|query参数
        this.$route.meta  路由组件元信息(可以给路由配置一些自定义的属性比如布尔值条件判断)
    2)编程式导航路由跳转到当前路由(参数不变), 多次执行会抛出NavigationDuplicated的警告错误?
        注意:编程式导航（push|replace）才会有这种情况的异常，声明式导航是没有这种问题，因为声明式导航内部已经解决这种问题。
        这种异常，对于程序没有任何影响的。
        为什么会出现这种现象:
        由于vue-router最新版本3.5.2，引入了promise，当传递参数多次且重复，会抛出异常，因此出现上面现象,
        第一种解决方案：是给push函数，传入相应的成功的回调与失败的回调
        第一种解决方案可以暂时解决当前问题，但是以后再用push|replace还是会出现类似现象，因此我们需要从‘根’治病；
## 7. Footer组件显示与隐藏
    显示或者隐藏组件：v-show|v-if(v-if要频繁操作dom节点)
    Footer组件：在Home、Search显示Footer组件
    Footer组件：在登录、注册时隐藏
     
    (1)可以通过组件的$router获得当前路由的信息，通过路由路径判断Footer显示与隐藏
    (2)通过路由元信息(即mate),在配置路由时添加配置项
        mate:{isShow:true}
        App组件
        通过$router获得当前路由的meta.IsShow属性
## 8. 路由传参
    params参数：路由需要占位，程序就崩了，属于URL当中一部分
    query参数：路由不需要占位，写法类似于ajax当中query参数
    路由传递参数先关面试题
        1:路由传递参数（对象写法）path是否可以结合params参数一起使用?
            不可以：不能这样书写，程序会崩掉
            params参数必须配置name不能配置path,query都可以
        2:如何指定params参数可传可不传? 
            params参数占位时加上？则params参数可传也可不传
        3:params参数可以传递也可以不传递，但是如果传递是空串，如何解决？
          如果设置的params参数占位而没有传递params参数，URL路径会出错
          使用undefined解决params参数可传递、传递空字符串
          如果指定name与params配置, 但params中数据是一个"", 无法跳转，路径会出问题
        4: 路由组件能不能传递props数据?
          1.配置路由时添加配置项 props:true 此方法只适用于pramas参数
## 9. 将Home组件的静态组件拆分
    1完成静态页面（样式）
    2拆分静态组件
    3发请求获取服务器数据进行展示
    4开发动态业务
    拆分组件：结构+样式+图片资源
    一共要拆分为七个组件
9.1 三级联动组件
    三级联动在home、search、Detail中都用到，所以将其注册为一个全局组件
9.2 完成其余静态组件
    HTML+CSS+图片资源   
## 10. axios二次封装
        AJAX:客户端可以'敲敲的'向服务器端发请求，在页面没有刷新的情况下，实现页面的局部更新。
        XMLHttpRequest、$、fetch、axios
        跨域:如果多次请求协议、域名、端口号有不同的地方，称之为跨域
        JSONP、CROS、代理

    10.1:工作的时候src目录下的API文件夹，一般关于axios二次封装的文件
        请求拦截器：在发送请求之前处理一些业务
        响应拦截器：当服务器返回数据之后处理一些事情
        接口文档中路径都带有/api
        baseURL:'/api'
## 11. 接口统一管理
    request.js封装axios,index.js创建请求函数并暴露，哪里需要发送请求调用函数即可
## 12. 进度条nprogress的使用
nprogress.start()进度条开始
nprogress.done()进度条结束
## 13. vuex
若项目很小则不需要Vuex
当项目比较大，组件通信数据比较复杂，这种情况在使用vuex
Vuex是插件，通过vuex仓库进行存储项目的数据
1)vuex模块式开发【modules】
由于项目体积比较大，你向服务器发请求的接口过多，服务器返回的数据也会很多，如果还用以前的方式存储数据，导致vuex中的state数据格式比较复杂。采用vuex模块式管理数据。
Vuex核心概念:state、actions、mutations、getters、modules
## 14. 完成TypeNav三级联动展示业务数据
    全局组件放在components中
    1)商品分类数据猜想？
    [
        {
            id:1,categoryName:'图书',
            child:[
                 {id:3.14,
                  categoryName:'影像'，
                  child:[
                       {id:4,categoryName:'华为'}
                  ]
                 }
            ]
        }
    ]
    3)完成动态展示商品分类的数据
    4)完成一级分类的背景效果
    第一种解决方案：CSS  hover 
    第二种 通过鼠标事件实现 动态绑定类名
    5)通过js控制二三级分类的显示与隐藏
    通过js三元运算符控制display block|none
    6)函数防抖与节流 lodash
      正常：事件触发非常频繁，而且每一次的触发，回调函数都要去执行
          （如果时间很短，而回调函数内部有计算，那么很可能出现浏览器卡顿）
      防抖：前面的所有的触发都被取消，最后一次执行在规定的时间之后才会触发，
          也就是说如果连续快速的触发,只会执行最后一次
      节流：在规定的间隔时间范围内不会重复触发回调，只有大于这个时间间隔才会触发回调，
          把频繁触发变为少量触发
      通过JS实现【闭包 + 延迟器】
## 15. 三级联动组件的路由跳转与传参
      用户点击一级、二、三级分类时，Home模块跳转到Search模块，一级模块会把用户选中的产品(名称、ID)在路由跳转时进行传递
        第一种声明式导航:为什么使用router-link组件的时候，会出现卡顿那？
        router-link是一个组件：相当于VueComponent类的实例对象，一瞬间
        new VueComponent很多实例（1000+），很消耗内存，因此导致卡顿。

        第二种编程式导航:push|replace
        三级分类由于使用router-link的时候，会出现卡顿现象，因此采用编程式导航。

        路由跳转的时候【home->search】：需要进行路由传递参数【分类的名字、一、二、三级分类的id】
        
        解决方案：事件委派+编程式导航
            该方案存在问题：事件委派是把所有子节点的事件委派给父节点，当用户点击时怎么确定是a标签，怎么确定是几级标签
            解决方法:1.a 标签添加自定义属性 data-categoryName，其他节点没有该属性
                    2.a  标签添加自定义属性 data-category1Id|data-category2Id|data-category3Id 区分几级分类

        this.$router.push()
        { 
         name:'search',
         query:{
            categoryName:'电子书',
            category2Id:4
         }
        }
## 16 Search模块
    1.开发search模块中的TypeNav商品分类菜单
      在home模块当中，使用了一个功能三级联动功能---->[typeNav]
      在search模块当中，也使用三级联动的功能------->[typeNav]
      注意的事项
      注意1：以后在开发项目的时候，如果发现某一个组件在项目当中多个地方出现频繁的使用
      咱们经常把这类的组件注册为全局组件。
      注册全局组件的好处是什么那：只需要注册一次，可以在程序任意地方使用

      注意2:咱们经常把项目中共用的全局组件放置于components里面，以后需要注意，
      项目当中全局组件（共用的组件）一般放置于components文件夹中

      注意3：全局组件只需要注册一次，就可以在项目当中任意的地方使用，注册全局组件一般是在入口文件注册。

    2.组件name属性的作用?
        开发者工具中可以看见组件的名字
      注册全局组件的时候，可以通过组件实例获取相应组件的名字

    3.TypeNav组件业务分析?
        1)三级联动在home模块正常显示
        2)三级联动在search一会显示、一会隐藏 ---解决方案：通过一个响应式属性控制三级联动显示与隐藏
        3)开发的时候的出现问题：在home模块下不应该出现显示与隐藏的效果
        4)现在这个问题【三级联动：本身在search模块应该有显示与隐藏的业务】 ，但是在home模块下不应该出现显示与隐藏的业务
        说白了：你需要让三级联动组件知道谁在用它。
        5):通过$route让组件区分在那个模块下
        以后在功的时候，如果出现某一个组件要区分当前在哪一个模块中【home、search】，通过$route路由信息区分
        6)路由跳转的时候，相应的组件会把重新销毁与创建----【kepp-alive】

    4.过渡效果
        最早接触的时候:CSS3
        Vue当中也有过渡动画效果---transition内置组件完成
        注意1,在Vue当中，你可以给 （某一个节点）|（某一个组件）添加过渡动画效果
        但是需要注意，节点|组件务必出现v-if|v-show指令才可以使用。

    5.TypeNav三级联动性能优化?
        1)项目：home切换到search或者search切换到home，你会发现一件事情，组件在频繁的向服务器发请求，
        获取三级联动的数据进行展示。
        项目中如果频繁的向服务器发请求，很好性能的，因此咱们需要进行优化。

        2)为什么会频繁的向服务器发请求获取三级联动的数据那?

        因为路由跳转的时候，组件会进行销毁的【home组件的created：在向vuex派发action，因此频繁的获取三级联动的数据】
        只需要发一次请求，获取到三级联动的数据即可，不需要多次。
        最终解决方案：在App组件发送获取categoryList的请求,根组件mounted执行一次
        3):项目性能优化手段有哪些？
          v-if|v-show选择
          按需加载          lodash、ant
          防抖与节流
          请求次数优化
    6.query与params参数合并
# 17开发listContainer|Floor组件业务？
  1.模拟数据
    服务器返回的数据(接口)只有商品分类数据，对于ListContainer组件和Floor组件数据服务器没有提供
    mock数据(模拟)：使用mock.js
    注意：mock（模拟数据）数据需要使用到mockjs模块，可以帮助我们模拟数据。
    注意：mockjs【并非mock.js mock-js】
    http://mockjs.com/  官方地址
    
    mock官网一句话：
    生成随机数据，拦截 Ajax 请求
    mock官网当中这句话的理解：
    模拟的数据一般：对象、数组
    {
        'a|1-10':'我爱你'
    }
    拦截ajax请求：请求发布出去【浏览器会进行拦截：笨想，因为服务器】，只是项目当中本地自己玩耍数据。

    1):安装依赖包mockjs
    2)：在src文件夹下创建一个文件夹，文件夹mock文件夹。
    3):准备模拟的数据
    把mock数据需要的图片放置于public文件夹中！【public文件夹在打包的时候，会把相应的资源原封不动的打包到dist文件夹中】
    在mock文件夹创建json文件
    比如:listContainer中的轮播图的数据
      [
        {
            "id":"1",
            "imgUrl":"/images/banner1.jpg"
        },
        {
            "id":"2",
            "imgUrl":"/images/banner2.jpg"
        },
        {
            "id":"3",
            "imgUrl":"/images/banner3.jpg"
        },
        {
            "id":"4",
            "imgUrl":"/images/banner4.jpg"
        }
    ]
    4)在mock文件夹中创建一个mockServer.js文件
    注意：在mockServer.js文件当中对于banner.json||floor.json的数据没有暴露，但是可以在server模块中使用。
    对于webpack当中一些模块：图片、json，不需要对外暴露，因为默认就是对外暴露。
    5)通过mock模块模拟出数据
    通过Mock.mock方法进行模拟数据
    6)回到入口文件，引入mockServer.js
    mock需要的数据|相关mock代码页书写完毕，关于mock当中mockServer.js需要执行一次，
    如果不执行，和你没有书写一样的。
    7)在API文件夹中创建mockRequest【axios实例：baseURL:'/mock'】
    专门获取模拟数据用的axios实例。
    在开发项目的时候：切记，单元测试，某一个功能完毕，一定要测试是否OK
  2.ListContainer轮播图
    swiper轮播图动画
    安装swiper
    第一步：引包(相应的css和js)
    第二步:页面中务必要有结构(类名与官方文档相同)
    第三步：new Swiper实例【轮播图添加动态效果】
    注意：
    1)当swiper放在mounted中时，dispatch中涉及异步语句，随后开始new Swiper，但是此时服务器好没有返回，仓库中还没有数据，则组件中的v-for没有执行，就没有结构，设置定时器可以解决
    2)watch+nextTick(最完美的解决方案)
      watch: 通过watch监听bannerList属性值的变化，当执行handler方法时确定bannerList已经有数据了，
      但是不能保证v-for执行完毕，即结构不完整
      this.$nextTick: 在下次DOM更新 循环(比如：v-for)结束之后执行的延迟回调。在数据修改之后立即执行这个方法，获取更新之后的DOM
      this.$nextTick(()=>{swiper})
      当执行这个回调的时候数据已经有了，v-for也就已经执行完毕，swiper结构也有了
    
  3.开发floor组件
  切记：仓库中的state的数据格式取决于服务器的返回数据格式
  1)getFloorList的action 要在Home组件触发，不可在Floor组件，因为我们要v-for遍历floor组件。
    派发action应该是在父组件的组件挂载完毕生命周期函数中书写，因为父组件需要通知Vuex发请求，父组件
    获取到mock数据，通过v-for遍历 生成多个floor组件，因此达到复用作用。
    父组件派发action，通知Vuex发请求，Home父组件获取仓库的数据，通过v-for遍历出多个Floor组件。
  2)v-for|v-show|v-if|这些指令可以在自定义标签（组件）的身上使用
  3)组件间通信******面试必问的东西
    props:父子
    插槽:父子
    自定义事件$on,$emit:子父
    全局事件总线$bus:万能
    pubsub: vue中几乎不用 万能
    Vuex:万能
    $ref:父子通信
4)为什么在Floor组件的mounted中初始化SWiper实例轮播图可以使用.
  因为父组件的mounted发请求获取Floor组件，当父组件的mounted执行的时候。
  Floor组件结构可能没有完整，但是服务器的数据回来以后Floor组件结构就一定是完成的了,
  因此v-for在遍历来自于服务器的数据，如果服务器的数据有了，Floor结构一定的完整的。
  否则，你都看不见Floor组件
  因为请求是父组件发的，父组件通过props传递给子组件，而且结构都已经有了的情况下执行mounted
# 18Carousel全局组件
如果项目当中出现类似的功能，且重复利用，封装为全局组件----【不封装也可以】
为了封装全局的轮播图组件:让Floor与listContainer组件中的代码一样，如果一样完全可以独立出来
封装为一个全局组件。
全局组件和非路由组件都放在components文件夹
# 19search模块开发
0.     1.静态页面+静态组件拆分
      2.发送请求(API)
      3.Vuex(三连环dispatch、actions、mutations)
      4.组件获取仓库数据，动态展示数据
  是搜索模块需要携带给接口的参数
  {
    "category1Id": "61",//一级分类的id
    "category2Id": "61",//二级分类的id
    "category3Id": "61",//三级分类的id
    "categoryName": "手机",//产品的名字
    "keyword": "小米",//关键字
    "order": "1:desc",//排序
    "pageNo": 1,//当前第几页
    "pageSize": 10,//每一页需要展示多少条数据
    "props": ["1:1700-2799:价格", "2:6.65-6.74英寸:屏幕尺寸"],//平台属性的选择参数
    "trademark": "4:小米"//品牌参数
  }
  注意：搜索的接口，需要传递参数，至少是一个空对象（KV没有，但是至少给服务器一个对象）
1. 获取search模块数据

2. 展示商品列表数据

3. 根据用户的搜索条件展示不同的数据。
  根据前台传递参数决定的
  根据不同条件，展示不同的数据。----->取决于后台返回的数据
  1:发请求，获取搜索模块的数据
  2:根据用户搜索的条件携带参数给服务器，展示用户搜索的内筒
  开发遇见问题:用户条件可以发生多次变化，但是咱们的请求，只是会发一次【mounted中书写的】
  请求的性能优化:
  发一个请求，需要向服务器携带参数：带100个参数   带1参数  【消耗宽带】
  对于给服务器携带的参数：如果数值为undefind，向服务器发请求的时候，参数步携带给服务器的

4. 面包屑的业务完成
-----务必把今天的套路---书写三遍
'作业':什么是富文本，插件有哪些，一些如何使用【在Vue当中使用】

5. 品牌与平台属性的数据进行动态展示
tradeMark---品牌
举例子:理解平台属性 【用户购买一个手机】
颜色【平台属性】:红色、白色、紫色【平台属性值】
价格【平台属性】：1299,6999,899【平台属性值】
操作系统【平台属性】：window、linux【平台属性值】
//看见页面结构，大概能知道数据结构什么样子的
尺寸: 中、短
材料：塑料、涤纶
[
    {attrId:1,attrName:尺寸,attrValueList:['中','短']},
    {attrId:2,attrName:材料,attrValueList:['塑料','涤纶']},
]


6. 完成品牌  与  平台属性的业务
1.刚刚我们只是把服务器的数据动态展示，但是需要注意，对于品牌|平台属性、用户可以点击的【小米、苹果】|平台属性
2.我们还是需要收集用户选择的数据，把用户选择的数据信息，给服务器传递获取，获取相应的数据进行展示
3.组件通信-----（工作使用频率非常高、面试的时候经常出现）
父子:props、插槽、ref
子父：自定义事件
万能：vuex、$bus、pubsub
4.经典面试题:数组去重[1,2,2,3,4,2];
平台属性携带参数格式:
props	 Array	 N	  商品属性的数组: ["属性ID:属性值:属性名"]   示例: ["2:6.0～6.24英寸:屏幕尺寸"]
props:['属性的ID:属性值:属性名']

7. 完成排序业务
num1:在基础课程当中曾经写过排序业务。
num2:综合与价格按钮，点击谁，谁的背景颜色变为红色。（类名：active）
谁有类这件事情，区分开综合与价格
num3：将来点击综合||价格，还是需要给服务器发请求
  【价格升序：把这个信息给服务器传递过去，服务器接收到信息，数据库自动把排序这件事情做了，把排序做好的数据返回给你，你展示即可】
  order:服务器需要字段，代表的是排序方式
  order这个字段需要的是字符串（可以传递也可以不传递）
  1:代表综合
  2:代表价格
  3:asc代表升序
  4:desc代表降序
  告诉服务器排序方式有几种情况?
  "1:asc" "1:desc"  "2:asc"  "2:desc"
num4:综合与价格箭头
    1.箭头用什么去做【可以选用阿里图标库】  https://www.iconfont.cn/ 
    2.对于综合|价格旁边的箭头【动态显示：时而又，时而没有】，带有类名active，拥有箭头
    3.:根据1、2区分谁有类名（背景）、谁有箭头
    根据asc|desc区分它用哪一个箭头【上、下】
    4.根据传参确定点击的是价格还是综合

8. 分页功能。
第三方插件:elementUI实现超级简单
但是咱们需要自己封装。也属于前台项目当中比较重要的一部分。
前端三大件:轮播图、分页、日历。这属于前端开发常见三种业务
1.为什么很多项目中都采用分页功能?
      比如电商平台：搜索一个奶粉，奶粉的产品有10000+，一次渲染10000+条数据，可能慢。
      数据多的时候，可以选择分页，比如每一次只是展示10
2.拆分分页组件（静态组件），注册为全局组件，因为其他模块也在使用分页功能。
3.面试当中:你自己封装过一个通用的组件吗?-----分页组件 **********
4.分页器封装业务分析:
    封装分页器组件的时候：需要知道哪些条件？
    假如你知道条件1、条件2：知道一共多少页 100/3
    1):分页器组件需要知道我一共展示多少条数据 ----total【100条数据】

    2):每一个需要展示几条数据------pageSize【每一页3条数据】

    3):需要知道当前在第几页-------pageNo[当前在第几页]

    4):需要知道连续页码数【起始数字、结束数字：连续页码数市场当中一般5、7、9】奇数，对称好看 continues

    已经条件: total:总数据数  pageSize:每页的数据数  pageNo:当前页面数    continues:分页的连续页码数
5.自定义分页器，在开发的时候要先自己传递假数据进行调试，调试成功之后再用服务器数据
6.分页器最重要的是算出连续页面起始数字和结束数字
    4 5 6 7 8


    已经条件: total=【99】  pageSize =【3】  pageNo= 1    continues 5 

    错误:-1 0 1 2 3
    正确: 1 2 3 4 5

    已经条件: total=【99】  pageSize =【3】  pageNo= 2    continues 5 

    错误: 0 1 2 3 4 
    正确：1 2 3 4 5 

    已经条件: total=【99】  pageSize =【3】  pageNo= 33    continues 5 

    错误: 31 32  33 34 35
    正确：29 30  31 32 33 



    已经条件: total=【99】  pageSize =【3】  pageNo= 32    continues 5 

    错误：30 31 32 33 34 
    正确: 29 30  31 32 33 
7.分页器动态展示 分为上中下 
v-for可以遍历数组、对象、字符串
    1)进行单元测试

    连续页码5: 8   [6,7,8,9,10] 
    连续页码7: 8   [5,6,7,8,9,10,11]

    连续页码5:  8   [6,7,8,9,10]
    连续页码7:  8   [5,6,7,8,9,10,11]


    经典面试题：v-for与v-if优先级？ v-for优先级更高



    //正常情况：再回来因该还是第一页【遇见脑袋xxxx产品可能有这种操作】
  需求：最后这个需求可以书写、可以不书写【正常说：没有这个需求的】
  比如:2021年10月30日11:47:44 点击分页器   第四页 ->网站关闭了
  但是2021年11月11日11:48:12  打开这个项目 第四页 -->本地存储
8.总结:
面试问题：v-for与v-if优先级?
        工作当中是否自己封装过一些通用的组件？
对于一个分页器:
1)需要知道数据总条数
2)每一个需要展示数据条数
3)知道当前是第几页
4)连续页码数字
5)自定义事件【子给父通信的】
6)push与replace区别?
编程式导航：push 与 replace
能不能记录历史记录：push（能记住历史记录）  replace（不能记住历史记录）
目前项目当中：进行路由跳转（编程式导航）基础都是push
push与replace是有区别的
# 20开发详情业务
    1):熟悉静态页面、书写样式。注册路由
      点击商品图片时要跳转到详情页面，在路由跳转时需要带上商品的id传递给详情页面
    2)：拆分组件
    3):发送请求获取服务器
    4).vuex
    5)：动态展示组件

1. 滚动行为的设置。
      写在路由文件中，与routes平级
     //控制滚动行为
    //x,y表示滚动条位置，表示路由跳转之后滚动条在最顶端
        scrollBehavior (to, from, savedPosition) {
            return { x: 0, y: 0 }
          }
vue-warn:警告（不影响的你程序），对于你的代码提出一个警告。
对于程序没有任何影响，俗称假报错。
2. 业务逻辑分析
  1)数据解释--数据结构分析
  [
    {
      attr:颜色
      attrvalue:['白色','黑色']
    },{
      attr:版本
      attrvalue:['16','32']
    }
  ]
3. 放大镜的功能
----插件:插件解决可以【巧劲】

1)遮罩层为什么能动。
获取节点（DOM：必须要定位），通过JS动态修改left|top、定位元素才有left、top属性

4. 产品个数业务
以后项目当中：凡是出现文本框【用户输入：一定有'幺蛾子',思考情况一定要多思考】
5. 加入购物车的业务  购物车项目第二个重要地方
购物车：每一个人都有属于自己的购物车，那为什么不同用户登录自己账号，可以看见属于自己产品
一定是用户点击加入购物车，把你的产品信息提交给服务器进行保存，当你下次在进入购物车的时候，
需要向服务器发请求，获取你购物车里面的信息展示
项目：点击加入购物车按钮的时候，以前经常进行路由跳转【调到另外一个路由】，
但是你要注意，点击加入购物车这个按钮的时候，将用户选择产品，提交给服务器进行存储，如果服务器存储成功，
之后在进行路由跳转
 1)路由跳转之前发送请求
 2)成功之后进行路由跳转并携带产品信息
  利用本地存储功能进行传递(浏览器存储功能)
  本地存储：持久化————上限5M
  会话存储：并非永久————会话结束数据消失
  会话存储和本地存储，存储的都是字符串
 3)失败则显示提示信息
 # 需要确认服务器请求成功才能进行路由跳转等下一步操作的需要用async await 
 ### 发送请求修改|添加服务器数据，不需要服务器返回数据的vuex
 actions 
        async addOrUpdateShopCart(context,{skuId,skuNum}){
               //当前函数如果执行返回值是一个Promise实例
               //加入购物车返回的解构
               //加入购物车以后(发送请求)，将前台参数带给服务器
               //服务器写入数据成功，并没有返回其他数据，只是返回code=200，代表这次操作成功
               //因为服务器没有返回其余数据因此不需要三连环存储数据
               //async函数执行返回的结果一定是一个Promise实例【要么成功，要么失败】
               let result=await reqAddOrUpdateShopCart(skuId,skuNum)
               //result.code==200代表服务器加入购物车成功
               if(result.code==200){
               //返回是成功的标记
               //若返回值为字符串则代表Promise成功
                   return ''
               }else{
                   //返回是失败的标记
                   //返回Promise.reject代表Promise失败
                   //即代表服务器加入购物车失败
                   return Promise.reject(new Error('faile'))
               }
               
           }
dispatch:
      async addCartList(skuId){
      let skuNum=1
      try{
        //派发actions,
        await this.$store.dispatch("addOrUpdateShopCart",{skuId:skuId,skuNum:skuNum})
        //再次获取服务器的新数据
        this.getData()
      }catch(error){
        alert(error.message)
      }
    }
# 21添加购物车成功
  产看详情
  查看购物车
# 22购物车
  1.完成静态组件
  2.向服务器发送请求，获取服务器数据，操作vuex连环，组件获取数据进行展示
    发现发送请求的时候获取不到购物车数据，因为服务器不知道你是谁
  3.临时游客身份UUID 
    加入购物车的时候，通过请求头带临时的身份为服务器，确定向谁的购物车添加
# 23修改购物车产品的数量(需要发送请求)
购物车数量的操作?
修改购物车产品数量的时候，需要发请求的，通知服务器产品最新的个数【服务器需要保存】，
当你组件在获取购物车的数据时候，不就是最新的数值【用户刷新刷不掉】

产品个数变化接口参数：
skuID	string	Y	商品ID

skuNum：在修改产品个数的时候,需要给服务器传递的是【变化的数值】

比如：佩奇  起始数量 4  用户在表单元素中输入 6   ----->给服务器参数是2
     佩奇  起始数量4    用户在表单元素中输入1   ------>给服务器的参数-3
     佩奇  起始的数量4   用户在表单元素中输入4  ------>给服务器的参数0


blur:失去焦点--->点击空白的地方
change:文本需要有变化，而且还需要点击空白的地方
input:只要文本发生变化立马执行【不许点击空白的地方】
# 24删除购物车商品
# 25删除购物车所有产品
  没有一次删除所有产品的接口，但可以通过id一次删除一个
  Promise.all([p1,p2,p3])
  p1|p2|p3每一个都是一个Promise对象，有一个失败，都失败，都成功返回成功
  全选|全不选
# 26登录与注册
    对于企业当中，一般项目都有登录注册功能【这个业务很重要】
    当然有一些项目不需要注册，后台管理系统项目，一般不需要注册。
    登录与注册的静态组件（图片问题会报错）

    assets【放置静态资源文件的地方】
    一般放置所有组件共用的静态资源
    在样式当中也可以使用@,在样式当中使用@，前面加上~

1. 注册的业务
今天在做注册、登录业务的时候，先不处理表单的验证功能，在项目最后一天，在把表单如何验证，如果是那哪些插件解决【最后去处理】
正则
手机号:11
验证码:4-6
登录密码|确认密码:首字母大写、包含英文、数字、特殊字符等等。

获取验证码
/api/user/passport/sendCode/{phone} 
2. 登录业务
1)注册--通过数据库存储用户信息(名字、密码)
2)登录--登录成功的时候，后台为了区分这个用户是谁，服务器下发身份令牌【token】
登录接口不完美，一般登录成功服务器下发token，前台持久化存储token,带着token向服务其请求数据
vux存储数据非持久化
3. 登录过后用户信息展示
  1.用户注册完成，用户登录，【用户名+密码】向服务器发送请求(组件派发actions:userLogin)
  登录成功获取到token,存储与仓库中(非持久化存储)，路由跳转到home
  2.请求天配置token
  3.在首页mounted中派发actions：getUserInfo获取用户信息，一级动态展示header组件内容
  4.刷新home首页获取不到用户信息(因为vuex存储非持久化)
4. 持久化存储
    通过locationStorage实现本地持久化存储
    方案一：使用utils文件夹中token.js通过暴露本地存储与读取函数实现token的本地存储与读取
    方案二：直接使用locationStorage实现存储与读取
5. 存在问题：
    1.多个组件展示信息用户信息需要在每一个组件的mounted中发出actions：：getUserInfo(不可取)
    2.放在app中 第一次登录honme需要刷新才有
    3.前置全局路由守卫
# 27退出登录
  1.发送请求，通知服务器退出登录【清除一些数据：token】
  2.清除项目中的数据【userInfo,token】
# 28导航守卫
  用户登录之后不应该能再次回到login页面
  导航：表示路由发生变化，进行路由跳转
  守卫：判断是否可以进行路由跳转
# 29交易业务
前面课程当中可能自己已经注册了一个账号【18666666661】，今天在做支付的时候，统一使用
账号:13700000000
密码:111111

1. 获取用户地址信息、获取用户购物车清单信息
//用户地址信息
/api/user/userAddress/auth/findUserAddressList
//商品清单接口
/api/order/auth/trade


2. 点击提交订单，向服务器发送请求，将支付信息传递给服务器
  Vuex的action发请求，但是从今天开始，咱们要练习不用Vuex改如何开发？
  请求配置,类似$bus使用
  再main.js中统一引入api
  //统一接口api文件夹中的全部请求函数
  import * as API from '@/api'
  //将API挂在Vue原型上
  Vue.prototype.$API=API
3. 获取支付信息
  不能再生命周期函数上使用async




2)展示商品清单数据






3)提交订单业务

当用户点击提交订单按钮的时候，需要发请求的
提交订单的请求地址:/api/order/auth/submitOrder?tradeNo={tradeNo}

前台：需要告诉服务器：谁买的、买的啥、买几个、 支付多少钱、留言信息...
后台：订单号，这笔交易的一个标识符【支付的】

axios({url:'xxx',methods:'post',data:{a:1}})


3.1微信支付、支付宝支付等等
交易编码（服务器：字符串hash）
收件人名字
收件人手机号
收件的地址
买家留言信息
支付产品






4)获取支付信息进行展示







5)element-ui官方UI组件库（插件）？

react框架:
UI组件库antd【蚂蚁金服旗下PC端UI组件库】
antd-mobile【蚂蚁金服旗下的移动端UI组件库】

Vue框架:
element-UI【饿了吗旗下的UI组件库，官方承认的PC组件库插件】
vant【Vue官方提供移动端UI组件库】

官网地址:https://element.eleme.cn/#/zh-CN
官网地址：https://youzan.github.io/vant/#/zh-CN/

第一步：项目中安装element-ui组件库 [2.15.6版本：Vue2]


第二步：在入口文件引入elementUI组件库
第一种：全部引入【不采用：因为项目中只是用到一个组件，没必要全都引入进来】
第二种：按需引入【按照开发需求引入相应的组件，并非全部组件引入】


第三步：按需引入，安装相应的插件
cnpm install babel-plugin-component -D
文档中说的.babelrc文件，即为babel.config.js文件
修改完babel.config.js配置文件以后，项目重启

第四部：按照需求引入相应的组件即可
注册组件两种方法
Vue.component();
Vue.prototype.$xxx = xxx;




6)支付业务【微信支付】
 this.$alert('<strong>这是 <i>HTML</i> 片段</strong>', 'HTML 片段', {dangerouslyUseHTMLString: true});
6.1今晚稍微把elementUI的组件都稍微看看。
6.2使用messageBox显示弹框
6.3展示二维码----qrcode插件
通过qrCode.toDataUrl方法，将字符串转换为加密的在线二维码链接，通过图片进行展示。
moment.js
swiper.js
nprogress.js
qrcode.js

GET|POST：短轮询，请求发一次，服务器响应一次，完事。

第一种做法:前端开启定时器，一直找服务器要用户支付信息【定时器】

第二种做法:项目务必要上线 + 和后台紧密配合
当用户支付成功以后，需要后台重定向到项目某一个路由中，将支付情况通过URL参数形式传给前端，
前端获取到服务器返回的参数，就可以判断了。
# 30
1. 个人中心路由搭建
  1.1当年学习路由的时候:一级路由、二级路由、三级路由 【二级路由搭建】
  1.2完成个人中心数据的展示【分页】




2. 未登录全局守卫的判断

  在前面课程当中:导航守卫【导航:路由发生变化，守卫可以检测到，通过判断，确定这次路由跳转】

  前置守卫：在路由跳转之前，进行判断
  后置守卫:路由都已经跳转完毕才执行。


  未登录的情况:
全局守卫:只要的项目当中任何某一个路由发生变化，就会出发。
项目守卫使用:一般有用前置全局守卫

用户登录:

用户未登录：点击购物车的结算按钮->交易页面【没有登录:去不了】
           未登录不能调到支付页面
           未登录不能调到支付成功页面
           未登录不能去个人中心【都不知道你是谁：展示谁的个人中心啊】
3. 路由独享守卫
路由独享守卫：需要在配置路由的地方使用
导航守卫:全局守卫->项目当中有任何路由变化【a->b,b->d】触发。
        路由独享守卫：专门负责某一个路由

只有从购物车界面才能跳转到交易页面
只有从交易页面才跳转到支付页面
只有从支付页面才能跳转到支付成功页面

用户登陆了:
去交易页面:从购物车才能跳转到交易页面。

next():你本来想去哪里，我就放行，你就去完事了。

next('/login'):执行守卫放行到执行的路由。

next(false):路由跳转的时候，从哪里来回那里去。

4. 组件内守卫---->一般很少用【全局 + 路由独享守卫】
组件内守卫：也是专门负责某一个路由【并非负责全部路由】，写法和路由独享守卫有区别？
组件内守卫需要书写在组件内部

beforeRouteEnter
beforeRouteUpdate (2.2 新增)
beforeRouteLeave

5. 路由懒加载
面试【高频的面试】:项目的性能优化手段有哪些？
v-if|v-show:尽可能采用v-show
按需引入【lodash、elementUI】
防抖与节流
路由懒加载：当用户访问的时候，加载对应组件进行展示。


6. 图片懒加载
vue-lazyload:图片懒加载
图片：比用用户网络不好，服务器的数据没有回来，
总不可能让用户看白色，至少有一个默认图片在展示。


7. 表单验证【后台管理系统：大量使用elementUI】
以后工作的时候经常会进行表单验证【element-ui】进行表单验证，so 简单。
项目当中表单验证功能比较常见的。

8. 1vee-validate插件：Vue官方提供的一个表单验证的插件【老师接下来的操作能大概看懂即可】
这个插件很难用：如果你翻看它的文档（看一个月：不保证能看懂），依赖文件很多（文档书写的很难理解）
花大量时间学习，很难搞懂。


  8.2哪怕将来工作了，真的使用vee-valadiate【老师项目搞出来：改老师代码即可】


      使用步骤：
      ：安装vee-valadite，别安装最新版本@2
      ：在plugins文件夹中创建一个validate.js[专门注册vee-valadite]
      :注册插件
      ：注册插件的时候，用中文，以及需要验证的字段【用中文显示提示形式】
      ：在入口文件需要引入执行一次
      :使用vee-valadiate插件

      1)vee-validate 基本使用
      
      第一步：插件安装与引入
      cnpm i vee-validate@2 --save  安装的插件安装2版本的
      
      import VeeValidate from 'vee-validate'
      import zh_CN from 'vee-validate/dist/locale/zh_CN'   // 引入中文 message
      Vue.use(VeeValidate)
      
      第二步：提示信息
      VeeValidate.Validator.localize('zh_CN', {
      messages: {
      ...zh_CN.messages,
      is: (field) => `${field}必须与密码相同` // 修改内置规则的 message，让确认密码和密码相同
      },
      attributes: { // 给校验的 field 属性名映射中文名称 即遇到英文显示映射的中文
      phone: '手机号',
      code: '验证码',
      password:'密码',
      password1:'确认密码',
      isCheck:'协议'
      }
      })
      
      第三步：基本使用
      <input
                placeholder="请输入你的手机号"
                v-model="phone"
                name="phone"
                v-validate="{ required: true, regex: /^1\d{10}$/ }"
                :class="{ invalid: errors.has('phone') }"
              />
      <span class="error-msg">{{ errors.first("phone") }}</span>
      
      const success = await this.$validator.validateAll(); //全部表单验证
      //自定义校验规则
      //定义协议必须打勾同意
      VeeValidate.Validator.extend('agree', {
      validate: value => {
      return value
      },
      getMessage: field => field + '必须同意'
      })
# 31打包上线 
1. 打包 npm run build项目打包以后代码都是经过压缩加密的，运行时报错，输出的错误信息  无法准确得知哪里报错
 使用map就可以像未加密的代码一样准确输出哪里有错
 
 该文件如果项目不需要可以移出
 vue.config.js 配置
 productionSourceMap:false
      
      
      
      
          