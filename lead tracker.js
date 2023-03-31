const startBtn = document.getElementById('start-btn')
let myLeads = []
const inputEl = document.getElementById('input-field')
const ulEl = document.getElementById('ul-list')
const deleteBtn = document.getElementById('delete-btn')
const tabBtn = document.getElementById('tab-btn')

let local = JSON.parse(localStorage.getItem("myleads"))

if(local) {
    myLeads = local
    render(myLeads) 
} 


startBtn.addEventListener('click' , () => {
  myLeads.push(inputEl.value)
  inputEl.value = ""
  localStorage.setItem("myleads", JSON.stringify(myLeads))
  render(myLeads)
})

tabBtn.addEventListener('click' , () => {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        myLeads.push(tabs[0].url)
        localStorage.setItem("myleads", JSON.stringify(myLeads))
        render(myLeads)

    })

})
deleteBtn.addEventListener( 'dblclick', () => {
localStorage.clear()
myLeads = []
render(myLeads)
})



function render(leads){

    let listItems = ""
    
    
    for( let i = 0; i < leads.length; i++){
        
        listItems += `
        <li>
        <a target = '_blank' href = '${leads[i]}' > 
        ${leads[i]}  </a></li>
        `
    }
    
    ulEl.innerHTML = listItems
}