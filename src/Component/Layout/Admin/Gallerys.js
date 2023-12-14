import React, { memo, useCallback, useEffect, useState } from 'react';
import classes from './Gallerys.module.css';
import {
  Form,
  json,
  useActionData,
  useRouteLoaderData,
} from 'react-router-dom';

function Gallery() {
  const data = useActionData();
  //lấy dữ liệu gallery từ loader của root
  const image = useRouteLoaderData('root');
  console.log(Object.entries(image.poster));
  const dataImage = Object.entries(image.poster);
  // const imgitems = dataImage.map(file => {
  //   // console.log('0', file[0]);
  //   console.log('1', file[1]);
  // });
  // const [selectedFiles, setSelectedFiles] = useState([]);
  // const [nameSong, setNameSong] = useState(null);
  // // State để lưu giá trị được chọn
  // const [selectedOption, setSelectedOption] = useState('');
  // console.log(selectedOption);
  // console.log(selectedFiles);
  // const handleFileChange = event => {
  //   const file = event.target.files[0];
  //   console.log(file);
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       const newFile = {
  //         id: Date.now(),
  //         file,
  //         dataURL: reader.result,
  //         name: nameSong,
  //       };
  //       setSelectedFiles(prevFiles => [...prevFiles, newFile]);
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };
  // const nameChangehandler = event => {
  //   const enteredName = event.target.value;
  //   console.log(enteredName);
  //   setNameSong(enteredName);
  // };
  //mảng dữ liệu tùy chọn
  const options = ['Banner', 'Poster'];

  // Xử lý sự kiện khi giá trị được chọn thay đổi
  // const handleSelectChange = event => {
  //   setSelectedOption(event.target.value);
  // };
  return (
    <div className={classes.gallery}>
      <h1>Gallery</h1>

      {/* Hiển thị danh sách ảnh đã chọn */}
      <Form method="post" className={classes.form}>
        {data && data.errors && (
          <ul>
            {Object.values(data.errors).map(err => (
              <li key={err}>{err}</li>
            ))}
          </ul>
        )}
        {/* Input để chọn ảnh mới */}
        <div className={classes.groupInput}>
          <label htmlFor="name-image">Tên bài hát</label>
          <input
            type="text"
            id="name-image"
            name="name-image"
            // onChange={nameChangehandler}
            className={classes['form-control']}
          />
        </div>
        <div className={classes.groupInput}>
          <label htmlFor="image" className={classes['custom-file-label']}>
            Thêm ảnh
          </label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            // onChange={handleFileChange}
            className={`custom-file-input ${classes.inputAvt}`}
          />
        </div>
        <div className={classes.groupInput}>
          <label htmlFor="image" className={classes['custom-file-label']}>
            Loại ảnh
          </label>
          <select
            id="selectOption"
            name="selectOption"
            // value={selectedOption}
            // onChange={handleSelectChange}
          >
            {/* Tạo các tùy chọn từ mảng dữ liệu */}
            {options.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">submit</button>
      </Form>

      <table className={classes.tableGallery}>
        <thead>
          <tr>
            <th>id</th>
            <th>image</th>
            <th>tên bài hát</th>
          </tr>
        </thead>
        <tbody>
          {dataImage.map(file => (
            <tr key={file[0].id}>
              <td>{file[0].id}</td>
              <td className={classes.imgBox}>
                <img
                  src={file[1].image}
                  className={classes.imgItem}
                  alt={file[1].name}
                />
              </td>
              <td>{file[1].name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default memo(Gallery);

export async function action({ params, request }) {
  try {
    const data = await request.formData();
    console.log(data);
    const baseImage = data.get('image');
    console.log(baseImage);
    let dataURL;

    if (baseImage) {
      const imageBlob = new Blob([baseImage], { type: 'image/*' });
      console.log(imageBlob);
      const reader = new FileReader();
      const onloadEndPromise = new Promise(resolve => {
        reader.onloadend = resolve;
      });

      reader.readAsDataURL(imageBlob);
      await onloadEndPromise;
      dataURL = reader.result;
      console.log(dataURL);
    }

    console.log('baseImage: ', baseImage);

    const imgData = {
      name: data.get('name-image'),
      image: dataURL,
      option: data.get('selectOption'),
    };

    const response = await fetch(
      'https://music-bc1ba-default-rtdb.firebaseio.com/gallery/poster.json',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(imgData),
      }
    );

    if (!response.ok) {
      throw json({ message: 'Something went wrong!' }, { status: 500 });
    } else {
      return response;
    }
  } catch (error) {
    console.error('An error occurred:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}
