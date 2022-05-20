$("#form-login").submit(() => {
	//event.preventDefault();
	var email = $("#usuario").val();
	var password = $("#contrasena").val();

	auth.signInWithEmailAndPassword(email, password)
	.then((userCredential) => {
		var user = userCredential.user;
		console.log(userCredential)
		console.log(user)
	})
	.catch((error) => {
		var errorCode = error.code;
		var errorMessage = error.message;
		console.log(error)
	});

	return false;
});

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