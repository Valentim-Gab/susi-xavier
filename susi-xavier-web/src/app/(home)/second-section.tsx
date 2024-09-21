import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React from 'react'

export default function SecondSection() {
  return (
    <section className="w-full flex justify-center bg-background-secondary px-4 py-12 lg:px-8 lg:py-32">
      <div className="main-container items-center gap-8 gap-x-2 sm:flex-row sm:justify-between lg:gap-x-8 2xl:gap-x-32">
        <div className="relative w-fit px-6 flex justify-center">
          <i className="icon-[streamline--cards-solid] text-4xl text-primary absolute left-0 -top-4 sm:text-5xl sm:-top-6 lg:text-7xl lg:-top-10 lg:-left-4 2xl:text-9xl 2xl:-top-16 2xl:-left-10"></i>
          <i className="icon-[f7--scissors] text-4xl text-primary absolute right-2 -bottom-4 z-20 sm:text-5xl sm:-bottom-6 lg:text-7xl lg:-bottom-8 lg:-right-2 2xl:text-9xl 2xl:-bottom-14 2xl:-right-8"></i>
          <Image
            src={'/imgs/cabelo.png'}
            alt="Serviço"
            width={1000}
            height={1000}
            quality={100}
            className="w-full h-fit z-10 sm:min-w-[280px] lg:min-w-[400px] 2xl:min-w-[580px] rounded"
          />
        </div>
        <div className="flex flex-col gap-4 px-4 lg:gap-8 sm:px-0">
          <h2 className="text-secondary dark:text-white font-secondary font-bold text-2xl lg:text-5xl">
            Por que nossos clientes nos escolhem
          </h2>
          <p className="text-justify leading-7 lg:leading-9 lg:max-w-[500px] lg:text-xl">
            Nossos clientes nos escolhem porque oferecemos um espaço onde a
            beleza exterior e interior se conectam, combinando serviços de alta
            qualidade.
          </p>
          <Button className="text-white font-medium rounded-full sm:w-fit sm:px-8 lg:px-8 lg:h-12 lg:text-xl">
            Ler mais
          </Button>
        </div>
      </div>
    </section>
  )
}
