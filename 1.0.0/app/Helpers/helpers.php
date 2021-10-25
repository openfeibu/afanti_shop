<?php

use Illuminate\Support\Facades\Request;
use App\Facades\Hashids;
use App\Facades\Trans;

if (!function_exists('hashids_encode')) {
    /**
     * Encode the given id.
     *
     * @param int/array $id
     *
     * @return string
     */
    function hashids_encode($idorarray)
    {
        return Hashids::encode($idorarray);
    }

}

if (!function_exists('hashids_decode')) {
    /**
     * Decode the given value.
     *
     * @param string $value
     *
     * @return array / int
     */
    function hashids_decode($value)
    {
        $return = Hashids::decode($value);

        if (empty($return)) {
            return null;
        }

        if (count($return) == 1) {
            return $return[0];
        }

        return $return;
    }

}

if (!function_exists('folder_new')) {
    /**
     * Get new upload folder pathes.
     *
     * @param string $prefix
     * @param string $sufix
     *
     * @return array
     */
    function folder_new($prefix = null, $sufix = null)
    {
        $folder        = date('Y/m/d/His') . rand(100, 999);
        return $folder;
    }
}


if (!function_exists('format_date')) {
    /**
     * Format date
     *
     * @param string $date
     * @param string $format
     *
     * @return date
     */
    function format_date($date, $format = 'd M Y')
    {
        if (empty($date)) return null;
        return date($format, strtotime($date));
    }

}

if (!function_exists('format_date_time')) {
    /**
     * Format datetime
     *
     * @param date $datetime
     * @param string $format
     *
     * @return datetime
     */
    function format_date_time($datetime, $format = 'd M Y h:i A')
    {
        return date($format, strtotime($datetime));
    }

}

if (!function_exists('format_time')) {
    /**
     * Format time.
     *
     * @param string $time
     * @param string $format
     *
     * @return time
     */
    function format_time($time, $format = 'h:i A')
    {
        return date($format, strtotime($time));
    }

}

if (!function_exists('replace_image_url')) {
    function replace_image_url($content,$url)
    {
        if($url)
        {
            preg_match_all("/<img(.*)src=\"([^\"]+)\"[^>]+>/isU", $content, $matches);
            $img = "";
            if(!empty($matches)) {
                $img = $matches[2];
            }
            if(!empty($img))
            {
                $patterns= array();
                $replacements = array();
                foreach($img as $imgItem){
                    if(strpos($imgItem,'http') === false)
                    {
                        $final_imgUrl = $url.$imgItem;
                        $replacements[] = $final_imgUrl;
                        $img_new = "/".preg_replace("/\//i","\/",$imgItem)."/";
                        $patterns[] = $img_new;
                    }
                }
                ksort($patterns);
                ksort($replacements);
                $vote_content = preg_replace($patterns, $replacements, $content);
                return $vote_content;
            } else {
                return $content;
            }
        } else {
            return $content;
        }
    }
}
if (!function_exists('get_substr')) {
    function get_substr($str, $len = 12, $dot = true)
    {
        $i = 0;
        $l = 0;
        $c = 0;
        $a = array();
        while ($l < $len) {
            $t = substr($str, $i, 1);
            if (ord($t) >= 224) {
                $c = 3;
                $t = substr($str, $i, $c);
                $l += 2;
            } elseif (ord($t) >= 192) {
                $c = 2;
                $t = substr($str, $i, $c);
                $l += 2;
            } else {
                $c = 1;
                $l++;
            }
            $i += $c;
            if ($l > $len) break;
            $a[] = $t;
        }
        $re = implode('', $a);
        if (substr($str, $i, 1) !== false) {
            array_pop($a);
            ($c == 1) and array_pop($a);
            $re = implode('', $a);
            $dot and $re .= '...';
        }
        return $re;
    }
}
if (!function_exists('handle_image_url')) {
    function handle_image_url($image_url = '', $host = '')
    {
        $host = $host ? $host : config('app.image_url') . '/';
        if (!empty($image_url) && strpos($image_url, 'http') === false) {
            $image_url = $host . $image_url;
        }
        return $image_url;
    }
}
if (!function_exists('first_image')) {
    function first_image($content)
    {
        $data['content'] = $content;
        $soContent = $data['content'];
        $soImages = '~<img [^>]* />~';
        preg_match_all($soImages, $soContent, $thePics);
        $allPics = count($thePics[0]);
        preg_match('/<img.+src=\"?(.+\.(jpg|gif|bmp|bnp|PNG))\"?.+>/i', $thePics[0][0], $match);
        $data['ig'] = $thePics[0][0];
        if ($allPics > 0) {
            return $match[1];
        } else {
            return null;
        }
    }
}
if (!function_exists('list_image_url_absolute')) {
    function list_image_url_absolute($list, $size = 'sm')
    {
        foreach ($list as $key => $data) {
            $list[$key]['image'] = image_url_absolute($data['image'], $size);
        }
        return $list;
    }
}
if (!function_exists('image_url_absolute')) {
    function image_url_absolute($image, $size = 'sm')
    {
        return $image ? url("/image/" . $size . $image) : '';
    }
}
if (!function_exists('handle_images')) {
    function handle_images($images, $host = '')
    {
        foreach ($images as $key => $image) {
            $images[$key] = handle_image_url($image, $host);
        }
        return $images;
    }
}


