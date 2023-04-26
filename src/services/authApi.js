import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// import { original } from 'immer';

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
        const conversationId = currentCache?.data[0];

        if (conversationId.conversationId !== arg.id) {
          return newItems;
        }
        // currentCache.data.push(...newItems?.data);
        currentCache?.data.push(...(newItems?.data || []));
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
      // async onCacheEntryAdded(
      //   arg,
      //   { updateCachedData, cacheDataLoaded, cacheEntryRemoved, getCacheEntry }
      // ) {
      //   try {
      //     await cacheDataLoaded;

      //     const handleUpdate = (msg) => {
      //       if (arg?.id !== msg?.data?.conversationId) {
      //         return;
      //       }
      //       updateCachedData((draft) => {
      //         // draft?.data?.data.unshift(msg?.data);
      //         console.log('draft', draft);
      //         console.log(original(draft));
      //       });
      //     };
      //     socket.on('getMessage', handleUpdate);
      //   } catch (error) {
      //     console.log('error', error);
      //   }
      //   await cacheEntryRemoved;
      // },
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
