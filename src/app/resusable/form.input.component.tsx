import { Button, Field, Input, Label } from '@headlessui/react'
import clsx from 'clsx'

interface FormInputBoxProps {
    labelText:string
}

const FormInputBox = ({labelText}: FormInputBoxProps) => {
  return (
    <div className='w-[400] mt-2 mb-2'>
        <Field>
          <Label className="labelText">{labelText}</Label>
          <Input
            className={clsx(
              'mt-1 block w-full rounded-lg border border-blue-500 rpx-3 py-1.5 text-md/6 text-blue-500')}
          />
          <button className="btn">Click Me</button>
        </Field>
      
    </div>
  )
}


export default FormInputBox
