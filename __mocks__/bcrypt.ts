export const genSaltSync = jest.fn().mockImplementation(() => {
    return 'mockedSalt';
});

export const hashSync = jest.fn().mockImplementation((_password, _salt) => {
    return 'mockedHash';
});

export const compareSync = jest.fn().mockImplementation((_encrypted, _password) => {
    return true;
});

export default {
    genSaltSync,
    hashSync,
    compareSync,
};
