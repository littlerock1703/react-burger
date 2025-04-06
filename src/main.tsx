import React from 'react'
import { Provider } from 'react-redux'
import { DndProvider } from 'react-dnd'
import App from './components/app/app.tsx'
import ReactDOM from 'react-dom/client'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { store } from './services/reducers/index.js'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <DndProvider backend={HTML5Backend}>
        <App />
      </DndProvider>
    </Provider>
  </React.StrictMode>
)
