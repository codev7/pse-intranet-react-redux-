import React, { PropTypes } from 'react'

import AddNewClientForm from '../../components/ModalForm/addNewClientForm'
import ClientsList from './Components/DataList'

class ClientsTab extends React.Component {

  static propTypes = {

  };

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
          <div className='row'>
            <div className='page-title'>
              <h3 className='title'>Clients</h3>
            </div>
            <div className='add-new-client-btn'>
              <a href='#' onClick={this.addNewClient}><h3><span>+</span><span className='add-new-client-text'>Add New</span></h3></a>
            </div>
          </div>
          <div className='row'>
            <div className='col-lg-12'>
              <div className='panel panel-default'>
                <div className='panel-body'>

                  <div className='input-group'>
                    <span className='input-group-btn'>
                      <button type='button' className='btn btn-effect-ripple btn-primary'>
                        <i className='fa fa-search' />
                      </button>
                    </span>
                    <input type='text' id='example-input1-group2' name='example-input1-group2' className='form-control' placeholder='Search' />
                  </div>

                </div>
              </div>
            </div>
          </div>

          <ClientsList editClient={this.editClient} />
          <AddNewClientForm show={this.state.addNewModal} newOrEdit={this.state.newOrEdit} formData={this.state.formData} />

        </div>
      </div>
    )
  }
}

export default ClientsTab
