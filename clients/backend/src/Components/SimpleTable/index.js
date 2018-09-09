import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import DataTables from 'material-ui-datatables'

const styles = {
  root: {
    width: '100%',
    overflowX: 'auto'
  }
}

class SimpleTable extends Component {
  render() {
    const { classes, data, columns } = this.props

    return (
      <Paper className={classes.root}>
        <MuiThemeProvider>
          <DataTables
            height={'auto'}
            selectable={true}
            columns={columns}
            data={data}
            showCheckboxes={false}
            page={1}
            count={(data && data.length) ? data.length : 0}
          />
        </MuiThemeProvider>
      </Paper>
    )
  }
}

export default withStyles(styles)(SimpleTable)
