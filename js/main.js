var app = angular.module('main', []);
app.run(function() {
	//人数选择框
	$('#select').searchableSelect();
	//选择城市
	$('.city').kuCity();
	//时间选择框
	flatpickr(".flatpickr", {
		utc: true,
		defaultDate: "2016-12-27T16:16:22.585Z",
		enableTime: true,
	});
	

	document.querySelector('.resDetail').style.height = $(window).height() + "px";
	window.onresize = function(){
		document.querySelector('.resDetail').style.height = $(window).height() + "px";
	};
	//详细页
	$('.top li').on('click', function(e) {
		if (e.currentTarget.id == 3) {
			$('.resDetail').hide();
		} else {
			for (var i = 0; i < $('.top li').length; i++) {
				$('.detailContent>li').eq(i).removeClass('show');
				$('.top li').eq(i).removeClass('topActive');
			}
			$('.detailContent>li').eq(e.currentTarget.id).addClass('show');
			$(this).addClass('topActive');
		}
	});
});
//登录表单
function postData() {
	// console.log(typeof $('#myLogin').serialize());
	$.ajax({
		type: 'POST',
		url: 'http://localhost:8080/restaurentServer/Login',
		data: $('#myLogin').serialize(),
		success: function(msg) {
			if (msg !== 'fail') {
				window.sessionStorage.userName = msg;
				var element  = angular.element($(".app"));
	    		var controller = element.controller();
	      		var scope = element.scope();
	      		scope.$apply(function(){
			      	scope.loginBtnText = msg;
			      	scope.topShow = false;
			      	scope.topShow2 = true;
			      	scope.showLoginBox = false;
			    });

				$('.loginBtn').off('click');
			} else {
				alert('用户不存在或用户名、密码错误');
			}
		},
		error: function() {
			console.log('fail-js');
		}
	});
	return false;
}

//提交订单
function addOrder(){
	var element  = angular.element($(".app"));
	var controller = element.controller();
	var scope = element.scope();
	if(scope.loginBtnText === "登录"){
		alert('请先登录！');
	}else{
		console.log($('.order').serialize()+'&statu=0&userName='+scope.loginBtnText+'&restaurentName=aszdas'+'&restaurentId='+scope.detailData.id+'&bookMoney=RMB15');
		$.ajax({
			type: 'POST',
			url: 'http://localhost:8080/restaurentServer/AddOrder',
//			data: $('.order').serialize()+'&statu=0&userName='+scope.loginBtnText+'&restaurentName='+scope.detailData.title+'&restaurentId='+scope.detailData.id+'&bookMoney=15',
			data: $('.order').serialize()+'&statu=0&userName='+scope.loginBtnText+'&restaurentName=aszdas'+'&restaurentId='+scope.detailData.id+'&bookMoney=RMB15',
			success: function(msg) {
				alert('提交订单成功！');
			},
			error: function() {
				console.log('fail-js');
			}
		});
	}
	
	return false;
}

