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
];