import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

const styles = {
  card: {
    minWidth: 275
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)'
  },
  title: {
    marginBottom: 16,
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  }
}

function UserCard (props) {
  const { classes, data } = props

  console.log(data)
  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography className={classes.title} color='textSecondary' />
        <Typography variant='headline' component='h2'>
          {data.firstName} {data.lastName}
        </Typography>
        <Typography className={classes.pos} color='textSecondary'>
          id: {data._id}
        </Typography>
        <Typography component='p'>
          Role: {data.roles[0]}
          <br />
          Date of creation: {data.createdAt}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size='small'>Remove User</Button>
        <Button size='small'>Edit User</Button>
      </CardActions>
    </Card>
  )
}

UserCard.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(UserCard)
