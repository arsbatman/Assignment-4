document.getElementById("submit").addEventListener("click", function() {
    calculate();
});

const calculate = () =>
{
    let name = document.getElementById("name").value;
    let money = Number(document.getElementById("bid").value);
    let text = document.getElementById("loveLetter").value;
    let form = document.forms["Bride_calc"]
    let selectedEdu = form.elements["education"];
    if(selectedEdu.value != 'blank'){
        money *=selectedEdu.value;
    } 
    let selectedFamilyNet = form.elements["networth"];
    if(selectedFamilyNet.value != 'blank'){
        money *=selectedFamilyNet.value;
    }        
    let selectedCaste = form.elements["caste"];
    if(selectedCaste.value != 'blank'){
        money +=Number(selectedCaste.value);
    } 
            

    const skill = document.getElementsByClassName("skill"); 
    money = getCheckboxValuesFilterReduce(skill, money);

    const age = document.getElementsByName("age");
    money = getRadioValue(age, money);

    const reputation = document.getElementsByClassName("reputation");
    money = getCheckboxValuesForLoop(reputation, money)

    let person = {
        bride_name: name,
        bride_price: money,
        letter_to_bride: text
    }
    if(money != '' && name != ''){
        document.getElementById("person").innerHTML = `The price for your bride ${person.bride_name} is ${person.bride_price}. Your love letter is ${person.letter_to_bride}`;
    } else{
        alert("Name and Starting Bid required");
    }
}

const getCheckboxValuesFilterReduce = (html_collection, money) => {
    let list = Array.from(html_collection).filter(filteration) 
    let result = list.reduce(reducer, money)
    return result;
}

const reducer = (accumulator, item) => {
    return accumulator + Number(item.value);
}

const filteration = (item) => {
    return item.checked;
}

const getRadioValue = (node_list, money) => {  
    node_list.forEach(item => {
        if (item.checked) {
            money = money * Number(item.value)
        }
    })
    return money;
}

const getCheckboxValuesForLoop = (html_collection, money) => {
	for (let i=0; i < html_collection.length; i++) {  
		if (html_collection[i].checked && Number.isInteger(Number(html_collection[i].value))) {
			money = money + Number(html_collection[i].value)
		}
		else if (html_collection[i].checked && !Number.isInteger(html_collection[i].value)) {
			money = money * Number(html_collection[i].value)
		}
	}
	return money;
}

