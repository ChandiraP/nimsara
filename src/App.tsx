import { motion, useReducedMotion } from 'framer-motion'
import ProfileCard from './components/ProfileCard'

function App() {
  const reduceMotion = useReducedMotion()

  return (
    <main className="site-shell">
      <div className="ambient-light ambient-light-red" aria-hidden="true" />
      <div className="ambient-light ambient-light-silver" aria-hidden="true" />
      <div className="ambient-light ambient-light-low" aria-hidden="true" />
      <motion.div
        className="page-content"
        initial={reduceMotion ? false : { opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      >
        <ProfileCard />
      </motion.div>
    </main>
  )
}

export default App
