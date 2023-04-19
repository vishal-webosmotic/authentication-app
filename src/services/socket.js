import { io } from 'socket.io-client';

import getCookie from './utiliti';

const cookie = getCookie();
const token = cookie.split(' ')[0];

export const socket = io('https://social-media-2rtb.onrender.com', {
  extraHeaders: {
    auth: token,
  },
});
