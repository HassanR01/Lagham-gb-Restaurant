let categoriesBtn = document.querySelectorAll('.menuList nav ul li')
let items = document.querySelectorAll('.card.item')

categoriesBtn.forEach(categoryBtn => {
    categoryBtn.addEventListener('click', () => {
        categoriesBtn.forEach(categoryBtn => {
            categoryBtn.classList.remove('selected')
        })
        items.forEach(item => {
            item.classList.remove('show')
        })
        console.log(categoryBtn.dataset.category);
        document.querySelectorAll(`.items .card.${categoryBtn.dataset.category}`).forEach(item => {
            item.classList.add('show')
        })
        categoryBtn.classList.add('selected')
    })
})