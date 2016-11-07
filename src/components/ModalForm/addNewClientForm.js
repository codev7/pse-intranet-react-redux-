import React, { PropTypes } from 'react'
import { Modal, Button } from 'react-bootstrap'
import { APIConstants } from '../Api/APIConstants'
import request from 'superagent-bluebird-promise'

class AddNewClientForm extends React.Component {

  constructor(props) {
    super(props)

    this.close = this.close.bind(this)
    this.submit = this.submit.bind(this)

    console.log(props)
    this.state = {
      'show': props.show,
      'formData': props.formData,
      'newOrEdit': props.newOrEdit
    }
  }

  static propTypes = {
    show: PropTypes.bool.isRequired,
    newOrEdit: PropTypes.string,
    formData: PropTypes.object,
    closeFunc: PropTypes.func.isRequired
  };

  close() {
    this.setState({ show: false })
    this.props.closeFunc()
  }

  createClient(data, callback) {
    const accessToken = localStorage.accessToken

    request.post(`${APIConstants.API_SERVER_NAME}clients_create`)
      .send(JSON.stringify({ 'access_token': accessToken, 'name': data }))
      .set('Content-Type', 'application/json')
      .then(function (response) {

        const data = JSON.parse(response.text)

        callback(data)

      }, function (err) {
        console.log(err)
      })
  }

  submit() {

    const userName = document.getElementById('user_name').value
    const that = this
    // this.createClient(userName, function (data) {
    //   console.log(data)
    //   that.setState({ show: false })
    // })

  }

  componentWillReceiveProps(nextProps) {
    // You don't have to do this check first, but it can help prevent an unneeded render
    if (nextProps.show !== this.state.show) {
      this.setState({
        show: nextProps.show,
        newOrEdit: nextProps.newOrEdit,
        formData: nextProps.formData
      })
      console.log(nextProps.formData)
    }
  }

  render () {

    const formData = this.state.newOrEdit == 'new' ? <form className='form-horizontal'>
      <fieldset>
        <div className='form-group'>
          <label className='col-md-4 control-label' htmlFor='user_name'>Name*</label>
          <div className='col-md-4'>
            <input id='user_name' name='user_name' type='text' placeholder='username' className='form-control input-md' required='' />
          </div>
        </div>
      </fieldset>
    </form> : <form className='form-horizontal'>
      <fieldset>
        <div className='form-group'>
          <label className='col-md-4 control-label' htmlFor='first_name'>First Name</label>
          <div className='col-md-4'>
            <input id='first_name' name='first_name' type='text' placeholder='first name' className='form-control input-md' />
          </div>
        </div>
        <div className='form-group'>
          <label className='col-md-4 control-label' htmlFor='last_name'>Last Name</label>
          <div className='col-md-4'>
            <input id='last_name' name='last_name' type='text' placeholder='last name' className='form-control input-md' />
          </div>
        </div>
        <div className='form-group'>
          <label className='col-md-4 control-label' htmlFor='user_name'>User Name*</label>
          <div className='col-md-4'>
            <input id='user_name' name='user_name' type='text' placeholder='username' className='form-control input-md' required='' defaultValue={this.state.formData.name ? this.state.formData.name : ''} />
          </div>
        </div>
      </fieldset>
    </form>

    return (
      <div className='modal-container'>
        <Modal
          show={this.state.show}
          onHide={this.close}
          container={this}
          aria-labelledby='contained-modal-title'
        >
          <Modal.Header closeButton>
            <Modal.Title id='contained-modal-title'> New Client</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            { formData }
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.submit}>{this.state.newOrEdit == 'new' ? 'Create' : 'Save'}</Button>
            <Button onClick={this.close}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}

export default AddNewClientForm
