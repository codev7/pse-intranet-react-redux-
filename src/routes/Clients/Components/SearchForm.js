import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import {getClientsList} from '../Modules/module'

class SearchForm extends React.Component {

  static propTypes = {
    getClientsList: PropTypes.func.isRequired,
    searchParameters: PropTypes.array.isRequired
  };

  constructor (props) {
    super(props)
    this.state = {
      'searchParameters': this.props.searchParameters
    }

    this.handleSelectChange = this.handleSelectChange.bind(this)
    this.textInputChange = this.textInputChange.bind(this)
    this.submitSearchForm = this.submitSearchForm.bind(this)
  }

  componentWillReceiveProps(newProps){
    console.log(newProps)
    if(newProps.searchParameters != this.state.searchParameters){
      this.setState({
        searchParameters: newProps.searchParameters
      })
    }
  }

  handleSelectChange(e, id){
    let parameters = this.state.searchParameters
    parameters[id]['key'] = e.target.value
    this.setState({
      'searchParameters' : parameters
    })
  }

  textInputChange(e, id){
    let parameters = this.state.searchParameters
    parameters[id]['value'] = e.target.value
    this.setState({
      'searchParameters' : parameters
    })
  }

  submitSearchForm(e){
    e.preventDefault()
    this.props.getClientsList(this.state.searchParameters)
  }

  render () {
    return (
      <div className='top-search-form'>
        <form className='searchForm' onSubmit={(e) => this.submitSearchForm(e)}>
          <div className='row'>
            <div className='col-sm-7'>
              <input type='text' className='search rounded' value={this.state.searchParameters[0].value} onChange={(e) => this.textInputChange(e, '0')} placeholder='Search...' />
            </div>
            <div className='col-sm-5'>
              <select className='form-control' value={this.state.searchParameters[0].key} onChange={(e) => this.handleSelectChange(e, '0')}>
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
              <input type='text' className='search rounded' value={this.state.searchParameters[1].value} onChange={(e) => this.textInputChange(e, '1')} placeholder='Search...' />
            </div>
            <div className='col-sm-5'>
              <select className='form-control' value={this.state.searchParameters[1].key} onChange={(e) => this.handleSelectChange(e, '1')}>
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
              <input type='text' className='search rounded' value={this.state.searchParameters[2].value} onChange={(e) => this.textInputChange(e, '2')} placeholder='Search...' />
            </div>
            <div className='col-sm-5'>
              <select className='form-control' value={this.state.searchParameters[2].key} onChange={(e) => this.handleSelectChange(e, '2')}>
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
            <button type='submit' className='btn btn-info btn-sm'>Search</button>
          </div>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  searchParameters: state.clients.searchParameters
})

export default connect((mapStateToProps), {
  getClientsList
})(SearchForm)
