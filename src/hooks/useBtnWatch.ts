import { useState, useEffect } from 'react';

export function useBtnWatch():[boolean, string] {
	const WindowTip = 'Alt + Enter';
	const MacTip = 'Option + Enter';
	const [isPressed, setIsPressed] = useState(false);
	const [isPress, setIsPress] = useState(false);
	const [btnHelp, setBtnHelp] = useState<string>(WindowTip);

	const BtnKeyDown = ({ code }: KeyboardEvent) => {
		if (code == 'Enter') {
			setIsPressed(true);
		} else {
			setIsPress(false);
		}
	};

	const BtnKeyUp = ({ code }: KeyboardEvent) => {
		if (code == 'Enter') {
			setIsPressed(false);
		}
	};

	const BtnKeyDownHelp = (event: KeyboardEvent) => {
		if (event.altKey || event.metaKey) {
			setIsPress(true);
		}
	};

	const BtnKeyUpHelp = ({ altKey, metaKey }: KeyboardEvent) => {
		if (altKey || metaKey) {
			setIsPressed(false);
		}
	};

	useEffect(() => {
		if (navigator.appVersion.includes('Macintosh')) {
			setBtnHelp(MacTip);
		}
	}, []);

	useEffect(() => {
		document.addEventListener('keydown', BtnKeyDown);
		document.addEventListener('keydown', BtnKeyDownHelp);
		document.addEventListener('keyup', BtnKeyUp);
		document.addEventListener('keyup', BtnKeyUpHelp);
		return () => {
			document.removeEventListener('keydown', BtnKeyDown);
			document.removeEventListener('keydown', BtnKeyDownHelp);
			document.removeEventListener('keyup', BtnKeyUp);
			document.removeEventListener('keyup', BtnKeyUpHelp);
		};
	}, []);

	return [(isPressed && isPress), btnHelp];
}
