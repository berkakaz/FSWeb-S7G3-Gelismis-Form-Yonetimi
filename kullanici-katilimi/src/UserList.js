import React from "react";
import {
  TableCell,
  TableHead,
  TableRow,
  TableBody,
  Table,
} from "@mui/material";

const UserList = (props) => {
  const { users } = props;

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Id</TableCell>
          <TableCell align="right">Name</TableCell>
          <TableCell align="right">Last Name</TableCell>
          <TableCell align="right">Email</TableCell>
          <TableCell align="right">Password</TableCell>
          <TableCell align="right">Accepted Terms?</TableCell>
          <TableCell align="right">Created at</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {users.map((user) => (
          <TableRow
            key={user.id}
            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
          >
            <TableCell component="th" scope="user">
              {user.id}
            </TableCell>
            <TableCell align="right">{user.firstName}</TableCell>
            <TableCell align="right">{user.lastName}</TableCell>
            <TableCell align="right">{user.email}</TableCell>
            <TableCell align="right">{user.password}</TableCell>
            <TableCell align="right">
              {user.acceptTerms ? `Yes` : `No`}
            </TableCell>
            <TableCell align="right">{user.createdAt}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default UserList;
