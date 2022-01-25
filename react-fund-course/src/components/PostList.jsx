import React from 'react';
import PostItem from './PostItem'

const PostList = ({posts, title, remove}) => {
    return (
        <div>
            <h1 style={{textAlign: 'center'}}>{title}</h1>
            {posts.map((post, index) => 
                <PostItem remove={remove} number={index + 1} post={post} key={post.id}/> //ключи должны быть статичными(неизменнными) и уникальными, они помогают реакту быстрее находить элементы из массива и перерисовывать только нужное, индекс использовать не рекомендуется, так как элементы могут удалиться из исходного массива, и индексы соответственно изменятся
            )}
        </div>
    );
};

export default PostList;