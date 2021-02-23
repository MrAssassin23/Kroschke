$('#menubar-toogle').click(e => {
    let url = e.target.src
    let new_url
    if (url.includes('menubar')) {
        new_url = url.replace('menubar', 'cross')
        $('span.header-links').css({ 'height': '38.55vh' })

    } else if (url.includes('cross')) {
        new_url = url.replace('cross', 'menubar')
        $('span.header-links').css({ 'height': '0vh' })
    }
    $('#menubar-toogle').attr('src', new_url)
})

createCarousel('benifit_carousel__container', 'benifit-container', 4)

function createCarousel(parentContainer, parent, childs) {
    //add carousel classes
    let div_parentContainer = $(`#${parentContainer}`).addClass('carousel-container')
    let div_parent = $(`#${parent}`).addClass('carousel-slide-container')
    let carousel_position = 0

    //set proper width
    div_parent.css({ 'width': `${childs * 100}%` })
    console.log({ div_parentContainer, div_parent })

    //create indicators
    let indicators = createIndicators(4)
    let indicator_childs = indicators.children
    for (let i = 0; i < childs; i++) {
        indicator_childs[i].addEventListener('click', e => moveCarousel(i))
    }

    //add control
    function moveCarousel(position) {
        $(`#${parentContainer} div.indicator-container button`).removeClass('active-indicator')

        div_parent.css({ 'transform': `translateX(-${(100 / childs) * position}%)` })
        indicator_childs[position].classList.add('active-indicator')
        carousel_position = position
        console.log(position)
    }

    //automate them
    setInterval(() => {
        if(carousel_position === childs-1){
            moveCarousel(0)
        }else{
            moveCarousel(carousel_position+1)
        }
    },3500)
    div_parentContainer.append(indicators)
}

function createIndicators(childs) {
    let div_indicators = document.createElement('div')
    div_indicators.classList.add('indicator-container')
    for (let i = 0; i < childs; i++) {
        let btn_indicator = document.createElement('button')
        if (i === 0) btn_indicator.classList.add('active-indicator')
        btn_indicator.setAttribute('id', `indicator-${i}`)
        btn_indicator.classList.add('indicator')
        div_indicators.appendChild(btn_indicator)
    }
    return div_indicators
}