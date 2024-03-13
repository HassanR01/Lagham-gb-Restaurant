let PartIcons = document.querySelectorAll('.partIcons ul li')
let partitions = document.querySelectorAll('.partitions div')

PartIcons.forEach(particon => {
    particon.addEventListener('click', () => {
        PartIcons.forEach(particon => {
            particon.classList.remove('selected')
        })
        partitions.forEach(partition => {
            partition.classList.remove('active')
        })
        document.querySelector(`.${particon.dataset.part}`).classList.add('active')
        particon.classList.add('selected')
    })
})