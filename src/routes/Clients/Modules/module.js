import { APIConstants } from '../../../components/Api/APIConstants'
import request from 'superagent-bluebird-promise'

export const initialState = {
  loading: 0,
  loading_client: 0,
  clients_list: [],
  client_info: {},
  total_items: 0,
  page: 1,
  last_page: 1,
  per_page: 25,
  prevSearch: {},
  formData: {},
  showModalFlag: false,
  newOrEdit: 'new'
}

export const ACTION_HANDLERS = {
  'LOADING_CLIENTS': (state, action) => {
    return ({
      ...state,
      'loading': 1,
      'prevSearch': action.parameters
    })
  },
  'LOADING_CLIENT_INFO': (state, action) => {
    return ({
      ...state,
      'loading_client': 1
    })
  },
  'GET_CLIENT_INFO_SUCCESS': (state, action) => {
    return ({
      ...state,
      'client_info': action.client_info,
      'loading_client': 0
    })
  },
  'GET_CLIENTS_SUCCESS': (state, action) => {
    return ({
      ...state,
      'clients_list': action.clients_list,
      'loading': 0,
      'total_items': action.total_items,
      'page': action.page,
      'last_page': action.last_page
    })
  },
  'NEW_CLIENT_LOADING': (state, action) => {
    return ({
      ...state,
      'formData': {'loading': 1}
    })
  },
  'NEW_CLIENT_SUCCESS': (state, action) => {
    return ({
      ...state,
      'client_info': action.client_info,
      'formData': {'loading': 0},
      'showModalFlag': false
    })
  },
  'NEW_CLIENT_ERROR': (state, action) => {
    return ({
      ...state,
      'formData': {'errorMessage': action.errorMessage, 'loading': 0},
      'client_info': {}
    })
  },
  'SHOW_MODAL': (state, action) => {
    return ({
      ...state,
      'showModalFlag': true,
      'newOrEdit': action.newOrEdit
    })
  },
  'CLOSE_MODAL': (state, action) => {
    return ({
      ...state,
      'showModalFlag': false,
      'formData': {}
    })
  }
}

export const getClientsList = (param) => {
  return (dispatch) => {
    const accessToken = localStorage.accessToken
    let parameters = param

    if (!parameters['page']) {
      parameters['page'] = 1
    }
    if (!parameters['per_page']) {
      parameters['per_page'] = 25
    }
    dispatch({
      'type': 'LOADING_CLIENTS',
      'parameters': parameters
    })

    // console.log(Object.assign({}, parameters, {'access_token': accessToken}))

    request.post(`${APIConstants.API_SERVER_NAME}clients_list`)
      .send(JSON.stringify(Object.assign({}, parameters, {
        'access_token': accessToken,
        'minimal': 1
      })))
      .set('Content-Type', 'application/json')
      .then(function (response) {

        const data = JSON.parse(response.text)

        dispatch({
          'type': 'GET_CLIENTS_SUCCESS',
          'clients_list': data.data,
          'total_items': data.paginator.total_items,
          'page': data.paginator.current_page,
          'last_page': data.paginator.last_page
        })

      }, function (err) {
        console.log(err)
      })
  }
}

// editClient(data) {
//   this.setState({
//     showModal: true,
//     newOrEdit: 'edit',
//     formData: data
//   })
// }

export const getClientInfo = (id) => {
  return (dispatch) => {
    const accessToken = localStorage.accessToken

    dispatch({
      type: 'LOADING_CLIENT_INFO'
    })

    request.post(`${APIConstants.API_SERVER_NAME}client_info`)
      .send(JSON.stringify({'access_token': accessToken, 'id': id}))
      .set('Content-Type', 'application/json')
      .then(function (response) {

        const data = JSON.parse(response.text)
        console.log(data)

        if (data.hasOwnProperty('data')) {
          dispatch({
            'type': 'GET_CLIENT_INFO_SUCCESS',
            'client_info': data.data
          })
        }

        const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
        if (width < 992) {
          setTimeout(function () {
            const scrollContent = document.getElementById('scroll-content')
            scrollContent.scrollTop = parseInt(document.getElementById('client_info_section').getBoundingClientRect().top)
          }, 10)
        }

      }, function (err) {
        console.log(err)
      })
  }
}

export const createClient = (data) => {
  return (dispatch) => {
    const accessToken = localStorage.accessToken

    dispatch({
      type: 'NEW_CLIENT_LOADING'
    })

    request.post(`${APIConstants.API_SERVER_NAME}clients_create`)
      .send(JSON.stringify({'access_token': accessToken, 'name': data}))
      .set('Content-Type', 'application/json')
      .then(function (response) {

        const data = JSON.parse(response.text)

        console.log(data)

        if ((data.status_code == 201) || (data.status_code == 200)) {

          dispatch({
            type: 'NEW_CLIENT_SUCCESS',
            client_info: data.data
          })

        } else {
          let message = ''
          if (data.error) {
            message = data.error[0].message
          }

          dispatch({
            type: 'NEW_CLIENT_ERROR',
            errorMessage: message
          })

        }

      }, function (err) {
        console.log(err)
      })
  }
}

export const closeModalFunc = () => {
  return (dispatch) => {
    dispatch({
      type: 'CLOSE_MODAL'
    })
  }
}

export const showModalFunc = (newOrEdit) => {
  return (dispatch) => {
    dispatch({
      type: 'SHOW_MODAL',
      newOrEdit: newOrEdit
    })
  }
}
