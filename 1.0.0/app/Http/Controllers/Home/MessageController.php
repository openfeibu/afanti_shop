<?php

namespace App\Http\Controllers\Home;

use App\Http\Controllers\Controller;
use App\Http\Resources\Home\MessageResource\MessageCollection;
use App\Models\Message;
use App\Models\User;
use App\Services\MessageService;
use App\Services\UserService;
use Illuminate\Http\Request;

class MessageController extends Controller
{
    public function __construct(MessageService $message_service)
    {
        $this->message_service = $message_service;
    }
    public function getMessages()
    {
        $user_service = new UserService();
        $user_info = $user_service->getUserInfo();
        $messages = Message::where('user_id',$user_info['id'])
            ->orderBy('id','desc')
            ->paginate(request()->per_page??30);
        Message::where('is_read', 0)->update(['is_read' => 1]);
        return $this->success(new MessageCollection($messages));
    }
}