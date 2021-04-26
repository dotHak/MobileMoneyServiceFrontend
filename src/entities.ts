export interface UserDetail {
    id?: number;
    firstName: string;
    middleName?: string;
    lastName: string;
    houseNumber: string;
    region: string;
    city: string;
    town: string;
}

export interface NotFoundResponse {
    error: string;
    status: number;
    message: string;
    path: string;
}

export function isNotFoundResponse(
    res: any | NotFoundResponse
): res is NotFoundResponse {
    return (res as NotFoundResponse).status !== undefined;
}

export type NetworkType = "MTN" | "VODAFONE" | "AIRTEL_TIGO";
export type RoleType = "USER" | "MERCHANT";

export interface Network {
    id?: number;
    name: NetworkType;
}

export interface PhoneNumber {
    id?: number;
    network: Network;
    number: string;
    isDefault: boolean;
}

export interface Transaction {
    id?: number;
    sender: PhoneNumber;
    receiver: PhoneNumber;
    price: number;
    createdDate: Date;
}
