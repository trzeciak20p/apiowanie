const select = document.querySelector("#plec")
const rok = document.getElementById("inpt_rok")
const result_tab = document.getElementById("result")
const srednia_wieku = document.getElementById("srednia_wieku")


result_tab.setAttribute("style", 'margin-top: 30px; border: 1px black solid; border-collapse: collapse; width: 60%;')
select.addEventListener("change",wyswietlWyniki)
//

let people = []

getPeople()
function getPeople() {
    fetch("https://random-data-api.com/api/v2/users?size=50").then(res => res.json().then(res => {

        res.forEach(ob => {
            const Person = {
                name: ob.first_name,
                last_name: ob.last_name,
                year: ob.date_of_birth.split("-")[0],
                gender: ob.gender
            }
            people.push(Person)
            
        });
        wyswietlWyniki()
        sredniaWieku()
        

    }))
}

function wyswietlWyniki(){

    result_tab.innerHTML = "<tr> <td>Imie</td> <td>Nazwisko</td> <td>Płeć</td> <td>Rok urodzenia</td> </tr>"

    people.forEach(elem => {

        // data = people.filter((Person) => Person.gender == select.selectedOptions.value)

        if(elem.gender == select.selectedOptions[0].value){
            let tr = document.createElement("TR")
            let name = document.createElement("TD")
            name.innerText = elem.name
            name.setAttribute("style", "color: green;")
            let last_name = document.createElement("TD")
            last_name.innerText = elem.last_name
            let gender = document.createElement("TD")
            gender.innerText = elem.gender
            let year = document.createElement("TD")
            year.innerText = elem.year

            tr.appendChild(name)
            tr.appendChild(last_name)
            tr.appendChild(gender)
            tr.appendChild(year)
            result_tab.appendChild(tr)
        }
        
    })

}



function sredniaWieku(){
    let suma = 0

    people.forEach(elem => {
        suma += 2022 - elem.year
    })
    suma /= people.length
    srednia_wieku.innerText = "Średnia wieku: " + suma
}

