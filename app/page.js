'use client'
import { useState } from 'react';

export default function Home() {
  const [imageUrl, setImageUrl] = useState(null);

  const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    const file = e.target.file.files[0];
    formData.append('help me', file);
    const keys = formData.keys();
    alert(keys.next().value);
    alert(file.name)

    const res = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    const data = await res.json();
    if (data.filePath) {
      setImageUrl(data.filePath);
    } else {
      alert(data.error || 'Something went wrong');
    }
  };

  return (
    <div>
      <h1>Upload Image</h1>
      
      <form onSubmit={handleUpload} >
        <input type="file" name="file" accept=".jpg,.png" />
        <button type="submit">Upload</button>
      </form>

      
      {imageUrl && (
        <div>
          <h2>Uploaded Image:</h2>
          <img src={imageUrl} alt="Uploaded File" />
        </div>
      )}
      <a href='./check'>Check</a>
    </div>
  );
}
