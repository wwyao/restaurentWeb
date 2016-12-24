$(function(){
	//详细页
	document.querySelector('.resDetail').style.height = $(window).height() + "px";
	window.onresize = function(){
		document.querySelector('.resDetail').style.height = $(window).height() + "px";
	};
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
	


	$('#select').searchableSelect();
	$('.city').kuCity();
	flatpickr(".flatpickr", {
    utc: true,
    defaultDate: "2016-12-27T16:16:22.585Z",
    enableTime: true,
	});
	// $('.loginBtn').on('click',function(event){
	// 	event.stopPropagation();
	// 	$('.login').css({display:'block'});
	// });
	// $(document).on('click',function(){
	// 	$('.login').css({display:'none'});
	// });	$('.submit').on('click',function(){
	// 	$('.login').css({display:'none'});
	// });
	// $('.find').on('click',function(){
	// 	$('.login').css({display:'none'});
	// });
	// $('.login').on('click',function(){
	// 	event.stopPropagation();
	// });
});

//提交订单
function addOrder(){
	var element  = angular.element($(".app"));
	var controller = element.controller();
	var scope = element.scope();
	if(scope.loginBtnText === "登录"){
		alert('请先登录！');
	}else{
		$.ajax({
			type: 'POST',
			url: 'http://localhost:8080/restaurentServer/AddOrder',
			data: $('.order').serialize()+'&statu=未付款&userName='+scope.loginBtnText,
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

//登录表单
function postData() {
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



angular.module('search',[])
	.controller('mainController',function($scope,$http){
		$scope.areas = ['全部','黄埔区','花都区','增城区','从化区','南沙区','天河区','海珠区','白云区'];
		$scope.foodKinds = ['全部','私房菜','粤菜','湖北菜','粥粉面','江浙菜','茶餐厅','海鲜','烧烤','川菜','台湾菜','江西菜','湘菜','东北菜','日本料理'];
		$scope.kinds = ['全部','情侣约会','朋友聚餐','家庭聚会','商务宴请'];
		$scope.money = ['全部','50元以下','51-80元','81-120元','121-200元','201元以上'];
		$scope.loginBtnText = "登录";
		$scope.topShow = true;
		$scope.topShow2 = false;
		$scope.showLoginBox = false;
		$scope.results = [];
		$scope.detailData = {};
		$scope.pCount = 1;
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


		if(window.sessionStorage.userName !== "undefined" && window.sessionStorage.userName !=="" && window.sessionStorage.userName !== undefined){
			$scope.loginBtnText = window.sessionStorage.userName;
			$scope.topShow = false;
			$scope.topShow2 = true;
			// $scope.login = function(){};
		}
		console.log(window.sessionStorage.userName,typeof window.sessionStorage.userName);

		//退出登录
		$scope.loginOut = function(){
			$scope.loginBtnText = "登录";
			window.sessionStorage.userName = undefined;
			$scope.topShow = true;
			$scope.topShow2 = false;
			// $scope.login = function($event){
			// 	$event.stopPropagation();
			// 	$scope.showLoginBox = true;
			// };
		};

		//收藏事件
	$scope.collectClick = function(){
		// console.log($scope.detailData,$scope.detailData.id);
		
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
		$scope.showLoginBox = true;
	};
	$scope.hideLogin = function(){
		$scope.showLoginBox = false;
	};

	$scope.formClick = function($event){
		$event.stopPropagation();
	}
	
		
		$http({
			url:"http://localhost:8080/restaurentServer/Restaurent?start=0&count=10",
			method:'GET'
		}).success(function(data){
			$scope.results = data;
		});

		$http({
			url:"http://localhost:8080/restaurentServer/AllRectaurent",
			method:'GET'
		}).success(function(data){
			$scope.pCount = Math.ceil(parseFloat(data)/10);
			$scope.length = data;
			
			$(".tcdPageCode").createPage({
		      pageCount:$scope.pCount,
		      current:1,
		      backFn:function(p){
		      	var count = (parseFloat(data) - (p-1)*10) > 10 ? 10:parseFloat(data) - (p-1)*10;
		      	$http({
					url:"http://localhost:8080/restaurentServer/Restaurent?start=" + (parseFloat(p)-1)*10+"&count="+count,
					method:'GET'
				}).success(function(data){
					$scope.results = data;
				});
		      }
		  	});
		});

		

		$scope.itemClick = function($event,id){
			for(let i = 0;i < $scope.results.length;i++){
				if(id === $scope.results[i].id){
					$scope.detailData = $scope.results[i];
					break;
				}
			}
			$('.resDetail').show();
		}
		//搜索
		$scope.searchEvent = function(){
			if($('.search-text').val()!= undefined &&$('.search-text').val()!= 'undefined' &&$('.search-text').val()!= ''){
				$http({
					url:'http://localhost:8080/restaurentServer/Restaurent?start=0&'+ $('.serh').serialize(),
					method:'GET'
				}).success(function(data){
					$scope.results = data;
					$scope.pCount = Math.ceil(data.length/10);
					$scope.length = data.length;
					$(".tcdPageCode").createPage({
				      pageCount:$scope.pCount,
				      current:1,
				      backFn:function(p){
				      	var count = (parseFloat(data) - (p-1)*10) > 10 ? 10:parseFloat(data) - (p-1)*10;
				      	$http({
							url:"http://localhost:8080/restaurentServer/Restaurent?start=" + (parseFloat(p)-1)*10+"&count="+count,
							method:'GET'
						}).success(function(data){
							$scope.results = data;
						});
				      }
				  	});
				}).error(function(){

				});
			}else{
				$http({
					url:"http://localhost:8080/restaurentServer/AllRectaurent",
					method:'GET'
				}).success(function(data){
					$scope.pCount = Math.ceil(parseFloat(data)/10);
					$scope.length = data;
					$http({
						url:"http://localhost:8080/restaurentServer/Restaurent?start=0&count=10",
						method:'GET'
					}).success(function(data){
						$scope.results = data;
					});
					$(".tcdPageCode").createPage({
				      pageCount:$scope.pCount,
				      current:1,
				      backFn:function(p){
				      	var count = (parseFloat(data) - (p-1)*10) > 10 ? 10:parseFloat(data) - (p-1)*10;
				      	$http({
							url:"http://localhost:8080/restaurentServer/Restaurent?start=" + (parseFloat(p)-1)*10+"&count="+count,
							method:'GET'
						}).success(function(data){
							$scope.results = data;
							
						});
				      }
				  	});
				});
			}
			return false;
		};

		$scope.sortEvent = function($event){
			for(var i = 0;i < $('.nav-bottom li').length;i++){
				$('.nav-bottom li').eq(i).css('color','#000');
			}
			$event.currentTarget.style.color = 'red';
			switch($event.currentTarget.id){
				case 'nb1':
					$http({
						url:"http://localhost:8080/restaurentServer/Restaurent?start=0",
						method:'GET'
					}).success(function(data){
						$scope.results = data;
					});
					break;
				case 'nb2':
					$scope.results.sort(function(a,b){
						var aTotal = parseFloat(a.score1)+parseFloat(a.score2)+parseFloat(a.score3);
						var bTotal = parseFloat(b.score1)+parseFloat(b.score2)+parseFloat(b.score3);
						return  bTotal - aTotal ;
					});
					break;
				case 'nb3':
					$scope.results.sort(function(a,b){
						var aTotal = parseFloat(a.score1);
						var bTotal = parseFloat(b.score1);
						return  bTotal - aTotal ;
					});
					break;
				case 'nb4':
					$scope.results.sort(function(a,b){
						var aTotal = parseFloat(a.score2);
						var bTotal = parseFloat(b.score2);
						return  bTotal - aTotal ;
					});
					break;
				case 'nb5':
					$scope.results.sort(function(a,b){
						var aTotal = parseFloat(a.score3);
						var bTotal = parseFloat(b.score3);
						return  bTotal - aTotal ;
					});
					break;
			}

		}


		
	});