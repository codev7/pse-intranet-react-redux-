import React, { PropTypes } from 'react'
import { Modal, Button } from 'react-bootstrap'

class EditClientForm extends React.Component {

  constructor(props) {
    super(props)

    this.close = this.close.bind(this)
    this.submit = this.submit.bind(this)

    console.log(props)
    this.state = {
      'show': props.show
    }
  }

  static propTypes = {
    show: PropTypes.bool.isRequired
  };

  close() {
    this.setState({ show: false })
  }

  submit() {
    this.setState({ show: false })
  }

  componentWillReceiveProps(nextProps) {
    // You don't have to do this check first, but it can help prevent an unneeded render
    if (nextProps.show !== this.state.show) {
      this.setState({ show: nextProps.show })
    }
  }

  render () {

    return (
      <div className='modal-container'>
        <Modal
          show={this.state.show}
          onHide={this.close}
          container={this}
          aria-labelledby='contained-modal-title'
        >
          <Modal.Header closeButton>
            <Modal.Title id='contained-modal-title'>Edit Client</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form className='form-horizontal'>
              <fieldset>
                <div className='form-group'>
                  <label className='col-md-4 control-label' htmlFor='textinput'>First Name</label>
                  <div className='col-md-4'>
                    <input id='textinput' name='textinput' type='text' placeholder='first name' className='form-control input-md' />
                  </div>
                </div>
                <div className='form-group'>
                  <label className='col-md-4 control-label' htmlFor='textinput'>Last Name</label>
                  <div className='col-md-4'>
                    <input id='textinput' name='textinput' type='text' placeholder='last name' className='form-control input-md' />
                  </div>
                </div>
                <div className='form-group'>
                  <label className='col-md-4 control-label' htmlFor='textinput'>User Name*</label>
                  <div className='col-md-4'>
                    <input id='textinput' name='textinput' type='text' placeholder='username' className='form-control input-md' required='' />
                  </div>
                </div>
              </fieldset>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.submit}>Save</Button>
            <Button onClick={this.close}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}

export default EditClientForm
