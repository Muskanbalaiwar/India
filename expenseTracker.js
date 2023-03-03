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
    var a = [];
    const user = {
        amn: e.target.amt.value,
        dec: e.target.dsc.value,
        crt: e.target.ctg.value,
       
    }
    a.push(user);

    var newItem = document.getElementById('amount').value;
    var newDes = document.getElementById('des').value;
    var newCat = document.getElementById('cat').value;

    var li = document.createElement('li');
    li.id = user.ides;
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
   // document.form.reset();
    //if (editingId === null) {
      //  localStorage.setItem(user.ides, JSON.stringify(user));
        //editingId=user.ides;
    //} else {
      //  localStorage.setItem(editingId, JSON.stringify(user));
        //editingId = null;
    //}

    axios
    .post("https://crudcrud.com/api/a56c386d6538447592dbc098c6debb3a/expenseData",user)
   .then(res =>console.log(res))
   .catch(err=>console.log(err));
    console.log(user);

form.reset();
}

function removeItem(e) {
    if (e.target.classList.contains('delete')) {
        if (confirm('Are You sure?')) {
            var li = e.target.parentElement;
            itemList.removeChild(li);
            localStorage.removeItem("User");
        }
    }
}

function editItem(e) {
    if (e.target.classList.contains('edit')) {
        if (confirm('Are You sure?')) {
             editingId = e.target.parentElement.id;
             
            item = JSON.parse(localStorage.getItem(editingId));
            console.log(editingId);
            amount.value=item.amn;
            disc.value = item.dec;
            catg.value = item.crt;
            var li = e.target.parentElement;
            itemList.removeChild(li);

        }
    }

}
