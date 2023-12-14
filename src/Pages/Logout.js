import { redirect } from 'react-router-dom';

//hành động xóa token và điều hướng về trang chủ
export function action() {
  localStorage.setItem('curentUser', false);
  return redirect('/auth?mode=signInWithPassword');
}