app.controller('mainContent', function($scope,$http,$location) {
	$scope.topShow = true;
	$scope.topShow2 = false;
	$scope.showLoginBox = false;
	$scope.loginBtnText = "登录";
	$scope.hotData = [
	// {
	// 	id: 1,
	// 	imgSrc1: 'http://qcloud.dpfile.com/pc/kOR8RxFaXGIrbgV20BG-wjqO5l7gZ8SlG914caiUvwttZPsSRSLVefwupXQKpBDLBdXUGe9tNw74o_L7HKM81w.jpg',
	// 	title: '勇誌烧肉',
	// 	score1: '8',
	// 	score2: '9',
	// 	score3: '9.6',
	// 	address: '华乐路38号广怡大厦乐淘坊3楼'
	// }
	];
	$scope.selectData = $scope.hotData;
	$scope.newData = $scope.hotData;
	$scope.detailData = {
	// 	title: '洛奇先生餐吧(时代广场店)',
	// 	alias: 'Mr.rocky Bar',
	// 	money: '142元',
	// 	score1: '8',
	// 	score2: '9',
	// 	score3: '9.6',
	// 	address: '华乐路38号广怡大厦乐淘坊3楼',
	// 	phone: '020-34480800',
	// 	time: '11:00-2:00 周一至周日',
	// 	imgs: ['http://qcloud.dpfile.com/pc/nRsusyeSXiH6vIdSdmDKm6sGoPQfDJCjReqjpX54J8vAxzdekhTcSA766YY2lur452lfszCzH6kCpIe1c2_41Q.jpg', 'http://qcloud.dpfile.com/pc/fOeXrHvZc45NbN5_T0HcfmF_QPKvUozLCqBkdsch1Gi6yDO85r4c9iK1SxJXYVNn52lfszCzH6kCpIe1c2_41Q.jpg', 'http://qcloud.dpfile.com/pc/C4ejrBO1Mc4O3PWkpRvJgOS2zCd80M7TVpVFyW1kR7eUCtqyR-ocveGozzal2Q_952lfszCzH6kCpIe1c2_41Q.jpg']
	};
	$scope.detailMenu = [{
		img: 'http://qcloud.dpfile.com/pc/s6cdylTpYTuB4iLt_UNOKM-kkoqycMR9MfCqVVfhQ4gjLIQ8wWhdlE7XjNM2ZqP2F5u7J_jS4MuCaeLAHD0KTg.jpg',
		title: '红烧乳鸽'
	}, {
		img: 'http://qcloud.dpfile.com/pc/eo_Ng8acieEP6ekV1rmFB4qfnMSwjfJcmQvSAZbqFnRiOxsFwAwtY6ekKBRZXWeJF5u7J_jS4MuCaeLAHD0KTg.jpg',
		title: '香肠拼盘'
	}, {
		img: 'http://qcloud.dpfile.com/pc/_jY793Q1WXbjq1ZmtrfqvKx-CySCnlcGuvk4fgCq3xpfIrBx1qjFI1IJwOwyeAgbF5u7J_jS4MuCaeLAHD0KTg.jpg',
		title: '榴莲披萨'
	}, {
		img: 'http://qcloud.dpfile.com/pc/s6cdylTpYTuB4iLt_UNOKM-kkoqycMR9MfCqVVfhQ4gjLIQ8wWhdlE7XjNM2ZqP2F5u7J_jS4MuCaeLAHD0KTg.jpg',
		title: '红烧乳鸽'
	}, {
		img: 'http://qcloud.dpfile.com/pc/eo_Ng8acieEP6ekV1rmFB4qfnMSwjfJcmQvSAZbqFnRiOxsFwAwtY6ekKBRZXWeJF5u7J_jS4MuCaeLAHD0KTg.jpg',
		title: '香肠拼盘'
	}, {
		img: 'http://qcloud.dpfile.com/pc/_jY793Q1WXbjq1ZmtrfqvKx-CySCnlcGuvk4fgCq3xpfIrBx1qjFI1IJwOwyeAgbF5u7J_jS4MuCaeLAHD0KTg.jpg',
		title: '榴莲披萨'
	}, {
		img: 'http://qcloud.dpfile.com/pc/s6cdylTpYTuB4iLt_UNOKM-kkoqycMR9MfCqVVfhQ4gjLIQ8wWhdlE7XjNM2ZqP2F5u7J_jS4MuCaeLAHD0KTg.jpg',
		title: '红烧乳鸽'
	}, {
		img: 'http://qcloud.dpfile.com/pc/eo_Ng8acieEP6ekV1rmFB4qfnMSwjfJcmQvSAZbqFnRiOxsFwAwtY6ekKBRZXWeJF5u7J_jS4MuCaeLAHD0KTg.jpg',
		title: '香肠拼盘'
	}, {
		img: 'http://qcloud.dpfile.com/pc/_jY793Q1WXbjq1ZmtrfqvKx-CySCnlcGuvk4fgCq3xpfIrBx1qjFI1IJwOwyeAgbF5u7J_jS4MuCaeLAHD0KTg.jpg',
		title: '榴莲披萨'
	}, {
		img: 'http://qcloud.dpfile.com/pc/s6cdylTpYTuB4iLt_UNOKM-kkoqycMR9MfCqVVfhQ4gjLIQ8wWhdlE7XjNM2ZqP2F5u7J_jS4MuCaeLAHD0KTg.jpg',
		title: '红烧乳鸽'
	}, {
		img: 'http://qcloud.dpfile.com/pc/eo_Ng8acieEP6ekV1rmFB4qfnMSwjfJcmQvSAZbqFnRiOxsFwAwtY6ekKBRZXWeJF5u7J_jS4MuCaeLAHD0KTg.jpg',
		title: '香肠拼盘'
	}, {
		img: 'http://qcloud.dpfile.com/pc/_jY793Q1WXbjq1ZmtrfqvKx-CySCnlcGuvk4fgCq3xpfIrBx1qjFI1IJwOwyeAgbF5u7J_jS4MuCaeLAHD0KTg.jpg',
		title: '榴莲披萨'
	}];
	
	getData('guangzhou');

	// 选择城市，change事件
	$('.city').change(function(e){
		if($('.city').val() === '北京'){
			getData('beijing');
		}else if($('.city').val() === '广州'){
			getData('guangzhou');
		}else{
			alert('暂无该地区的数据！');
		}
		
		// alert($('.city').val());
	});

	function getData(area){
		$http({
			url:"http://localhost:8080/restaurentServer/HotRestaurent?area="+area,
			method:'GET'
		}).success(function(data){
			// console.log(data);
			$scope.hotData = data;

		});
		$http({
				url:"http://localhost:8080/restaurentServer/RecommendRestaurent?area="+area,
				method:'GET'
			}).success(function(data){
				$scope.selectData = data;
				// console.log($scope.selectData);
			});
		$http({
				url:"http://localhost:8080/restaurentServer/LatestRestaurent?area="+area,
				method:'GET'
			}).success(function(data){
				// console.log(data);
				$scope.newData = data;
			});
	}

	

	//我的订座	
	$scope.ordersClick = function(){
		if($scope.loginBtnText !== "登录"){
			window.location = 'orders.html';
		}else{
			alert('请先登录！');
		}
	};

	//进入详细页面
	$scope.itemClick = function($event,id) {
		$http({
			url:"http://localhost:8080/restaurentServer/DetailData?id="+id,
			method:'GET'
		}).success(function(data){
			$scope.detailData = data;
			// console.log($scope.selectData);
			$('.resDetail').show();
		}).error(function(){

		});
		
	};

	$scope.placeChange = function(){
		alert('asdas');
	};

	//收藏事件
	$scope.collectClick = function(){
		// console.log($scope.loginBtnText,$scope.detailData.id);
		if($scope.loginBtnText !== "登录"){
			$http({
				url:"http://localhost:8080/restaurentServer/AddCollection?userName="+$scope.loginBtnText+"&restaurentId="+$scope.detailData.id,
				method:'GET'
			}).success(function(data){
				if(data !== "fail"){
					alert("收藏成功！");
				}else{
					alert("已收藏，不用重复收藏！");
				}
			}).error(function(){});
		}else{
			alert("请先登录！");
		}
		
	};
	$scope.login = function($event){
		$event.stopPropagation();
		if($scope.loginBtnText === "登录"){
			$scope.showLoginBox = true;
		}else{
			alert('用户中心！');
		}
		
	};
	$scope.hideLogin = function(){
		$scope.showLoginBox = false;
	};

	$scope.formClick = function($event){
		$event.stopPropagation();
	}

	$scope.loginOut = function(){
		$scope.loginBtnText = "登录";
		window.sessionStorage.userName = undefined;
		$scope.topShow = true;
		$scope.topShow2 = false;
		$scope.login = function($event){
			$event.stopPropagation();
			$scope.showLoginBox = true;
		};
	};

	if(window.sessionStorage.userName !== 'undefined' && window.sessionStorage.userName !== '' && window.sessionStorage.userName !== undefined){
		$scope.loginBtnText = window.sessionStorage.userName;
		$scope.topShow = false;
		$scope.topShow2 = true;
	}
	

});