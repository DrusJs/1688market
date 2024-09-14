document.addEventListener('DOMContentLoaded', () => {
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

    const countersButtons = document.querySelectorAll('.counter .btn')

    if (countersButtons.length > 0) {
        countersButtons.forEach(button => {
            console.log(button)
            button.addEventListener('click', function () {
                handleCounterAction(this);
            });
        });
    }


    const searchWrapper = document.querySelector('.search-wrapper')

    if (searchWrapper) {
        searchWrapper.addEventListener('click', (e)=>{
            e.currentTarget.classList.add('active')
        })

        //скрытие поиска при нажатии вне элемента
        document.addEventListener('click', function(event) {
            const isClick = searchWrapper.contains(event.target);
        
            if (!isClick) {
                searchWrapper.classList.remove('active');
            }
        });
    }
});

function validInputNumber(event) {
    return(event.charCode >= 48 && event.charCode <= 57 && /^\d{0,3}$/.test(this.value))
}

function handleCounterAction(item) {
    let counterValue = item.parentElement.querySelector('.counter-value');
    let currentValue = parseInt(counterValue.innerHTML);

    if (isNaN(currentValue)) {
        console.error("Counter NaN = " + currentValue);
        return;
    }

    if (item.classList.contains('cnt-plus')) {
        counterValue.innerHTML = currentValue + 1;
    } else if (item.classList.contains('cnt-minus') && currentValue > 0) {
        counterValue.innerHTML = currentValue - 1;
    }
}

function handleBasketCheckboxUpdate() {

}