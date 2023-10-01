export class document {
    private value: string;
    constructor(document: string) {
        this.value = document;
    }

    getValue() {
        return this.value;
    }
}

export class Cpf extends document {
    constructor(document: string) {
        super(document);
        if (!this.isValidCpf(document)) throw new Error("Invalid Document");
    }

    isValidCpf(strCPF: string) {
        let Soma;
        let Resto;
        Soma = 0;
        if (strCPF == "00000000000") return false;

        for (let i = 1; i <= 9; i++) Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (11 - i);
        Resto = (Soma * 10) % 11;

        if (Resto == 10 || Resto == 11) Resto = 0;
        if (Resto != parseInt(strCPF.substring(9, 10))) return false;

        Soma = 0;
        for (let i = 1; i <= 10; i++) Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (12 - i);
        Resto = (Soma * 10) % 11;

        if (Resto == 10 || Resto == 11) Resto = 0;
        if (Resto != parseInt(strCPF.substring(10, 11))) return false;
        return true;
    }
}
