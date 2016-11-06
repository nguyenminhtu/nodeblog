$(document).ready(function(){
	$(".deletePost").click(function(){
		var id = $(this).attr('id-delete');
		$.ajax({
			url: '/mt_admin/posts/delete/' + id,
			type: 'DELETE',
			success: function(data){
				if(data == 'ok'){
					$("tr#" + id).remove();
				}
			}
		});
	});
});