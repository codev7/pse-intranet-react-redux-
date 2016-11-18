import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link, IndexLink } from 'react-router'

import DataPagination from '../../../components/Pagination/pagination'
import { getClientsList } from '../Modules/module'
// import DataRow from './DataRow'

class ClientsList extends React.Component {

  static propTypes = {
    'pagination': PropTypes.object,
    'clients_list': PropTypes.array,
    'loading': PropTypes.bool,
    'searchParameters': PropTypes.array,
    'getClientsList': PropTypes.func.isRequired
  };

  constructor () {
    super()

    this.onPaging = this.onPaging.bind(this)

  }

  onPaging(newPage) {

    const currentPage = newPage || 1

    let pagination = this.props.pagination
    pagination['page'] = currentPage

    this.props.getClientsList(this.props.searchParameters, pagination)
  }

  render () {
    const count = this.props.pagination.last_page ? this.props.pagination.last_page : 1,
      pagination = this.props.pagination.total_items > this.props.pagination.per_page ? <div className='pagination-container'>
        <DataPagination count={count} active={this.props.pagination.page} pagingFunc={this.onPaging} />
      </div> : null,
      loading = this.props.loading ? <div className='contacts-loading loading-container'>
        <i className='fa fa-spinner fa-pulse fa-3x fa-fw' /><span className='sr-only'>Loading...</span>
      </div> : null

    let list

    if(Object.keys(this.props.clients_list).length > 0) {

      list = this.props.clients_list.map((item, index) => (
        <Link to={'/clients/' + item.id} key={index} className='list-group-item'>{item.name}</Link>
      ))
    }

    return (
      <div className='clients-list-container'>
        <h3 className='text-center'>Results</h3>
        { pagination }
        {Object.keys(this.props.clients_list).length > 0 &&
        <div className='clients-list-body panel panel-default'>
          <div className='panel-heading'>Client Name</div>
          <div className='panel-body client-name-list'>
            <div className='list-group'>
              {list}
            </div>
          </div>
        </div>
        }
        { loading }
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  'pagination': state.clients.pagination,
  'clients_list': state.clients.clients_list,
  'loading': state.clients.loading,
  'searchParameters': state.clients.searchParameters
})

export default connect((mapStateToProps), {
  getClientsList
})(ClientsList)
