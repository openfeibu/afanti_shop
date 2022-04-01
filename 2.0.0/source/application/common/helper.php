<?php


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
