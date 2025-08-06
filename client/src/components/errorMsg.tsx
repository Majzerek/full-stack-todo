import { cn } from '@/lib/utils'
import type { FieldError, Merge } from 'react-hook-form'

type ErrorsMsgTypee = {
  message: string | undefined,
  bool: FieldError | Merge<FieldError, (FieldError | undefined)[]> | undefined,
  className?: string,
} & React.ComponentProps<'small'>;

export const ErrorMsg = ({bool,message,className, ...props}:ErrorsMsgTypee) => {
  return (
    <>
    {bool && <small {...props} className={cn('text-destructive text-[.9rem] h-fit',className)} >{message}</small>  }
    </>
  )
};
