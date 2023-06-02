import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// import { original } from 'immer';
//  use to display proxy object

import { socket } from './socket';
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
          url: `chats/get-conversation?conversationId=${id}&pageNumber=${page}&pageSize=15`,
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
          console.log('line 80');
          return;
        }
        const conversationId = currentCache?.data[0];

        if (conversationId.conversationId !== arg.id) {
          return newItems;
        }
        const uniqueIds = [];
        currentCache.data = [...currentCache.data]
          .concat(...newItems.data)
          .filter((item) => {
            if (!uniqueIds.includes(item._id)) {
              uniqueIds.push(item._id);
              return item;
            }
          });
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
      async onCacheEntryAdded(
        arg,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
      ) {
        try {
          await cacheDataLoaded;

          const handleUpdate = (msg) => {
            // if (arg?.id !== msg?.data?.conversationId) {
            //   return;
            // }
            updateCachedData((draft) => {
              draft?.data.unshift(msg?.data);
            });
          };
          socket.on('getMessage', handleUpdate);
        } catch (error) {
          console.log('error', error);
        }

        await cacheEntryRemoved;
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
