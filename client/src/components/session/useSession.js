import { useMutation } from '@apollo/react-hooks';
import { useHistory } from 'react-router-dom';

export default (mutation) => {
  const history = useHistory();
  return useMutation(mutation, {
    onCompleted: (data) => {
      const { token, _id } = data.login || data.register;
      localStorage.setItem("auth-token", token);
      localStorage.setItem("currentUserId", _id);
      history.push("/app");
    },
    update: (client, { data }) => {
      client.writeData({
        data: {
          isLoggedIn: data.login ? data.login.loggedIn : data.register.loggedIn
        }
      });
    }
  });
}