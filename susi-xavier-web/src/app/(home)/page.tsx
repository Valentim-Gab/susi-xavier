import FirstSection from './first-section'
import SecondSection from './second-section'
import ThirdSection from './third-section'

export default function Home() {
  return (
    <main className="flex flex-col items-center overflow-x-hidden">
      <FirstSection />
      <SecondSection />
      <ThirdSection />
    </main>
  )
}
