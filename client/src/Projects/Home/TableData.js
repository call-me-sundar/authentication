import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default function TableData() {
  const [tableDatas, setTableData] = useState();
  const [columnDatas, setColumnDatas] = useState();

  let getTableData = async () => {
    let res = await axios.get('http://localhost:5000/tabledatas');
    setTableData(res.data);
    console.log(res.data);
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
    <div className='text-white'>
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
