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
        $str = preg_replace("/\t/", "", $str); //?????????????????????????????????????????????????????????????????????????????????
        $str = preg_replace("/\r\n/", "", $str);
        $str = preg_replace("/\r/", "", $str);
        $str = preg_replace("/\n/", "", $str);
        $str = preg_replace("/ /", "", $str);
        $str = preg_replace("/  /", "", $str);  //??????html????????????
        return trim($str); //???????????????
    }
}

/**
 * ?????????????????????
 *
 * @param  int    $sTime ??????????????????
 * @param  string $type  ??????. normal | mohu | full | ymd | other
 * @param  string $alt   ?????????
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
        //sTime=????????????cTime=???????????????dTime=?????????
        $cTime = time();
        $dTime = $cTime - $sTime;
        $dDay = ceil($dTime/3600/24);
        //$dDay     =   intval($dTime/3600/24);
        $dYear = intval(date('Y', $cTime)) - intval(date('Y', $sTime));
        //normal???n?????????n????????????n??????????????????
        if ($type == 'normal') {
            if ($dTime < 60) {
                if ($dTime < 10) {
                    return '??????';    //by yangjs
                } else {
                    return intval(floor($dTime / 10) * 10).'??????';
                }
            } elseif ($dTime < 3600) {
                return intval($dTime / 60).'?????????';
                //???????????????.????????????.????????????.
            } elseif ($dYear == 0 && $dDay == 0) {
                //return intval($dTime/3600)."?????????";
                return '??????'.date('H:i', $sTime);
            } elseif ($dYear == 0) {
                return date('m???d??? H:i', $sTime);
            } else {
                return date('Y-m-d H:i', $sTime);
            }
        }elseif ($type == 'weixin'){
            //???????????????
            $timeStr = "";
            //??????????????????
            $addTime = explode(',', date('Y,n,j,w,a,h,i,y', $sTime));//????????????????????????????????????????????????
            $nowTime = explode(',', date('Y,n,j,w,a,h,i,y', $cTime));

            $dayPerMonthAddTime = getDayPerMonth($addTime[0]);
            $week = array(0=>"?????????",1=>"?????????",2=>"?????????",3=>"?????????",4=>"?????????",5=>"?????????",6=>"?????????");
            //??????????????????????????????,??????????????? ????????? / ????????? ?????????
            if($addTime[0] == $nowTime[0] && $addTime[1] == $nowTime[1] && $addTime[2] == $nowTime[2]) {
                $timeStr .= $addTime[5] . ":" . $addTime[6];
            } else if(($addTime[0] == $nowTime[0] && $addTime[1] == $nowTime[1] && $addTime[2] == $nowTime[2]-1)
                || ($addTime[0] == $nowTime[0] && $nowTime[1]-$addTime[1] == 1 && $dayPerMonthAddTime[$addTime[1]] == $addTime[2] && $nowTime[2] == 1)
                || ($nowTime[0]-$addTime[0] == 1 && $addTime[1] == 12 && $addTime[2] == 31 && $nowTime[1] == 1 && $nowTime[2] == 1)) {
                //????????????????????????,??????????????????????????????????????????????????????????????????????????????????????????????????????????????? ???:??? ??????/??????
                $timeStr .= "?????? " . $addTime[5] . ":" . $addTime[6] . " ";
            } else if(($addTime[0] == $nowTime[0] && $addTime[1] == $nowTime[1] && $nowTime[2] - $addTime[2] < 7)
                || ($addTime[0] == $nowTime[0] && $nowTime[1]-$addTime[1] == 1 && $dayPerMonthAddTime[$addTime[1]]-$addTime[2]+$nowTime[2] < 7
                    || ($nowTime[0]-$addTime[0] == 1 && $addTime[1] == 12 && $nowTime[1] == 1 && 31-$addTime[2]+$nowTime[2] < 7))) { //???????????????????????????????????????,?????????????????????????????????????????? ???:??? ??????/??????

                $timeStr .= $week[$addTime[3]] . " " . $addTime[5] . ":" . $addTime[6];
            } else { //??????????????????/???/??? ???:??? ??????/??????
                $timeStr .= $addTime[1] . "/" . $addTime[2] . "/" . $addTime[7] . " " . $addTime[5] . ":" . $addTime[6];
            }

            if($addTime[4] == "am") {
                $timeStr .= " ??????";
            } else if($addTime[4] == "pm") {
                $timeStr .= " ??????";
            }

            return $timeStr;
        }elseif ($type == 'mohu') {
            if ($dTime < 60) {
                return $dTime.'??????';
            } elseif ($dTime < 3600) {
                return intval($dTime / 60).'?????????';
            } elseif ($dTime >= 3600 && $dTime < 3600 * 24) {
                return intval($dTime / 3600).'?????????';
            } elseif ($dDay > 0 && $dDay <= 7) {
                return intval($dDay).'??????';
            } elseif ($dDay > 7 &&  $dDay <= 30) {
                return intval($dDay / 7).'??????';
            } elseif ($dDay > 30) {
                return intval($dDay / 30).'?????????';
            }
            var_dump($dDay);exit;
            //full: Y-m-d , H:i:s
        } elseif ($type == 'full') {
            return date('Y-m-d , H:i:s', $sTime);
        } elseif ($type == 'ymd') {
            return date('Y-m-d', $sTime);
        } else {
            if ($dTime < 60) {
                return $dTime.'??????';
            } elseif ($dTime < 3600) {
                return intval($dTime / 60).'?????????';
            } elseif ($dTime >= 3600 && $dDay == 0) {
                return intval($dTime / 3600).'?????????';
            } elseif ($dYear == 0) {
                return date('Y-m-d H:i:s', $sTime);
            } else {
                return date('Y-m-d H:i:s', $sTime);
            }
        }
    }
}
if(!function_exists('rid_two')) {
//??????????????????
    function rid_two($num)
    {
        return floor($num * 100) / 100;
    }
}
//??????????????????
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
 * ???????????????????????????
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
 * ???????????????????????????
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
 * ?????????????????????????????????
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
 * ??????????????????
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
