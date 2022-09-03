export type RootState = {
  isLoadingPage: boolean;
  attachments: object;
  comments: object;
  feeds: object;
  me: {
    id?: string;
  };
  posts: object;
  users: object;
};

export const initialState: RootState = {
  isLoadingPage: false,
  attachments: {},
  comments: {},
  feeds: {},
  me: {},
  posts: {},
  users: {},
};
