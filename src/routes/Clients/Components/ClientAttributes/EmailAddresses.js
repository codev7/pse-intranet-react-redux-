import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

class EmailAddresses extends React.Component {

  static propTypes = {
    emails: PropTypes.array,
    client_id: PropTypes.number,
    readOnly: PropTypes.bool
  };

  constructor(props) {
    super(props)

    this.state = {
      emails: props.emails
    }

    this.addEmail = this.addEmail.bind(this)
    this.updateEmail = this.updateEmail.bind(this)
  }

  componentWillReceiveProps(newProps){
    if(JSON.stringify(this.state.emails) !== JSON.stringify(newProps.emails)){
      this.setState({
        emails: newProps.emails
      })
    }
  }

  addEmail(e){
    if (e){
      e.preventDefault()
    }

    const emails = this.state.emails
    emails.push({emails: '', type: {type: ''}})
    console.log(emails)
    this.setState({
      emails: emails
    })
  }

  updateEmail(e, command){
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
      let emails = this.state.emails
      emails[index][param1][param2] = event.target.value
      this.setState({
        emails: emails
      })
    }else {
      let emails = this.state.emails
      emails[index][param1] = event.target.emails
      this.setState({
        emails: emails
      })
    }
  }

  render () {
    return (
    this.state.emails && (<div className='email-addresses-container info-container'>
      <div className='title-container'>
        <h4>Client Email Addresses</h4>{!this.props.readOnly && <a href='' onClick={e => this.addEmail(e)}><i className='glyphicon glyphicon-plus-sign' /></a>}
      </div>
      {this.state.emails.map((one, index) => (
        <div key={index} className='info-row'>
          <div className='pull-left first-container'>
            <input type='text' className='' placeholder='Email' value={one.email} onChange={e => this.handleChange(e, index, 'email')} readOnly={this.props.readOnly} />
          </div>
          <div className='pull-left second-container'>
            <input type='text' className='' placeholder='Type' value={one.type.type} onChange={e => this.handleChange(e, index, 'type', 'type')} readOnly={this.props.readOnly} />
          </div>
          { !this.props.readOnly && <div className='pull-left third-container'>
            <a href='' onClick={e => this.updateEmail(e, 'remove')}><i className='glyphicon glyphicon-minus-sign' /></a>
            <a href='' onClick={e => this.updateEmail(e, 'update')}><i className='glyphicon glyphicon-ok-sign' /></a>
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
})(EmailAddresses)
