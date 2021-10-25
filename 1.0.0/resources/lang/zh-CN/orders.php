<?php

// 简体中文

return [

    // 操作订单错误
    'error'                              =>  '非法订单.',
    'create_success'                     =>  '创建订单成功.',

    'stock_error'                        =>  '有产品库存信息发生变化，请返回购物车修改.',
    'no_address'                         =>  '没有选择收货地址.',

    'order_pay'                          =>  '订单已经支付.',
    'payment_failed'                     =>  '支付失败.',
    'empty_payment'                      =>  '请选择支付方式.',
    'pay_password_error'                 =>  '支付密码错误.',
    'balance_insufficient'               =>  '余额不足,请先充值.',

    'balance_pay_success'                =>  '余额支付成功.',
    'payment_call_error'                 =>  '支付回调失败.',

    'order_cart_del_error'               =>  '创建订单购物车删除失败.',

    // 没有需要评了的订单
    'order_comment_error'                =>  '非法评论.',
    'order_comment_success'              =>  '评论成功.',

    // 该订单已经申请过售后
    'order_refund_handle'                =>  '该订单已经申请过售后.',
    'order_refund_success'               =>  '申请成功等待管理员审核.',

    'goods_failure' => '部分产品已下架.',

    'order_source_desc' => [
        'common' => '普通下单',
        'seckill' => '秒杀',
        'collective' => '拼团',
        'bargain' => '砍价',
    ],

    'order_status' => [
        '10' => '进行中',
        '20' => '已取消',
        '21' => '待取消',
        '30' => '已完成',
    ],
    'pay_status' => [
        '10' => '待支付',
        '20' => '已支付',
    ],
    'receipt_status' => [
        '10' => '未收货',
        '20' => '已收货',
    ],
    'delivery_status' => [
        '10' => '未发货',
        '20' => '已发货',
    ],

    // 订单状态
    'order_cancel'                                  =>   '订单取消',
    'wait_pay'                                      =>   '等待支付',
    'wait_send'                                     =>   '等待发货',
    'wait_rec'                                      =>   '等待收货',
    'order_confirm'                                 =>   '等待收货', // 确认收货
    'wait_comment'                                  =>   '等待评论',
    'order_refund'                                  =>   '售后退款',
    'order_returned'                                =>   '售后退货',
    'order_refund_over'                             =>   '售后完成',
    'order_completion'                              =>   '订单完成',

    // 支付类型
    'payment_name' => [
        'payment_wechat'                                =>   '微信支付',
        'payment_ali'                                   =>   '支付宝支付',
        'payment_money'                                 =>   '余额支付',
    ],

];