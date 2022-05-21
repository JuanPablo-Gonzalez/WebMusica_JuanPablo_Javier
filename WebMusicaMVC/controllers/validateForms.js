$("#form-login").validate({
	rules:{
		usuario:{
			required: true,
			email: true
		},
		contrasena:{
			required: true,
			minlength: 3
		}
	}
});

$("#form-registro").validate({

});