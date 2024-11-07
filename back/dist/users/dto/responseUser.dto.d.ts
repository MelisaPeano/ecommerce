export declare class UserResponseDto {
    name: string;
    email: string;
    address: string;
    phone: number;
    country?: string | undefined;
    city?: string | undefined;
    orders?: object | object[];
    constructor(user: Partial<UserResponseDto>);
}
