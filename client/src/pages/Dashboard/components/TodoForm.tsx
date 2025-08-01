import type { FormDataType } from '@/types/todosType';
import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from 'yup';
import { Button, Input } from '@/components';
import { format } from 'date-fns';
import React from 'react';



const schemaValidation: yup.ObjectSchema<FormDataType> = yup.object().shape({
  title: yup.string().required("Title is a required field").min(3, 'Minimum 3 characters.').max(20, "Max 20 characters."),
  description: yup.string().required("Description is a required field"),
  hashTag: yup.array().of(yup.string().required()).required(),
  userDate: yup.date().required("Date is required").min(new Date(2025, 0, 0), "Date must be after 01/01/1900"),
})

export const TodoForm = () => {

   const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState<Date | undefined>(undefined);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormDataType>({
    resolver: yupResolver(schemaValidation),
    mode: "onSubmit",
    defaultValues: {
      title: "",
      description: "",
      hashTag: [""],
      userDate:new Date(2025, 1 ,1),
    }
  })
  const { fields, append, remove } = useFieldArray({
    control,
    name: "hashTag"
  });

  const onSubmit = (data: FormDataType) => console.log(data)

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input type='text' placeholder='Title for task' control={control} name={'title'} />
      {errors ? errors.title?.message : ''}
      <Input type='text' placeholder='Description for task' control={control} name={'description'} />
      {errors ? errors.description?.message : ''}
    <div >
        <label>Hashtags:</label>
        {fields.map((field, index) => (
          <div key={field.id}className='flex gap-0.5'>
            <Input
              type='text'
              placeholder={`# ${index + 1}`}
              control={control}
              name={`hashTag.${index}`}
              
            />
            <Button variant={'outline'} size={'icon'} onClick={() => remove(index)}>X</Button>
          </div>
        ))}
        <Button type="button" onClick={() => append("")}>Add Hashtag</Button>
        {errors.hashTag && typeof errors.hashTag.message === 'string' && (
          <p>{errors.hashTag.message}</p>
        )}
      </div>

      {errors ? errors.hashTag?.message : ''}
      <Input type='date' placeholder='Date for task' control={control} name={'userDate'} />
      {errors ? errors.userDate?.message : ''}
      <Button type='submit' >save</Button>
    </form>
  )
}
