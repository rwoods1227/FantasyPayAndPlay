import { useMutation } from '@apollo/react-hooks';
import { useHistory } from 'react-router-dom';

export default (mutation) => {
  const history = useHistory();
  return useMutation(mutation, {
    onCompleted: (data) => {
      const { token } = data.login || data.register;
      localStorage.setItem("auth-token", token);
      history.push("/");
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