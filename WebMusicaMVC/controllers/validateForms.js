$("#form-login").validate({
	rules:{
		usuario:{
			required: true,
			email: true
		},
		contrasena:{
			required: true
		}
	}
});

$("#formRegistrarse").validate({
	rules:{
		inputEmail:{
			required: true,
			email: true
		},
		inputNombre:{
			required: true,
			minlength: 3,
			maxlength: 30
		},
		inputTag:{
			required: true,
			minlength: 3,
			maxlength: 15
		},
		inputPassword:{
			required: true,
			minlength: 6,
			maxlength: 12,	
			password: true
		},
		inputPassword2:{
			required: true,
			equalTo: "#inputPassword"
		},
		inputFechaNacimiento:{
			required: true
		}
	},
	messages : {
		inputEmail:{
			required: "Es necesario rellenar este campo",
			email: "El campo debe tener un formato de email valido"
		},
		inputNombre:{
			required: "Es necesario rellenar este campo",
			minlength: "El campo debe de tener un mínimo de 3 caracteres"
		},
		inputTag:{
			required: "Es necesario rellenar este campo",
			minlength: "El campo debe de tener un mínimo de 3 caracteres"
		},
		inputPassword:{
			required: "Es necesario rellenar este campo",
			minlength: "La contraseña debe tener 6 caracteres como mínimo",
			maxlength: "La contraseña solo puede tener 12 caracteres como máximo"
		},
		inputPassword2:{
			required: "Es necesario rellenar este campo",
			password: "",
			equalTo: "Las contraseñas no coinciden"
		},
		inputFechaNacimiento:{
			required: "Es necesario rellenar este campo"
		}
	}
});

$.validator.addMethod("password", (value, element) => {
	console.log(value);
	return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[\S\s]+$/.test(value);
}, "La contraseña debe incluir al menos una mayuscula, una minuscula y un número");