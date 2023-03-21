export type RootState = {
  isLoadingPage: boolean;
  isWritingPost: boolean;
  isSendingPost: boolean;
  postIds: string[];

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
  postIds: [],

  attachments: {},
  comments: {},
  feeds: {},
  me: {},
  posts: {},
  users: {},
};
