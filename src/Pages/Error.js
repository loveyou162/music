import { useRouteError } from 'react-router-dom';
// import MainNavigation from "../components/MainNavigation";

// import PageContent from '../components/Layout/PageContent';

//trang hiển thị lỗi
function ErrorPage() {
  //sử dụng useRouterError để lấy dữ liệu lỗi từ react-router
  const error = useRouteError();
  //thiết lập các giá trị mặc định cho tiêu đề và thông báo lỗi
  let title = 'An error occurred!';
  let message = 'Something went wrong!';
  //nếu lỗi có mã status là 500,sử dụng thông báo từ dữ liệu lỗi
  if (error.status === 500) {
    message = error.data.message;
  }
  //nếu lỗi có mã status là 404, sử dụng tiêu đề và thông báo tương ứng
  if (error.status === 404) {
    title = 'Not found!';
    message = 'Could not find resource or page.';
  }

  return (
    <>
      <h1>{title}</h1>
      <p>{message}</p>
    </>
  );
}

export default ErrorPage;
