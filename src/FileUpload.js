 import React, { useState } from 'react';
   import * as XLSX from 'xlsx';
   import axios from 'axios';

   function FileUpload() {
       const [file, setFile] = useState(null);
       const [data, setData] = useState([]);

       const handleFileChange = (e) => {
           const selectedFile = e.target.files[0];
           setFile(selectedFile);

           const reader = new FileReader();
           reader.onload = (e) => {
               const data = new Uint8Array(e.target.result);
               const workbook = XLSX.read(data, { type: 'array' });
               const sheetName = workbook.SheetNames[0];
               const sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
               setData(sheetData);
           };
           reader.readAsArrayBuffer(selectedFile);
       };

       const handleUpload = async () => {
           try {
               const response = await axios.post('/api/upload', data);
               console.log('Data uploaded successfully:', response.data);
           } catch (error) {
               console.error('Error uploading data:', error);
           }
       };

       return (
           <div>
               <input type="file" onChange={handleFileChange} />
               <button onClick={handleUpload}>Upload</button>
           </div>
       );
   }

   export default FileUpload;