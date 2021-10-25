<?php
namespace App\Services;

use App\Models\Order;
use App\Traits\HelperTrait;


class OrderCompleteService extends BaseService
{
    use HelperTrait;

    /**
     * 执行订单完成后的操作
     * @param $order_list
     * @return bool
     */
    public function complete($order_list)
    {
        // 已完成订单结算
        // 条件：后台订单流程设置 - 已完成订单设置0天不允许申请售后
        $config_service = new ConfigService();
        $task = $config_service->getFormatConfig('task');
        $refund_days = $task['refund_days'];
        if ($refund_days == 0) {
            $this->settled($order_list);
        }
        return true;
    }

    /**
     * 执行订单结算
     * @param $order_list
     * @return bool
     * @throws \Exception
     */
    public function settled($order_list)
    {
        // 订单id集
        $order_ids = getArrayColumn($order_list, 'id');
        // 将订单设置为已结算
        Order::whereIn('id',$order_ids)->update([
            'is_settlement' => 1
        ]);
        return true;
    }
}