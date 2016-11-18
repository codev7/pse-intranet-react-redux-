import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import DataPagination from '../../../components/Pagination/pagination'
import { getClientsList } from '../Modules/module'
// import DataRow from './DataRow'

class ClientsList extends React.Component {

  static propTypes = {
    'page': PropTypes.number,
    'last_page': PropTypes.number,
    'total_items': PropTypes.number,
    'clients_list': PropTypes.array,
    'loading': PropTypes.number,
    'itemsPerPage': PropTypes.number,
    'prevSearch': PropTypes.object,
    'submitClient': PropTypes.func.isRequired,
    'getClientsList': PropTypes.func.isRequired
  };

  constructor () {
    super()

    this.onPaging = this.onPaging.bind(this)
    this.clientInfo = this.clientInfo.bind(this)

  }

  onPaging(newPage) {

    const currentPage = newPage || 1

    let prevParameters = this.props.prevSearch
    prevParameters['page'] = currentPage

    this.props.getClientsList(prevParameters)

  }

  clientInfo(e, id){
    e.preventDefault()
    this.props.submitClient(id)
  }

  render () {

    const count = this.props.last_page ? this.props.last_page : 1,
      pagination = this.props.total_items > this.props.itemsPerPage ? <div className='pagination-container'>
        <DataPagination count={count} active={this.props.page} pagingFunc={this.onPaging} />
      </div> : null,
      loading = this.props.loading == 1 ? <div className='contacts-loading loading-container'>
        <i className='fa fa-spinner fa-pulse fa-3x fa-fw' /><span className='sr-only'>Loading...</span>
      </div> : null

    let list

    if(Object.keys(this.props.clients_list).length > 0) {

      list = this.props.clients_list.map((item, index) => (
        <a href='' onClick={e => this.clientInfo(e, item.id)} key={index} className='list-group-item'>{item.name}</a>
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
  'page': state.clients.page,
  'last_page': state.clients.last_page,
  'total_items': state.clients.total_items,
  'clients_list': state.clients.clients_list,
  'loading': state.clients.loading,
  'itemsPerPage': state.clients.per_page,
  'prevSearch': state.clients.prevSearch
})

export default connect((mapStateToProps), {
  getClientsList
})(ClientsList)
