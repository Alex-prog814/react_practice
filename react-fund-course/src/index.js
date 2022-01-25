import React from 'react'; //импортируем яжро реакта
import ReactDOM from 'react-dom'; //импортируем дом для того, чтобы вмонтировать наш компонент
import App from './App';

ReactDOM.render( //рендер(отрисовка)- первым аргументом принимает компонент, который нужно отрисовать, вторым блок в котором нужно отрисовать
    <App/>,
  document.getElementById('root')
);

