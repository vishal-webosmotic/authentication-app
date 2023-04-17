// import React from 'react';

// import { useNavigate } from 'react-router-dom';

// import { useGetConversationsListQuery } from '../../services/authApi';
// import DisplayChat from './DisplayChat';
// const Chat = () => {
//   const conversationsList = useGetConversationsListQuery();
//   console.log(conversationsList?.data?.data);
//   const navigate = useNavigate();
//   return (
//     <>
//       <table className="mx-auto mt-2 my-auto table-dark table-bordered">
//         <thead className="mb-2">
//           <tr>
//             <th>Email</th>
//             <th>Firstname</th>
//             <th>Lastname</th>
//             <th>Username</th>
//             <th>Id</th>
//             <th>conversationId</th>
//             <th>Get List</th>
//           </tr>
//         </thead>
//         <tbody>
//           {conversationsList?.data?.data.map((item) => (
//             <DisplayChat key={item.conversationId} data={item} />
//           ))}
//         </tbody>
//       </table>
//       <button onClick={() => navigate('/')}>Back</button>
//     </>
//   );
// };

// export default Chat;
