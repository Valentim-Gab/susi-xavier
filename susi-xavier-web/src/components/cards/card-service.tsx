import Image from 'next/image'
import React from 'react'

interface CardServiceProps {
  img: string
  title: string
  description: string
}

export default function CardService(props: CardServiceProps) {
  return (
    <div className="flex flex-col gap-4 w-full max-w-[320px] p-2 sm:px-4 lg:max-w-[460px] lg:gap-12">
      <div>
        <Image
          src={props.img}
          alt={props.title}
          width={500}
          height={500}
          className="w-full shadow-[0_4px_8px_0_rgba(0,0,0,0.5)] rounded"
        />
      </div>
      <div className='flex flex-col gap-2'>
        <h4 className="text-xl text-foreground-strong lg:text-3xl">
          {props.title}
        </h4>
        <p className="text-justify leading-7 lg:leading-9 lg:max-w-[500px] lg:text-xl">
          {props.description}
        </p>
      </div>
    </div>
  )
}
