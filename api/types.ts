export interface LaunchDetails {
    id: number;
    name: string;
    rocket: {
        id: number;
    };
    isostart: string;
    isonet: string;
    isoend: string;
    rocketName: string;
    rocketType: string;
    location: {
        name: string;
    }
}

export interface RocketDetails {
    id: number;
    name: string;
    configuration: string;
    family: {
        id: number;
        name: string;
        agencies: string;
    };
    wikiURL: string;
    imageURL: string;
    imageSizes: Array<number>;
    agencies: string;
}

export interface RocketAgencyDetails {
    id: number;
    name: string;
    countryCode: string;
    wikiURL: string;
}

export interface RocketFamilyDetails {
    id: number;
    name: string;
    agencies: Array<RocketAgencyDetails>;
}
