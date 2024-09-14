document.addEventListener('DOMContentLoaded', () => {
    const searchWrapper = document.querySelector('.search-wrapper')

    if (searchWrapper) {
        searchWrapper.addEventListener('click', (e)=>{
            e.currentTarget.classList.add('active')
        })
    }


    const catalogWrapper = document.querySelector('.catalog-wrapper')
    const catalogButton = document.querySelector('.catalog-button')
    const catalogMainItems = document.querySelectorAll('.catalog-list .catalog-item')
    const catalogSecondaryContainer = document.querySelector('.catalog-sublist')
    const catalogSecondaryItems = document.querySelectorAll('.catalog-sublist .catalog-item')
    const catalogSubContainer = document.querySelector('.catalog-sublist-child')

    if (catalogMainItems) {
        catalogButton.addEventListener('click', ()=>{
            catalogWrapper.classList.add('active')
        })

        catalogWrapper.addEventListener('click', (e)=>{
            if (e.target.classList.contains('catalog-wrapper')) {
                catalogWrapper.classList.remove('active')
            }
        })

        catalogMainItems.forEach(el=>{
            el.addEventListener('click', (e)=>{
                if (!e.currentTarget.classList.contains('active')) {
                    const active = document.querySelector('.catalog-list .catalog-item.active') 
                    
                    active && active.classList.remove('active')
                    e.currentTarget.classList.add('active')

                    catalogSecondaryContainer.classList.add('active')
                } else {
                    e.currentTarget.classList.remove('active')

                    catalogSecondaryContainer.classList.remove('active')
                }
                catalogSubContainer.classList.remove('active')
            })
        })

        catalogSecondaryItems.forEach(el=>{
            el.addEventListener('click', (e)=>{
                if (!e.currentTarget.classList.contains('active')) {
                    const active = document.querySelector('.catalog-sublist .catalog-item.active') 
                    
                    active && active.classList.remove('active')
                    e.currentTarget.classList.add('active')

                    catalogSubContainer.classList.add('active')
                } else {
                    e.currentTarget.classList.remove('active')

                    catalogSubContainer.classList.remove('active')
                }
            })
        })
    }

    const addFavButtons = document.querySelectorAll('.product-item .fav-btn')

    if (addFavButtons.length > 0) {
        addFavButtons.forEach(btn=>{
            btn.addEventListener('click', (e)=>{
                e.currentTarget.classList.toggle('active')
            })
        })
    }

    document.addEventListener('click', function(event) {
        const isClick = searchWrapper.contains(event.target);
    
        if (!isClick) {
            searchWrapper.classList.remove('active');
        }
    });


});

function validInputNumber(event) {
    return(event.charCode >= 48 && event.charCode <= 57 && /^\d{0,3}$/.test(this.value))
}

function sliderUpdate(element, value, isFirst) {
    element.parentElement.nextElementSibling.noUiSlider.set([isFirst?value:null, isFirst?null:value]);
}