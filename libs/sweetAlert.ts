import Swal from 'sweetalert2';

export const sweetErrorAlert = async (msg: string, duration: number = 3000) => {
	await Swal.fire({
		icon: 'error',
		title: msg,
		showConfirmButton: false,
		timer: duration,
	});
};

export const sweetTopSmallSuccessAlert = async (msg: string, duration: number = 2000) => {
	const Toast = Swal.mixin({
		toast: true,
		position: 'top-end',
		showConfirmButton: false,
		timer: duration,
		timerProgressBar: true,
	});
	await Toast.fire({ icon: 'success', title: msg });
};

export const sweetMixinErrorAlert = async (msg: string) => {
	const Toast = Swal.mixin({
		toast: true,
		position: 'top-end',
		showConfirmButton: false,
		timer: 3000,
		timerProgressBar: true,
	});
	await Toast.fire({ icon: 'error', title: msg });
};

export const sweetConfirmAlert = (msg: string): Promise<boolean> => {
	return new Promise(async (resolve) => {
		await Swal.fire({
			icon: 'question',
			text: msg,
			showCancelButton: true,
			confirmButtonColor: '#a0616a',
			cancelButtonColor: '#bdbdbd',
		}).then((response) => {
			resolve(response?.isConfirmed ?? false);
		});
	});
};
