title = document.getElementById("title");
description = document.getElementById("description");
add = document.getElementById("add");
deleted = document.getElementById("deleted");
tableBody = document.getElementById("tableBody");

function getAndUpdate() {
    tit = title.value;
    desc = description.value;
    console.log("item added to list");


    /***     Storing the data in an array entered by user in an array    ***/
    //if there is no data present in local storage
    if (localStorage.getItem('itemsJson') == null) {
        arr = [];
        arr.push([tit, desc]);
        localStorage.setItem('itemsJson', JSON.stringify(arr))
    }
    //if data is present in local storage
    else {
        str = localStorage.getItem('itemsJson');
        arr = JSON.parse(str);
        arr.push([tit, desc]);
        localStorage.setItem('itemsJson', JSON.stringify(arr));
    }
    update();

}

function update() {

    if (localStorage.getItem('itemsJson') == null) {
        arr = [];
        localStorage.setItem('itemsJson', JSON.stringify(arr))
    }
    //if data is present in local storage
    else {
        str = localStorage.getItem('itemsJson');
        arr = JSON.parse(str);
    }

    /***   Now setting all the data in a tabular form in a string   ***/
    let str1 = "";
    for (i = 0; i < arr.length; i++) {
        str1 += `  
        <tr class="table-primary">
          <th scope="row">${i + 1}</th>
            <td class="sans-text">${arr[i][0]}</td>
            <td class="sans-text">${arr[i][1]}</td>
            <td class="min"><button class="btn btn-sm btn-primary btn-danger" id="deleted"  onclick="deleteItem(${i})"> Delete <i class="fa-solid fa-trash"></i></button></td>
        </tr>
        `
    }

    /***  Displaying the data entered by user in a table  ***/
    tableBody.innerHTML = str1;
}

add.addEventListener('click', getAndUpdate);  //add and display the data when click on add button
update();   // this will always displays the data when the page reloads

/**** Normal Alert ****/
// function deleteItem(itemIndex) {
//     if (confirm("Are you sure you want to delete this from your list.")) {
//         console.log("deleting an item");
//         str = localStorage.getItem('itemsJson');
//         arr = JSON.parse(str);
//         arr.splice(itemIndex, 1);
//         localStorage.setItem('itemsJson', JSON.stringify(arr));
//         update();
//     }
// }

/**** Sweet Alert ****/
function deleteItem(itemIndex) {
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
            )
            str = localStorage.getItem('itemsJson');
        arr = JSON.parse(str);
        arr.splice(itemIndex, 1);
        localStorage.setItem('itemsJson', JSON.stringify(arr));
        update();
        }
    })

}

/**** Normal Alert ****/
// function clearList(){
//     if(confirm("Are you sure you want to delete the complete list")){
//         localStorage.clear();
//         update();
//     }
// }

/**** Sweet Alert ***s*/
function clearList() {
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
        // reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            swalWithBootstrapButtons.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
            )
            localStorage.clear();
            update();
        } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
        ) {
            swalWithBootstrapButtons.fire(
                'Cancelled',
                'Your imaginary file is safe :)',
                'error'
            )
        }
    })
}
