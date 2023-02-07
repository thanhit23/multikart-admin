import React from 'react';
import { useTable, usePagination } from 'react-table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import {
  faChevronRight,
  faChevronLeft,
} from '@fortawesome/free-solid-svg-icons';

import { Url } from '../../helpers';
import LoadingTable from '../../containers/LoadingIndicatorTable';

function Table({ col: columns, data, meta, goToPage, pagination = false }) {
  const { page: pages, limit, totalPages } = meta;

  const dataTable = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: limit },
    },
    usePagination,
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    dataTable;

  const totalPagesArr = Array.from({ length: totalPages });

  const handleClickPageButton = page => goToPage({ page });

  const handleClickPaginationButton = () => {
    const params = Url.getQueryString();
    const page = +params.page + 1;
    goToPage({ page });
  };

  const renderPageNumber = () => {
    return totalPagesArr.map((_, index) => {
      const isCurrentPage = pages === index + 1;
      return (
        <li
          key={index}
          className={classNames(
            'flex justify-center items-center w-8 h-8 m-2.5',
            {
              'rounded-full text-[#4E97FD] border border-[#4E97FD] border-solid':
                isCurrentPage,
            },
          )}
        >
          <button
            className="py-[5px] px-[10px] w-8 h-8"
            type="button"
            onClick={() => handleClickPageButton(index + 1)}
            disabled={isCurrentPage}
          >
            {index + 1}
          </button>
        </li>
      );
    });
  };

  function renderPagination() {
    return (
      <div className="mt-4 flex justify-center">
        <div>
          <ul className="flex">
            <li
              className={classNames(
                'flex justify-center items-center w-8 h-8 m-2.5 rounded-full text-[#4E97FD] border border-[#4E97FD] border-solid',
                {
                  'opacity-70': pages === 1,
                },
              )}
            >
              <button
                className="w-8 h-8"
                type="button"
                onClick={() => handleClickPaginationButton(-1)}
                disabled={pages === 1}
              >
                <FontAwesomeIcon icon={faChevronLeft} />
              </button>
            </li>
            {renderPageNumber()}
            <li
              className={classNames(
                'flex justify-center items-center w-8 h-8 m-2.5 rounded-full text-[#4E97FD] border border-[#4E97FD] border-solid',
                {
                  'opacity-70': pages === totalPages,
                },
              )}
            >
              <button
                className="w-8 h-8"
                type="button"
                onClick={() => handleClickPaginationButton(1)}
                disabled={pages === totalPages}
              >
                <FontAwesomeIcon icon={faChevronRight} />
              </button>
            </li>
          </ul>
        </div>
      </div>
    );
  }

  const showLoading = () => <LoadingTable />;

  const renderBody = (
    <tbody className="relative" {...getTableBodyProps()}>
      {rows.map(row => {
        prepareRow(row);
        return (
          <tr
            className="text-center border-solid border-b-[1px] border-[#D8E0E9]"
            {...row.getRowProps()}
          >
            {row.cells.map(cell => {
              return (
                <td className="py-[10px] px-[16px]" {...cell.getCellProps()}>
                  <div className="flex max-w-sm justify-center">
                    <span className="text-table">{cell.render('Cell')}</span>
                  </div>
                </td>
              );
            })}
          </tr>
        );
      })}
      {showLoading()}
      {!data.length && <tr className="h-40" />}
    </tbody>
  );

  return (
    <>
      <table className="w-full" {...getTableProps()}>
        <thead className="bg-[#f3f5f9]">
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th className="py-4" {...column.getHeaderProps()}>
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        {renderBody}
      </table>
      {meta.page && pagination && renderPagination()}
    </>
  );
}

Table.prototype = {
  col: PropTypes.array,
  data: PropTypes.array,
  meta: PropTypes.object,
  goToPage: PropTypes.func,
};

export default Table;
