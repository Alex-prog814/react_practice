import {React, useState} from 'react';
import MyInput from './UI/input/MyInput';
import MyButton from './UI/button/MyButton';

// props можно передавать только от родителя к ребенку, нельзя в обратном порядке

const PostForm = ({create}) => {

    const [post, setPost] = useState({title: '', body: ''})

    const addNewPost = (e) => {
        e.preventDefault()
        const newPost = {
            ...post, id: Date.now()
        }
        create(newPost) //функция обратного вызова, то есть в родителе создали функцию, затем эту функцию передали дочернему элементу, затем в дочернем ее вызвали и передали что нужно
        setPost({title: '', body: ''})
    }


    return (
        <form>
            <MyInput type="text" placeholder="Название поста" value={post.title} onChange={e => setPost({...post, title: e.target.value})}/>
            <MyInput type="text" placeholder="Описание поста" value={post.body} onChange={e => setPost({...post, body: e.target.value})}/>
            <MyButton onClick={addNewPost}>Создать пост</MyButton>
        </form>
    );
};

export default PostForm;
