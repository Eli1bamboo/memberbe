import React from 'react'
import PropTypes from 'prop-types'
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles'
import Hidden from '@material-ui/core/Hidden'
// core components
import GridItem from 'components/Grid/GridItem.js'
import GridContainer from 'components/Grid/GridContainer.js'
import Card from 'components/Card/Card.js'
import CardHeader from 'components/Card/CardHeader.js'
import CardBody from 'components/Card/CardBody.js'

import iconsStyle from 'assets/jss/material-dashboard-react/views/iconsStyle.js'

function Icons (props) {
  const { classes } = props
  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card plain>
          <CardHeader plain color='primary'>
            <h4 className={classes.cardTitleWhite}>Material Design Icons</h4>
            <p className={classes.cardCategoryWhite}>
              Handcrafted by our friends from{' '}
              <a
                href='https://design.google.com/icons/'
                target='_blank'
                rel='noopener noreferrer'
              >
                Google
              </a>
            </p>
          </CardHeader>
          <CardBody>
            <Hidden only={[ 'sm', 'xs' ]}>
              <iframe
                className={classes.iframe}
                src='https://material.io/icons/'
                title='Icons iframe'
              >
                <p>Your browser does not support iframes.</p>
              </iframe>
            </Hidden>
            <Hidden only={[ 'lg', 'md' ]}>
              <GridItem xs={12} sm={12} md={6}>
                <h5>
                  The icons are visible on Desktop mode inside an iframe. Since
                  the iframe is not working on Mobile and Tablets please visit
                  the icons on their original page on Google. Check the
                  <a
                    href='https://design.google.com/icons/'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    Material Icons
                  </a>
                </h5>
              </GridItem>
            </Hidden>
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  )
}

Icons.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(iconsStyle)(Icons)
