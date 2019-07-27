import React from "react";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";

export function SeedingOptions(props: {}) {
  return (
    <TableHead>
      <TableRow>
        <TableCell>Seed by:</TableCell>
      </TableRow>
    </TableHead>
  );
}
