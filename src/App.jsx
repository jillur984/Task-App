
import Header from './Header'
import Footer from './Footer'
import HeroSection from './HeroSection'
import TaskBoard from './task/TaskBoard'

const App = () => {
  return (
    <>
    <Header/>
    <div className='flex flex-col justify-center items-center'>
    <HeroSection/>
    <TaskBoard/>
    </div>
    <Footer/>
    </>
  )
}

export default App