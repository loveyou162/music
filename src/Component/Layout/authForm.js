import {
  Link,
  useActionData,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';
import classes from './authForm.module.css';
import { useEffect, useState, useRef } from 'react';
import userLayout from '../../assets/img/logo-icon/user.png';
import { useDispatch } from 'react-redux';
import { authAction } from '../../store/auth-slice';
function AuthForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const emailRef = useRef();
  const passwordRef = useRef();
  const data = useActionData();
  const [searchParams] = useSearchParams();
  const [selectedFile, setSelectedFile] = useState(null);
  const isLogin = searchParams.get('mode') === 'signInWithPassword';

  if (isLogin) {
  }
  useEffect(() => {
    // Lấy dữ liệu từ localStorage khi component được render
    const storedAvatar = localStorage.getItem('avatar');
    if (storedAvatar) {
      setSelectedFile([JSON.parse(storedAvatar)]);
    }
  }, []);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmpassword: '',
  });
  const [error, setError] = useState('');

  const handleFileChange = event => {
    const file = event.target.files[0];
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve({ id: 0, file, dataURL: reader.result });
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
      console.log(reader);
      console.log(file);
    }).then(complete => {
      setSelectedFile([complete]);
    });
  };
  // Mặc định ảnh đại diện khi trang tải lại
  useEffect(() => {
    const storedAvatar = localStorage.getItem('avatar');
    if (!storedAvatar && !isLogin) {
      setSelectedFile(null);
    }
  }, [isLogin]);
  console.log(selectedFile);
  //hàm nhận giá trị khi input được nhập
  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateFormSIgnUp = () => {
    const { name, email, password, confirmpassword } = formData;
    if (!name || !email || !password || !confirmpassword) {
      setError('Vui lòng nhập đủ thông tin');
      return false;
    } else if (password.length < 8) {
      setError('Password phải có ít nhất 8 kí tự!');
      return false;
    } else if (password !== confirmpassword) {
      setError('Không khớp với mật khẩu!');
      return false;
    }
    const userArr = JSON.parse(localStorage.getItem('userArr')) || [];
    if (userArr.some(user => user.email === email)) {
      setError('Email đã được sử dụng!');
      return false;
    }
    return true;
  };
  const validateFormLogin = () => {
    const { email, password } = formData;
    if (!email || !password) {
      setError('Vui lòng nhập đủ thông tin');
      return false;
    }
    return true;
  };
  const loginHandler = async event => {
    event.preventDefault();
    if (validateFormLogin()) {
      const { email, password } = formData;
      const userArr = JSON.parse(localStorage.getItem('userArr')) || [];
      console.log(userArr[0].email);
      const loggedInUser = userArr.find(
        user => user.email === email && user.password === password
      );
      if (loggedInUser) {
        console.log(loggedInUser);
        localStorage.setItem('currentUser', JSON.stringify(loggedInUser));
        dispatch(authAction.login());
        navigate('/');
      } else {
        alert('Sai email hoặc mật khẩu');
        setFormData(prevData => ({ ...prevData, password: '' }));
      }
    }
  };
  const signupHandler = async event => {
    event.preventDefault();
    if (validateFormSIgnUp()) {
      const { name, email, password, confirmpassword } = formData;
      // Tạo FormData và thêm thông tin người dùng
      const newUser = {
        name,
        email,
        password,
        confirmpassword,
        avatar: selectedFile ? selectedFile : null,
      };
      const userArr = JSON.parse(localStorage.getItem('userArr')) || [];
      userArr.push(newUser);
      localStorage.setItem('userArr', JSON.stringify(userArr));
      setFormData({
        name: '',
        email: '',
        password: '',
        confirmpassword: '',
      });
      emailRef.current.value = '';
      passwordRef.current.value = '';
      setSelectedFile(null);
      setError('');
      navigate('/auth?mode=signInWithPassword');
    }
  };
  // console.log(URL.createObjectURL(selectedFile));
  return (
    <section className={classes.auth}>
      <form>
        <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
        {data && data.message && <p>{data.message}</p>}
        {/* thêm ảnh đại diện */}
        {!isLogin && (
          <div className={classes['add-avt']}>
            {!selectedFile ? (
              <label htmlFor="avatar" className={classes['custom-file-upload']}>
                Thêm
              </label>
            ) : (
              <label htmlFor="avatar" className={classes['custom-file-upload']}>
                Thay thế
              </label>
            )}
            <input
              type="file"
              id="avatar"
              name="avatar"
              accept="image/*"
              onChange={handleFileChange}
              className={classes.inputAvt}
            />
            {!selectedFile && (
              <div className={classes.imgAvt}>
                <img
                  src={userLayout}
                  alt="Ảnh đại diện"
                  style={{ maxWidth: '100%', maxHeight: '200px' }}
                />
              </div>
            )}
            {selectedFile && (
              <div className={classes.imgAvt}>
                <img
                  src={selectedFile[0].dataURL}
                  alt="Ảnh đại diện"
                  style={{ maxWidth: '100%', maxHeight: '200px' }}
                />
              </div>
            )}
          </div>
        )}
        {!isLogin && (
          <div className={classes.control}>
            <label htmlFor="name">Your Name</label>
            <input
              type="text"
              name="name"
              id="name"
              required
              onChange={handleInputChange}
            />
          </div>
        )}
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input
            type="email"
            name="email"
            id="email"
            required
            ref={emailRef}
            onChange={handleInputChange}
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input
            type="password"
            name="password"
            id="password"
            required
            ref={passwordRef}
            onChange={handleInputChange}
          />
        </div>
        {!isLogin && (
          <div className={classes.control}>
            <label htmlFor="password">Release Password</label>
            <input
              type="password"
              name="confirmpassword"
              id="password"
              required
              onChange={handleInputChange}
            />
          </div>
        )}
        {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

        <div className={classes.actions}>
          <button onClick={isLogin ? loginHandler : signupHandler}>
            {isLogin ? 'Login' : 'Create new user'}
          </button>
          <button type="button" className={classes.toggle}>
            {/* Link để chuyển đổi giữa đăng nhập và đăng ký */}
            <Link to={`?mode=${isLogin ? 'signUp' : 'signInWithPassword'}`}>
              {isLogin ? 'Create new account' : 'Login with existing account'}
            </Link>
          </button>
        </div>
      </form>
    </section>
  );
}
export default AuthForm;
