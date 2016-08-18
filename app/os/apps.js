window.APPS = [
    { name: 'app.dashboard',        url: '/dashboard',        icon: 'fa fa-dashboard',  title: '仪表盘', templateUrl: 'dashboard/dashboard.html' },
    { name: 'app.test1',        url: '/test1',        icon: 'fa fa-dashboard',  title: '测试1', templateUrl: 'test1/test1.html',resolve:{ deps: ['test1/test1.js']} },
    { name: 'app.test2',        url: '/test2',        icon: 'fa fa-dashboard',  title: '测试2', templateUrl: 'test2/test2.html',resolve:{ deps: ['test2/test2.js']} },
    { name: 'app.maps',             url: '/maps',             icon: 'fa fa-map-marker', title: '地图总览',  templateUrl: 'maps/maps.html', resolve:{ deps: ['maps/maptonglu.js']} },
    { name: 'app.system',           url: '/system',           icon: 'fa fa-pagelines',  title: '系统管理', templateUrl: 'system/system-list.html' },
    { name: 'app.config.region',    url: '/config/region',    icon: 'fa fa-globe', title: '区域管理', templateUrl: 'config/region/region.html', resolve:{ deps: ['config/region/region.js']}},
    { name: 'app.config.dict',      url: '/config/dict',      icon: 'fa fa-list-ol', title: '字典管理', templateUrl: 'config/dictionary/dictionary.html', resolve:{ deps: ['config/dictionary/dictionary.js']}},
    { name: 'app.config.site',      url: '/config/site',      icon: 'fa fa-th', title: '站点管理',templateUrl: 'config/site/sites.html', resolve:{ deps: ['config/site/controller.js']} },
    // { name: 'app.config.gateway',   url: '/config/gateway',   icon: 'fa fa-arrows', title: '网关管理', templateUrl: 'config/gateway/gateway.html', resolve:{ deps: ['config/gateway/gateway.js']}},
    { name: 'app.config.gateway',   url: '/config/gateway-config',   icon: 'fa fa-arrows', title: '网关配置', templateUrl: 'config/gateway2/gateway.html', resolve:{ deps: ['config/gateway2/gateway.js']}},
    { name: 'app.security.dept',    url: '/security/acl/dept',icon: 'fa fa-sitemap', title: '部门管理', templateUrl: 'acl/dept/dept.html', resolve:{ deps: ['acl/dept/dept.js']} },
    { name: 'app.security.role',    url: '/security/acl/role',icon: 'fa fa-group', title: '角色管理', templateUrl: 'acl/role/role.html', resolve:{ deps: ['acl/role/role.js']} },
    { name: 'app.security.user',    url: '/security/acl/user',icon: 'fa fa-user', title: '用户管理', templateUrl: 'acl/user/user.html', resolve:{ deps: ['acl/user/user.js']} },
    { name: 'app.security.resources',    url: '/security/acl/resources',icon: 'fa fa-cubes', title: '资源管理', templateUrl: 'acl/resources/resources.html', resolve:{ deps: ['acl/resources/resources.js']} },
    { name: 'app.config.log',    url: '/config/log',icon: 'fa fa-sitemap', title: '日志管理', templateUrl: 'config/log/log.html', resolve:{ deps: ['config/log/log.js']} },
    { name: 'app.config.equipment',    url: '/config/equipment',icon: 'fa fa-sitemap', title: '设备管理', templateUrl: 'config/equipment/equipment.html', resolve:{ deps: ['config/equipment/equipment.js']} },
    { name: 'app.site', url: '/site/:id', icon: 'fa fa-institution', title: '站点', templateUrl: 'site/site.html', resolve:{ deps: ['site/service.js', 'site/controller.js']} },

    {
        name: 'app.test.test1',
        url: '/test/test1',
        icon: 'fa fa-bug',
        title: '测试1',
        resolve: {
            delay: function($q, $timeout) {
                var delay = $q.defer();
                $timeout(delay.resolve, 1000);
                return delay.promise;
            },
            deps: ['test/test.js'],
            text: function() { return 'TEXT'; }
        }
    },
    {
        name: 'app.test.tree',
        url: '/test/tree',
        icon: 'fa fa-tree',
        title: 'Tree',
        templateUrl: 'test/tree.html',
        resolve: { deps: ['test/tree.js'] }
    },
    {
        name: 'app.test.abntree',
        url: '/test/abntree',
        icon: 'fa fa-tree',
        title: 'AbnTree',
        templateUrl: 'test/abn-tree.html',
        resolve: { deps: ['test/abn-tree.js'] }
    },
    {
        name: 'app.test.ngJsTree',
        url: '/test/ngjstree',
        icon: 'fa fa-tree',
        title: 'ngJsTree',
        templateUrl: 'test/ngjstree.html',
        resolve: { deps: ['test/ngjstree.js'] }
    },
    {
        name: 'app.reports.water.region',
        url: '/reports/water/region/index',
        icon: 'fa fa-bar-chart',
        title: '区域流量查询',
        templateUrl: 'reports/water/regionflows/regionflows.html',
        resolve: { deps: ['reports/water/regionflows/regionflows.js'] }
    },
    {
        name: 'app.reports.water.site',
        url: '/reports/water/site/index',
        icon: 'fa fa-bar-chart',
        title: '站点查询',
        templateUrl: 'reports/water/siteflows/siteflows.html',
        resolve: { deps: ['reports/water/siteflows/siteflows.js'] }
    },
    {
        name: 'app.reports.water.contrast',
        url: '/reports/water/contrast/index',
        icon: 'fa fa-bar-chart',
        title: '流量对比',
        templateUrl: 'reports/water/flowscontrast/flowscontrast.html',
        resolve: { deps: ['reports/water/flowscontrast/flowscontrast.js'] }
    },
    {
        name: 'app.reports.water.site',
        url: '/reports/water/sitelist/index',
        icon: 'fa fa-bar-chart',
        title: '污水站点',
        templateUrl: 'reports/water/sitelist/site.html',
        resolve: { deps: ['reports/water/sitelist/siteCtrl.js'] }
    },
    {
        name: 'app.reports.garbage.report',
        url: '/reports/garbage/compost/region',
        icon: 'fa fa-bar-chart',
        title: '报表统计',
        templateUrl: 'reports/garbage/compost/region/compost.html',
        resolve: { deps: ['reports/garbage/compost/region/compost.js'] }
    },
    {
        name: 'app.reports.garbage.dump',
        url: '/reports/garbage/compost/dump',
        icon: 'fa fa-bar-chart',
        title: '倾倒明细',
        templateUrl: 'reports/garbage/compost/dump/dump.html',
        resolve: { deps: ['reports/garbage/compost/dump/dump.js'] }
    },
    {
        name: 'app.reports.garbage.burn',
        url: '/reports/garbage/burn',
        icon: 'fa fa-bar-chart',
        title: '焚烧',
        templateUrl: 'reports/garbage/burn/burn.html',
        resolve: { deps: ['reports/garbage/burn/burn.js'] }
    },
    {
        name: 'app.reports.garbage.solar',
        url: '/reports/garbage/solar',
        icon: 'fa fa-bar-chart',
        title: '太阳能',
        templateUrl: 'reports/garbage/solar/solar.html',
        resolve: { deps: ['reports/garbage/solar/solar.js'] }
    },
    {
        name: 'app.reports.garbage.sort',
        url: '/reports/garbage/sort',
        icon: 'fa fa-bar-chart',
        title: '垃圾分类监管',
        templateUrl: 'reports/garbage/sort/sort.html',
        resolve: { deps: ['reports/garbage/sort/sort.js'] }
    },
    {
        name: 'app.reports.garbage.site',
        url: '/reports/garbage/sitelist/index',
        icon: 'fa fa-bar-chart',
        title: '堆肥站点',
        templateUrl: 'reports/garbage/sitelist/site.html',
        resolve: { deps: ['reports/garbage/sitelist/siteCtrl.js'] }
    },
    {
        name: 'app.alarms.list',
        url: '/alarms/list',
        icon: 'fa fa-exclamation-triangle',
        title: '告警列表',
        templateUrl: 'alarms/alarms.html',
        resolve: { deps: ['alarms/alarms.js'] }
    },
    {
        name: 'app.alarms.setting',
        url: '/alarms/alarmSetting',
        icon: 'fa fa-exclamation-triangle',
        title: '流量告警设置',
        templateUrl: 'alarms/alarmSetting/alarmSetting.html',
        resolve: { deps: ['alarms/alarmSetting/alarmSetting.js'] }
    },
    {
        name: 'app.alarms.alarmStat',
        url: '/alarms/stat',
        icon: 'fa fa-exclamation-triangle',
        title: '告警汇总',
        templateUrl: 'alarms/alarmstat/alarmstat.html',
        resolve: { deps: ['alarms/alarmstat/alarmstat.js'] }
    },
    {
        name: 'app.work.order',
        url: '/work/order',
        icon: 'fa fa-sticky-note-o',
        title: '工单管理',
        templateUrl: 'work/orders/orders.html',
        resolve: { deps: ['work/orders/orders.js'] }
    },
    {
        name: 'app.work.check',
        url: '/work/check',
        icon: 'fa fa-balance-scale',
        title: '站点考核',
        templateUrl: 'work/check/check.html',
        resolve: { deps: ['work/check/check.js'] }
    },
    {
        name: 'app.work.plan',
        url: '/work/plan',
        icon: 'fa fa-paper-plane-o',
        title: '巡维计划',
        templateUrl: 'work/plans/plans.html',
        resolve: { deps: ['work/plans/plans.js'] }
    },
    {
        name: 'app.work.checkin',
        url: '/work/checkin',
        icon: 'fa fa-calendar-check-o',
        title: '巡维考勤',
        templateUrl: 'work/checkin/checkin.html',
        resolve: { deps: ['work/checkin/checkin.js'] }

    },
    // {
    //     name: 'app.work.count',
    //     url: '/work/count',
    //     icon: 'fa fa-calendar-check-o',
    //     title: '巡维考勤统计',
    //     templateUrl: 'work/count/count.html',
    //     resolve: { deps: ['work/count/count.js'] }
    //
    // },
    {
        name: 'app.work.rule',
        url: '/work/rule',
        icon: 'fa fa-calendar-check-o',
        title: '考勤规则设置',
        templateUrl: 'work/rule/rule.html',
        resolve: { deps: ['work/rule/rule.js'] }

    },
    {
        name: 'app.config.gatewayconfig',
        url: '/config/gateway',
        icon: 'fa fa-calendar-check-o',
        title: '网关列表',
        templateUrl: 'config/gateway/temp/gateways.html',
        resolve: { deps: ['config/gateway/gateway.js'] }

    },
    {
        name: 'app.config.gatewayconfig',
        url: '/work/fanPump',
        icon: 'fa fa-calendar-check-o',
        title: '风机水泵运行状态报表',
        templateUrl: 'work/fanPump/fanPump.html',
        resolve: { deps: ['work/fanPump/fanPump.js'] }

    },

    {
        name: 'app.maps.simple',
        url: '/maps/simple',
        icon: 'fa fa-map-marker',
        title: '地图简版',
        templateUrl: 'maps/map_simple.html',
        resolve:{ deps: ['maps/map_simple.js']} },
];