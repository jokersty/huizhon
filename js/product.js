/*list*/
$(".list-nav li").click(function(){
	$(this).addClass("navcurrent").siblings(".navcurrent").removeClass("navcurrent");	
	var className=$(this).attr("data");
	if(className=="*")
	{			
		$(".list-content ul").children(className).show();
	}
	else
	{
		console.log($("#listabc"));
		$("#listabc").children(className).show();
		$("#listabc").children(className).siblings("li:not("+className+")").hide();
	}
});

