import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Loader from '../Loader/Loader';

export default function TableData() {
  const [tableDatas, setTableData] = useState();
  const [columnDatas, setColumnDatas] = useState();
  const [loader, setLoader] = useState(false);

  let getTableData = async () => {
    try{
      setLoader(true);
    let res = await axios.get('http://localhost:5000/tabledatas');
    setTableData(res.data);
    console.log(res.data);
    }catch(err){
      setLoader(false)
      alert(err)
    }finally{
      setLoader(false);
    }
  }

  let getColumnDatas = async () => {
    let res = await axios.get('http://localhost:5000/columndatas');
    setColumnDatas(res.data);
    console.log(res.data);
  }

  useEffect(() => {
    getTableData();
    getColumnDatas()
  }, [])
  return (
    <div className='text-white w-100'>
      {loader && <Loader/>}
      <h1 className='text-start py-4'>Table Datas</h1>
        <table className='table table-bordered d-block rounded-3 border table-responsive'>
          <tr>
            {columnDatas?.map((value, index) => {
              return (
                <th className='p-3' key={index}>{value.column_name}</th>
              );
            })}
          </tr>
          {tableDatas?.map((tableValue, tableIndex) => (
            <tr key={tableIndex}>
              {console.log(tableValue)}
              {columnDatas?.map((columnData) => (
                <td className='p-3' key={columnData.column_name}>
                  {tableValue[columnData.column_name]}
                </td>
              ))}
            </tr>
          ))}

        </table>
    </div>
  )
}
