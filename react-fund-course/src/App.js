import React, {useState, useRef, useMemo} from 'react'; //импортируем в каждый файл в котором будет компонент
import Counter from './components/Counter';
import './styles/App.css'
import PostItem from './components/PostItem';
import PostList from './components/PostList';
import MyButton from './components/UI/button/MyButton';
import MyInput from './components/UI/input/MyInput';
import PostForm from './components/PostForm';
import MySelect from './components/UI/select/MySelect';

function App() {
  const [posts, setPosts] = useState([
    {id: 1, title: 'aa', body: 'a'},
    {id: 2, title: 'dd', body: 'b'},
    {id: 3, title: 'cc', body: 'c'}
  ]);

  const [selectedSort, setSelectedSort] = useState('')
  const [searchQuery, setSearchQuery] = useState('')

  function getSortedPosts() {
    console.log('ОТРАБОТАЛА ФУНКЦИЯ СОРТЕД ПОСТС');
    if(selectedSort) {
      return [...posts].sort((a, b) => a[selectedSort].localeCompare(b[selectedSort]))
    }
    return posts;
  }

  // useMemo() хук, который кэширует данные, например мы отсортировали наши посты, этот хук запомнил результат и сохранил в кэш его, затем просто когда нужно он достает эти данные из кэша, первым аргументом принимает коллбэк функцию, которая должна возвращать какие-либо вычисления, например отсортированный массив, либо математические вычисления, вторым аргументом массив зависимостей
  const sortedPosts = useMemo(() => {

  })

  // const [posts2, setPosts2] = useState([
  //   {id: 1, title: 'Python 1', body: 'Description'},
  //   {id: 2, title: 'Python 2', body: 'Description'},
  //   {id: 3, title: 'Python 3', body: 'Description'}
  // ]);

  // const [posts3, setPosts3] = useState([
  //   {id: 1, title: 'GoLang 1', body: 'Description'},
  //   {id: 2, title: 'GoLang 2', body: 'Description'},
  //   {id: 3, title: 'GoLang 3', body: 'Description'}
  // ]);

  // мы можем для каждого инпута создавать отдельное состояние, но что если инпутов штук 50 или больше, поэтому лучше использовать объект, и каждое отдельное поле объекта, и будет инпут
  // const [title, setTitle] = useState('')
  // const [body, setBody] = useState('')

  // собственно и сам объект
  // const [post, setPost] = useState({title: '', body: ''})

  // const bodyInputRef = useRef() //помогает напрямую получить доступ к дом элементу и делать с ним все, что угодно, name.current по сути возвращает элемент на котором произошло событие

  // есть инструмент react devtool он помогает смотреть что приходит в компоненты, какие данные лежат в пропсах и можно тестить их изменения соответственно

  // const addNewPost = (e) => {
  //   e.preventDefault();
  //   // console.log(bodyInputRef.current.value);
  //   // console.log(title, body);
  //   // const newPost = {
  //   //   id: Date.now(),
  //   //   title, //автоматически сам создаст ключ title, со значением title
  //   //   body
  //   // }
  //   setPosts([...posts, {...post, id: Date.now()}])
  //   setPost({title: '', body: ''})
  //   // console.log(newPost);
  // }

  const createPost = (newPost) => {
    setPosts([...posts, newPost])
  }

  // удаление поста, реализуем также при помощи функции обратного вызова
  // эта функция также будет принимать пост из дочернего компонента
  const removePost = (post) => {
    setPosts(posts.filter(p => p.id !== post.id))
  }

  const sortPosts = (sort) => {
    setSelectedSort(sort)
    // мы не можем напрямую изменять состояние, именно поэтому изначально мы скопировали массив, затем вызвали сорт, в которую передали функцию localeCompare()- которую чаще всего используют для сортировки слов в алфавитном порядке
  }

  return (
    <div className="App">
      {/* <Counter/> */}
      {/* <Counter/> в этом и есть прелесть компонентов, мы можем создать один компонент, а затем использовать его сколь угодно много, и причкм в каждом счетчике будет свой результат */}
      {/* <Counter/> */}

      {/* <form> */}
        {/*управляемый компонент */}
        {/* <MyInput type="text" placeholder="Название поста" value={post.title} onChange={e => setPost({...post, title: e.target.value})}/> */}
        {/* <MyInput type="text" placeholder="Описание поста" value={post.body} onChange={e => setPost({...post, body: e.target.value})}/> */}
        {/*неуправляемый/неконтролируемый компонент */}
        {/* <MyInput ref={bodyInputRef} type="text" placeholder="Описание поста" /> */}
        {/* <input ref={bodyInputRef} type="text"/>  напрямую нее рекомендуется управлять дом элементами, но все зависит от ситуации*/} 
        {/* <MyButton onClick={addNewPost}>Создать пост</MyButton> */}
      {/* </form> */}

      {/* передадим в форму в качестве пропса функцию обратого вызова, для того чтобы мы могли данные из формы перебрасывать в массив, который находится в родительском компоненте */}

      <PostForm create={createPost}/>
      {/* реализуем сортировку постов */}
      <hr style={{margin: '15px 0'}}/>
      <div>
        <MyInput 
          placeholder="Поиск..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
        />
        <MySelect
          value={selectedSort}
          onChange={sortPosts}
          defaultValue='Сортировка по...'
          options={[
            {value: 'title', name: 'По названию'},
            {value: 'body', name: 'По описанию'}
          ]}
        />
      </div>
      {/* условная отрисовка, на тот случай, если постов нет, мы просто проверяем есть ли посты, если есть то отрисовываем их при помощи компонента, если нет, просто выкидывает дефолтное значение, в данном случае h1 */}
      {posts.length
        ? 
        <PostList remove={removePost} posts={sortedPosts} title="Посты про JS"/>
        : 
        <h1 style={{textAlign: 'center', marginTop: '10%'}}>Посты не были найдены!</h1>
      }
      {/* <PostList remove={removePost} posts={posts} title="Посты про JS"/> */}
      {/* <PostList posts={posts2} title="Посты про Python"/>
      <PostList posts={posts3} title="Посты про Go"/> */}

    </div>
  );
}

export default App;

// остановился на кэшировании, время 1:17:02
