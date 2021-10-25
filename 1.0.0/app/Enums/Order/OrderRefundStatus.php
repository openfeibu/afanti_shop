<?php

namespace App\Enums\Order;

use BenSampo\Enum\Enum;

/**
 * @method static static OptionOne()
 * @method static static OptionTwo()
 * @method static static OptionThree()
 */
final class OrderRefundStatus extends Enum
{
    //售后单状态(0进行中 10已拒绝 20已完成 30已取消)
    // 进行中
    const NORMAL = 0;

    // 已取消
    const REJECTED = 10;

    // COMPLETED
    const COMPLETED = 20;

    // 已取消
    const CANCELLED = 30;

}
