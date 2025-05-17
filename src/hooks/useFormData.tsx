import { useState } from 'react'
import { IFormData, IFormDataReturn } from '../utils/custom'

export const useFormData = (props: IFormData): IFormDataReturn => {
  const [value, setValue] = useState<IFormData>(props)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue({ ...value, [e.target.name]: e.target.value })
  }

  return { value, setValue, handleChange }
}
