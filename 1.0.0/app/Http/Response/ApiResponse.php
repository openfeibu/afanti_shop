<?php

namespace App\Http\Response;


class ApiResponse extends Response
{
    /**
     * @var store the response data.
     */
    protected $data = null;

    protected $totalRow = null;

    /**
     * @var Response message for the response.
     */
    protected $message = null;

    /**
     * @var Response status for the response.
     */
    protected $status = null;

    /**
     * @var Response code for the response.
     */
    protected $code = 0;

    /**
     * @var  Url for the redirect response.
     */
    protected $url = null;

    protected $count = 0;

    protected $http_code = 200;

    /**
     * Return json array for  json response.
     *
     * @return json string
     *
     */
    public function json()
    {
        return response()->json([
            'msg' => $this->getMessage(),
            'status' => $this->getStatus(),
            'code' => $this->getCode(),
            'data' => $this->getData(),
        ], $this->http_code);
    }

    /**
     * @return mixed
     */
    public function getMessage()
    {
        return $this->message;
    }

    /**
     * @param mixed $message
     *
     * @return self
     */
    public function message($message)
    {
        $this->message = $message;

        return $this;
    }

    /**
     * @return mixed
     */
    public function getStatus()
    {
        return $this->status;
    }

    /**
     * @param mixed $status
     *
     * @return self
     */
    public function status($status)
    {
        $this->status = $status;

        return $this;
    }

    /**
     * @return mixed
     */
    public function getCode()
    {
        return $this->code;
    }

    /**
     * @return mixed
     */
    public function getStatusCode()
    {
        return $this->status == 'success' ? 200 : 400;
    }

    public function count($count)
    {
        $this->count = $count ? $count : 0;

        return $this;
    }
    public function getCount()
    {
        return $this->count ? $this->count : 0;
    }
    /**
     * @param mixed $code
     *
     * @return self
     */
    public function code($code)
    {
        $this->code = $code;

        return $this;
    }
    public function success($message=NULL)
    {
        $this->code = '0';
        $this->status = 'success';
        $this->message = $message;
        return $this;
    }
    public function error()
    {
        $this->status = 'error';
        return $this;
    }
    /**
     * @return  View for the request
     */
    public function getUrl()
    {
        return $this->url;
    }

    /**
     * @param  View for the request $url
     *
     * @return self
     */
    public function url($url)
    {
        $this->url = $url;

        return $this;
    }

    public function http_code($http_code)
    {
        $this->http_code = $http_code;

        return $this;
    }
    /**
     * @param store the response type $this->getData()
     *
     * @return self
     */
    public function data($data)
    {
        $this->data = $data;
        return $this;
    }

    public function totalRow($totalRow)
    {
        $this->totalRow = $totalRow;
        return $this;
    }
    /**
     * @param store the response data $data
     *
     * @return self
     */
    public function getData()
    {
        return is_array($this->data) ? $this->data : [];
    }

    public function getTotalRow()
    {
        return is_array($this->totalRow) ? $this->totalRow : [];
    }
    /**
     * @param store the response data $data
     *
     * @return self
     */
    public function getFormData()
    {

        if (is_array($this->data)) {
            return current($this->data);
        }

        return [];
    }
}
