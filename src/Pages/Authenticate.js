import { json, redirect } from 'react-router-dom';
import classes from './Authenticate.module.css';
import AuthForm from '../Component/Layout/authForm';
const Authenticate = () => {
  return <div className={classes.authenticate}>{/* <AuthForm /> */}</div>;
};
export default Authenticate;

export async function action({ request }) {
  const searchParams = new URL(request.url).searchParams;
  console.log(searchParams);
  const mode = searchParams.get('mode') || 'signInWithPassword';
  console.log(mode);
  if (mode !== 'signInWithPassword' && mode !== 'signUp') {
    throw json({ message: 'Unsuport Mode' }, { status: 422 });
  }

  const data = await request.formData();
  const authData = {
    email: data.get('email'),
    password: data.get('password'),
    repassword: data.get('repassword'),
    avatar: data.get('avatar'),
    returnSecureToken: true,
  };

  //   if (authData.repassword !== authData.password) {
  //     throw new Error('Passwords do not match');
  //   }

  console.log(authData);
  const response = await fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=AIzaSyCeaVIpT5vRl7YJoP0gvdVYKaBe1nBJLB0`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(authData),
    }
  );
  console.log(response);
  if (response.status === 422 || response.status === 401) {
    return response;
  }
  //kiểm tra không có response thì trả về lỗi
  if (!response.ok) {
    throw json({ message: 'Could not authenticate user' }, { status: 500 });
  }
  //lưu token vào localStorage và chuyển hướng
  const resData = await response.json();
  const idToken = resData.idToken;
  localStorage.setItem('token', idToken);
  //thêm avt vào realtime database
  if (mode === 'signUp') {
    const userData = {
      email: authData.email,
      password: authData.password,
      repassword: authData.repassword,
      avatar: authData.avatar,
    };
    console.log(userData);
    const response = await fetch(
      'https://signup-login-ff3a4-default-rtdb.firebaseio.com/users.json',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      }
    );
    console.log(response);
    if (!response.ok) {
      throw new Error('chưa tải được ảnh lên!');
    }
  }
  return redirect('/');
}
