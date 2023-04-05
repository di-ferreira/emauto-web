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
        />
      </tfoot>
    </TableWrapper>
  );
}

export default Table;
