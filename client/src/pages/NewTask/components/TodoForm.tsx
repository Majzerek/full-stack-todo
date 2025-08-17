import type { FormDataType } from "@/types/todosType";
import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  Button,
  DataPicker,
  ErrorMsg,
  Input,
  Label,
  Loader,
  Textarea,
  Wrapper,
} from "@/components";
import { getUserId } from "@/services/authServices";
import { useState } from "react";
import { useAlertContext } from "@/context";
import axios from "axios";

const schemaValidation: yup.ObjectSchema<FormDataType> = yup.object().shape({
  title: yup
    .string()
    .required("Title is a required field")
    .min(3, "Minimum 3 characters.")
    .max(20, "Max 20 characters."),

  description: yup
    .string()
    .required("Description is a required field")
    .min(10, "Minimum 10 characters")
    .max(400, "Max 400 characters."),

  hashTag: yup
    .array()
    .of(
      yup
        .string()
        .required()
        .min(1, "Min 1 character.")
        .max(15, "Max 15 characters."),
    )
    .required("HashTag is required field")
    .min(1, "Mnimum 1 hash.")
    .max(5, "Max hash 5"),

  userDate: yup
    .date()
    .required("Date is required")
    .min(new Date(), "Date must be after today"),
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
      hashTag: [""],
      userDate: undefined,
    },
  });
  const { fields, append, remove } = useFieldArray<FormDataType>({
    control,
    name: "hashTag",
  });
  const [loading, setLoading] = useState(false);
  const { showErrorAlert, showSuccessAlert } = useAlertContext();

  const onSubmit = async (data: FormDataType) => {
    const userId = getUserId();
    const { userDate, ...rest } = data;
    const Values = {
      ...rest,
      userDate: userDate?.toISOString(),
      createAt: new Date().toISOString(),
      allowedUser: userId,
    };

    setLoading(true);
    await axios
      .post("http://localhost:4040/task/register-task", Values)
      .then((res) => {
        setLoading(false);
        showSuccessAlert(res.data.message);
        reset();
      })
      .catch((err) => {
        setLoading(false);
        showErrorAlert(err.response.data);
        console.error(err);
      });
  };
  if (loading) {
    return (
      <Wrapper>
        <Loader />
      </Wrapper>
    );
  }
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col justify-center mb-5 gap-4 transition-all w-100 md:w-180 lg:w-280 p-5 bg-secondary rounded-xl shadow-md shadow-sidebar-primary "
    >
      <Label htmlFor="todoTitle">Title:</Label>
      <Input
        title="Task Title"
        type="text"
        id="todoTitle"
        placeholder="Title for task"
        control={control}
        name={"title"}
      />
      <ErrorMsg bool={errors.title} message={errors.title?.message} />

      <Label htmlFor="todoDescription">Description:</Label>
      <Textarea
        title="Task Description"
        placeholder="Description for task"
        control={control}
        name={"description"}
        maxLength={401}
        className="resize-none overflow-auto h-25 px-2"
      />
      <ErrorMsg
        bool={errors.description}
        message={errors.description?.message}
      />

      <div className="flex flex-col gap-1">
        <label htmlFor="hashTag">Hashtags:</label>
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="flex gap-1.5 justify-center items-center"
          >
            <div className="w-full items-center">
              <Input
                title={`hashTag.${index + 1}`}
                type="text"
                id={field.id}
                placeholder={`# ${index + 1}`}
                control={control}
                name={`hashTag.${index}`}
              />
              {errors.hashTag?.[index] && (
                <ErrorMsg
                  bool={errors.hashTag}
                  message={errors.hashTag[index]?.message}
                />
              )}
            </div>
            <Button
              variant={"destructive"}
              className="rounded-full h-10 w-10"
              size={"icon"}
              onClick={() => remove(index)}
            >
              X
            </Button>
          </div>
        ))}
      </div>
      <ErrorMsg bool={errors.hashTag} message={errors.hashTag?.message} />
      <Button
        className="w-50 self-center "
        variant={"outline"}
        type="button"
        onClick={() => append("")}
      >
        Add Hashtag
      </Button>

      <Label htmlFor="userDate">Time to perform:</Label>
      <DataPicker control={control} name={"userDate"} />
      <ErrorMsg bool={errors.userDate} message={errors.userDate?.message} />

      <Button
        disabled={Boolean(Object.keys(errors).length)}
        className="w-50 self-center"
        type="submit"
      >
        Add task
      </Button>
    </form>
  );
};
