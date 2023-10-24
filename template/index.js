console.clear()

$(".select-head").click(function(){
  $(this).parent().toggleClass('show')
})



$(".select-options.normal .select-option").click(function(){
  $(this).addClass("active").siblings().removeClass('active');
})
$(".select-options.collapse .select-option").click(function(){
  $(this).addClass("active").siblings().removeClass('active').parents(".select").toggleClass('show');
})
$(".select-options.update .select-option").click(function(){
  let _option = $(this).text();
  $(this).addClass("active").siblings().removeClass('active').parent().siblings(".select-head").children(".select-selected").text(_option);
})
$(".select-options.update-collapse .select-option").click(function(){
  let _option = $(this).text();
  $(this).addClass("active").siblings().removeClass('active').parents(".select").toggleClass('show').find(".select-head .select-selected").text(_option);
})