if (!function_exists('date_html')) {
    function date_html($date)
    {
        $month = date('M',strtotime($date));
        $day = date('d',strtotime($date));
        $html = '<div class="date"><p>'.$day.'</p><span>'.$month.'</span></div>';
        return $html;
    }
}
/*
* ============================== 截取含有 html标签的字符串 =========================
* @param (string) $str   待截取字符串
* @param (int)  $lenth  截取长度
* @param (string) $repalce 超出的内容用$repalce替换之（该参数可以为带有html标签的字符串）
* @param (string) $anchor 截取锚点，如果截取过程中遇到这个标记锚点就截至该锚点处
* @return (string) $result 返回值
* @demo  $res = cut_html_str($str, 256, '...'); //截取256个长度，其余部分用'...'替换
* ===============================================================================
*/
if (!function_exists('cut_html_str')) {
    function cut_html_str($str, $lenth, $replace = '......', $anchor = '<!-- break -->')
    {
        $_lenth = mb_strlen($str, "utf-8"); // 统计字符串长度（中、英文都算一个字符）
        if ($_lenth <= $lenth) {
            return $str;    // 传入的字符串长度小于截取长度，原样返回
        }
        $strlen_var = strlen($str);     // 统计字符串长度（UTF8编码下-中文算3个字符，英文算一个字符）
        if (strpos($str, '<') === false) {
            return mb_substr($str, 0, $lenth);  // 不包含 html 标签 ，直接截取
        }
        if ($e = strpos($str, $anchor)) {
            return mb_substr($str, 0, $e);  // 包含截断标志，优先
        }
        $html_tag = 0;  // html 代码标记
        $result = '';   // 摘要字符串
        $html_array = array('left' => array(), 'right' => array()); //记录截取后字符串内出现的 html 标签，开始=>left,结束=>right
        /*
        * 如字符串为：<h3><p><b>a</b></h3>，假设p未闭合，数组则为：array('left'=>array('h3','p','b'), 'right'=>'b','h3');
        * 仅补全 html 标签，<? <% 等其它语言标记，会产生不可预知结果
        */
        for ($i = 0; $i < $strlen_var; ++$i) {
            if (!$lenth) break;  // 遍历完之后跳出
            $current_var = substr($str, $i, 1); // 当前字符
            if ($current_var == '<') { // html 代码开始
                $html_tag = 1;
                $html_array_str = '';
            } else if ($html_tag == 1) { // 一段 html 代码结束
                if ($current_var == '>') {
                    $html_array_str = trim($html_array_str); //去除首尾空格，如 <br / > < img src="" / > 等可能出现首尾空格
                    if (substr($html_array_str, -1) != '/') { //判断最后一个字符是否为 /，若是，则标签已闭合，不记录
                        // 判断第一个字符是否 /，若是，则放在 right 单元
                        $f = substr($html_array_str, 0, 1);
                        if ($f == '/') {
                            $html_array['right'][] = str_replace('/', '', $html_array_str); // 去掉 '/'
                        } else if ($f != '?') { // 若是?，则为 PHP 代码，跳过
                            // 若有半角空格，以空格分割，第一个单元为 html 标签。如：<h2 class="a"> <p class="a">
                            if (strpos($html_array_str, ' ') !== false) {
                                // 分割成2个单元，可能有多个空格，如：<h2 class="" id="">
                                $html_array['left'][] = strtolower(current(explode(' ', $html_array_str, 2)));
                            } else {
                                //若没有空格，整个字符串为 html 标签，如：<b> <p> 等，统一转换为小写
                                $html_array['left'][] = strtolower($html_array_str);
                            }
                        }
                    }
                    $html_array_str = ''; // 字符串重置
                    $html_tag = 0;
                } else {
                    $html_array_str .= $current_var; //将< >之间的字符组成一个字符串,用于提取 html 标签
                }
            } else {
                --$lenth; // 非 html 代码才记数
            }
            $ord_var_c = ord($str[$i]);
            switch (true) {
                case (($ord_var_c & 0xE0) == 0xC0): // 2 字节
                    $result .= substr($str, $i, 2);
                    $i += 1;
                    break;
                case (($ord_var_c & 0xF0) == 0xE0): // 3 字节
                    $result .= substr($str, $i, 3);
                    $i += 2;
                    break;
                case (($ord_var_c & 0xF8) == 0xF0): // 4 字节
                    $result .= substr($str, $i, 4);
                    $i += 3;
                    break;
                case (($ord_var_c & 0xFC) == 0xF8): // 5 字节
                    $result .= substr($str, $i, 5);
                    $i += 4;
                    break;
                case (($ord_var_c & 0xFE) == 0xFC): // 6 字节
                    $result .= substr($str, $i, 6);
                    $i += 5;
                    break;
                default: // 1 字节
                    $result .= $current_var;
            }
        }
        if ($html_array['left']) { //比对左右 html 标签，不足则补全
            $html_array['left'] = array_reverse($html_array['left']); //翻转left数组，补充的顺序应与 html 出现的顺序相反
            foreach ($html_array['left'] as $index => $tag) {
                $key = array_search($tag, $html_array['right']); // 判断该标签是否出现在 right 中
                if ($key !== false) { // 出现，从 right 中删除该单元
                    unset($html_array['right'][$key]);
                } else { // 没有出现，需要补全
                    $result .= '</' . $tag . '>';
                }
            }
        }
        return $result . $replace;
    }
}
if (!function_exists('drop_blank')) {
    function drop_blank($str)
    {
        $str = preg_replace("/\t/", "", $str); //使用正则表达式替换内容，如：空格，换行，并将替换为空。
        $str = preg_replace("/\r\n/", "", $str);
        $str = preg_replace("/\r/", "", $str);
        $str = preg_replace("/\n/", "", $str);
        $str = preg_replace("/ /", "", $str);
        $str = preg_replace("/  /", "", $str);  //匹配html中的空格
        return trim($str); //返回字符串
    }
}
if (!function_exists('build_order_sn')) {
    function build_order_sn()
    {
        return date('Ymd') . substr(implode(NULL, array_map('ord', str_split(substr(uniqid(), 7, 13), 1))), 0, 8);
    }
}
if (!function_exists('isVaildImage')) {
    function isVaildImage($files)
    {
        $error = '';

        foreach($files as $key => $file)
        {
            $name = $file->getClientOriginalName();
            if(!$file->isValid())
            {
                $error.= $name.$file->getErrorMessage().';';
            }
            if(!in_array( strtolower($file->extension()),config('common.img_type'))){
                $error.= $name."类型错误;";
            }
            if($file->getClientSize() > config('common.img_size')){
                $img_size = config('common.img_size')/(1024*1024);
                $error.= $name.'超过'.$img_size.'M';
            }
        }
        if($error)
        {
            throw new \App\Exceptions\OutputServerMessageException($error);
        }
    }
}
if (!function_exists('isVaildFile')) {
    function isVaildFile($files)
    {
        $error = '';

        foreach($files as $key => $file)
        {
            $name = $file->getClientOriginalName();
            if(!$file->isValid())
            {
                $error.= $name.$file->getErrorMessage().';';
            }
            if(!in_array( strtolower($file->extension()),config('common.file_type'))){
                $error.= $name."类型错误;";
            }
            if($file->getClientSize() > config('common.file_size')){
                $file_size = config('common.file_size')/(1024*1024);
                $error.= $name.'超过'.$file_size.'M';
            }
        }
        if($error)
        {
            throw new \App\Exceptions\OutputServerMessageException($error);
        }
    }
}

