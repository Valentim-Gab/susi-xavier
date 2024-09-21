import CardService from '@/components/cards/card-service'
import React from 'react'

export default function ThirdSection() {
  const cards = [
    {
      img: '/imgs/cards/card1.png',
      title: 'Cabelos',
      description:
        'Nossos serviços de cabelos são especializados em cortes, colorações e tratamentos personalizados para realçar sua beleza natural e cuidar da saúde dos seus fios.',
    },
    {
      img: '/imgs/cards/card2.png',
      title: 'Terapia de Reiki Tibetano',
      description:
        'Promover equilíbrio energético, relaxamento profundo e bem-estar físico e emocional, utilizando técnicas ancestrais de cura e harmonização.',
    },
    {
      img: '/imgs/cards/card3.png',
      title: 'Consulta de Tarot',
      description:
        'Oferecemos leituras de Tarot conduzidas por especialistas intuitivos para orientação espiritual, autoconhecimento e insights valiosos sobre questões presentes e futuras em sua vida.',
    },
  ]

  return (
    <section className="main-container items-center px-4 py-12 gap-16 lg:py-32 lg:gap-20">
      <div className="flex flex-col items-center gap-4">
        <h3 className="text-center text-secondary dark:text-white font-secondary font-bold text-2xl lg:text-5xl">
          Nossos serviços especiais
        </h3>
        <p className="text-center leading-7 lg:leading-9 text-sm max-w-[800px] sm:text-base lg:text-xl">
          Nossos serviços são especialmente pensados para as suas necessidades,
          sejam elas estéticas ou espirituais.
        </p>
      </div>
      <div className="flex flex-wrap justify-center gap-8 2xl:gap-0 2xl:justify-between 2xl:flex-nowrap">
        {cards.map((card, index) => (
          <CardService {...card} key={index} />
        ))}
      </div>
    </section>
  )
}
