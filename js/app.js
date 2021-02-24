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

$('div.expand').click(() => {
    let height = $('div.services-container').height()
    if (height === 0) {
        $('div.services-container').css({ 'height': 'auto' })
        $('img.expand-arrow').css({ 'transform': 'rotate(270deg)' })
        $('h3.expand').text('Weniger lesen')
    } else {
        $('div.services-container').css({ 'height': '0' })
        $('img.expand-arrow').css({ 'transform': 'rotate(90deg)' })
        $('h3.expand').text('Mehr lesen')
    }
})

$('div.expand-portal').click(() => {
    let height = $('div.point-expand').height()
    if (height === 0) {
        $('div.point-expand').css({'height':'auto' })
        $('div.expand-portal img.expand-arrow').css({ 'transform': 'rotate(270deg)' })
        $('div.expand-portal h3.expand').text('Weniger lesen')
    } else {
        $('div.point-expand').css({ 'height': '0' })
        $('div.expand-portal img.expand-arrow').css({ 'transform': 'rotate(90deg)' })
        $('div.expand-portal h3.expand').text('Mehr lesen')
    }
})

$('div.expand-about').click(() => {
    let height = $('div.about-right-expander').height()

    if (height === 117) {
        $('div.about-right-expander').css({'height':'auto' })
        $('div.expand-about img.expand-arrow').css({ 'transform': 'rotate(270deg)' })
        $('div.expand-about h3.expand').text('Weniger lesen')
    } else {
        $('div.about-right-expander').css({ 'height': '7.3rem' })
        $('div.expand-about img.expand-arrow').css({ 'transform': 'rotate(90deg)' })
        $('div.expand-about h3.expand').text('Mehr lesen')
    }
})

createCarousel('carousel', 'slides-container', 2)

function doCarousel() {
    createCarousel('benifit_carousel__container', 'benifit-container', 4)
    createCarousel( 'about-slide-container','about-left',3 )
}

function stopCarousel() {
    $('.carousel-container').removeClass('carousel-container')
    let div_parent = $('.carousel-slide-container').removeClass('carousel-slide-container')
    div_parent.css({ 'width': '100%','transform':'translateX(0%)' })
    $('.indicator-container').remove()
    createCarousel('carousel', 'slides-container', 2)

}

if ($(window).width() < 800) {
    doCarousel()
}
$(window).resize(function () {
    if ($(window).width() < 800) {
        doCarousel()
        $('div.services-container').css({ 'height': '0', 'overflow': 'hidden' })

    }
    if ($(window).width() > 800) {
        stopCarousel()
        $('div.services-container').css({ 'height': 'auto' })
    }
});


function createCarousel(parentContainer, parent, childs) {
    //add carousel classes
    let div_parentContainer = $(`#${parentContainer}`).addClass('carousel-container')
    let div_parent = $(`#${parent}`).addClass('carousel-slide-container')
    let carousel_position = 0

    //set proper width
    div_parent.css({ 'width': `${childs * 100}%` })
    // console.log({ div_parentContainer, div_parent })

    //create indicators
    let indicators = createIndicators(childs)
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

    }

    let hasIndicators = div_parentContainer.has('.indicator-container').length
    if (hasIndicators === 0) div_parentContainer.append(indicators)
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