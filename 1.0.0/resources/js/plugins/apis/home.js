import common from './common';
const baseUrl = common.baseUrl;
export default {
    /**
     * PC接口
     * <www.feibu.info>
     */

    // 登录验证
    "homeLogin": baseUrl + "login", // 登录
    "homeRegister": baseUrl + "register", // 注册
    "homeForgetPassword": baseUrl + "forget_password", // 忘记密码
    "homeLogout": baseUrl + "logout", // 登出
    "homeCheckLogin": baseUrl + "check_login", // 检测是否登录
    "homeSendSms": baseUrl + "send_sms", // 发送短信

    'homeCommon': baseUrl + 'common', // pC公共数据获取
    'homeConfig': baseUrl + 'config', // config单个数据获取值
    'homeAgreement': baseUrl + 'agreement', // 站点协议
    'homeArticle': baseUrl + 'article', // 文章获取
    'homeGoodsClasses': baseUrl + 'goods_classes', // 商品分类获取

    // 全国省市区
    'homeAreas': baseUrl + 'areas',

    // PC端首页获取信息
    'homeIndex': baseUrl + 'index',

    // 商品
    'homeGoods': baseUrl + 'goods',

    // 收藏关注
    'homeFav': baseUrl + 'favorites',

    // 资金日志
    'homeMoneyLog': baseUrl + 'money_logs',

    // 分销日志
    'homeDistributionLog': baseUrl + 'distribution_logs',
    'homeDistributionUser': baseUrl + 'distribution/user', // 分销用户
    'homeDistributionLink': baseUrl + 'distribution/link', // 分销链接

    // 购物车
    'homeCarts': baseUrl + 'carts',

    // 收货地址
    'homeAddress': baseUrl + 'addresses',

    // 订单处理
    'homeOrder': baseUrl + 'orders',

    // 订单评论
    'homeOrderComments': baseUrl + 'order_comments',

    // 订单售后 //todo 删除
    'homeRefunds': baseUrl + 'refunds',

    // 订单售后
    'homeOrderRefunds': baseUrl + 'order_refunds',

    // 用户中心
    'homeUser': baseUrl + 'users',

    // 资金提现
    'homeCash': baseUrl + 'cashes',

    // 商家入驻
    'homeStoreVerify': baseUrl + 'store/join/store_verify', // 商家审核状态
    'homeStoreJoin': baseUrl + 'store/join/store_join', // 商家审核状态
    'homeStoreJoinUpload': baseUrl + 'store/join/upload', // 商家入驻图片上传

    // 商家列表
    'homeStore': baseUrl + 'store',

    // 积分商城
    'homeIntegral': baseUrl + 'integral',
    'homeIntegralOrder': baseUrl + 'integral_order', // 积分订单

    // 优惠券
    'homeCoupon': baseUrl + 'coupons',

    'homeUserCoupon': baseUrl + 'users/coupons',
    // 秒杀
    'homeSeckill': baseUrl + 'seckills',
    // 砍价
    'homeBargains': baseUrl + 'bargains',
    'bargainTasks': baseUrl + 'bargain_tasks/partake',
    'getBargainTasks': baseUrl + 'bargain_tasks',
    'BargainsHelpCut': baseUrl + 'bargain_tasks/help_cut',
    'homeMyBargains': baseUrl + 'bargain_tasks',

    'homeAllExpresses': baseUrl + 'all_expresses',
    // 帮助
    'homeHelp': baseUrl + 'article_categories',
    'homeHelpDetail': baseUrl + 'articles', //传/id
    'homeEzviz': baseUrl + 'ezviz', //传/id

};