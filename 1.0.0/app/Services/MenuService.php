<?php
namespace App\Services;
use App\Models\Menu;
use App\Models\RoleMenu;
use App\Traits\HelperTrait;
use Illuminate\Support\Facades\Cache;

class MenuService extends BaseService{
    use HelperTrait;
    public function getMenus($isSeller=false){
        $is_type = request()->get('is_type')??0;
        if($isSeller){
            $is_type = 1;
        }
        $menu_model = new Menu();
        $cache_name = $is_type==0?'admin_menus_cache':'seller_menus_cache';
        $list = [];
        if(!Cache::has($cache_name)){
            $menus_list = $menu_model->where('is_type',$is_type)->orderBy('is_sort')->get()->toArray();
            $list = $this->getChildren($menus_list);
            Cache::set($cache_name,$list);
        }else{
            $list = Cache::get($cache_name);
        }
        return $this->format($list);
    }
    /* 待优化*/
    public function getPermissionMenus()
    {
        $menu_model = new Menu();
        $admin = auth('admin')->user();
        $cache_name = 'admin_'.$admin->id.'_menus_cache';
        if(!Cache::has($cache_name)){
            $role_ids = $admin->roles()->get()->pluck('id');
            $menu_ids = RoleMenu::whereIn('role_id',$role_ids)->groupBy('menu_id')->pluck('menu_id')->toArray();

            $ids = $this->getAllPermissionMenuIds($menu_ids);
            //var_dump($ids);exit;
            $menus_list = $menu_model->where('is_type',0)->whereIn('id',$ids)->orderBy('is_sort')->get()->toArray();

            $list = $this->getChildren($menus_list);
            //var_dump($menus_list);exit;
            Cache::set($cache_name,$list);
        }else{
            $list = Cache::get($cache_name);
        }
        return $this->format($list);
    }
    public function getAllPermissionMenuIds($menu_ids,$ids=[])
    {
        if(!$ids)
        {
            $ids = $menu_ids;
        }
        $menus = Menu::whereIn('id',$menu_ids)->get();
        $pids = $menus->pluck('pid')->toArray();
        $pids = array_diff($pids, [0]);
        if(!count($pids))
        {
            return $ids;
        }
        $ids = array_merge($ids, $pids);
        return $this->getAllPermissionMenuIds($pids, $ids);
    }

    // 清空缓存
    public function clearCache(){
        $rs = Cache::forget('admin_menus_cache');
        $rs = Cache::forget('seller_menus_cache');
        return $this->format($rs);
    }
}
