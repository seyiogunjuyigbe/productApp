var request = new XMLHttpRequest();
var url = document.querySelector('#url').getAttribute('data');
const cart = document.querySelector('#cart');
const sizeSelect = document.querySelector('#size');
const amt = document.querySelector('#amt');
const productSel = document.querySelector('#productSel');
const priceInp = document.querySelector('#price')
var data;
var id;
const getPrice = ()=>{
    cart.textContent = "Loading Price..."
    for(var i =0; i<productSel.options.length; i++){
        if(productSel.options[i].selected == true){
            id = productSel.options[i].getAttribute('data')
        }
    }
    const link = `${url}/${id}/price`
    request.open('GET', link, true)
    request.onload = ()=>{
       data = JSON.parse(request.response)
        cart.textContent = Number(data.price) * Number(amt.value);
        priceInp.value = Number(cart.textContent);
        if(sizeSelect.value == 'xl'){
            cart.textContent = Number(data.price) * 4* Number(amt.value);
            priceInp.value = Number(cart.textContent);
        }
        else if(sizeSelect.value == 'lg'){
            cart.textContent = Number(data.price) * 2* Number(amt.value);
            priceInp.value = Number(cart.textContent);
        }
        else if(sizeSelect.value == 'rg' || sizeSelect.value == ''){
            cart.textContent = Number(data.price) * 1* Number(amt.value);
            priceInp.value = Number(cart.textContent);
        }
        else if(sizeSelect.value == 'sm'){
            cart.textContent = Number(data.price) * 0.75* Number(amt.value);
            priceInp.value = Number(cart.textContent);
        }
        else if(sizeSelect.value == 'xs'){
            cart.textContent = Number(data.price) * 0.5* Number(amt.value);
            priceInp.value = Number(cart.textContent);
        }
           } 

    request.send();
    return data
}

amt.onchange = getPrice;
productSel.onchange = getPrice;
sizeSelect.onchange = getPrice;