if (!function_exists('isVaildExcel')) {
    function isVaildExcel($file)
    {
        $error = '';
        $name = $file->getClientOriginalName();
        if(!$file->isValid())
        {
            $error.= $name.$file->getErrorMessage().';';
        }
//        if(!in_array( strtolower($file->extension()),config('common.excel_type'))){
//            $error.= $name."为".strtolower($file->extension())."格式，非Excel格式;";
//        }
        if($file->getClientSize() > config('common.file_size')){
            $file_size = config('common.file_size')/(1024*1024);
            $error.= $name.'超过'.$file_size.'M';
        }

        if($error)
        {
            throw new \App\Exceptions\OutputServerMessageException($error);
        }
    }
}
if (!function_exists('image_png_size_add')) {
    function image_png_size_add($imgsrc, $imgdst,$max_width=1000,$size=0.9)
    {
        list($width, $height, $type) = getimagesize($imgsrc);
        $ratio = $width > $max_width ? $max_width / $width : 1;
        $new_width = $ratio * $width * $size;
        $new_height = $ratio * $height * $size;

        switch ($type) {
            case 1:
                $giftype = check_gifcartoon($imgsrc);
                if ($giftype) {
                    $image_wp = imagecreatetruecolor($new_width, $new_height);
                    $image = imagecreatefromgif($imgsrc);
                    imagecopyresampled($image_wp, $image, 0, 0, 0, 0, $new_width, $new_height, $width, $height);
                    imagegif($image_wp, $imgdst, 75);
                    imagedestroy($image_wp);
                }
                break;
            case 2:
                $image_wp = imagecreatetruecolor($new_width, $new_height);
                $image = imagecreatefromjpeg($imgsrc);
                imagecopyresampled($image_wp, $image, 0, 0, 0, 0, $new_width, $new_height, $width, $height);
                imagejpeg($image_wp, $imgdst, 75);
                imagedestroy($image_wp);
                break;
            case 3:
                $image_wp = imagecreatetruecolor($new_width, $new_height);
                $image = imagecreatefrompng($imgsrc);
                imagesavealpha($image, true);
                imagealphablending($image_wp, false);
                imagesavealpha($image_wp, true);
                imagecopyresampled($image_wp, $image, 0, 0, 0, 0, $new_width, $new_height, $width, $height);
                imagepng($image_wp, $imgdst);
                imagedestroy($image_wp);
                break;
        }

    }
}
if (!function_exists('check_gifcartoon')) {
    function check_gifcartoon($image_file)
    {
        $fp = fopen($image_file, 'rb');
        $image_head = fread($fp, 1024);
        fclose($fp);
        return true;
    }
}
if (!function_exists('generate_token')) {
    function generate_token()
    {
        return md5(uniqid());
    }
}
if (!function_exists('guard_prefix')) {
    function guard_prefix()
    {
        return empty(getenv('guard')) ? 'user' : current(explode(".", getenv('guard')));
    }
}

