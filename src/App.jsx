import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './components/Login'
import Body from './components/Body'
import Profile from './components/Profile'
import TasksPage from './components/tasks/TasksPage'
import { Provider } from 'react-redux'
import appStore from './utils/appStore'
import Categories from './components/Categories'
import Home from './components/Home'

function App() {

  return (
    <>
      <Provider store={appStore}>
      <BrowserRouter basename="/">
      <Routes>
      <Route path="/" element={<Body />}>
        <Route path="/" element={<Home />} />
        <Route path="/tasks" element={<TasksPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/categories" element={<Categories />} />
      </Route>
      </Routes>
      </BrowserRouter>
      </Provider>
    </>
  )
}

export default App
