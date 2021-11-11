// 1. Отрисовать все посты, которые получаем при запросе на https://jsonplaceholder.typicode.com/posts. Страница должна быть разделена на 2 части. В левой половине должны быть посты, в правой — комментарии, которые получаем при запросе на https://jsonplaceholder.typicode.com/posts/5/comments, где 5 — это id поста на который кликает пользователь. Верстка поста и комментария на ваше усмотрение. Комментарии при клике на пост заменяются на новые.


// Подсказки:

// - сохраняем id поста в атрибут data-id

// - при клике забираем этот id и генерируем url (https://jsonplaceholder.typicode.com/posts/${id}/comments

// - отправляем запрос за комментариями при помощи метода fetchData с занятия

// - когда получили массив с комментариями отрисовываем в правой колонке


function fetchData(method, url, callback) {
    const xhr = new XMLHttpRequest()
    xhr.open(method, url)
    xhr.responseType = 'json'
    xhr.onload = function () {
        if (xhr.status == 200) {
            callback(xhr.response)
        }
    }

    xhr.send()
}

const containerLeftElement = document.querySelector('#post')
const containerRightElement = document.querySelector('#comment')


fetchData('GET', 'https://jsonplaceholder.typicode.com/posts', (response) => {
    const data = response

    const aPostElement = data.map((item) => {
        return postTemplate(item.title, item.id)
    })

    const result = aPostElement.join('\n')
    containerLeftElement.innerHTML = result
})



containerLeftElement.addEventListener('click', (event) => {
    event.preventDefault()

    const { target } = event
    const linkElement = target.closest('a')




    if (linkElement) {
        const { id } = target.dataset
        const url = `https://jsonplaceholder.typicode.com/posts/${id}/comments`
        fetchData('GET', url, (response) => {

            const data = response

            const aCommentElement = data.map((item) => {
                return commentTemplate(item.body)
            })

            const result = aCommentElement.join('\n')
            containerRightElement.innerHTML = result

        })


    }


})






fetchData('GET', 'https://jsonplaceholder.typicode.com/comments', (response) => {

})





function postTemplate(title, id) {
    return `
    <div>
      <a href="#" data-id="${id}">${title}</a>
    </div>    
    `
}

function commentTemplate(body, id) {
    return `
    <div>
      <p data-id="${id}">${body}</a>
    </div>    
    `
}


