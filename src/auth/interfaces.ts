export type UserType = {
    email: string;
    fullName: string;
    password: string;
    profilePhoto?: string;
};

export type AuthTokenResponse = {
    accessToken: string;
};
