<?php
namespace App\Traits;

use App\Exceptions\OutOfStockException;
use Symfony\Component\HttpKernel\Exception\UnauthorizedHttpException;
use Yansongda\Pay\Exceptions\BusinessException;
use Yansongda\Pay\Exceptions\GatewayException;

trait ExceptionCustomHandlerTrait
{
    public function custom_handle($exception)
    {
        $responseJson = [];
        switch ($exception) {
            case ($exception instanceof \App\Exceptions\RequestSuccessException):
                $responseJson = [
                    'code' => 200,
                    'status' => 'success',
                    'message' => sprintf(config('error.200'), $exception->getMessage() ?: '请求成功'),
                ];
                break;
            case ($exception instanceof \App\Exceptions\OutputServerMessageException):
                $responseJson = [
                    'code' => 400,
                    'status' => 'error',
                    'message' => $exception->getMessage(),
                ];
                break;
            case ($exception instanceof UnauthorizedHttpException):
                $responseJson = [
                    'code' => 401,
                    'status' => 'error',
                    'message' => $exception->getMessage(),
                ];
                break;
            case ($exception instanceof \App\Exceptions\UserUnauthorizedException):
                $responseJson = [
                    'code' => 401,
                    'status' => 'error',
                    'message' => $exception->getMessage(),
                ];
                break;
            case ($exception instanceof \App\Exceptions\DataNotFoundException):
                $responseJson = [
                    'code' => 404,
                    'status' => 'error',
                    'message' => $exception->getMessage() ? $exception->getMessage() : trans('error.404'),
                ];
                break;
            case ($exception instanceof  \Illuminate\Database\Eloquent\ModelNotFoundException):
                $responseJson = [
                    'code' => 404,
                    'status' => 'error',
                    'message' => $exception->getMessage() ? $exception->getMessage() : trans('error.404'),
                ];
                break;
            case ($exception instanceof \Illuminate\Session\TokenMismatchException):
                $responseJson = [
                    'code' => 419,
                    'status' => 'error',
                    'url' => url()->previous(),
                    'message' => '页面Token 失效，请重新进入',
                ];
                break;
            case ($exception instanceof \Illuminate\Validation\ValidationException):
                $responseJson = [
                    'code' => 422,
                    'status' => 'error',
                    'message' => $exception->validator->errors()->first(),
                    'errors' => $exception->validator->getMessageBag(),
                ];
                break;
            case ($exception instanceof OutOfStockException):
                $responseJson = [
                    'code' => $exception->getStatusCode(),
                    'status' => 'error',
                    'message' => $exception->getMessage(),
                ];
                break;
            case ($exception instanceof GatewayException):
                $responseJson = [
                    'code' => 400,
                    'status' => 'error',
                    'message' => $exception->raw['alipay_trade_refund_response']['sub_msg'] ?? $exception->getMessage(),
                ];
                break;
            case ($exception instanceof BusinessException):
                $responseJson = [
                    'code' => 400,
                    'status' => 'error',
                    'message' => $exception->getMessage(),
                ];
                break;
            default:
                return false;
                break;
        }

        return $responseJson;
    }
}