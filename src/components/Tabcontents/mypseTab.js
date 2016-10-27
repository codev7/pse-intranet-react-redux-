import React, { PropTypes } from 'react'

class PSETab extends React.Component {
  static propTypes = {
  };

  render () {
    if (localStorage.getItem('me') === null) {
      return (
        <div>
          <h1>Please sign in</h1>
        </div>
      )
    } else {
      var jsonData = JSON.parse(localStorage.getItem('me'))
      return (
        <div>
          <div className='container pse-profile-container'>
            <div className='row'>
              <div className='col-xs-12 col-sm-12 col-md-12'>
                <div className='well well-lg'>
                  <div className='row'>
                    <div className='col-sm-6 col-md-2'>
                      <img src='http://placehold.it/380x500' alt='' className='img-rounded img-responsive' />
                    </div>
                    <div className='col-sm-6 col-md-10 profile-content'>
                      <h2>{jsonData.name_first} {jsonData.name_middle} {jsonData.name_last} ({jsonData.acronym})</h2>
                      <h5>Preferred First Name: {jsonData.name_first_preferred}</h5>
                      <h5>Username: {jsonData.username}</h5>
                      <h5>Last login: {jsonData.last_login}</h5>
                      <h5>Updated: {jsonData.updated_at}</h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }
  }
}

export default PSETab
