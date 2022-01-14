<?php
namespace App\Services;

use App\Models\Message;
use App\Traits\HelperTrait;


class MessageService extends BaseService
{
    use HelperTrait;

    public function send($user_id,$content,$type='order')
    {
        return Message::create([
            'user_id' => $user_id,
            'content' => $content,
            'type' => $type
        ]);
    }
}