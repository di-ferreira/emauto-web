import { iTableProps } from '../../@types';
import TableHeader from '../TableHeader';
import { TablePagination } from '../TablePagination';
import TableRow from '../TableRow';
import { TableWrapper, TableBody, MessageNoData } from './styles';

function Table<T>({
  data,
  columns,
  CurrentPage,
  TotalPages,
  RowsPerPage,
  onChange,
  messageNoData,
  onNextPage,
  onFirstPage,
  onLastPage,
  onPrevPage,
}: iTableProps<T>): JSX.Element {
  return messageNoData !== '' ? (
    <MessageNoData>{messageNoData}</MessageNoData>
  ) : (
    <TableWrapper>
      <thead>
        <TableHeader columns={columns} />
      </thead>
      <TableBody>
        <TableRow data={data} columns={columns} />
      </TableBody>
      <tfoot>
        <TablePagination
          CurrentPage={CurrentPage}
          TotalPages={TotalPages}
          RowsPerPage={RowsPerPage}
          onChange={onChange}
          onNextPage={onNextPage}
          onFirstPage={onFirstPage}
          onLastPage={onLastPage}
          onPrevPage={onPrevPage}
        />
      </tfoot>
    </TableWrapper>
  );
}

export default Table;
