export function validName(name: string): null | string {
	if (/^[A-ZА-Я][A-ZА-Яa-zа-я0-9+_@.-]{1,29}$/g.test(name)) {
    return null;
	}
	return 'Имя не соответствует требованиям';
}
