import React, {useState, useRef, useMemo, useEffect} from 'react'; //импортируем в каждый файл в котором будет компонент
import Counter from './components/Counter';
import './styles/App.css'
import PostItem from './components/PostItem';
import PostList from './components/PostList';
import MyButton from './components/UI/button/MyButton';
import MyInput from './components/UI/input/MyInput';
import PostForm from './components/PostForm';
import MySelect from './components/UI/select/MySelect';
import PostFilter from './components/PostFilter';
import MyModal from './components/UI/MyModal/MyModal';
import {usePosts} from './hooks/usePosts.js'
import axios from 'axios';
import PostService from './API/PostService';
import Loader from './components/UI/Loader/Loader';
import { useFetching } from './hooks/useFetching';
import {getPageCount, getPagesArray} from './utils/pages.js'
import Pagination from './components/UI/pagination/Pagination';

function App() {
  // const [posts, setPosts] = useState([
  //   {id: 1, title: 'aa', body: 'a'},
  //   {id: 2, title: 'dd', body: 'b'},
  //   {id: 3, title: 'cc', body: 'c'}
  // ]);

  const [posts, setPosts] = useState([])

  // const [selectedSort, setSelectedSort] = useState('')
  // const [searchQuery, setSearchQuery] = useState('')

  const [filter, setFilter] = useState({sort: '', query: ''})
  const [modal, setModal] = useState(false)
  const [totalCount, setTotalCount] = useState(0)
  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);
  const [limit, setLimit] = useState(10)
  const [totalPages, setTotalPages] = useState(1)
  const [page, setPage] = useState(1)
  

  const [fetchPosts, isPostsLoading, postError] = useFetching(async () => {
    const response = await PostService.getAll(limit, page);
    setPosts(response.data)
    const totalCount = response.headers['x-total-count']
    setTotalPages(getPageCount(totalCount, limit))
  })

  useEffect(() => {
    fetchPosts()
  }, [posts])

  // function getSortedPosts() {
  //   console.log('ОТРАБОТАЛА ФУНКЦИЯ СОРТЕД ПОСТС');
  //   if(selectedSort) {
  //     return [...posts].sort((a, b) => a[selectedSort].localeCompare(b[selectedSort]))
  //   }
  //   return posts;
  // }

  // useMemo() хук, который кэширует данные, например мы отсортировали наши посты, этот хук запомнил результат и сохранил в кэш его, затем просто когда нужно он достает эти данные из кэша, первым аргументом принимает коллбэк функцию, которая должна возвращать какие-либо вычисления, например отсортированный массив, либо математические вычисления, вторым аргументом массив зависимостей

  //по сути реализовали живой поиск, при помощи useMemo, встроенная функция includes помогает найти совпадения по содержимому
  

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
    setModal(false)
  }

  // удаление поста, реализуем также при помощи функции обратного вызова
  // эта функция также будет принимать пост из дочернего компонента
  const removePost = (post) => {
    setPosts(posts.filter(p => p.id !== post.id))
  }

  const changePage = (page) => {
    setPage(page)
  }

  // const sortPosts = (sort) => {
  //   setSelectedSort(sort)
  //   // мы не можем напрямую изменять состояние, именно поэтому изначально мы скопировали массив, затем вызвали сорт, в которую передали функцию localeCompare()- которую чаще всего используют для сортировки слов в алфавитном порядке
  // }

  return (
    <div className="App">
      <MyButton style={{marginTop: 30}} onClick={() => setModal(true)}>
        Создать пост
      </MyButton>
      <MyModal visible={modal} setVisible={setModal}>
        <PostForm create={createPost}/>
      </MyModal>
      
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

      {/* реализуем сортировку постов */}
      <hr style={{margin: '15px 0'}}/>
      <PostFilter filter={filter} setFilter={setFilter} />
      {/* условная отрисовка, на тот случай, если постов нет, мы просто проверяем есть ли посты, если есть то отрисовываем их при помощи компонента, если нет, просто выкидывает дефолтное значение, в данном случае h1, эта проверка в последующем будет перенесена в компонент который и отрисовывает список */}
      {postError &&
        <h1>Произошла ошибка... {postError}</h1>
      }
      {isPostsLoading
        ?<div style={{display: 'flex', justifyContent: 'center', marginTop: 50}}><Loader/></div>
        :<PostList remove={removePost} posts={sortedAndSearchedPosts} title="Посты про JS"/>
      }
      {/* <PostList remove={removePost} posts={posts} title="Посты про JS"/> */}
      {/* <PostList posts={posts2} title="Посты про Python"/>
      <PostList posts={posts3} title="Посты про Go"/> */}
      <Pagination page={page} changePage={changePage} totalPages={totalPages}/>

    </div>
  ); 
}

export default App;
// react transition group, библиотека для анимации реакта
// жизненный цикл компонента: всего 3 этапа: 1й монтирование - когда компонент монтируется(mount) в дом дерево, 2й обновление(update) - когда компонент обновляется, изменяется, стадия активной жизник компонента, когда он работает, мы его видим и тд, 3й этап размонтирование(unmout) когда компонент больше не нужен и мы его по какой-то причине удаляем, например мы хотим его скрыть или переходим на другую страницу и реакт его уничтожает
// useEffect(callback, deps) - хук, который помогает следить за жизненным циклом компонента, мы можем использовать его столько раз, сколько нам нужно, один будет следить за одним действием, другой за другим
// useEffect(()=>{
  // fetchPosts()
// }, []) - когда массив зависимостей пустой, хук отработает только один раз в момент монтирования компонента
// useEffect(()=>{
  // fetchPosts()
// }, [filter]) - коллбэк будет отрабатывать каждый раз, когда будет изменяться фильтр(можем передавать столько зависимостей, сколько потребуется)
// useEffect(()=>{
  // fetchPosts()

  // return () => { - этот ретерн, который возвращает функцию, отработает в момент размонтирования компонента
  //   ДЕЛАЕМ ОЧИСТКУ
  // }
// }, [])

// изменение состояния это ассинхронный процесс, поэтому порядок выполнения функций может отличаться от задуманного
// очень важный момент декомпозиция, то есть нужно уметь правильно выносить отдельную логику в отдельные компоненты/хуки
// остановился на времени 2:12:00
