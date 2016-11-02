import React, { PropTypes } from 'react'

class DataRow extends React.Component {

  static propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    editClient: PropTypes.func
  };

  constructor() {
    super()

    this.editClient = this.editClient.bind(this)
  }

  editClient(e, id){
    e.preventDefault()
    this.props.editClient(id)
  }

  render () {
    return (
      <tr>
        <td>{this.props.id}</td>
        <td>{this.props.name}</td>
        <td><a href='#' onClick={(e) => this.editClient(e, this.props.id)}><i className='glyphicon glyphicon-edit' /></a></td>
      </tr>
    )
  }
}

export default DataRow
