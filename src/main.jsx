import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import store from './store.js'
import { Provider } from 'react-redux'

// store.dispatch({type:'account/deposit', payload: 250});
// console.log(store.getState());

createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <App />
    </Provider>
)
