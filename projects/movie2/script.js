$('#search-button').on('click', function () {
    searchMovie()
})

$('#search-input').on('keyup', function (e) {
    //ketika user klik enter pada input
    if (e.keyCode === 13) {
        searchMovie();
    }
})


function searchMovie() {

    //ketika search maka hapus dulu tampilannya
    $('#movie-list').html('')

    //loading
    $('.loading').append(`
        <div class="loader">
        </div>
    `);

    $.ajax({
        url: 'http://omdbapi.com',
        type: 'get',
        dataType: 'json',
        data: {
            'apikey': '6acfcff1',
            's': $('#search-input').val(),
        },
        success: function (result) {
            if (result.Response == 'True') {

                let movies = result.Search;

                // console.log(movies);

                setTimeout(() => {
                    //menghapus loading
                    $('.loading').html('');

                    $.each(movies, function (i, data) {
                        $('#movie-list').append(`
                            <div class="col-md-4">
                                <div class="card mb-3">
                                    <img src="${data.Poster}" class="card-img-top" alt="...">
                                    <div class="card-body">
                                        <h5 class="card-title">${data.Title}</h5>
                                        <h6 class="card-subtitle mb-2 text-body-secondary">${data.Year}</h6>
                                        <button type="button" class="btn btn-details btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" data-id="${data.imdbID}">See details</button>
                                    </div>
                                </div>
                            </div>
                            `)
                    })
                }, 1000);

            } else {
                $('#movie-list').html(`<h1 class="text-center"> ${result.Error} </h1>`)
                console.log(result);
            }
        }
    })

    $('#search-input').val('')
}

$('#movie-list').on('click', '.btn-details', function () {
    // console.log($(this).data('id'));
    $.ajax({
        url: 'http://omdbapi.com',
        type: 'get',
        dataType: 'json',
        data: {
            'apikey': '6acfcff1',
            'i': $(this).data('id'),
        },
        success: function (movie) {
            if (movie.Response === "True") {
                $('.modal-body').html(`
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-md-4">
                            <img src=${movie.Poster} class="img-fluid">
                        </div>
                        <div class="col-md-8">
                            <ul class="list-group">
                                <li class="list-group-item"><b>Actors</b> :
                                ${movie.Actors}</li>
                                <li class="list-group-item"><b>Director</b> :${movie.Director}</li>
                                <li class="list-group-item"><b>imdbRating</b> :${movie.imdbRating}</li>
                                <li class="list-group-item"><b>Language</b> :${movie.Language}</li>
                                <li class="list-group-item"><b>Plot</b> :${movie.Plot}</li>
                            </ul>
                        </div>  
                    </div>
                </div>
                `)
            }
            // console.log(movie);
        }
    })
})