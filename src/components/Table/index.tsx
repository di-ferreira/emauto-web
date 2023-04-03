import { iTableProps } from '../../@types';
import TableHeader from '../TableHeader';
import { TablePagination } from '../TablePagination';
import TableRow from '../TableRow';
import { TableWrapper, TableBody } from './styles';

function Table<T>({ data, columns }: iTableProps<T>): JSX.Element {
  return (
    <TableWrapper>
      <thead>
        <TableHeader columns={columns} />
      </thead>
      <TableBody>
        <TableRow data={data} columns={columns} />
      </TableBody>
      <tfoot>
        <TablePagination />
      </tfoot>
    </TableWrapper>
  );
}

export default Table;
