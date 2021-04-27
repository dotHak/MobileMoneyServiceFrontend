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

export interface ErrorResponse {
    errors: string[];
    status: number;
}

export function isErrorResponse(
    res: any | ErrorResponse
): res is ErrorResponse {
    return (res as ErrorResponse).status !== undefined;
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

export const networkList: Network[] = [
    { id: 1, name: "MTN" },
    { id: 2, name: "VODAFONE" },
    { id: 3, name: "AIRTEL_TIGO" },
];
export interface PhoneNumber {
    id?: number;
    network: Network;
    number: string;
    isDefault: boolean;
}

type StatusType = "SUCCESS" | "FAILED" | "CANCELLED" | "PENDING";

export interface Status {
    id?: number;
    name: StatusType;
}

export const statusList: Status[] = [
    { id: 1, name: "SUCCESS" },
    { id: 1, name: "FAILED" },
    { id: 1, name: "CANCELLED" },
    { id: 1, name: "PENDING" },
];

export interface Transaction {
    id?: number;
    sender: PhoneNumber;
    receiver: PhoneNumber;
    status: Status;
    price: number;
    createdDate: Date;
}
