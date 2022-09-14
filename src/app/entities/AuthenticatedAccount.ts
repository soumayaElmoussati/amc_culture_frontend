export class AccountResponse {
	firstname: string;
	lastname: string;
	cin: string;
	refArtistAccount: string;
	email: string;
	phoneNumber: string;
	accountType: string
	setObject(arr: any) {
		for (let i of Object.keys(arr)) this[i] = arr[i];
	}
}
export default AccountResponse;