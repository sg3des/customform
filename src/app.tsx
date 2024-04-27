import { Component } from 'react'
import {
  Button,
  Checkbox,
  Container,
  Content,
  Divider,
  Footer,
  Form,
  Input,
  InputNumber,
  SelectPicker,
} from 'rsuite'

import { Param } from 'interfaces'
import './app.less'

interface Props {}
interface State {
  newField: {
    name: string
    type: string
    label: string
  }

  fields: Param[]
}

const fieldTypes = [
  { label: 'string', value: 'string' },
  { label: 'number', value: 'number' },
  { label: 'boolean', value: 'checkbox' },
  { label: 'select', value: 'select' },
  { label: 'date', value: 'date' },
]

export default class CustomForm extends Component<Props, State> {
  state = {
    newField: { name: '', type: '', label: '' },
    fields: [] as Param[],
  } as State

  //
  // handlers
  //

  handleAddField = () => {
    let { newField, fields } = this.state

    if (!newField.name || !newField.type) {
      // alert error
      return
    }

    // add new field to the fields array
    fields.push(newField as Param)

    this.setState({ newField: { name: '', type: '', label: '' } })
  }

  handleChandleField = (key: string, val: any) => {
    const { newField } = this.state
    // assign value to the new field
    Object.assign(newField, { [key]: val })

    this.setState({ newField })
  }

  handleChangeParam = (p: Param, val: any) => {
    p.value = val
  }

  //
  // render
  //

  render() {
    return (
      <Container>
        <Container>
          <Content className='content'>
            {this.renderForm()}
            <Divider />
            {this.renderFooter()}
          </Content>
        </Container>
      </Container>
    )
  }

  renderForm() {
    const { fields } = this.state

    return (
      <Form className='customform'>
        <h4>Form</h4>
        {fields.map(this.renderField)}
      </Form>
    )
  }

  renderField = (p: Param) => {
    switch (p.type) {
      case 'string':
        return this.renderInput(p)
      case 'number':
        return this.renderNumber(p)
      case 'checkbox':
        return this.renderCheckbox(p)
    }
  }

  renderInput = (p: Param) => {
    return (
      <div key={p.name}>
        <label>{p.label || p.name}</label>
        <Input
          value={p.value}
          name={p.name}
          onChange={(v) => this.handleChangeParam(p, v)}
        />
      </div>
    )
  }

  renderNumber = (p: Param) => {
    return (
      <div key={p.name}>
        <label>{p.label || p.name}</label>
        <InputNumber
          value={p.value}
          name={p.name}
          onChange={(v) => this.handleChangeParam(p, v)}
        />
      </div>
    )
  }

  renderCheckbox = (p: Param) => {
    return (
      <div key={p.name}>
        <label>{p.label || p.name}</label>
        <Checkbox
          checked={p.value}
          name={p.name}
          onChange={(v) => this.handleChangeParam(p, v)}
        />
      </div>
    )
  }

  renderFooter() {
    const { newField } = this.state

    return (
      <Footer>
        <div className='form-row'>
          <label>Name</label>
          <Input
            placeholder='name...'
            value={newField.name}
            onChange={(v) => this.handleChandleField('name', v)}
          />
        </div>

        <div className='form-row'>
          <label>Label</label>
          <Input
            placeholder='label...'
            value={newField.label}
            onChange={(v) => this.handleChandleField('label', v)}
          />
        </div>

        <div className='form-row'>
          <label>Type</label>
          <SelectPicker
            data={fieldTypes}
            value={newField.type}
            onSelect={(v) => {
              this.handleChandleField('type', v)
            }}
            block
          />
        </div>

        <Button onClick={this.handleAddField}>Add</Button>
      </Footer>
    )
  }
}
