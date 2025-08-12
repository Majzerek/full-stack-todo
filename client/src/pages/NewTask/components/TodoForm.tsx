import type { FormDataType } from '@/types/todosType';
import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from 'yup';
import { Button, DataPicker, ErrorMsg, Input, Label, Textarea } from '@/components';




const schemaValidation: yup.ObjectSchema<FormDataType> = yup.object().shape({

  title: yup.string().required("Title is a required field").min(3, 'Minimum 3 characters.').max(20, "Max 20 characters."),

  description: yup.string().required("Description is a required field").min(10, "Minimum 10 characters").max(120, "Max 120 characters."),

  hashTag: yup.array().of(yup.string().required()).required().min(3, "Mnimum 1 hash.").max(5, "Max hash 5"),

  userDate: yup.date().required("Date is required").min(new Date(2025, 0, 0), "Date must be after 01/01/2025"),
});

export const TodoForm = () => {

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
      hashTag: [''],
      userDate: undefined,
    }
  })
  const { fields, append, remove } = useFieldArray<FormDataType>({
    control,
    name: 'hashTag',
  });

  const onSubmit = (data: FormDataType) => {
    console.log(data)
    reset()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col justify-center mb-5 gap-4 transition-all w-100 md:w-180 lg:w-280 p-5 bg-secondary rounded-xl shadow-md shadow-sidebar-primary '>

      <Label htmlFor='todoTitle'>Title:</Label>
      <Input title='Task Title' type='text' id='todoTitle' placeholder='Title for task' control={control} name={'title'} />
      <ErrorMsg bool={errors.title} message={errors.title?.message} />


      <Label htmlFor='todoDescription'>Description:</Label>
      <Textarea title='Task Description' placeholder='Description for task' control={control} name={'description'} maxLength={121} className='resize-none overflow-auto h-25 px-2' />
      <ErrorMsg bool={errors.description} message={errors.description?.message} />

      <div className='flex flex-col gap-1'>
        <label htmlFor='hashTag'>Hashtags:</label>
        {fields.map((field, index) => (
          <div key={field.id} className='flex gap-1.5 items-center'>
            <Input
              title={`hashTag.${index +1}`}
              type='text'
              placeholder={`# ${index + 1}`}
              control={control}
              name={`hashTag.${index}`}
            />
            <Button variant={'destructive'} size={'icon'} onClick={() => remove(index)}>X</Button>
          </div>
        ))}
      </div>
      <ErrorMsg bool={errors.hashTag} message={errors.hashTag?.message} />

      <Button className='w-50 self-center' type="button" onClick={() => append("")}>Add Hashtag</Button>

      <Label htmlFor='userDate'>Time to perform:</Label>
      <DataPicker  control={control} name={'userDate'} />
      <ErrorMsg bool={errors.userDate} message={errors.userDate?.message} />


      <Button className='w-50 self-center' type='submit' >save</Button>
    </form>
  )
}
