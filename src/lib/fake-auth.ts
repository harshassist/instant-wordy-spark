
// Toggle this to false before production
export const IS_FAKE_MODE = true;

export const fakeUser = {
  id: '00000000-0000-0000-0000-000000000000',
  email: 'fake@example.com',
  role: 'authenticated'
};

export type AuthUser = {
  id: string;
  email: string | null;
  role: string;
};

export const getFakeUser = (): Promise<{ data: { user: AuthUser | null } }> => {
  return Promise.resolve({
    data: {
      user: fakeUser
    }
  });
};
