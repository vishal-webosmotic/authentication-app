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
    getConversations: builder.mutation({
      query: (conversationId) => {
        return {
          url: `chats/get-conversation?conversationId=${conversationId}&pageNumber=1&pageSize=10`,
          method: 'GET',
        };
      },
      transformResponse: (response) => response.data.data,
      async onCacheEntryAdded(
        arg,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
      ) {
        try {
          console.log(arg);
          // wait for the initial query to resolve before proceeding
          await cacheDataLoaded;

          // when data is received from the socket connection to the server,
          // if it is a message and for the appropriate channel,
          // update our query result with the received message
          // const listener = (event) => {
          //   const data = JSON.parse(event.data);

          //   updateCachedData((draft) => {
          //     draft.push(data);
          //   });
          // };

          // socket.on('getMessage', listener);
        } catch {
          // no-op in case `cacheEntryRemoved` resolves before `cacheDataLoaded`,
          // in which case `cacheDataLoaded` will throw
        }
        // cacheEntryRemoved will resolve when the cache subscription is no longer active
        await cacheEntryRemoved;
        // perform cleanup steps once the `cacheEntryRemoved` promise resolves
        // socket.close();
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
  useGetConversationsMutation,
} = authApi;
