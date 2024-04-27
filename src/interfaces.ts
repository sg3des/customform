export interface Param {
  name: string
  type: string
  label: string
  value: any

  custom: ParamOpt
}

export interface ParamOpt {
  options: ParamSelectOption[]
  min: number
  max: number
  step: number
}

export interface ParamSelectOption {
  name: string
  value: any
}
