import { Outlet, json } from 'react-router-dom';

function RootLayout() {
  return (
    <>
      <main>
        <Outlet />
      </main>
    </>
  );
}
export default RootLayout;
export async function loader() {
  const response = await fetch(
    'https://music-bc1ba-default-rtdb.firebaseio.com/gallery.json'
  );
  if (!response.ok) {
    throw json({ message: 'Error fetching' }, { status: 500 });
  } else {
    return response;
  }
}
