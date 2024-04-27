export interface Param {
  name: string
  type: string
  label: string
  value: any

  opt?: ParamOpt
}

export interface ParamOpt {
  options: string[]
  min: number
  max: number
  step: number
}
