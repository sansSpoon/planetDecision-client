import React from 'react';
import ReactDOM from 'react-dom';
import './admin.css';
import AdminApp from './adminApp';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<AdminApp />, document.getElementById('root'));
registerServiceWorker();
