import common from './common';
const baseUrl = common.baseUrl;
export default 
{
     /**
     * 后台接口
     * <www.feibu.info>
     */

    "adminLogin" : baseUrl + "Admin/login", // 登录
    "adminLogout" : baseUrl + "Admin/logout", // 登出
    "adminCheckLogin" : baseUrl + "Admin/check_login", // 验证是否登录

    'adminAdmins' : baseUrl + 'Admin/admins', // 后台管理员
    'adminUsers' : baseUrl + 'Admin/users', // 平台用户
    
    'adminRoles' : baseUrl + 'Admin/roles', // 角色管理
    'adminPermissionGroups' : baseUrl + 'Admin/permission_groups', // 后台接口分组
    'adminPermissions' : baseUrl + 'Admin/permissions', // 后台接口分组
    'adminAllPermissionGroups': baseUrl + 'Admin/all_permission_groups', // 所有后台接口分组
    // 菜单处理
    'adminMenus' : baseUrl + 'Admin/menus', // 后台菜单
    'adminMenusClearCache' : baseUrl + 'Admin/menus/cache/clear', // 清空菜单缓存
    'adminPermissionMenus' : baseUrl + 'Admin/permission_menus',
    // 配置中心s
    'adminConfigs' : baseUrl + 'Admin/configs', // 配置信息获取
    'adminConfigsUploadLogo' : baseUrl + 'Admin/configs/upload/logo', // Logo图上传
    'adminConfigsUploadIcon' : baseUrl + 'Admin/configs/upload/icon', // Icon图上传
    'adminConfigsUploadUserAvatar' : baseUrl + 'Admin/configs/upload/user_avatar', // Icon图上传
    'adminConfigsUploadQrcode' : baseUrl + 'Admin/configs/upload/qrcode', // Icon图上传
    // 站点协议
    'adminAgreements' : baseUrl + 'Admin/agreements', 

    // 文章 帮助中心
    'adminArticles' : baseUrl + 'Admin/articles', 
    'adminArticleCategories': baseUrl + 'Admin/article_categories',
    // 物流公司
    'adminExpresses' : baseUrl + 'Admin/expresses',

    // 运费配置
    'adminFreights' : baseUrl + 'Admin/freights',

    // 编辑器上传
    'adminEditor' : baseUrl + 'Admin/editor/upload',

    // 短信日志
    'adminSmsLogs' : baseUrl + 'Admin/sms_logs', // 短信日志
    'adminSmsSigns' : baseUrl + 'Admin/sms_signs', // 短信签名

    // 商品分类管理
    'adminGoodsClasses' : baseUrl + 'Admin/goods_classes', // 商品分类
    'adminGoodsClassesUploadThumb' : baseUrl + 'Admin/goods_classes/upload/thumb', // 分类缩略图上传
    'adminGoodsClassesClearCache' : baseUrl + 'Admin/goods_classes/cache/clear', // 清空商品分类缓存
    'adminTopGoodsClasses' : baseUrl + 'Admin/goods_classes/top_goods_classes', // 商品分类

    // 店铺管理
    'adminStores' : baseUrl + 'Admin/stores',
    // 配置中心处理
    'adminStoreConfigs' : baseUrl + 'Admin/store_configs',
    
    // 商品品牌管理
    'adminGoodsBrands' : baseUrl + 'Admin/goods_brands', // 商品品牌
    'adminGoodsBrandsUploadThumb' : baseUrl + 'Admin/goods_brands/upload/thumb', // 品牌缩略图上传
    'adminAllGoodsBrands' : baseUrl + 'Admin/all_goods_brands', // 商品品牌

    // 商品管理
    'adminGoods' : baseUrl + 'Admin/goods', // 商品列表
    'adminGoodsUpload' : baseUrl + 'Admin/goods/upload/images',
    // 物流管理
    'adminAreas' : baseUrl + 'Admin/areas', // 全国地址
    'adminAreasClearCache' : baseUrl + 'Admin/areas/cache/clear', // 清空商品分类缓存

    // 运费配置
    'adminFreights' : baseUrl + 'Admin/freights',

    // 广告管理
    'adminAdvPositions' : baseUrl + 'Admin/adv_positions',  // 广告位
    'adminAdvs' : baseUrl + 'Admin/advs',  // 广告管理
    'adminAdvsUploadThumb' : baseUrl + 'Admin/advs/upload/thumb', // 品牌缩略图上传

    // 订单管理
    'adminOrders' : baseUrl + 'Admin/orders',

    // 订单售后
    'adminOrderRefunds' : baseUrl + 'Admin/order_refunds',

    // 物流公司
    'adminExpresses' : baseUrl + 'Admin/expresses',

    'adminAllExpresses' : baseUrl + 'Admin/all_expresses',

    // 订单评论
    'adminOrderComments' : baseUrl + 'Admin/order_comments',  

    // 分销日志
    'adminDistributionLogs' : baseUrl + 'Admin/distribution_logs',

    // 优惠券
    'adminCoupons' : baseUrl + 'Admin/coupons',
    'adminCouponLogs' : baseUrl + 'Admin/coupon_logs', // 优惠券日志

    // 满减
    'adminFullReductions' : baseUrl + 'Admin/full_reductions',

    // 秒杀
    'adminSeckills' : baseUrl + 'Admin/seckills',

    // 拼团
    'adminCollectives' : baseUrl + 'Admin/collectives',
    'adminCollectiveLogs' : baseUrl + 'Admin/collective_logs',

    // 砍价
    'adminBargains' : baseUrl + 'Admin/bargains',

    // 结算日志
    'adminOrderSettlements' : baseUrl + 'Admin/order_settlements',

    // 用户资金日志
    'adminMoneyLogs' : baseUrl + 'Admin/money_logs',

    // 资金提现
    'adminCashes' : baseUrl + 'Admin/cashes',

    // 积分商城
    'adminIntegralGoodsClasses' : baseUrl + 'Admin/integral_goods_classes', // 商品分类
    'adminIntegralGoods' : baseUrl + 'Admin/integral_goods', // 积分商品
    'adminIntegralOrders' : baseUrl + 'Admin/integral_orders', // 积分订单

    // 数据统计
    'adminStatistics' : baseUrl + 'Admin/statistics',

    'adminGoodsAttrs' : baseUrl + 'Admin/goods_attrs',

    //信标
    'adminBeacons' : baseUrl + 'Admin/beacons',
    // 文件
    "adminFiles" : baseUrl + "Admin/files",
};
