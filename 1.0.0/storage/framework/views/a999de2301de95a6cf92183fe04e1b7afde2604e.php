
<!doctype html>
<html lang="<?php echo e(app()->getLocale()); ?>">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="<?php echo e(csrf_token()); ?>">
    <title><?php echo e($title); ?></title>
    <meta name="keywords" content="<?php echo e($keywords); ?>">
    <meta name="description" content="<?php echo e($description); ?>" />
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/ant-design-vue@1.6.2/dist/antd.min.css">

    <script src="https://cdn.bootcdn.net/ajax/libs/vue/2.6.11/vue.min.js"></script>
    <script src="https://cdn.bootcdn.net/ajax/libs/vue-router/3.2.0/vue-router.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/moment@2.27.0/moment.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/clipboard@2.0.6/dist/clipboard.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/ant-design-vue@1.7.3/dist/antd.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/ant-design-vue@1.7.3/dist/antd-with-locales.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/@antv/g2plot@2.0.9/dist/g2plot.min.js"></script> <!-- 图-->
    <script src="https://cdn.jsdelivr.net/npm/vue-amap@0.5.10/dist/index.min.js"></script>
 
</head>

<body>

<div id="app">
    <app></app>
</div>


</body>
 
<script src="<?php echo e(mix('js/app.js','dist')); ?>"></script><?php /**PATH /home/vagrant/Code/qwshop/resources/views/index.blade.php ENDPATH**/ ?>