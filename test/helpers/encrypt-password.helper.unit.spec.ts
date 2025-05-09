import { encryptPassword } from '@src/shared/helpers/password.helper';

describe('encryptPassword', () => {
  it('should return a SHA-256 hashed password', () => {
    const password = 'thisIsAIntrestingPassword';
    const hashedPassword = encryptPassword(password);

    expect(hashedPassword).toHaveLength(64);

    const hashedAgain = encryptPassword(password);
    expect(hashedPassword).toBe(hashedAgain);

    const differentPassword = 'anotherIntrestingPassword';
    const differentHash = encryptPassword(differentPassword);
    expect(hashedPassword).not.toBe(differentHash);
  });

  it('should hash an empty string', () => {
    const hashedEmpty = encryptPassword('');
    expect(hashedEmpty).toHaveLength(64);
  });
});
