export type RootState = {
  isLoadingPage: boolean;
  isWritingPost: boolean;
  isSendingPost: boolean;

  attachments: object;
  comments: object;
  feeds: object;
  me: {
    id?: string;
    username?: string;
  };
  posts: object;
  users: object;
};

export const initialState: RootState = {
  isLoadingPage: false,
  isWritingPost: false,
  isSendingPost: false,

  attachments: {},
  comments: {},
  feeds: {},
  me: {},
  posts: {},
  users: {},
};
