import React from 'react';
import 'wicg-inert';
import ReactDOM from 'react-dom/client';
import './index.css';
import { App } from './modules/App';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(<App />);
