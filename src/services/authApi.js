import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// import { socket } from './socket';
import getCookie from './utiliti';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://social-media-2rtb.onrender.com/api/v1/',
    prepareHeaders: (headers) => {
      const cookie = getCookie();
      const token = cookie.split(' ')[0];
      if (token) {
        headers.set('Authorization', token);
      }

      return headers;
    },
  }),
  endpoints: (builder) => ({
    signupUser: builder.mutation({
      query: ({ email, firstname, lastname, password, username }) => {
        return {
          url: 'auth/signup',
          method: 'post',
          body: { email, firstname, lastname, password, username },
        };
      },
    }),
    signInUser: builder.mutation({
      query: ({ email, password }) => {
        return {
          url: 'auth/login',
          method: 'post',
          body: { email, password },
        };
      },
    }),
    getPost: builder.query({
      query: (number = 1) => {
        return {
          url: `posts/get-feed-post?pageSize=5&pageNumber=${number}`,
          method: 'GET',
        };
      },
    }),
    getUser: builder.mutation({
      query: () => {
        return {
          url: 'users/get-user-profile',
          method: 'GET',
        };
      },
      transformResponse: (response) => response.data,
    }),
    getConversationsList: builder.query({
      query: () => {
        return {
          url: 'chats/get-conversations-list',
          method: 'GET',
        };
      },
    }),
    getConversations: builder.query({
      query: ({ page, id }) => {
        return {
          url: `chats/get-conversation?conversationId=${id}&pageNumber=${page}&pageSize=20`,
          method: 'GET',
        };
      },
      // transformResponse: (response) => response.data.data,
      transformResponse: (response) => response.data,
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },
      merge: (currentCache, newItems, { arg }) => {
        if (!newItems.data.length) {
          return;
        }
        currentCache.data.push(...newItems.data);
        const conversationId = newItems?.data[0];
        console.log(
          conversationId.conversationId === arg.id,
          conversationId.conversationId,
          arg.id
        );
        console.log(typeof arg);
        console.log(newItems, arg);
      },
      // Refetch when the page arg changes
      forceRefetch({ currentArg, previousArg }) {
        console.log(currentArg, previousArg);
        return currentArg !== previousArg;
      },
    }),
  }),
});

export const {
  useSignupUserMutation,
  useSignInUserMutation,
  useGetPostQuery,
  useGetUserMutation,
  useGetConversationsListQuery,
  useLazyGetConversationsQuery,
} = authApi;
