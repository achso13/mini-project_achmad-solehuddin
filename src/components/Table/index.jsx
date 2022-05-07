import { useEffect, useState } from 'react';
import Pagination from '../Pagination';
import TableData from './TableData';

export default function Table({ data, deleteNews }) {
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const [paginatedData, setPaginatedData] = useState([]);

  useEffect(() => {
    const startIndex = currentPage * itemsPerPage - itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setPaginatedData(data.news.slice(startIndex, endIndex));
  }, [currentPage, data]);

  return (
    <>
      <div className="overflow-x-auto shadow-sm sm:rounded">
        <table className="w-full text-left text-gray-700">
          <thead className="bg-gray-200 uppercase ">
            <tr>
              <th scope="col" className="px-6 py-3">
                Judul
              </th>
              <th scope="col" className="px-6 py-3">
                Deskripsi
              </th>
              <th scope="col" className="px-6 py-3">
                Kategori
              </th>
              <th scope="col" className="px-6 py-3">
                Penulis
              </th>
              <th scope="col" className="px-6 py-3">
                View
              </th>
              <th scope="col" className="px-6 py-3">
                Foto
              </th>
              <th scope="col" className="px-6 py-3">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.length > 0 ? (
              <>
                {paginatedData.map((item, index) => (
                  <TableData data={item} index={index} key={item.id} deleteNews={deleteNews} />
                ))}
              </>
            ) : (
              <tr>
                <td colSpan={7}>
                  <div className="my-8 flex items-center justify-center">
                    <p className="text-lg">Data tidak ditemukan ...</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <Pagination
        currentPage={currentPage}
        pageLimit={5}
        dataCount={data.news.length}
        itemsPerPage={itemsPerPage}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
}
