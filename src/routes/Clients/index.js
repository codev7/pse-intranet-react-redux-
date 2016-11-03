import React, { PropTypes } from 'react'

import AddNewClientForm from '../../components/ModalForm/addNewClientForm'
import ClientsList from './Components/DataList'

class ClientsTab extends React.Component {

  constructor() {
    super()

    this.state = {
      'addNewModal': false,
      'newOrEdit': 'new',
      'formData': {}
    }

    this.addNewClient = this.addNewClient.bind(this)
    this.editClient = this.editClient.bind(this)
  }

  addNewClient(e) {
    e.preventDefault()

    this.setState({
      addNewModal: true,
      newOrEdit: 'new'
    })
  }

  editClient(data) {

    this.setState({
      addNewModal: true,
      newOrEdit: 'edit',
      formData: data
    })

  }

  render () {
    return (
      <div id='page-data'>
        <div className='wraper container-fluid clients-page'>
          <div className='panel panel-default'>
            <div className='panel-body'>

              <div className='col-md-3 left-column'>
                <div className='top-search-form'>

                  <div className='row'>
                    <div className='col-sm-7'>
                      <input type='text' className='search rounded' placeholder='Search...' />
                    </div>
                    <div className='col-sm-5'>
                      <select className='form-control' value='name'>
                        <option value='name'>name</option>
                        <option value='email'>email</option>
                        <option value='phone'>phone</option>
                        <option value='address'>address</option>
                        <option value='city'>city</option>
                        <option value='state'>state</option>
                      </select>
                    </div>
                  </div>

                  <div className='row'>
                    <div className='col-sm-7'>
                      <input type='text' className='search rounded' placeholder='Search...' />
                    </div>
                    <div className='col-sm-5'>
                      <select className='form-control' value='address'>
                        <option value='name'>name</option>
                        <option value='email'>email</option>
                        <option value='phone'>phone</option>
                        <option value='address'>address</option>
                        <option value='city'>city</option>
                        <option value='state'>state</option>
                      </select>
                    </div>
                  </div>

                  <div className='row'>
                    <div className='col-sm-7'>
                      <input type='text' className='search rounded' placeholder='Search...' />
                    </div>
                    <div className='col-sm-5'>
                      <select className='form-control' defaultValue='city'>
                        <option value='name'>name</option>
                        <option value='email'>email</option>
                        <option value='phone'>phone</option>
                        <option value='address'>address</option>
                        <option value='city'>city</option>
                        <option value='state'>state</option>
                      </select>
                    </div>
                  </div>

                  <div className='text-center search-btn-container'>
                    <button type='button' className='btn btn-info btn-sm'>Search</button>
                  </div>

                </div>

                <div className="clients-list-container">
                  <h3 className='text-center'>Results</h3>
                  <ClientsList editClient={this.editClient} />
                </div>

              </div>

              <div className='col-md-9 right-column'>
                <div className='top-right-section row'>
                  <div className='client-name col-sm-6'>
                    <h3 className='name'>Client Name...</h3>
                  </div>
                  <div className='add-new-client-btn col-sm-6'>
                    <a href='#' onClick={this.addNewClient}>
                      <h3><span>+</span><span className='add-new-client-text'>Add New</span></h3>
                    </a>
                  </div>
                </div>
              </div>

            </div>
          </div>
          <AddNewClientForm show={this.state.addNewModal} newOrEdit={this.state.newOrEdit} formData={this.state.formData} />

        </div>
      </div>
    )
  }
}

export default ClientsTab
