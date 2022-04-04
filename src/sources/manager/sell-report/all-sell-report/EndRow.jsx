import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { moneyFormat } from "../../../../Utils/SimpleTasks";

export const EndRow = ({
  ticketPrice,
  ticketPriceFare,
  ticketPriceKh,
  stock,
}) => {
  return (
    <TableRow tabIndex={-1} className="bg-muted">
      <TableCell align="center">
        <h6 className="font-size-11"></h6>
      </TableCell>
      <TableCell align="center">
        <h6 className="font-size-11"></h6>
      </TableCell>
      <TableCell align="center">
        <h6 className="font-size-11"></h6>
      </TableCell>
      <TableCell align="center">
        <h6 className="font-size-11"></h6>
      </TableCell>
      <TableCell align="center">
        <h6 className="font-size-11"></h6>
      </TableCell>
      <TableCell align="center">
        <h6 className="font-size-11"></h6>
      </TableCell>
      <TableCell align="center">
        <h6 className="font-size-11"></h6>
      </TableCell>
      <TableCell align="center">
        <h6 className="font-size-11"></h6>
      </TableCell>
      <TableCell align="center">
        <h6 className="font-size-11"></h6>
      </TableCell>
      <TableCell align="center">
        <h6 className="font-size-11"></h6>
      </TableCell>
      <TableCell align="center">
        <h6 className="font-size-11"></h6>
      </TableCell>
      <TableCell align="center">
        <h6 className="font-size-11"></h6>
      </TableCell>
      <TableCell align="center">
        <h6 className="font-size-11"></h6>
      </TableCell>
      <TableCell align="center">
        <h6 className="font-size-11"></h6>
      </TableCell>
      <TableCell align="center">
        <h6 className="font-size-11">{moneyFormat(ticketPrice)} ریال</h6>
      </TableCell>
      <TableCell align="center">
        <h6 className="font-size-11">{moneyFormat(ticketPriceFare)} ریال</h6>
      </TableCell>
      <TableCell align="center">
        <h6 className="font-size-11">{moneyFormat(ticketPriceKh)} ریال</h6>
      </TableCell>
      <TableCell align="center">
        <h6 className="font-size-11">{moneyFormat(stock)} ریال</h6>
      </TableCell>
      <TableCell align="center">
        <h6 className="font-size-11"></h6>
      </TableCell>
      <TableCell align="center">
        <h6 className="font-size-11"></h6>
      </TableCell>
      <TableCell align="center">
        <h6 className="font-size-11"></h6>
      </TableCell>
      <TableCell align="center">
        <h6 className="font-size-11"></h6>
      </TableCell>
      <TableCell align="center">
        <h6 className="font-size-11"></h6>
      </TableCell>
      <TableCell align="center">
        <h6 className="font-size-11"></h6>
      </TableCell>
      <TableCell align="center">
        <h6 className="font-size-11"></h6>
      </TableCell>
      <TableCell align="center">
        <h6 className="font-size-11"></h6>
      </TableCell>
      <TableCell align="center">
        <h6 className="font-size-11"></h6>
      </TableCell>
      <TableCell align="center">
        <h6 className="font-size-11"></h6>
      </TableCell>
      <TableCell align="center">
        <h6 className="font-size-11"></h6>
      </TableCell>
      <TableCell align="center">
        <h6 className="font-size-11"></h6>
      </TableCell>
      <TableCell align="center">
        <h6 className="font-size-11"></h6>
      </TableCell>
      <TableCell align="center">
        <h6 className="font-size-11"></h6>
      </TableCell>
      <TableCell align="center">
        <h6 className="font-size-11"></h6>
      </TableCell>
      <TableCell align="center">
        <h6 className="font-size-11"></h6>
      </TableCell>
    </TableRow>
  );
};
