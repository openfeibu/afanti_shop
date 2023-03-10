<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Third Party Services
    |--------------------------------------------------------------------------
    |
    | This file is for storing the credentials for third party services such
    | as Mailgun, Postmark, AWS and more. This file provides the de facto
    | location for this type of information, allowing packages to have
    | a conventional file to locate the various service credentials.
    |
    */

    'mailgun' => [
        'domain' => env('MAILGUN_DOMAIN'),
        'secret' => env('MAILGUN_SECRET'),
        'endpoint' => env('MAILGUN_ENDPOINT', 'api.mailgun.net'),
    ],

    'postmark' => [
        'token' => env('POSTMARK_TOKEN'),
    ],

    'ses' => [
        'key' => env('AWS_ACCESS_KEY_ID'),
        'secret' => env('AWS_SECRET_ACCESS_KEY'),
        'region' => env('AWS_DEFAULT_REGION', 'us-east-1'),
    ],

    'github' => [
        'client_id' => env('GITHUB_CLIENT_ID','db2f6ba33fc14'),
        'client_secret' => env('GITHUB_CLIENT_SECRET','2c64153a1db17ebdb60f3453fb'),
        'redirect' => 'http://127.0.0.1:8000/api/oauth/github',
    ],

    'weixinweb' => [    
        'client_id' => env('WEIXINWEB_CLIENT_ID','wxdbb3fd7a1ae01d9d'),
        'client_secret' => env('WEIXINWEB_CLIENT_SECRET','54267fc709bd489fb7fa76c05fd2a035'),
        'redirect' => env('WEIXINWEB_REDIRECT_URI','http://afanti.feibu.info/api/oauth/weixinweb')
    ],

    'weixin' => [    
        'client_id' => env('WEIXIN_CLIENT_ID'),  
        'client_secret' => env('WEIXIN_CLIENT_SECRET'),  
        'redirect' => env('WEIXIN_REDIRECT_URI') 
    ],


];
