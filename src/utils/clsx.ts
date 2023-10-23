const clsx = (
	...classNames: (string | boolean | null | undefined)[]
): string => {
	// Очищаем массив от значений undefined и false
	const classesList = [...classNames].filter((item) => item);

	return classesList.join(' ');
};

export default clsx;
