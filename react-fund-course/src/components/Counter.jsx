import React, {useState} from 'react';

const Counter = function () {
    const [count, setCount] = useState(0)

    function increment(){
        setCount(count + 1)
    }

    function decrement(){
        setCount(count - 1)
    }

    return ( //компонент по сути это функция, которая должна возвращать какой-либо jsx
        <div>
            <h1>{count}</h1>
            <button onClick={increment}>Increment</button>
            <button onClick={decrement}>Decrement</button>
        </div>
    );
};

export default Counter; //должны обязательно экспортировать компонент, иначе не сможем в последующем его импортировать

// Uncaught TypeError: invalid assignment to const 'count' - сталкнулся с такой ошибкой, проблема была в том, что пытался перезаписать константу, то есть в счетчике в состояние передавал count += 1, вместо count + 1
// хуки можно использовать только на верхнгих уровнях вложенности, то есть мы не можем их вкладывать в другие функции, циклы и тд