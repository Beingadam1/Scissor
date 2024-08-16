import { TextDecoder as UtilTextDecoder, TextEncoder as UtilTextEncoder } from 'util';

global.TextDecoder = UtilTextDecoder as unknown as {
  new (label?: string, options?: TextDecoderOptions): TextDecoder;
  prototype: TextDecoder;
};

global.TextEncoder = UtilTextEncoder;


import { signInUser, signUpUser } from '../services/authService';


jest.mock('firebase/auth', () => {
  const originalModule = jest.requireActual('firebase/auth');
  return {
    ...originalModule,
    getAuth: jest.fn(),
    signInWithEmailAndPassword: jest.fn().mockResolvedValue({
      user: { uid: 'testUid', email: 'test@example.com' },
    }),
    createUserWithEmailAndPassword: jest.fn().mockResolvedValue({
      user: { uid: 'newTestUid', email: 'newuser@example.com' },
    }),
  };
});

describe('Auth Service', () => {
  it('should sign in a user', async () => {
    const user = await signInUser('test@example.com', 'password123');
    expect(user).toBeDefined();
    expect(user.email).toBe('test@example.com');
  });

  it('should sign up a user', async () => {
    const user = await signUpUser('newuser@example.com', 'password123');
    expect(user).toBeDefined();
    expect(user.email).toBe('newuser@example.com');
  });
});
