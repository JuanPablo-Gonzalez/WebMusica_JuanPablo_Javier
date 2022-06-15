$("#formLogin").validate({
	rules:{
		inputEmail:{
			required: true,
			email: true
		},
		inputPassword:{
			required: true
		}
	},
	messages : {
		inputEmail:{
			required: "Es necesario rellenar este campo",
			email: "El campo debe tener un formato de email valido"
		},
		inputPassword:{
			required: "Es necesario rellenar este campo"
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
			minlength: "El nombre tiene que tener un mínimo de 3 caracteres",
			maxlength: "El nombre solo puede tener un máximo de 30 caracteres"
		},
		inputTag:{
			required: "Es necesario rellenar este campo",
			minlength: "El nombre de usuario tiene que tener un mínimo de 3 caracteres",
			maxlength: "El nombre de usuario solo puede tener un máximo de 15 caracteres"
		},
		inputPassword:{
			required: "Es necesario rellenar este campo",
			minlength: "La contraseña debe tener 6 caracteres como mínimo",
			maxlength: "La contraseña solo puede tener 12 caracteres como máximo"
		},
		inputPassword2:{
			required: "Es necesario rellenar este campo",
			equalTo: "Las contraseñas no coinciden"
		},
		inputFechaNacimiento:{
			required: "Es necesario rellenar este campo"
		}
	}
});

$("#formAddComentario").validate({
	rules:{
		inputNewComentario:{
			required: true,
		}
	},
	messages : {
		inputNewComentario:{
			required: "No puedes publicar un comentario vacio"
		}
	}
});

$("#formNuevaPublicacion").validate({
	rules:{
		inputTitulo:{
			required: true,
			maxlength: 100
		},
		inputTexto:{
			required: true,
			maxlength: 350
		},
		inputUrl:{
			url: true,
			youtube: true
		}
	},
	messages : {
		inputTitulo:{
			required: "Es necesario rellenar este campo",
			maxlength: "El título de la publicacion no puede tener más de 100 caracteres"
		},
		inputTexto:{
			required: "Es necesario rellenar este campo",
			maxlength: "El texto de la publicacion no puede tener más de 350 caracteres"
		},
		inputUrl:{
			url: "Es necesario rellenar este campo",
		}
	}
});

$("#formEditarPerfil").validate({
	rules:{
		inputEmail:{
			required: true,
			email: true,
			maxlength: 30
		},
		inputNombreUsuario:{
			required: true,
			minlength: 3,
			maxlength: 30
		},
		inputTag:{
			required: true,
			minlength: 3,
			maxlength: 15
		},
		inputDescripcion:{
			maxlength: 500
		},
		inputFechaNacimiento:{
			required: true
		},
		inputOldPassword:{
			required: true
		},
		inputPassword:{
			required: false,
			minlength: 6,
			maxlength: 12,	
			password: true
		},
		inputPassword2:{
			required: false,
			equalTo: "#inputPassword"
		},
	},
	messages : {
		inputEmail:{
			required: "Es necesario rellenar este campo",
			email: true,
			maxlength: 30
		},
		inputNombreUsuario:{
			required: "Es necesario rellenar este campo",
			minlength: "El nombre tiene que tener un mínimo de 3 caracteres",
			maxlength: "El nombre solo puede tener un máximo de 30 caracteres"
		},
		inputTag:{
			required: "Es necesario rellenar este campo",
			minlength: "El nombre de usuario tiene que tener un mínimo de 3 caracteres",
			maxlength: "El nombre de usuario solo puede tener un máximo de 15 caracteres"
		},
		inputDescripcion:{
			maxlength: "La descripción solo puede tener un máximo de 15 caracteres"
		},
		inputFechaNacimiento:{
			required: "Es necesario rellenar este campo"
		},
		inputOldPassword:{
			required: "Es necesario rellenar este campo"
		},
		inputPassword:{
			required: "Es necesario rellenar este campo",
			minlength: "La contraseña debe tener 6 caracteres como mínimo",
			maxlength: "La contraseña solo puede tener 12 caracteres como máximo"
		},
		inputPassword2:{
			required: "Es necesario rellenar este campo",
			equalTo: "Las contraseñas no coinciden"
		},
	}
});

$.validator.addMethod("password", (value, element) => {
	return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[\S\s]+$/.test(value);
}, "La contraseña debe incluir al menos una mayuscula, una minuscula y un número");

$.validator.addMethod("youtube", (value, element) => {
	return /^(https:\/\/youtu\.be|https:\/\/www.youtube\.com)/.test(value);
}, "Solo se aceptan enlaces a youtube");