if (!function_exists('validateParameter')) {
    function validateParameter($rules,$message=[])
    {

        $validator = Validator::make(Request::all(), $rules,$message);
        if ($validator->fails()) {
            throw new \App\Exceptions\OutputServerMessageException($validator->errors()->first());
        } else {
            return true;
        }
    }
}
if (!function_exists('validateCustomParameter')) {
    function validateCustomParameter($data,$rules,$message=[])
    {

        $validator = Validator::make($data, $rules,$message);
        if ($validator->fails()) {
            throw new \App\Exceptions\OutputServerMessageException($validator->errors()->first());
        } else {
            return true;
        }
    }
}
if (!function_exists('validateData')) {
    function validateData($value, $custom)
    {
        if (preg_match("/[\'.,:;*?~`!@#$%^&+=)(<>{}]|\]|\[|\/|\\\|\"|\|/", $value)) {
            throw new \App\Exceptions\OutputServerMessageException($custom . "含非法参数");
        }
        return true;
    }
}
if (!function_exists('visible_data')) {
    function visible_data($data,$keys)
    {
        $return_data = [];
        foreach ($keys as $key)
        {
            $return_data[$key] = $data[$key];
        }
        return $return_data;
    }
}
if (!function_exists('configs')) {
    function configs($name, $value='val')
    {
        return \App\Models\Config::where('name', $name)->value($value);
    }
}
if (!function_exists('generate_order_sn')) {
    function generate_order_sn($prefix='')
    {
        $prefix = $prefix ?? configs('order_sn_prefix');
        $order_sn = $prefix.date('YmdHis') . substr(implode(NULL, array_map('ord', str_split(substr(uniqid(), 7, 13), 1))), 0, 8);
        return $order_sn;
    }
}
if (!function_exists('generate_goods_no')) {
    function generate_goods_no($goods_id=0)
    {
        $goods_id = $goods_id ? $goods_id : \App\Models\Goods::max('id')+1;
        $goods_no = configs('goods_no_prefix') . str_repeat('0', 8 - strlen($goods_id)) . $goods_id;
        return $goods_no;
    }
}

