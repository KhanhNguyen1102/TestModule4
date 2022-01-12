function getAllCountry() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/api/countries",
        success: function (data) {
            console.log(data)

        }
    })
}

function getAllCities() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/api/cities",
        success: function (data) {
            console.log(data)
            displayList(data);
        }
    })
}

function displayList(array) {
    let res = "";
    res += `     <table style="" class="table">
                <thead class="thead-dark">
                <tr>
                    <th style="text-align: center" colspan="4" scope="col">Danh sách thành phố</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <th colspan="2" scope="row">DANH SÁCH THÀNH PHỐ</th>
<!--                    <td>Mark</td>-->
                    <td style="text-align: right" colspan="2"><button onclick="showFormCreate()">Thêm thành phố</button></td>
<!--                    <td>@mdo</td>-->
                </tr>
                <tr>
                    <th scope="row">#</th>
                    <td>Thành phố</td>
                    <td>Quốc gia</td>
                    <td>Hành động</td>
                </tr>`
    for (let i = 0; i < array.length; i++) {
        res += `<tr>
                    <th scope="row">${i + 1}</th>
                    <td><span onclick="showDetail(${array[i].id})">${array[i].name}</span></td>
                    <td>${array[i].country.name}</td>
                    <td><span>Chỉnh sửa</span>| <span onclick="deleteCity(${array[i].id})">Xóa</span></td>
                </tr>`;
    }
    res += `</tbody>
            </table>`

    document.getElementById("content").innerHTML = res;
}

function showDetail(id) {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/api/cities/search?id=" + id,
        success: function (data) {
            console.log(data)
            let res = "";
            res += `     <table style="" class="table">
                <thead class="thead-dark">
                <tr>
                    <th style="text-align: center" colspan="4" scope="col">Thành phố ${data.name}</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <th colspan="2" scope="row">Thành phố ${data.name}</th>
                    <td style="text-align: right" colspan="2"><button onclick="getAllCities()">Xem danh sách thành phố</button></td>
                </tr>
                <tr>
                    <th colspan="4" scope="row">Tên : ${data.name} </th>
                </tr>
                <tr>
                    <th colspan="4" scope="row">Quốc gia : ${data.country.name} </th>
                </tr>
                <tr>
                    <th colspan="4" scope="row">Diện tích : ${data.area} km2 </th>
                </tr>
                <tr>
                    <th colspan="4" scope="row">Dân số : ${data.population} người </th>
                </tr>
                <tr>
                    <th colspan="4" scope="row">GDP : ${data.gdp} ngàn $ </th>
                </tr>
                <tr>
                    <th colspan="4" scope="row">Giới thiệu: </th>
                </tr>
                <tr>
                    <th colspan="4" scope="row">${data.description} </th>
                </tr>
                 <tr>
                    <th style="text-align: right" colspan="4" scope="row"><button>Chỉnh sửa</button>&ensp;&ensp;<button>Xóa</button></th>
                </tr>`
            res += `</tbody>
            </table>`

            document.getElementById("content").innerHTML = res;
        }
    })
}

function showFormCreate() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/api/countries",
        success: function (data) {
            console.log(data)
            let res = "";
            res += `     <table style="" class="table">
                <thead class="thead-dark">
                <tr>
                    <th style="text-align: center" colspan="4" scope="col">Thêm thành phố</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <th colspan="4" scope="row">THÊM THÀNH PHỐ</th>
                </tr>
               <tr>
                    <th scope="row">Tên :</th>
                    <th colspan="3" scope="row"><input id="name" type="text"></th>
                </tr>
                <tr>
                    <th scope="row">Quốc gia :</th>
                    <th colspan="3" scope="row">
                    <select id="country">`
            for (let i = 0; i < data.length; i++) {
                res+=`<option value="${data[i].id}">${data[i].name}</option>`
            }
            res += `</select>
</th>
                </tr>
                <tr>
                    <th scope="row">Diện tích :</th>
                    <th colspan="3" scope="row"><input id="area" type="number"></th>
                </tr>
                <tr>
                    <th scope="row">Dân số :</th>
                    <th colspan="3" scope="row"><input id="population" type="number"></th>
                </tr>
                <tr>
                   <th scope="row">GDP :</th>
                    <th colspan="3" scope="row"><input id="gdp" type="number"></th>
                </tr>
                <tr>
                    <th scope="row">Giới thiệu :</th>
                    <th colspan="3" scope="row"><input id="description" type="text"></th>
                </tr>
                <tr>
                    <th scope="row">&ensp;</th>
                    <th style="text-align: left" colspan="2" scope="row"><button onclick="saveCity()">Thêm</button>&ensp;&ensp;<button onclick="getAllCities()">Thoát</button></th>
                    <th scope="row">&ensp;</th>
                </tr>`

            res += `</tbody>
            </table>`

            document.getElementById("content").innerHTML = res;
        }
    })

}
function saveCity(){
    let area = document.getElementById("area").value;
    let description = document.getElementById("description").value;
    let gdp = document.getElementById("gdp").value;
    let name = document.getElementById("name").value;
    let population = document.getElementById("population").value;
    let countryId = document.getElementById("country").value;
    let city = {
        name : name,
        area : area,
        description : description,
        gdp : gdp,
        population : population,
        country :{
            id : countryId
        }
    }
    $.ajax({
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json',
        },
        type: 'POST',
        url: 'http://localhost:8080/api/cities',
        data :JSON.stringify(city),
        success: getAllCities,
        error: function (error){
            console.log(error)
        }
    })
}
function deleteCity(id){
    $.ajax({
        type: "DELETE",
        url: "http://localhost:8080/api/cities/" + id,
        success: getAllCities,
        error: function (error){
            console.log(error)
        }
    })
}