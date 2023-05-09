
let labelsInput = document.querySelectorAll('.form-group label');
let inputs = document.querySelectorAll('input');
let dayInputValue = "";
let monthInputValue = "";
let yearInputValue = "";
let divErrors = document.querySelectorAll('.error');

function removeErrors(){
    divErrors.forEach((value) => value.style.display = 'none');
    labelsInput.forEach((value) =>{
        value.classList.remove('errorClass');
    })
    inputs.forEach((value, index) =>{
        value.classList.remove('borderError');
    })
}
// event that allows detect the change of inputs
inputs.forEach((value, index) => {
    value.addEventListener('change', (event) =>{
        dayInputValue =(inputs[0].value); 
        monthInputValue =(inputs[1].value); 
        yearInputValue =(inputs[2].value);
        removeErrors();
    })
})


// function that allow verfiry if the inputs are empty
function emptyInputs(divErrors){
    let empty = false;
    if(dayInputValue == "" && monthInputValue == "" && yearInputValue == ""){
        for (const error of divErrors) {
            error.classList.add('errorClass')
            error.style.display = "block";
            error.innerHTML = "The field is required";
        }

        labelsInput.forEach((value) =>{
            value.classList.add('errorClass');
        })
        inputs.forEach((value, index) =>{
            value.classList.add('borderError');
        })
        return empty = true;
    }

    return empty;
    
}

// function that allows remove error classes

function showErrors(index, message){
    divErrors[index].classList.add('errorClass');
    divErrors[index].style.display = "block";
    divErrors[index].innerHTML = message;
    labelsInput[index].classList.add('errorClass');
    inputs[index].classList.add('borderError')
}

// function that allow verify if a single input are empty
function singleEmptyInput(input, index){
    let empty = false;
    if(input == ""){
        showErrors(index, "The field is required");
        empty = true
        return empty;
    }
    return empty
}

// function that allow verify if a date is valid
function validDate(conditional, index, messageInput){
    let valid = false;
    
    if(conditional){
        divErrors[index].classList.add('errorClass');
        divErrors[index].style.display = "block";
        divErrors[index].innerHTML = `Must be a valid ${messageInput}`;
        labelsInput[index].classList.add('errorClass');
        inputs[index].classList.add('borderError');
        valid = true;
        return valid;
    }
    return valid
}

const calcular = () =>{
    
    

    // validatioons
    // empty inputs
    if(emptyInputs(divErrors)) return;

    if(singleEmptyInput(dayInputValue, 0))  return;
    if(singleEmptyInput(monthInputValue, 1)) return;
    if(singleEmptyInput(yearInputValue, 2)) return;

    const yearTotalDiv = document.getElementById('yearTotal');
    const monthTotalDiv = document.getElementById('monthTotal');
    const daysTotalDiv = document.getElementById('dayTotal');
    let currentDate = new Date();
    // parse to number
    dayInputValue = Number.parseInt(dayInputValue);
    yearInputValue = Number.parseInt(yearInputValue);
    monthInputValue = Number.parseInt(monthInputValue - 1); // is month - 1 because it is a index array start at 0 and finish at 11;
    // last day of the month
    let monthLastDay = new Date(new Date().getFullYear(), monthInputValue + 1, 0);
    
    // valid date
    if(dayInputValue < 0 || dayInputValue > monthLastDay.getDate() && (monthInputValue < 0 || monthInputValue > 11) && (yearInputValue < 1900 || yearInputValue > new Date().getFullYear())){
        showErrors(0, "Must be a valid date");
        showErrors(1, "Must be a valid month")
        showErrors(2, "Must be a valid year")
    }
    // single valid date for every input
    if(validDate(dayInputValue < 0 || dayInputValue > monthLastDay.getDate(), 0, "date")) return;
    if(validDate(monthInputValue < 0 || monthInputValue > 11, 1, "month"))return;
    if(validDate(yearInputValue < 1900 || yearInputValue > currentDate.getFullYear(), 2, "year")) return;

    // born date
    let dateBorn = new Date(yearInputValue, monthInputValue, dayInputValue);
    // variables for years, months and days
    let yearsTotal = currentDate.getFullYear() - dateBorn.getFullYear();
    let monthsTotal = currentDate.getMonth() - dateBorn.getMonth();
    let daysTotal = 30 - dateBorn.getDate();

    // conditionals for verify if it is more o less than a month o days
    if(daysTotal > 0 && dateBorn.getDate() < currentDate.getDate()){
        // monthsTotal++;
        daysTotal = (currentDate.getDate() - dateBorn.getDate())
        // return ;
    }
    if(daysTotal > 0 && dateBorn.getDate() == currentDate.getDate()){
        monthsTotal++;
        // return ;
    }
    if(daysTotal < 0 && dateBorn.getDate() > currentDate.getDate()){
        monthsTotal = 12 - monthsTotal;
        daysTotal = 0
        // return ;
    }
    if(daysTotal >= 0 && dateBorn.getDate() >= currentDate.getDate()){
        monthsTotal--;
        // daysTotal = (daysTotal + currentDate.getDate());
        daysTotal =  daysTotal + currentDate.getDate();
    }
    if(monthsTotal < 0){
        yearsTotal--;
        monthsTotal = 12 + monthsTotal
    }


    yearTotalDiv.textContent = yearsTotal;
    monthTotalDiv.textContent = monthsTotal;
    daysTotalDiv.textContent = daysTotal;

}