//this is a jquery function
$(document).ready(function(){
	$('.delete_user').on('click', deleteuser);
});

function deleteuser(){
	var confirmation = confirm('Are you sure?');
	if(confirmation){
		$.ajax({
			type:'DELETE',
			url:'/delete/'+$(this).data('id')
		}).done(function(response){
			window.location('/');
		})
	}else{
		return false;
	}
};