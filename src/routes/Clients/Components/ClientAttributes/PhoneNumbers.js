import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

class PhoneNumbers extends React.Component {

  static propTypes = {
    phones: PropTypes.array,
    client_id: PropTypes.number,
    readOnly: PropTypes.bool
  };

  constructor(props) {
    super(props)

    this.state = {
      phones: props.phones
    }

    this.addPhoneNumber = this.addPhoneNumber.bind(this)
    this.updatePhoneNumber = this.updatePhoneNumber.bind(this)
  }

  addPhoneNumber(e){
    if (e){
      e.preventDefault()
    }

    const phones = this.state.phones
    phones.push({number: '', type: {type: ''}})
    console.log(phones)
    this.setState({
      phones: phones
    })
  }

  updatePhoneNumber(e, command){
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
      let phones = this.state.phones
      phones[index][param1][param2] = event.target.value
      this.setState({
        phones: phones
      })
    }else {
      let phones = this.state.phones
      phones[index][param1] = event.target.value
      this.setState({
        phones: phones
      })
    }
  }

  render () {
    return (
    this.state.phones && (<div className='phone-number-container info-container'>
      <div className='title-container'>
        <h4>Client Phone Numbers</h4>{!this.props.readOnly && <a href='' onClick={e => this.addPhoneNumber(e)}><i className='glyphicon glyphicon-plus-sign' /></a>}
      </div>
      {this.state.phones.map((one, index) => (
        <div key={index} className='info-row'>
          <div className='pull-left first-container'>
            <input type='text' className='' placeholder='Phone number' value={one.number} onChange={e => this.handleChange(e, index, 'number')} readOnly={this.props.readOnly} />
          </div>
          <div className='pull-left second-container'>
            <input type='text' className='' placeholder='Type' value={one.type.type} onChange={e => this.handleChange(e, index, 'type', 'type')} readOnly={this.props.readOnly} />
          </div>
          { !this.props.readOnly && <div className='pull-left third-container'>
            <a href='' onClick={e => this.updatePhoneNumber(e, 'remove', one, this.props.client_id, index)}><i className='glyphicon glyphicon-minus-sign' /></a>
            <a href='' onClick={e => this.updatePhoneNumber(e, 'update', one, this.props.client_id)}><i className='glyphicon glyphicon-ok-sign' /></a>
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
})(PhoneNumbers)

