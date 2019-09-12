import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import '../styles/Leaderboard.css';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto',
  },
  table: {
    minWidth: 1200,
  },
}));

function createData(rank, username, winperweek, totalslices) {
  return { rank, username, winperweek, totalslices };
}

const rows = [
  createData('🥇', 'YAH', 10, 12304),
  createData('🥈', 'YAH', 9, 11342),
  createData('🥉', 'Balsagne', 8, 10002),
  createData('4', 'Erv', 7, 10000),
  createData('5', 'Hans', 6, 9999),
  createData('6', 'Mahomes', 6, 8979),
  createData('7', 'Rodgers', 6, 8888),
  createData('8', 'Brady', 6, 8790),
  createData('9', 'Wilson', 6, 6942),
  createData('10', 'Maney', 6, 6941),
];

export default function SimpleTable() {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell align="center">Rank</TableCell>
            <TableCell align="center">Name</TableCell>
            <TableCell align="center">
              # of Wins per Week{' '}
              <span role="img" aria-label="cup">
                🏆
              </span>
            </TableCell>
            <TableCell align="center">
              Total Slices{' '}
              <span role="img" aria-label="pizza">
                🍕
              </span>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.rank}>
              <TableCell align="center" component="th" scope="row">
                {row.rank}
              </TableCell>
              <TableCell align="center">{row.username}</TableCell>
              <TableCell align="center">{row.winperweek}</TableCell>
              <TableCell align="center">{row.totalslices}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}
