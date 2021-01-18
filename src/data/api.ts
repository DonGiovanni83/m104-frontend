
export interface Adresse {
    id: number
    ort: string
    plz: number
    adresse_1: string
    adresse_2: string
    tel_g: string
    tel_m: string
    email_1: string
    email_2: string
}

export interface Schule {
    id:number
    name: string
    adresse: Adresse
}

export interface Klasse {
    id: number
    name: string
    schule: Schule
}

export interface Firma {
    name: string,
    adresse: Adresse
}

export interface ABV {
    id:number
    name:string
    vorname: string
    adresse: Adresse
    firma: Firma
}

export interface Schueler {
    id:number
    schueler_id: number
    name:string
    vorname: string
    adresse: Adresse
    abv: ABV
    firma: Firma
}