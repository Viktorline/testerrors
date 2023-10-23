export function validPassword(password: string): null | string {
	const isPasswordValid =
		password.trim() !== '' &&
		!password.includes(' ') &&
		password.length >= 8 &&
		password.length <= 30 &&
		password.length - password.replaceAll(/\d+/g, '').length >= 2 &&
		password.length - password.replaceAll(/[A-ZА-Я]+/g, '').length >= 3;
	if (isPasswordValid) {
		return null;
	}
	return 'Пароль не соответствует требованиям';
}
