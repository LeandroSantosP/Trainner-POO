import { randomBytes, pbkdf2 } from "node:crypto";
export class Password {
    private hash: string;
    salt: string;

    private constructor(password: string, salt: string) {
        this.salt = salt;
        this.hash = password;
    }

    getValue() {
        return this.hash;
    }

    async isValid(passToCompare: string) {
        return new Promise<boolean>((resolve, reject) => {
            pbkdf2(passToCompare, this.salt, 1000, 64, "sha512", (err, derivedKey) => {
                if (err) {
                    return reject(err);
                }
                return resolve(this.hash === derivedKey.toString("hex"));
            });
        });
    }

    static async create(password: string, saltNum?: string) {
        const salt = saltNum || randomBytes(16).toString("hex");
        return new Promise<Password>((resolve, reject) => {
            pbkdf2(password, salt, 1000, 64, "sha512", (err, derivedKey) => {
                if (err) {
                    reject(new Error("Password could not be created"));
                    return;
                }
                if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password)) {
                    reject(new Error("Password is too weak"));
                    return;
                }
                return resolve(new Password(derivedKey.toString("hex"), salt));
            });
        });
    }
}
