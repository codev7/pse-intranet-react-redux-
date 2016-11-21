import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import { deleteNote, createNote } from '../../Modules/module'

class ClientNotes extends React.Component {

  static propTypes = {
    notes: PropTypes.array,
    client_id: PropTypes.number,
    readOnly: PropTypes.bool,
    deleteNote: PropTypes.func.isRequired,
    createNote: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props)

    this.state = {
      notes: props.notes
    }

    this.addNote = this.addNote.bind(this)
    this.updateNote = this.updateNote.bind(this)
  }

  componentWillReceiveProps(newProps){
    if(JSON.stringify(this.state.notes) !== JSON.stringify(newProps.notes)){
      this.setState({
        notes: newProps.notes
      })
    }
  }

  addNote(e){
    if (e){
      e.preventDefault()
    }

    const notes = this.state.notes
    notes.push({note: '', type: {type: ''}})
    console.log(notes)
    this.setState({
      notes: notes
    })
  }

  updateNote(e, command, one, clientId, index = null){
    if (e){
      e.preventDefault()
    }

    switch(command){
      case 'remove':
        let notes = this.state.notes
        notes.splice(index, 1)
        this.setState({
          notes: notes
        })

        this.props.deleteNote(clientId, one.id)

        break
      case 'update':
        console.log(one)
        if(one.id == null || one.id == ''){
          this.props.createNote(clientId, one)
        }
        break
    }
  }

  handleChange(event, index, param1, param2 = null){
    if(param2){
      let notes = this.state.notes
      notes[index][param1][param2] = event.target.value
      this.setState({
        notes: notes
      })
    }else {
      let notes = this.state.notes
      notes[index][param1] = event.target.value
      this.setState({
        notes: notes
      })
    }
  }

  render () {
    return (
      <div className='notes-container info-container'>
        <div className='title-container'>
          <h4>Client Notes</h4>{!this.props.readOnly && <a href='' onClick={e => this.addNote(e)}><i className='glyphicon glyphicon-plus-sign' /></a>}
        </div>
        {this.state.notes.map((one, index) => (
          <div key={index} className='info-row'>
            <div className='pull-left first-container'>
              <textarea type='text' className='' placeholder='Note' value={one.note} onChange={e => this.handleChange(e, index, 'note')} readOnly={this.props.readOnly} />
            </div>
            <div className='pull-left second-container'>
              <input type='text' className='' placeholder='Type' value={one.type.type} onChange={e => this.handleChange(e, index, 'type', 'type')} readOnly={this.props.readOnly} />
            </div>
            { !this.props.readOnly && <div className='pull-left third-container'>
              <a href='' onClick={e => this.updateNote(e, 'remove', one, this.props.client_id, index)}><i className='glyphicon glyphicon-minus-sign' /></a>
              <a href='' onClick={e => this.updateNote(e, 'update', one, this.props.client_id)}><i className='glyphicon glyphicon-ok-sign' /></a>
            </div> }
          </div>
        ))}
      </div>
    )
  }

}

const mapStateToProps = (state) => ({
})

export default connect((mapStateToProps), {
  deleteNote,
  createNote
})(ClientNotes)
