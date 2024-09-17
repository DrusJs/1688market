document.addEventListener('DOMContentLoaded', () => {
    const catalogWrapper = document.querySelector('.catalog-wrapper')
    const catalogButton = document.querySelector('.catalog-button')
    const catalogMainItems = document.querySelectorAll('.catalog-list .catalog-item')
    const catalogSecondaryContainer = document.querySelector('.catalog-sublist')
    const catalogSecondaryItems = document.querySelectorAll('.catalog-sublist .catalog-item')
    const catalogSubContainer = document.querySelector('.catalog-sublist-child')

    if (catalogMainItems) {
        catalogButton.addEventListener('click', ()=>{
            catalogWrapper.classList.toggle('active')
        })

        catalogWrapper.addEventListener('click', (e)=>{
            if (e.target.classList.contains('catalog-wrapper') && window.matchMedia("(min-width: 992px)").matches) {
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

    const checkAll = document.getElementById('basket-check-all');
    const checkItems = document.querySelectorAll('.check-item');
    const cntNow = document.querySelector('.cnt-now');
    const cntTotal = document.querySelector('.cnt-total');
    const removeButton = document.getElementById('btn-basket-remove')

    if (checkItems.length > 0 && checkAll) {
        checkAll.addEventListener('change', () => {
            checkItems.forEach(item => item.checked = checkAll.checked);
            handleUpdateCounter();
        });

        checkItems.forEach(item => {
            item.addEventListener('change', handleUpdateCheckAll);
        });
    }

    if (cntTotal) {
        cntTotal.textContent = checkItems.length;
    }

    if (removeButton) {
        removeButton.addEventListener('click', hideCheckedProducts)
    }
    
    const mobileTabsAccount = document.querySelectorAll('.nav-account [data-bs-toggle]')
    const mobileTabsInfo = document.querySelectorAll('.nav-size [data-bs-toggle]')
    const mobileTabBack = document.querySelectorAll('.tab-back')

    if (mobileTabsAccount.length > 0) {
        mobileTabsAccount.forEach(tab=>{
            tab.addEventListener('click', (e)=>{
                document.querySelector(e.currentTarget.dataset.bsTarget).classList.add('bs-show')
            })
        })

        mobileTabBack.forEach(btn=>{
            btn.addEventListener('click', (e)=>{
                document.querySelector('.bs-show').classList.remove('bs-show')
            })
        })
    }

    if (mobileTabsInfo.length > 0) {
        mobileTabsInfo.forEach(tab=>{
            tab.addEventListener('click', (e)=>{
                document.querySelector('.nav-size').classList.remove('active')
            })
        })

        mobileTabBack.forEach(btn=>{
            btn.addEventListener('click', (e)=>{
                document.querySelector('.bs-show').classList.remove('bs-show')
            })
        })

        document.querySelector('.show-nav').addEventListener('click', ()=>{
            document.querySelector('.nav-size').classList.add('active')
            document.querySelector('.close-nav').classList.add('active')
        })

        document.querySelector('.close-nav').addEventListener('click', (e)=>{
            document.querySelector('.nav-size').classList.remove('active')
            e.currentTarget.classList.remove('active')
        })
    }

    function handleUpdateCheckAll() {
        const allChecked = Array.from(checkItems).every(item => item.checked);
        checkAll.checked = allChecked;
        handleUpdateCounter();
    }
    
    function handleUpdateCounter() {
        const checkedCount = Array.from(checkItems).filter(item => item.checked && !(item.closest('.basket-product-card').classList.contains('remove'))).length;
        cntNow.textContent = checkedCount;
    }

    function hideCheckedProducts() {
        const allChecked = Array.from(checkItems).filter(item =>item.checked && !(item.closest('.basket-product-card').classList.contains('remove')));

        allChecked.forEach(el=>{
            let item = el.closest('.basket-product-card')

            item.classList.add('remove')
            setTimeout(()=>{item.style.display = 'none'}, 500)
            cntTotal.textContent = parseInt(cntTotal.textContent) - 1;
        })

        handleUpdateCounter()
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

