import React from 'react';
import { connect } from 'react-redux';
import { fetchStream, editStream } from '../../actions'
import StreamForm from './StreamForm'

class StreamEdit extends React.Component {
  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id)
  }

  onSubmit = formValues => {
    this.props.editStream(this.props.match.params.id, formValues)
  }

  render() {
    if(!this.props.stream) {
      return <div>Loading...</div>
    }

    const { title, description } = this.props.stream

    return (
      <div>
        <h3>Edit a Stream</h3>
        {/* initialValue is a redux specific property used to pass initial values of the form to child component */}
        <StreamForm
          // title and description are the field names in the Field of StreamForm
          // initialValues={{ title: 'title_value', description: 'description_value' }}
          initialValues={{ title, description }}
          onSubmit={this.onSubmit}
        />
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return { stream: state.streams[ownProps.match.params.id] }
}

export default connect(mapStateToProps, { fetchStream, editStream })(StreamEdit);
