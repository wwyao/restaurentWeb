angular.module('order',[])
	.run(function(){
		
	})
	.controller('orders',function($scope,$http){
		$scope.showData = [];
		$scope.payClick = function(e){
			console.log(e.target.id);
			alert(e.target.id);
		};
		$scope.cancelClick = function(e){
			if(confirm('确定取消订单吗？')){
				console.log(e.currentTarget.id,window.sessionStorage.userName);
				$http({
					url:"http://localhost:8080/restaurentServer/UpdataOrders?userName="+window.sessionStorage.userName+"&orderId="+e.currentTarget.id,
					method:'GET'
				}).success(function(data){
					$scope.showData = data;
					console.log(data);
				});
			}
			
		};

		$http({
			url:"http://localhost:8080/restaurentServer/GetOrders?statu=0&userName="+window.window.sessionStorage.userName,
			method:'GET'
		}).success(function(data){
			// $scope.unpayData = data;
			$scope.showData = data;
			console.log(data);
		});

		$scope.navClick = function(id){
			
			for(var i = 0;i < $('.nav span').length;i++){
				$('.nav span').eq(i).removeClass('active');
			}
			$('.nav span').eq(id-1).addClass('active');
	     	// var id = $(this).index();
	      	switch(id-1){
				case 0: 
					$http({
						url:"http://localhost:8080/restaurentServer/GetOrders?statu=0&userName="+window.window.sessionStorage.userName,
						method:'GET'
					}).success(function(data){
						$scope.showData = data;
						console.log(data);
					});
					break;
				case 1: 
					$http({
						url:"http://localhost:8080/restaurentServer/GetOrders?statu=1&userName="+window.window.sessionStorage.userName,
						method:'GET'
					}).success(function(data){
						$scope.showData = data;
						console.log(data);
					});
					break;
				case 2: 
					$http({
						url:"http://localhost:8080/restaurentServer/GetOrders?statu=2&userName="+window.window.sessionStorage.userName,
						method:'GET'
					}).success(function(data){
						$scope.showData = data;
						console.log(data);
					});
					break;
				default:console.log('fail');
	      	}
		};
	});