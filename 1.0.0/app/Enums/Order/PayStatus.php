<?php

namespace App\Enums\Order;

use BenSampo\Enum\Enum;


final class PayStatus extends Enum
{
    // 待支付
    const PENDING = 10;

    // 支付成功
    const SUCCESS = 20;
}
