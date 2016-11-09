import React, { PropTypes } from 'react'
import { Modal, Button } from 'react-bootstrap'

class AddNewClientForm extends React.Component {

  static propTypes = {
    show: PropTypes.bool.isRequired,
    newOrEdit: PropTypes.string,
    formData: PropTypes.object,
    closeFunc: PropTypes.func.isRequired,
    submitFunc: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props)

    this.state = {
      'show': props.show
    }

    this.close = this.close.bind(this)
    this.submitModal = this.submitModal.bind(this)

  }

  close() {
    this.props.closeFunc()
  }

  submitModal() {
    if (this.props.newOrEdit == 'new'){
      const userName = document.getElementById('user_name').value

      this.props.submitFunc(userName)
    } else if (this.props.newOrEdit == 'edit'){

    }

  }

  componentWillReceiveProps(nextProps) {
    // You don't have to do this check first, but it can help prevent an unneeded render
    if (nextProps.show !== this.state.show) {
      this.setState({
        show: nextProps.show
      })
    }
  }

  render () {

    const formDataHTML = this.props.newOrEdit == 'new' ? <div className='form-horizontal'>
      <fieldset>
        <div className='form-group'>
          <label className='col-md-4 control-label' htmlFor='user_name'>Name*</label>
          <div className='col-md-4'>
            <input id='user_name' name='user_name' type='text' placeholder='username' className='form-control input-md' required='' />
          </div>
        </div>
      </fieldset>
    </div> : <form className='form-horizontal'>
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
            <input id='user_name' name='user_name' type='text' placeholder='username' className='form-control input-md' required='' defaultValue={this.props.formData.name ? this.props.formData.name : ''} />
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
          animation
        >
          <Modal.Header closeButton>
            <Modal.Title id='contained-modal-title'> New Client</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            { formDataHTML }
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => this.submitModal()}>{this.props.newOrEdit == 'new' ? 'Create' : 'Save'}</Button>
            <Button onClick={this.close}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}

export default AddNewClientForm
