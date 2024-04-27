import { Component } from 'react'
import {
  Button,
  Checkbox,
  Container,
  Content,
  DatePicker,
  Divider,
  Footer,
  Form,
  Input,
  InputNumber,
  Message,
  SelectPicker,
  Stack,
  TagInput,
} from 'rsuite'

import { Param, ParamOpt } from 'interfaces'
import './app.less'

interface Props {}
interface State {
  newField: Param

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

    if (!newField.name || !newField.type) return

    console.log(newField)

    // add new field to the fields array
    fields.push(newField as Param)

    this.setState({ newField: { name: '', type: '', label: '' } as Param })
  }

  handleChangeField = (key: string, val: any) => {
    const { newField } = this.state
    // assign value to the new field
    Object.assign(newField, { [key]: val })

    this.setState({ newField })
  }

  handleChangeFieldOpt = (key: string, val: any) => {
    const { newField } = this.state
    if (!newField.opt) newField.opt = {} as ParamOpt

    Object.assign(newField.opt, { [key]: val })

    this.setState({ newField })
  }

  handleChangeParam = (p: Param, val: any) => {
    p.value = val
  }

  handleSubmit = () => {
    const { fields } = this.state

    console.log(fields)
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
        {fields.map((p) => (
          <div key={p.name} className='form-row'>
            <label>{p.label || p.name}</label>
            {this.renderField(p)}
          </div>
        ))}
        {fields.length > 0 && (
          <Stack justifyContent='center'>
            <Button type='submit' onClick={this.handleSubmit}>
              Submit
            </Button>
          </Stack>
        )}
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
      case 'date':
        return this.renderDate(p)
      case 'select':
        return this.renderSelect(p)
      default:
        return <Message type='error'>{p.type} is unsupported field</Message>
    }
  }

  renderInput = (p: Param) => {
    return (
      <Input
        name={p.name}
        value={p.value}
        onChange={(v) => this.handleChangeParam(p, v)}
      />
    )
  }

  renderNumber = (p: Param) => {
    return (
      <InputNumber
        name={p.name}
        value={p.value}
        onChange={(v) => this.handleChangeParam(p, v)}
      />
    )
  }

  renderCheckbox = (p: Param) => {
    return (
      <Checkbox
        name={p.name}
        checked={p.value}
        onChange={(v) => this.handleChangeParam(p, v)}
      />
    )
  }

  renderDate = (p: Param) => {
    return (
      <DatePicker
        name={p.name}
        value={p.value}
        onChange={(v) => this.handleChangeParam(p, v)}
        oneTap
        block
      />
    )
  }

  renderSelect = (p: Param) => {
    return (
      <SelectPicker
        name={p.name}
        data={p.opt ? p.opt.options.map((s) => ({ label: s, value: s })) : []}
        block
      />
    )
  }

  renderFooter() {
    const { newField } = this.state

    return (
      <Footer>
        <div className='form-row'>
          <label>Name *</label>
          <Input
            placeholder='name...'
            value={newField.name}
            onChange={(v) => this.handleChangeField('name', v)}
          />
        </div>

        <div className='form-row'>
          <label>Label</label>
          <Input
            placeholder='label...'
            value={newField.label}
            onChange={(v) => this.handleChangeField('label', v)}
          />
        </div>

        <div className='form-row'>
          <label>Type *</label>
          <SelectPicker
            data={fieldTypes}
            value={newField.type}
            onSelect={(v) => {
              this.handleChangeField('type', v)
            }}
            block
          />
        </div>

        {newField.type === 'select' && (
          <div className='form-row'>
            <label>Options</label>
            <TagInput
              value={newField.opt?.options || []}
              onChange={(v) => this.handleChangeFieldOpt('options', v)}
              block
            />
          </div>
        )}

        <Stack justifyContent='center'>
          <Button
            onClick={this.handleAddField}
            disabled={!newField.name || !newField.type}>
            Add
          </Button>
        </Stack>
      </Footer>
    )
  }
}