/**
 * 友好的时间显示
 *
 * @param  int    $sTime 待显示的时间
 * @param  string $type  类型. normal | mohu | full | ymd | other
 * @param  string $alt   已失效
 * @return string
 */
if(!function_exists('friendly_date')){
    function friendly_date($sTime, $type = 'mohu', $alt = 'false')
    {
        if (!$sTime) {
            return '';
        }
        //	var_dump($sTime);exit;
        $sTime = strtotime($sTime);
        //sTime=源时间，cTime=当前时间，dTime=时间差
        $cTime = time();
        $dTime = $cTime - $sTime;
        $dDay = ceil($dTime/3600/24);
        //$dDay     =   intval($dTime/3600/24);
        $dYear = intval(date('Y', $cTime)) - intval(date('Y', $sTime));
        //normal：n秒前，n分钟前，n小时前，日期
        if ($type == 'normal') {
            if ($dTime < 60) {
                if ($dTime < 10) {
                    return '刚刚';    //by yangjs
                } else {
                    return intval(floor($dTime / 10) * 10).'秒前';
                }
            } elseif ($dTime < 3600) {
                return intval($dTime / 60).'分钟前';
                //今天的数据.年份相同.日期相同.
            } elseif ($dYear == 0 && $dDay == 0) {
                //return intval($dTime/3600)."小时前";
                return '今天'.date('H:i', $sTime);
            } elseif ($dYear == 0) {
                return date('m月d日 H:i', $sTime);
            } else {
                return date('Y-m-d H:i', $sTime);
            }
        }elseif ($type == 'weixin'){
            //返回的时间
            $timeStr = "";
            //获取当前时间
            $addTime = explode(',', date('Y,n,j,w,a,h,i,y', $sTime));//年，月，日，星期，上下午，时，分
            $nowTime = explode(',', date('Y,n,j,w,a,h,i,y', $cTime));

            $dayPerMonthAddTime = getDayPerMonth($addTime[0]);
            $week = array(0=>"星期日",1=>"星期一",2=>"星期二",3=>"星期三",4=>"星期四",5=>"星期五",6=>"星期六");
            //如果时间差小于一天的,显示（上午 时间） / （下午 时间）
            if($addTime[0] == $nowTime[0] && $addTime[1] == $nowTime[1] && $addTime[2] == $nowTime[2]) {
                $timeStr .= $addTime[5] . ":" . $addTime[6];
            } else if(($addTime[0] == $nowTime[0] && $addTime[1] == $nowTime[1] && $addTime[2] == $nowTime[2]-1)
                || ($addTime[0] == $nowTime[0] && $nowTime[1]-$addTime[1] == 1 && $dayPerMonthAddTime[$addTime[1]] == $addTime[2] && $nowTime[2] == 1)
                || ($nowTime[0]-$addTime[0] == 1 && $addTime[1] == 12 && $addTime[2] == 31 && $nowTime[1] == 1 && $nowTime[2] == 1)) {
                //如果时间差在昨天,三种情况（同一月份内跨一天、月末跨越到月初、年末跨越到年初）显示格式：昨天 时:分 上午/下午
                $timeStr .= "昨天 " . $addTime[5] . ":" . $addTime[6] . " ";
            } else if(($addTime[0] == $nowTime[0] && $addTime[1] == $nowTime[1] && $nowTime[2] - $addTime[2] < 7)
                || ($addTime[0] == $nowTime[0] && $nowTime[1]-$addTime[1] == 1 && $dayPerMonthAddTime[$addTime[1]]-$addTime[2]+$nowTime[2] < 7
                    || ($nowTime[0]-$addTime[0] == 1 && $addTime[1] == 12 && $nowTime[1] == 1 && 31-$addTime[2]+$nowTime[2] < 7))) { //如果时间差在一个星期之内的,也是三种情况，显示格式：星期 时:分 上午/下午

                $timeStr .= $week[$addTime[3]] . " " . $addTime[5] . ":" . $addTime[6];
            } else { //显示格式：月/日/年 时:分 上午/下午
                $timeStr .= $addTime[1] . "/" . $addTime[2] . "/" . $addTime[7] . " " . $addTime[5] . ":" . $addTime[6];
            }

            if($addTime[4] == "am") {
                $timeStr .= " 上午";
            } else if($addTime[4] == "pm") {
                $timeStr .= " 下午";
            }

            return $timeStr;
        }elseif ($type == 'mohu') {
            if ($dTime < 60) {
                return $dTime.'秒前';
            } elseif ($dTime < 3600) {
                return intval($dTime / 60).'分钟前';
            } elseif ($dTime >= 3600 && $dTime < 3600 * 24) {
                return intval($dTime / 3600).'小时前';
            } elseif ($dDay > 0 && $dDay <= 7) {
                return intval($dDay).'天前';
            } elseif ($dDay > 7 &&  $dDay <= 30) {
                return intval($dDay / 7).'周前';
            } elseif ($dDay > 30) {
                return intval($dDay / 30).'个月前';
            }
            var_dump($dDay);exit;
            //full: Y-m-d , H:i:s
        } elseif ($type == 'full') {
            return date('Y-m-d , H:i:s', $sTime);
        } elseif ($type == 'ymd') {
            return date('Y-m-d', $sTime);
        } else {
            if ($dTime < 60) {
                return $dTime.'秒前';
            } elseif ($dTime < 3600) {
                return intval($dTime / 60).'分钟前';
            } elseif ($dTime >= 3600 && $dDay == 0) {
                return intval($dTime / 3600).'小时前';
            } elseif ($dYear == 0) {
                return date('Y-m-d H:i:s', $sTime);
            } else {
                return date('Y-m-d H:i:s', $sTime);
            }
        }
    }
}
if(!function_exists('rid_two')) {
//舍去保留两位
    function rid_two($num)
    {
        return floor($num * 100) / 100;
    }
}
//处理敏感字段
if(!function_exists('sensitive_address')) {
    function sensitive_address($str)
    {
        $str = preg_replace('#\d{3,}#', '***', $str);
        return $str;
    }
}
if(!function_exists('OutputServerMessageException')) {
    function OutputServerMessageException($error)
    {
        throw new \App\Exceptions\OutputServerMessageException($error);
    }
}

