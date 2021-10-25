<?php

namespace App\Enums\Order;

use BenSampo\Enum\Enum;


final class OrderStatus extends Enum
{
    // 进行中
    const NORMAL = 10;

    // 已取消
    const CANCELLED = 20;

    // 待取消
    const APPLY_CANCEL = 21;

    // 已完成
    const COMPLETED = 30;
}
