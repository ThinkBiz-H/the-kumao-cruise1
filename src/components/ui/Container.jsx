import { cn } from '../../utils/cn';

export default function Container({ as: Tag = 'div', className, children, ...rest }) {
  return (
    <Tag className={cn('mx-auto w-full max-w-[1160px] px-5 sm:px-7', className)} {...rest}>
      {children}
    </Tag>
  );
}