if(!function_exists('formatBankCardNo')) {
    /**
     * 对银行卡号进行掩码处理
     * 掩码规则头4位,末尾余数位不变，中间4的整数倍字符用星号替换，并且用每隔4位空格隔开
     * @param  string $bankCardNo 银行卡号
     * @return string             掩码后的银行卡号
     */
    function formatBankCardNo($bankCardNo){
        $tool_service = new \App\Services\ToolService();
        return $tool_service->formatBankCardNo($bankCardNo);
    }
}

if(!function_exists('formatMobile')) {
    /**
     * 对手机号进行掩码处理
     * 手机号掩码的规则是末尾4位，开头余数位不变，中间4的整数倍字符用星号替换
     * @param string $mobile 手机号
     * @return string
     */
    function formatMobile($mobile){
        $tool_service = new \App\Services\ToolService();
        return $tool_service->formatMobile($mobile);
    }
}

if(!function_exists('formatTrueName')) {
    /**
     * 姓名第一个字掩码
     * @param string $true_name 真实姓名
     * @return string
     */
    function formatTrueName($true_name){
        $tool_service = new \App\Services\ToolService();
        return $tool_service->formatTrueName($true_name);
    }
}

if(!function_exists('formatTrueName2')) {
    /**
     * 只显示最后一个字符
     * @param string $true_name 真实姓名
     * @return string
     */
    function formatTrueName2($true_name){
        $tool_service = new \App\Services\ToolService();
        return $tool_service->formatTrueName2($true_name);

    }
}

