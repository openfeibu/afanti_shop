<?php

namespace App\Exceptions;

use App\Http\Response\ApiResponse;
use App\Traits\ExceptionCustomHandlerTrait;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Throwable;

class Handler extends ExceptionHandler
{
    use ExceptionCustomHandlerTrait;
    /**
     * A list of the exception types that are not reported.
     *
     * @var array
     */
    protected $dontReport = [
        //
    ];

    /**
     * A list of the inputs that are never flashed for validation exceptions.
     *
     * @var array
     */
    protected $dontFlash = [
        'password',
        'password_confirmation',
    ];

    /**
     * Report or log an exception.
     *
     * @param  \Throwable  $exception
     * @return void
     *
     * @throws \Exception
     */
    public function report(Throwable $exception)
    {
        parent::report($exception);
    }

    /**
     * Render an exception into an HTTP response.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Throwable  $exception
     * @return \Symfony\Component\HttpFoundation\Response
     *
     * @throws \Throwable
     */
    public function render($request, Throwable $exception)
    {
        $response = $this->handle($request,$exception);
        if ($response) {
            return $response;
        }
        return parent::render($request, $exception);
    }
    public function handle($request,$exception)
    {
        $responseJson = $this->custom_handle($exception);
        if($responseJson)
        {

//            if ($request->ajax() || $request->expectsJson())
//            {
                return app(ApiResponse::class)
                    ->code($responseJson['code'])
                    ->status($responseJson['status'])->message($responseJson['message'])
                    ->errors($responseJson['errors'] ?? [])
                    ->json();
//            }else{
//                return response()->view('message.error',$responseJson);
//            }
        }
    }
}
