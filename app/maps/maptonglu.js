(function () {

    var sys = angular.module('cw.os');
    sys.controller('MapsController',["$scope", '$timeout', "$http", "$location", '$uibModal', "$log", function($scope, $timeout, $http, $location, $uibModal, $log) {

        //>>>>>>>>>地图相关>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
        var ctrl = this;
        var tileLayer;
        var areaId_town=330127000000;//淳安县
        //淳安县中心点坐标
        var longitude_town="119.048521";
        var latitude_town="29.614984";
        var defaultVal_townZoom=11;
        ctrl.treedata = [];
        //声明站点类型标注数组(A,B,C,D,E)
        ctrl.markerA=[];ctrl.markerB=[];ctrl.markerC=[]; ctrl.markerD=[];
        //ctrl.markerE=[];
        //地图平移缩放控件，PC端默认位于地图左上方，它包含控制地图的平移和缩放的功能。移动端提供缩放控件，默认位于地图右下方。
        var navigation=new BMap.NavigationControl();
        //缩略地图控件，默认位于地图右下方，是一个可折叠的缩略地图。
        var overview=new BMap.OverviewMapControl();

        //显示标注
        var  showMarkerBySiteType = function (type)        {
            switch(type)
            {
                case 1:ctrl.markerA.forEach(function(marker){ marker.show();});break;
                case 2:ctrl.markerB.forEach(function(marker){ marker.show();});break;
                case 3:ctrl.markerC.forEach(function(marker){ marker.show();});break;
                case 4:ctrl.markerD.forEach(function(marker){ marker.show();});break;
                //case 5:ctrl.markerE.forEach(function(marker){ marker.show();});break;
            }
        };

        //隐藏标注
        var hideMarkerBySiteType = function (type)        {

            switch(type)
            {
                case 1:ctrl.markerA.forEach(function(marker){ marker.hide();});break;
                case 2:ctrl.markerB.forEach(function(marker){ marker.hide();});break;
                case 3:ctrl.markerC.forEach(function(marker){ marker.hide();});break;
                case 4:ctrl.markerD.forEach(function(marker){ marker.hide();});break;
                //case 5:ctrl.markerE.forEach(function(marker){ marker.hide();});break;
            }
        };

        //添加标记点击事件
        var markerClick = function(site) {
            $location.path("/site/" + site.id);
            $scope.$apply();
        };

        //初始化地图标注
        var initMarker = function(areaid,mainMap,clustererFlag)    {

            ctrl.markerA=[];ctrl.markerB=[];ctrl.markerC=[];ctrl.markerD=[];
            //ctrl.markerE=[];
            {
                $http.get('/api/v1/site/listbyareamap2/'+areaid).success(
                    function (response) {
                        //点聚合临时变量
                        console.log(response);
                        var countryIdTemp;
                        var markerClusterer=[];//需要聚合的marker集
                        ctrl.sitesinfo = response.data;
                        if (ctrl.sitesinfo == null) return;
                        //对countryIdTemp初始化
                        countryIdTemp=ctrl.sitesinfo[0].countryId;
                        //遍历，创建标注
                        for (var i = 0; i < ctrl.sitesinfo.length; i++) {
                            var site = ctrl.sitesinfo[i];

                            if(site.type==5)continue;//如果为垃圾站点，则将其过滤掉。

                            var point  = new BMap.Point(site.lng / 1000000, site.lat / 1000000);
                            var marker = buildMarkerWithIcon(point, site.type);
                            //设置文字标签
                            //label内容区
                            var content ="<div ><ul style='list-style-type:none;'>";
                            var Items = site.lable;
                            for (var j = 0; j < Items.length; j++) {
                                var Key_Values = Items[j].split(':');
                                content = content + "<li><span style='text-align：center'>" + Key_Values[0] + ":" + Key_Values[1] + "</span></li>";
                            }
                            content = content + "</ul></div>";
                            var opts = {
                                title: "<h6>站点信息</h6>",
                                width: 200,
                                height: 120,
                                offset: new BMap.Size(10, -10)
                            };
                            var infoWindow = new BMap.InfoWindow(content,opts);  // 创建信息窗口对象
                            //为标注添加 鼠标停靠事件
                            marker.addEventListener('mouseover', (function (e) {
                                var i = infoWindow;
                                return function (e) {
                                    return mainMap.openInfoWindow(i, e.point);
                                };
                            })());
                            //为为标注添加 鼠标移除事件
                            marker.addEventListener('mouseout', (function (e) {
                                var i = infoWindow;
                                return function (e) {
                                    return mainMap.closeInfoWindow(i, e.point);
                                };
                            })());
                            //为标注添加 点击事件
                            marker.addEventListener('click', (function () {
                                var s = site;
                                return function () {
                                    return markerClick(s);
                                }
                            })());

                            switch (parseInt(site.type)) {
                                case 1:
                                    ctrl.markerA.push(marker);
                                    break;
                                case 2:
                                    ctrl.markerB.push(marker);
                                    break;
                                case 3:
                                    ctrl.markerC.push(marker);
                                    break;
                                case 4:
                                    ctrl.markerD.push(marker);
                                    break;
                                //case 5:
                                //    ctrl.markerE.push(marker);
                                //    break;
                            }

                            if(clustererFlag==0){//不需要点聚合
                                mainMap.addOverlay(marker);
                            }else{//进行点聚合
                                if(countryIdTemp==site.countryId) //同属于一个簇，收集
                                {
                                    markerClusterer.push(marker);
                                }
                                else{//不属于同一个簇，画图，清空原簇，重新赋值
                                    new BMapLib.MarkerClusterer(mainMap, {markers:markerClusterer});//画图
                                    markerClusterer=[];//清空原簇
                                    markerClusterer.push(marker);//收集
                                }
                            }
                        }

                        if(clustererFlag==1){//循环结束，画最后一个簇
                            new BMapLib.MarkerClusterer(mainMap, {markers:markerClusterer});//画图
                        }
                    }
                );
            }
        };

        //根据类别 构建标注
        var buildMarkerWithIcon= function (point, type) {
            var myIcon;
            if(type==1)//A类
            {
                myIcon = new BMap.Icon("/res/map/marker/green.png", new BMap.Size(23, 25));
            }else if(type==2)//B类
            {
                myIcon = new BMap.Icon("/res/map/marker/yellow.png", new BMap.Size(23, 25));
            }else if(type==3)//C类
            {
                myIcon = new BMap.Icon("/res/map/marker/blue.png", new BMap.Size(23, 25));
            }else if(type==4)//D类
            {
                myIcon = new BMap.Icon("/res/map/marker/red.png", new BMap.Size(23, 25));
            }
            //else if(type==5)//E类
            //{
            //    myIcon = new BMap.Icon("/res/map/marker/red1.png", new BMap.Size(23, 25));
            //}
            // 创建标注对象
            var marker = new BMap.Marker(point, {icon: myIcon});
            return marker;

        };
        //------------------------------------------------在地图中添加控件BEGIN--------------------------------------
        var createSiteType= function (name) {

            switch (name) {
                case 'A类站点':
                    var span = document.createElement("SPAN");
                    var check = document.createElement("INPUT");
                    check.type = "checkbox";
                    check.setAttribute("id", name.substr(0, 2));
                    check.setAttribute("checked",true);

                    check.onclick = function () {
                        if (this.checked) {
                            showMarkerBySiteType(1);
                        }
                        else {
                            hideMarkerBySiteType(1);
                        }
                    };
                    span.appendChild(check);

                    //添加 img
                    var img = document.createElement("img");
                    //设置 img 属性，如 id
                    img.setAttribute("id", name + "newImg");
                    //设置 img 图片地址
                    img.src = "/res/map/marker/green.png";
                    span.appendChild(img);
                    span.appendChild(document.createTextNode(name));

                    span.appendChild(document.createTextNode("     "));

                    break;
                case 'B类站点':
                    var span = document.createElement("SPAN");
                    var check = document.createElement("INPUT");
                    check.type = "checkbox";
                    check.setAttribute("id", name.substr(0, 2));
                    check.setAttribute("checked",true);
                    check.onclick = function () {
                        if (this.checked) {
                            showMarkerBySiteType(2);
                        }
                        else {
                            hideMarkerBySiteType(2);
                        }
                    };
                    span.appendChild(check);

                    //添加 img
                    var img = document.createElement("img");
                    //设置 img 属性，如 id
                    img.setAttribute("id", name + "newImg");
                    //设置 img 图片地址
                    img.src = "/res/map/marker/yellow.png";
                    span.appendChild(img);
                    span.appendChild(document.createTextNode(name));
                    span.appendChild(document.createTextNode("     "));
                    break;
                case 'C类站点':
                    var span = document.createElement("SPAN");
                    var check = document.createElement("INPUT");
                    check.type = "checkbox";
                    check.setAttribute("id", name.substr(0, 2));
                    check.setAttribute("checked",true);

                    check.onclick = function () {
                        if (this.checked) {
                            showMarkerBySiteType(3);
                        }
                        else {
                            hideMarkerBySiteType(3);
                        }
                    };
                    span.appendChild(check);
                    //添加 img
                    var img = document.createElement("img");
                    //设置 img 属性，如 id
                    img.setAttribute("id", name + "newImg");
                    //设置 img 图片地址
                    img.src = "/res/map/marker/blue.png";
                    span.appendChild(img);
                    span.appendChild(document.createTextNode(name));
                    span.appendChild(document.createTextNode("     "));
                    break;
                case '污水处理站':
                    var span = document.createElement("SPAN");
                    var check = document.createElement("INPUT");
                    check.type = "checkbox";
                    check.setAttribute("id", name.substr(0, 2));
                    check.setAttribute("checked",true);

                    check.onclick = function () {
                        if (this.checked) {
                            showMarkerBySiteType(4);
                        }
                        else {
                            hideMarkerBySiteType(4);
                        }
                    };
                    span.appendChild(check);
                    //添加 img
                    var img = document.createElement("img");
                    //设置 img 属性，如 id
                    img.setAttribute("id", name + "newImg");
                    //设置 img 图片地址
                    img.src = "/res/map/marker/red.png";
                    span.appendChild(img);
                    span.appendChild(document.createTextNode(name));
                    span.appendChild(document.createTextNode("     "));
                    break;
                case '垃圾处理站':
                    var span = document.createElement("SPAN");
                    var check = document.createElement("INPUT");
                    check.type = "checkbox";
                    check.setAttribute("id", name.substr(0, 2));
                    check.setAttribute("checked",true);

                    check.onclick = function () {
                        if (this.checked) {
                            showMarkerBySiteType(5);
                        }
                        else {
                            hideMarkerBySiteType(5);
                        }
                    };
                    span.appendChild(check);
                    //添加 img
                    var img = document.createElement("img");
                    //设置 img 属性，如 id
                    img.setAttribute("id", name + "newImg");
                    //设置 img 图片地址
                    img.src = "/res/map/marker/red1.png";
                    span.appendChild(img);
                    span.appendChild(document.createTextNode(name));
                    span.appendChild(document.createTextNode("     "));
                    break;
            }
            return span;
        };
        var FilterControl=function () {
            this.defaultAnchor = BMAP_ANCHOR_TOP_LEFT;//左上角
            this.defaultOffset = new BMap.Size(60, 10);
        };
        FilterControl.prototype = new BMap.Control();
        FilterControl.prototype.initialize = function(map) {
            // 创建一个DOM元素
            var div = document.createElement("div");
            div.className = "map-filters";

            // 添加文字说明
            div.appendChild(createSiteType("A类站点"));
            div.appendChild(createSiteType("B类站点"));
            div.appendChild(createSiteType("C类站点"));
            div.appendChild(createSiteType("污水处理站"));
            //div.appendChild(createSiteType("垃圾处理站"));
            // 添加DOM元素到地图中
            map.getContainer().appendChild(div);
            // 将DOM元素返回
            return div;
        };
        //------------------------------------------------在地图中添加控件END--------------------------------------
        //创建地图
        var mainMap = new BMap.Map('bMap', {minZoom:8, maxZoom:18},{mapType: BMAP_HYBRID_MAP});
        //设置地图中心点和缩放级别
        mainMap.centerAndZoom(new BMap.Point(longitude_town , latitude_town), defaultVal_townZoom);
        //打开双击放大。
        mainMap.enableDoubleClickZoom();
        //打开滚轮放大缩小。
        mainMap.enableScrollWheelZoom();

        //--------------------------------------------------------------------------------------------------
        /* 地图右键添加站点 */
        var menu = new BMap.ContextMenu(); //右键菜单
        var txtMenuItem = [  //右键菜单项目
            {
                text: '拾取点坐标',
                callback: function (p) {
                    var gc = new BMap.Geocoder();
                    var lng = p.lng;
                    var lat = p.lat;
                    var pt = p;
                    console.log("lng:"+lng+"lat:"+lat);
                    gc.getLocation(pt, function (rs) {
                        var addComp = rs.addressComponents;
                        console.log(addComp.street);
                    });
                }
            }
        ];
        //添加右键菜单的分割线
        for (var i = 0; i < txtMenuItem.length; i++) {
            menu.addItem(new BMap.MenuItem(txtMenuItem[i].text, txtMenuItem[i].callback, 100)); //菜单添加项目
            if (i == 1 || i == 3) {
                menu.addSeparator();  //添加右键菜单的分割线
            }
        }
        mainMap.addContextMenu(menu);
        //--------------------------------------------------------------------------------------------------
        //为地图生成过滤站点的checkBox控件
        var filterControl = new FilterControl();
        //在地图中添加过滤控件
        mainMap.addControl(filterControl);
        //添加地图平移缩放控件
        mainMap.addControl(navigation);
        //添加缩略地图控件
        mainMap.addControl(overview);
        //调用initMarker 初始化地图标注
        initMarker(areaId_town, mainMap, 0);

        /* >>>>>>> 树相关 >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */
        var vm = this;

        vm.treeData = [];

        //angular.copy(vm.originalData,vm.treeData);

        vm.treeConfig = {
            core : {
                multiple : false,
                animation: 150,
                error : function(error) {
                    $log.error('treeCtrl: error from js tree - ' + angular.toJson(error));
                },
                check_callback : true,
                worker : true
            },
            types : {
                default : {
                    icon : 'fa fa-th'
                },
                "3" : {
                    icon : 'fa fa-th'
                },
                "4" : {
                    icon : 'fa fa-th-large'
                },
                "5" : {
                    icon : 'fa fa-clone'
                },
                "6" : {
                    icon : 'fa fa-cube'
                }
            },
            version : 1,
            plugins : ['types', 'wholerow', 'search'] //'checkbox',
        };

        /* 树搜索功能 */
        var to = false;
        $('#mapTreeQuery').keyup(function () {
            if(to) { clearTimeout(to); }

            //树搜索  获得输入框的值 var v = $('#plugins4_q').val();
            to = setTimeout(function () {
                var v = $('#mapTreeQuery').val();
                $('#mapTree').jstree(true).search(v);
            }, 250);
        });

        vm.ignoreChanges = false;
        vm.applyModelChanges = function() {
            return !vm.ignoreChanges;
        };

        $http.get("/api/v1/region/sitetree").success(function(response) {
            vm.treeData = response;
            vm.ignoreChanges = true;
            vm.treeConfig.version++;

            console.log(response);
        });


        var onTreeReady = function() {
            if (vm.treeData.length == 0) return;
            $timeout(function(e, data) {
                vm.ignoreChanges = false;
                var jsTree = vm.treeInstance.jstree(true);
                jsTree.open_node(vm.treeData[0].id, null, false);
            });
        };

        vm.selected = {};
        var onTreeSelectNode= function(e,item) {
            var data = item.node.original;

            if (data.type ==3)//县
            {
                angular.copy(data, vm.selected);
                $scope.$apply();
                goToTown(data.id,119.578,29.876,11,mainMap,navigation,overview);
                //禁用滚轮放大缩小。
                mainMap.disableScrollWheelZoom();
                DelineationAreaBoundary(mainMap,navigation,overview);
                navigation.hide();
                overview.hide();

            }else if(data.type==4)
            {

                angular.copy(data, vm.selected);
                $scope.$apply();

                switch(parseInt(data.id))
                {
                    case 330122201000:goToTown(330122201000,119.555115,29.808573,13,mainMap,navigation,overview);break;
                    case 330122109000:goToTown(330122109000,119.455115,29.958573,11,mainMap,navigation,overview);break;
                    case 330122210000:goToTown(330122210000,119.303912,29.937543,12,mainMap,navigation,overview);break;
                    case 330122112000:goToTown(330122112000,119.367152,29.829321,12,mainMap,navigation,overview);break;
                    case 330122110000:goToTown(330122110000,119.627449,29.906492,12,mainMap,navigation,overview);break;
                    case 330122202000:goToTown(330122202000,119.484392,29.777924,12,mainMap,navigation,overview);break;
                    case 330122102000:goToTown(330122102000,119.647711,29.878687,12,mainMap,navigation,overview);break;
                    case 330122003000:goToTown(330122003000,119.716413,29.846614,13,mainMap,navigation,overview);break;
                    case 330122002000:goToTown(330122002000,119.652598,29.798235,13,mainMap,navigation,overview);break;
                    case 330122101000:goToTown(330122101000,119.734954,29.693626,12,mainMap,navigation,overview);break;
                    case 330122004000:goToTown(330122004000,119.744153,29.784193,13,mainMap,navigation,overview);break;
                    case 330122113000:goToTown(330122113000,119.813718,29.842873,13,mainMap,navigation,overview);break;
                    case 330122005000:goToTown(330122005000,119.841889,29.82877,12,mainMap,navigation,overview);break;
                    case 330122204000:goToTown(330122204000,119.928988,29.692611,13,mainMap,navigation,overview);break;

                }

                navigation.show();
                overview.show();

            }

            else if(data.type==6)//站点
            {
                $location.path("/site/" + data.id);
                $scope.$apply();
            }
        };

        var onTreeCreateNode  = function(e, item) {
            $timeout(function() {
                $log.debug( 'Added new node with the text ' + item.node.text)
            });
        };

        vm.treeEvents = {
            'ready': onTreeReady,
            'select_node': onTreeSelectNode,
            'create_node': onTreeCreateNode
        };

        vm.comboTree = null;
        vm.toggleTree = function(e) {
            var a = e.target;
            if (a.tagName == "I") a = a.parentElement;
            var t = a.parentElement.parentElement.parentElement;

            var combo = angular.element(t);
            vm.comboTree = combo;

            e.preventDefault();
            e.stopPropagation();
            //combo_toggle(combo);
        };



    }]);

    sys.controller('InMapAddSiteCtrl', function ($scope, $uibModalInstance, $timeout, $log, $http, obj) {
        $scope.showValidation = "true";
        $scope.matchPattern = "^[0-9]*$";
        $scope.imgFile = null;
        $scope.item={
            hamletId : '330122000000',
            lat      : obj.lat,
            lng      : obj.lng
        };

        $http.get("/api/v1/site/sitetype?time=" + new Date().getTime()).success(function(response){
            $scope.types = response.data;
        });


        $scope.uploadFile = function(files) {
            $scope.imgFile = files;
        };

        var uploadFile2 = function(id) {
            if ($scope.imgFile == null) {
                alert("img为空");
                return;
            }
            var fd = new FormData();

            fd.append("file", $scope.imgFile[0]);

            $http.post('/api/v1/site/uplodimg/'+id, fd, {
                withCredentials: true,
                headers: {'Content-Type': undefined },
                transformRequest: angular.identity
            });

        };

        $scope.ok = function () {
            var config = {
                headers : {'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'}
            };

            $http.post('/api/v1/site/addsite', $scope.item, config)
                .success(function(response){
                    if (response.mes == '保存失败') {
                        $scope.add_message = "添加失败， 请检查数据合法性...";
                    }else {
                        $scope.item.id = response.mes;
                        angular.forEach($scope.types, function(type){
                            if(type.id == $scope.item.type){
                                $scope.item.typeName = type.name;
                            }
                        });
                        uploadFile2(response.mes);
                        $uibModalInstance.close($scope.item);
                    }
                });
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };

        $scope.getError = function (error) {
            if(angular.isDefined(error)) {
                if (error.required) {
                    return "输入值不得为空";
                }else if (error.minlength) {
                    return "输入值不得少于3位数";
                }else if (error.maxlength){
                    return "输入值不得大于20位数";
                }
                else if (error.pattern){
                    return "输入值只能是数字";
                }
            }
        };


        /*  树组件 */

        $scope.treeData = [];

        //angular.copy(vm.originalData,vm.treeData);

        $scope.treeConfig = {
            core : {
                multiple : false,
                animation: 150,
                error : function(error) {
                    $log.error('treeCtrl: error from js tree - ' + angular.toJson(error));
                },
                check_callback : true,
                worker : true
            },
            types : {
                default : {
                    icon : 'fa fa-th'
                },
                "3" : {
                    icon : 'fa fa-th'
                },
                "4" : {
                    icon : 'fa fa-th-large'
                },
                "5" : {
                    icon : 'fa fa-clone'
                },
                "6" : {
                    icon : 'fa fa-cube'
                }
            },
            version : 1,
            plugins : ['types', 'wholerow'] //'checkbox',
        };

        $scope.ignoreChanges = false;
        $scope.applyModelChanges = function() {
            return !$scope.ignoreChanges;
        };

        $http.get("/api/v1/region/tree").success(function(response) {
            $scope.treeData = response;
            console.log(response);
            $scope.ignoreChanges = true;
            $scope.treeConfig.version++;
            //$timeout(function(){
            //    var jsTree = vm.treeInstance.jstree(true);
            //    $log.warn(jsTree);
            //});
        });


        var onTreeReady = function() {
            if ($scope.treeData.length == 0) return;
            $timeout(function(e, data) {
                $scope.ignoreChanges = false;
                var jsTree = $scope.treeInstance.jstree(true);
                jsTree.open_node($scope.treeData[0].id, null, false);
            });
        };

        $scope.selected = {};
        var onTreeSelectNode= function(e,item) {
            var data = item.node.original;
            $scope.item.villageId = data.id;
            $scope.item.townId= data.parentId;
            if (data.type == 5) {
                angular.copy(data, $scope.selected);
                $scope.$apply();
                combo_hide();
            } else {
                var jsTree = $scope.treeInstance.jstree(true);
                jsTree.toggle_node(item.node);
            }
        };

        var onTreeCreateNode  = function(e, item) {
            $timeout(function() {
                $log.debug( 'Added new node with the text ' + item.node.text)
            });
        };

        $scope.treeEvents = {
            'ready': onTreeReady,
            'select_node': onTreeSelectNode,
            'create_node': onTreeCreateNode
        };

        $scope.comboTree = null;
        $scope.toggleTree = function(e) {
            var a = e.target;
            if (a.tagName == "I") a = a.parentElement;
            var t = a.parentElement.parentElement.parentElement;

            var combo = angular.element(t);
            $scope.comboTree = combo;

            e.preventDefault();
            e.stopPropagation();
            combo_toggle(combo);
        };

        var combo_show = function(combo) {
            combo.addClass('open');
            angular.element(window.document).on('mousedown', combo_hide);
        };

        var combo_hide = function(e) {
            var combo = $scope.comboTree;
            if (e) {
                if (combo.context.contains(e.target)) return;
            }
            combo.removeClass('open');
            angular.element(window.document).off('mousedown', combo_hide);
        };

        var combo_toggle = function (combo) {
            if (combo.hasClass('open')) {
                combo_hide();
            } else {
                combo_show(combo);
            }
        };

    });

})();