if(!function_exists('formatIdCard')) {
    /**
     * 对身份证进行掩码
     * 掩码规则是显示头两位和末尾1位，中间星号
     * @param string $id_card 身份证号
     * @return string
     */
    function formatIdCard($id_card){
        $tool_service = new \App\Services\ToolService();
        return $tool_service->formatIdCard($id_card);
    }
}

if(!function_exists('bcequal')) {
    function bcequal($leftOperand, $rightOperand, $scale = 2)
    {
        return bccomp($leftOperand, $rightOperand, $scale) === 0;
    }
}

if(!function_exists('getArrayItemByColumn')) {
    function getArrayItemByColumn($array, $column, $value)
    {
        foreach ($array as $item) {
            if ($item[$column] == $value) {
                return $item;
            }
        }
        return false;
    }
}

/**
 * 获取数组中指定的列
 * @param $source
 * @param $column
 * @return array
 */
function getArrayColumn($source, $column)
{
    $columnArr = [];
    foreach ($source as $item) {
        $columnArr[] = $item[$column];
    }
    return $columnArr;
}

/**
 * 获取数组中指定的列
 * @param $source
 * @param $columns
 * @return array
 */
if(!function_exists('getArrayColumns')) {
    function getArrayColumns($source, $columns)
    {
        $columnArr = [];
        foreach ($source as $item) {
            $temp = [];
            foreach ($columns as $index) {
                $temp[$index] = $item[$index];
            }
            $columnArr[] = $temp;
        }
        return $columnArr;
    }
}
/**
 * 获取二维数组中指定的列
 * @param $source
 * @param $columns
 * @return array
 */
if(!function_exists('getArray2Columns')) {
    function getArray2Columns($source, $columns)
    {

        $columnArr = [];
        foreach ($source as $item) {
            $columnArr[] = getArrayColumns($item,$columns);
        }
        return $columnArr;
    }
}
if(!function_exists('getArrayColumnSum')) {
    function getArrayColumnSum($array, $column)
    {
        $sum = 0;
        foreach ($array as $item) {
            $sum += $item[$column] * 100;
        }
        return $sum / 100;
    }
}
/**
 * 二维数组排序
 * @param $arr
 * @param $keys
 * @param bool $desc
 * @return mixed
 */
if(!function_exists('array_sort')) {
    function array_sort($arr, $keys, $desc = false)
    {
        $key_value = $new_array = array();
        foreach ($arr as $k => $v) {
            $key_value[$k] = $v[$keys];
        }
        if ($desc) {
            arsort($key_value);
        } else {
            asort($key_value);
        }
        reset($key_value);
        foreach ($key_value as $k => $v) {
            $new_array[$k] = $arr[$k];
        }
        return $new_array;
    }
}
if(!function_exists('number2')) {
    function number2($number, $isMinimum = false, $minimum = 0.01)
    {
        $isMinimum && $number = max($minimum, $number);
        return sprintf('%.2f', $number);
    }
}