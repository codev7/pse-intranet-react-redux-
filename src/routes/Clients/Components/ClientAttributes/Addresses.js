import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

class Addresses extends React.Component {

  static propTypes = {
    addresses: PropTypes.array,
    client_id: PropTypes.number,
    readOnly: PropTypes.bool
  };

  constructor(props) {
    super(props)

    this.state = {
      addresses: props.addresses
    }

    this.addAddress = this.addAddress.bind(this)
    this.updateAddress = this.updateAddress.bind(this)
  }

  addAddress(e) {
    if (e) {
      e.preventDefault()
    }

    const addresses = this.state.addresses
    addresses.push({address_line0: null, address_line1: null, city: null, state: null, zip_code: null})
    console.log(addresses)
    this.setState({
      addresses: addresses
    })
  }

  updateAddress(e, command){
    if (e){
      e.preventDefault()
    }

    switch(command){
      case 'delete':
        break
      case 'update':
        break
    }
  }

  handleChange(event, index, param1, param2 = null){
    if(param2){
      let addresses = this.state.addresses
      addresses[index][param1][param2] = event.target.value == '' ? null : event.target.value
      this.setState({
        addresses: addresses
      })
    }else {
      let addresses = this.state.addresses
      addresses[index][param1] = event.target.value == '' ? null : event.target.value
      this.setState({
        addresses: addresses
      })
    }
  }

  render () {
    return (
    this.state.addresses && (<div className='address-container info-container'>
      <div className='title-container'>
        <h4>Client Addresses</h4>{!this.props.readOnly && <a href='' onClick={e => this.addAddress(e)}><i className='glyphicon glyphicon-plus-sign' /></a>}
      </div>
      {this.state.addresses.map((one, index) => (
        <div key={index} className='info-row'>
          <div className='pull-left first-container'>
            <input type='text' className='' value={one.address_line0 ? one.address_line0 : ''} onChange={e => this.handleChange(e, index, 'address_line0')} readOnly={this.props.readOnly} />
            <input type='text' className='' value={one.address_line1 ? one.address_line1 : ''} onChange={e => this.handleChange(e, index, 'address_line1')} readOnly={this.props.readOnly} />
            <input type='text' className='' value={one.city ? one.city : ''} onChange={e => this.handleChange(e, index, 'city')} readOnly={this.props.readOnly} />
          </div>
          <div className='pull-left second-container'>
            <input type='text' className='' value={one.state ? one.state : ''} onChange={e => this.handleChange(e, index, 'state')} readOnly={this.props.readOnly} />
            <input type='text' className='' value={one.zip_code ? one.zip_code : ''} onChange={e => this.handleChange(e, index, 'zip_code')} readOnly={this.props.readOnly} />
          </div>
          { !this.props.readOnly && <div className='pull-left third-container'>
            <a href='' onClick={e => this.updateNote(e, 'remove')}><i className='glyphicon glyphicon-minus-sign' /></a>
            <a href='' onClick={e => this.updateNote(e, 'update')}><i className='glyphicon glyphicon-ok-sign' /></a>
          </div> }
        </div>
      ))}
    </div>)
    )
  }

}

const mapStateToProps = (state) => ({
})

export default connect((mapStateToProps), {
})(Addresses)
