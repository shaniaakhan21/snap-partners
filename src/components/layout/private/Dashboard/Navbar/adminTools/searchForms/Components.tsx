/* eslint-disable no-use-before-define */
import React from 'react'
import SearchIcon from '@mui/icons-material/Search'

interface IButtonComponent{
    title:string,
    onClickFunction?:any,
    param?:any,
    type?: 'button' | 'reset' | 'submit'
}

interface IInputComponent
{
    label:string,
    placeholder:string,
    onChangeFunction?:any,
    param?:any,
    value?:any,
    type?:any
    disabled?:boolean
}

interface ISelectComponent {
    label:string,
    options?:Array<any>,
    name: string
    onChangeFunction?:any,
    param?:any,
    value?: any
}

interface ICheckboxComponent {
  label: string,
  options?: Array<any>,
  onChangeFunction?:any,
  param?:any,
  checkedArray?: Array<any>
}

export const InputComponent = (props:IInputComponent) => {
  const { label, placeholder, onChangeFunction, param, value, type, disabled } = props
  return (
    <div>
      <label className='search-form-label'>{label}</label>
      <div className='mr-4'>
        <input type={type || 'text'} className='search-form-input search-form-box' placeholder={`${placeholder}`} onChange={(event) => { onChangeFunction(event, param) }} value={value} disabled={disabled}/>
      </div>
    </div>
  )
}

export const TextArea = (props:IInputComponent) => {
  const { label, placeholder, onChangeFunction, param, value, type, disabled } = props
  return (
    <div>
      <label className='search-form-label'>{label}</label>
      <div className='mr-4'>
        <textarea className='search-form-input search-form-box' placeholder={placeholder} onChange={(event) => { onChangeFunction(event, param) } } value={value} disabled={disabled}></textarea>
      </div>
    </div>
  )
}

export const SelectComponent = (props:ISelectComponent) => {
  const { label, options, name, onChangeFunction, param, value } = props
  return (
    <div>
      <div>
        <label className='search-form-label'>{label}</label>
      </div>
      <div className='mr-4'>
        <select name={`${name}`} className='search-form-select search-form-box mr-4' value={value} onChange={(event) => { onChangeFunction(event, param) }}>
          <option value={''}>Select</option>
          {
            options
              ? options.map((option) => (
                <option value={option.value}>{option.name}</option>
              ))
              : <></>
          }
        </select>
      </div>
    </div>
  )
}

export const CheckboxComponent = (props:ICheckboxComponent) => {
  const { label, options, onChangeFunction, param, checkedArray } = props
  return (
    <div>
      <div>
        <label className='search-form-label'>{label}</label>
      </div>
      <div>
        {
          options.map((option) => (
            <div>
              <input type='checkbox' value= {`${option.value}`} checked={!!(checkedArray && checkedArray.includes(option.value))} onChange={(event) => { onChangeFunction(event, param) }} />
              <span>{option.name}</span>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export const ButtonComponent = (props:IButtonComponent) => {
  const { title, onClickFunction, param, type } = props
  return (
    <div>
      {onClickFunction ? <button style={{ color: '#E74426' }} type='submit' className='search-form-button button-label' onClick={(e) => { onClickFunction(e, param) }}>{title}</button> : <button style={{ backgroundColor: '#E74426' }} type='submit' className='search-form-button button-label flex flex-row items-end justify-evenly mx-2'>{title}</button>}
    </div>
  )
}
