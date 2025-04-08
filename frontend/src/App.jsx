import { Route,Routes } from 'react-router-dom'
import './App.css'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Stories from './pages/Stories'
import Games from './pages/games/Games'
import Quizzes from './pages/Quizzes'
import Dashboard from './pages/Dashboard'
import Register from './pages/Register'
import Login from './pages/Login'
import GuessNumberGame from './pages/games/GuessNumberGame'
import RockPaperScissors from './pages/games/RockPaperScissors'
import WordScramble from './pages/games/WordScramble'
import ColorMatch from './pages/games/ColorMatch'
import TicTacToe from './pages/games/TicTacToe'
import MemoryGame from './pages/games/MemoryCard'
import Hangman from './pages/games/Hangman'
import MazeGame from './pages/games/MazeGame'
import MathQuiz from './pages/games/MathQuiz'
import ShapeFinder from './pages/games/ShapeFinder'
import DrawingShapes from './pages/games/DrawingShapes'
function App() {

  return (
    <>
      <Navbar />
      <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/home' element={<Home />}/>
          <Route path='/register' element={<Register />}/>
          <Route path='/login' element={<Login />}/>
          <Route path='/stories' element={<Stories />}/>
          <Route path='/games' element={<Games />}/>
          <Route path='/games/guess-number' element={<GuessNumberGame />}/>
          <Route path='/games/rock-paper-scissors' element={<RockPaperScissors />}/>
          <Route path='/games/word-scramble' element={<WordScramble />}/>
          <Route path='/games/color-match' element={<ColorMatch />}/> 
          <Route path='/games/tic-tac-toe' element={<TicTacToe />}/> 
          <Route path='/games/memory-match' element={<MemoryGame />}/> 
          <Route path='/games/hangman' element={<Hangman />}/> 
          <Route path='/games/math-quiz' element={<MathQuiz />}/> 
          <Route path='/games/maze-runner' element={<MazeGame />}/> 
          <Route path='/games/shape-finder' element={<ShapeFinder />}/> 
          <Route path='/games/drawing-shapes' element={<DrawingShapes />}/> 

          <Route path='/quizzes' element={<Quizzes />}/>
          <Route path='/dashboard' element={<Dashboard />}/>

      </Routes>
      <Footer />
    </>
  )
}

export default App
