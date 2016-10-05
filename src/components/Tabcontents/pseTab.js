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
                      <h4>{jsonData.name_first_preferred} {jsonData.name_middle} {jsonData.name_middle}</h4>
                      <h5>{jsonData.acronym}</h5>
                      <h5>Username: {jsonData.username}</h5>
                      <h5>Last login: {jsonData.last_login}</h5>
                      <br />
                      <div className='btn-group'>
                        <button type='button' className='btn btn-primary'>Social</button>
                        <button type='button' className='btn btn-primary dropdown-toggle' data-toggle='dropdown'>
                          <span className='caret' /><span className='sr-only'>Social</span>
                        </button>
                        <ul className='dropdown-menu' role='menu'>
                          <li><a href='#'>Twitter</a></li>
                          <li><a href='https://plus.google.com/+Jquery2dotnet/posts'>Google +</a></li>
                          <li><a href='https://www.facebook.com/jquery2dotnet'>Facebook</a></li>
                          <li className='divider' />
                          <li><a href='#'>Github</a></li>
                        </ul>
                      </div>
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
