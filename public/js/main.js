var currentPage = 1;
function LoadPage(page) {
    currentPage = page;
    $.ajax({
        url: '/api/account?page=' + page,
        type: 'GET'
    })
    .then(data => {
        $('#content').html('')

        for (let i = 0; i < data.length; ++i) {
            const element = data[i];

            let item = $(`
                <h2>${element.username} : ${element.password}</h2> 
            `)
            $('#content').append(item);
        }
    })
    .catch(err => {
        console.log('API err');
    })
}

function prePage() {
    currentPage--;
    $.ajax({
        url: '/api/account?page=' + currentPage,
        type: 'GET' 
    })
    .then(data => {
        $('#content').html('');
        for (let i = 0; i < data.length; ++i) {
            const element = data[i];

            let item = $(`
                <h2>${element.username} : ${element.password}</h2>
            `)
            $('#content').append(item);
        }
    })
    .catch(err => {
        console.log('API err');
    })
}

function nextPage() {
    currentPage++;
    $.ajax({
        url: '/api/account/?page=' + currentPage,
        type: 'GET'
    })
    .then(data => {
        $('#content').html('');
        for (let i = 0; i < data.length; ++i) {
            const element = data[i];
            let item = $(`
                <h2>${element.username} : ${element.password}</h2>
            `)
            $('#content').append(item);
        }
    })
    .catch(err => {
        console.log('API err');
    })
}