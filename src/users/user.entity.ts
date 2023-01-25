import { hash } from 'bcryptjs';
export class User {
	private _password: string;
	private _email: string;
	private _name: string;

	constructor(email: string, name: string) {
        this._email = email;
		this._name = name;
	}

	get email(): string {
		return this._email;
	}

	get name(): string {
		return this._name;
	}

	get pass(): string {
		return this._password;
	}

	public async setPassword(pass: string, salt: number): Promise<void> {
		this._password = await hash(pass, salt);
	}
}
