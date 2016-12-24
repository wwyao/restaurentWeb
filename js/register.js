$(function(){
	// alert("asdas");
	
});
function postData() {
		if($('#password').val() === $('#password2').val()){
			$.ajax({
		    type: 'POST',
		    url: 'http://localhost:8080/restaurentServer/Register',
		    data : $('.form').serialize(),
		    success: function(msg) {
		    	if(msg !== 'fail'){
		    		alert('注册成功，点击确定返回主页！');
		    		window.location = "index.html"
		    	}else{
		    		alert('用户名已存在');
		    	}
		    },
		    error:function(){
		    	console.log('fail-js');
		    }
		  });
		}else{
			alert("两次密码不一致！");
		}
	  return false;
	}