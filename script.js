function searchRickAndMorty() {
    $("#movie-list").html("");
  
    $.ajax({
      url: "https://rickandmortyapi.com/api/character/",
      type: "get",
      dataType: "json",
      data: {
        name: $("#search-input").val()
      },
      success: function(result) {
        if (result.results.length > 0) {
          let characters = result.results;
  
          $.each(characters, function(i, data) {
            $("#movie-list").append(
              `
              <div class="col-md-3">
                  <div class="card mb-3">
                      <img class="card-img-top" src="${data.image}" alt="Card image cap">
                      <div class="card-body">
                          <h5 class="card-title">${data.name}</h5>
                          <a href="#" class="card-link see-detail" data-toggle="modal" data-target="#exampleModal" data-id="${data.id}">Detalles</a>
                      </div>
                  </div>
              </div>
              `
            );
          });
  
          $("#search-input").val("");
        } else {
          $("#movie-list").html(
            `
            <div class="col">
                <h1 class="text-center">No results found</h1>
            </div>        
            `
          );
        }
      }
    });
  }
  
  
  $("#exampleModal").on("show.bs.modal", function(event) {
    let button = $(event.relatedTarget);
    let characterId = button.data("id");
    let modal = $(this);
  
    $.ajax({
      url: `https://rickandmortyapi.com/api/character/${characterId}`,
      type: "get",
      dataType: "json",
      success: function(result) {
        modal.find(".modal-title").text(`Detalles del Personaje: `);
        modal.find(".modal-body").html(`
          <p> Nombre: ${result.name}</p>
          <p> Origen: ${result.origin.name}</p>
          <p> Localización: ${result.location.name}</p>
        `);
      }
    });
  });
  
  $("#search-button").on("click", function() {
    searchRickAndMorty();
  });
  
  $("#search-input").on("keyup", function(e) {
    if (e.keyCode === 13) {
      searchRickAndMorty();
    }
  });
