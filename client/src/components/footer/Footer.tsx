import { CustomLink } from "../customLink"

export const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <div className='fixed flex w-full bottom-0 justify-center items-center z-5 h-10 border-t border-t-accent-foreground backdrop-blur-xl'>
      <p className="text-md">&copy;
        <span className="ml-2">Create By <CustomLink to={'https://github.com/Majzerek'} className='text-red-400 transition-colors hover:text-blue-500'>Majzerek</CustomLink> {year}</span>
      </p>
    </div>
  )
}
