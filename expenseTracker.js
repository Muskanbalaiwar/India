var form = document.getElementById('addValue');
var itemList = document.getElementById('items');
var amount = document.getElementById('amount');
var disc = document.getElementById('des');
var catg = document.getElementById('cat');
form.addEventListener('submit', addItem);
itemList.addEventListener('click', removeItem);
itemList.addEventListener('click', editItem);
var editingId = null;

function addItem(e) {
    e.preventDefault();
    console.log(1);
    const user = {
        amn: e.target.amt.value,
        dec: e.target.dsc.value,
        crt: e.target.ctg.value,
       
    }

    //showData(user)
   // document.form.reset();
    //if (editingId === null) {
      //  localStorage.setItem(user.ides, JSON.stringify(user));
        //editingId=user.ides;
    //} else {
      //  localStorage.setItem(editingId, JSON.stringify(user));
        //editingId = null;
    //}

    axios
    .post("https://crudcrud.com/api/8b1d5eae718848d2985828db9e6952c0/expenseData",user)
   .then(res =>showData(res.data))
   .catch(err=>console.log(err));
    console.log(user);

form.reset();
}

function removeItem(e) {
    if (e.target.classList.contains('delete')) {
        if (confirm('Are You sure?')) {
            var li = e.target.parentElement;
            
            console.log(li)
            axios
    .delete(`https://crudcrud.com/api/8b1d5eae718848d2985828db9e6952c0/expenseData/${li.id}`)
    .then(res=>itemList.removeChild(li))
    .catch(err=>console.log(err));
           
            
        }
    }
}

function editItem(e) {
    if (e.target.classList.contains('edit')) {
        if (confirm('Are You sure?')) {
             editingId = e.target.parentElement;
             axios
             .get(`https://crudcrud.com/api/8b1d5eae718848d2985828db9e6952c0/expenseData/${editingId.id}`)
             .then((res) =>{amount.value=res.data.amn,
                disc.value=res.data.dec,
                catg.value=res.data.crt})
                .catch(err=>console.log(err))

             axios
             .delete(`https://crudcrud.com/api/8b1d5eae718848d2985828db9e6952c0/expenseData/${editingId.id}`)
           // item = JSON.parse(localStorage.getItem(editingId));
            //console.log(editingId);
            .then(res=> itemList.removeChild(editingId))
           
           

        }
    }

}

window.addEventListener("DOMContentLoaded",()=>{
    axios
    .get("https://crudcrud.com/api/8b1d5eae718848d2985828db9e6952c0/expenseData")
.then((res)=>{
    for(var i=0;i<res.data.length;i++){
       showData(res.data[i])
    }
})
.catch(err=>console.log(err));})

function showData(e){

    var newItem = e.amn;
    var newDes = e.dec;
    var newCat =e.crt;

    var li = document.createElement('li');
    li.id=e._id
    li.className = 'list-group-item';
    li.appendChild(document.createTextNode(newItem + " " + newDes + " " + newCat));
    var deleteBtn = document.createElement('button');
    deleteBtn.className = 'btn btn-danger exteme-right delete';
    deleteBtn.appendChild(document.createTextNode('Delete'));
    li.appendChild(deleteBtn);
    var btnEdit = document.createElement('button');
    btnEdit.className = 'btn btn-primary float-end edit';
    btnEdit.appendChild(document.createTextNode('Edit Details'));
    li.appendChild(btnEdit);
    itemList.append(li);


}
