import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import DataTables from 'material-ui-datatables';

const styles = {
  root: {
    width: '100%',
    overflowX: 'auto'
  }
}

const TABLE_COLUMNS = [
  {
    key: 'name',
    label: 'Dessert (100g serving)',
  }, {
    key: 'calories',
    label: 'Calories',
  },
];

const TABLE_DATA = [
  {
    name: 'Frozen yogurt',
    calories: '159',
    fat: '6.0',
    carbs: '24',
  }, {
    name: 'Ice cream sandwich',
    calories: '159',
    fat: '6.0',
    carbs: '24',
  },
];

class SimpleTable extends Component {
  render() {
    const { classes, data } = this.props

    return (
      <Paper className={classes.root}>
        <MuiThemeProvider>
          <DataTables
            height={'auto'}
            selectable={false}
            columns={TABLE_COLUMNS}
            data={data}
            showCheckboxes={false}
            page={1}
            count={100}
          />
        </MuiThemeProvider>
      </Paper>
    )
  }
}

export default withStyles(styles)(SimpleTable)
