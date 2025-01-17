

//GET BUTTON 
const button_list = document.querySelectorAll("[button_status]");
if(button_list.length > 0) {
    button_list.forEach((button) => {
        const url = new URL(window.location.href)
        button.addEventListener("click", () => {
            if(button.getAttribute("button_status"))
                url.searchParams.set("status",button.getAttribute("button_status"))
            else
                url.searchParams.delete("status")
        
            window.location.href = url 
        })
    })
}

//Pagination 
const button_page = document.querySelectorAll("[button-page]");
if(button_page.length > 0) {
    button_page.forEach((button) => {
        const url = new URL(window.location.href)
        button.addEventListener("click", () => {
            if(button.getAttribute("button-page"))
                url.searchParams.set("page",button.getAttribute("button-page"))
            else
                url.searchParams.delete("page")
            window.location.href = url 
        })
    })
}
//End Pagination

//Form Search
const  form_search = document.querySelector("#form-search");
if(form_search){
    const url = new URL(window.location.href);
    form_search.addEventListener("submit", (event) => {
        event.preventDefault();
        const keyword = event.target.elements.keyword.value ;
        if(keyword) {
            url.searchParams.set("keyword",keyword);
        }
        else{
            url.searchParams.delete("keyword");
        }
        window.location.href = url;
    })
}

//End form search 

//Button-Change-Status
const list_button_changeStatus = document.querySelectorAll("[button-changestatus]");

if(list_button_changeStatus.length > 0) {

    const form_search = document.querySelector("[form-changeStatus]");

    list_button_changeStatus.forEach((button) => {
        button.addEventListener("click", () => {
           const id = button.getAttribute("data_id");
           const status = button.getAttribute("data_status");
           const path =  form_search.getAttribute("data-path") ;
           const action = `${path}/${status}/${id}?_method=PATCH`;
           form_search.action = action ;
           form_search.submit();
        })
    })
}

//End Button-Change-Status


//Change_Multi_Status
const box_change_multi = document.querySelector("[checkbox-multi]");
if(box_change_multi) {
  const checkall = box_change_multi.querySelector("input[name='checkall']");
  const listInput = box_change_multi.querySelectorAll("input[name='id']");
  if(checkall){
    checkall.addEventListener("click", () => {
        if(checkall.checked){
            listInput.forEach((box) => {
                box.checked= true ;
            }
        )}
        else
        {
            listInput.forEach((box) => {
                box.checked= false ;
            }
        )}
  })
  }
  listInput.forEach((box) => {
    box.addEventListener("click", () => {
        const numChecked = form_change_multi.querySelectorAll("input[name='id']:checked");
        if(numChecked.length === listInput.length){
            checkall.checked = true;
        }
        else{
            checkall.checked = false;
        }
    })
  })
}

const form_change_multi = document.querySelector("[form-change-multi]");
if(form_change_multi){
    form_change_multi.addEventListener("submit", (event) => {
        event.preventDefault() ;
        const type = form_change_multi.querySelector("select[name='type']");
        const ids = [] ;
        const list_box_checked = document.querySelectorAll("input[name='id']:checked");
        if(list_box_checked.length > 0) {
            list_box_checked.forEach(box => {
                const id = box.value ;
                if(type.value == "change-position"){
                    const position = box.closest("tr").querySelector("input[name='position']").value ;
                    ids.push(`${id}-${position}`);
                }
                else{
                    ids.push(id);
                }
            })
        const strIDs = ids.join("; ");
        const input =  form_change_multi.querySelector("input[name='ids']");
        input.value = strIDs;
        form_change_multi.submit();
        }
        else {
            alert("Vui lòng chọn ít nhất 1 sản phẩm");
        }
        
    })
}
//End_Change_Multi_Status

// Delete_1_SP
const list_btnDel = document.querySelectorAll("[button-del]");
list_btnDel.forEach((button) => {
    button.addEventListener("click", () => {
        const isConfirm = confirm("Bạn có chắc muốn xóa bản ghi ?");
        const form_del = document.querySelector("[form-del]");
        if(isConfirm){
            const id = button.getAttribute("data_id");
            const path = form_del.getAttribute("data-path");
            form_del.action =`${path}/${id}?_method=DELETE`;

            form_del.submit();
        }
        
    })
})

//End Delete_1_SP

// show-alert
const alert = document.querySelector("[show-alert]");
if(alert) {
    setTimeout(() => {
        alert.classList.add("alert-hidden");
    },6000)
    const close_alert = alert.querySelector("[close-alert]");

    close_alert.addEventListener("click", () => {
        alert.classList.add("alert-hidden");
    })
}
// End show-alert

//Upload Imange 
const uploadImage = document.querySelector("[upload-image]");
if(uploadImage) {
    const uploadImage_input = uploadImage.querySelector("[upload-image-input]");
   
    const img =  uploadImage.querySelector("[upload-image-preview]");

    uploadImage_input.addEventListener("change", () => {
        const file = uploadImage_input.files[0] ;
        if(file){
            img.src = URL.createObjectURL(file);
        }
    })
}

//Sort
const sort = document.querySelector("[sort]");
if(sort) {
    const url = new URL(window.location.href);
    const sort_select = sort.querySelector("[sort-select]");
    sort_select.addEventListener("change",() => {
        const [key,value]  = sort_select.value.split("-");
         url.searchParams.set("sortKey",key);
         url.searchParams.set("sortValue",value);
         window.location.href = url.href ;
    })

    //Thêm Selected cho lựa chọn
   const selectKey = url.searchParams.get("sortKey");
   const selectValue = url.searchParams.get("sortValue");
    if(selectKey && selectValue) {
        const strSelect = `${selectKey}-${selectValue}` ;
        const optionSelected = sort_select.querySelector(`option[value='${strSelect}']`);
        optionSelected.selected = true ;
    }

    const buttonClear = sort.querySelector("[sort-clear]");
    buttonClear.addEventListener("click", () => {
        const url = new URL(window.location.href);
        url.searchParams.delete("sortKey");
        url.searchParams.delete("sortValue");
        window.location.href = url;
    })
}
//End Sort

//Role
const buttonSubmitPermissions = document.querySelector("[button-submit-permissions]");
if(buttonSubmitPermissions){
    buttonSubmitPermissions.addEventListener("click", () => {
        const Role = [] ;
        const tableRole = document.querySelector("table[table-permissions]");
        const rows = tableRole.querySelectorAll("tbody tr[data-name]");
        rows.forEach((row,index)=>{
            const data = row.getAttribute("data-name");
            const inputs = row.querySelectorAll("input");
            
            if(data == "id"){
                inputs.forEach((input,index) => {
                    const id = input.value ;
                    Role.push({
                        id : id,
                        permissions : []
                    })
                })
            }
            else{
                inputs.forEach((input,index) => {
                    const inputChecked = input.checked ;
                    if(inputChecked){
                        Role[index].permissions.push(data);
                    }
                })
            }
        })
        if(Role.length > 0) {
            console.log(Role);
            const formChangePermissions = document.querySelector("[form-change-permissions]");
            const inputRoles = formChangePermissions.querySelector("input[name='roles']");
            inputRoles.value = JSON.stringify(Role);
            formChangePermissions.submit();
        }
    })
   
}

//End role

//
const data_role = document.querySelector("[data-records]");
if(data_role){
    
    const records = JSON.parse(data_role.getAttribute("data-records"));
   
    const table = document.querySelector("[table-permissions]");
   
    records.forEach((item,index) => {
        const permissions = item.permissions ;

        permissions.forEach((permission)=> {
            const row = table.querySelector(`tr[data-name=${permission}]`);
          
            const input = row.querySelectorAll(`input`)[index];
            input.checked = true;
        })
    })
}
//

const showAlert = document.querySelector("[show-alert]");
if(showAlert) {
  let time = showAlert.getAttribute("data-time");
  time = parseInt(time);

  // Sau time giây sẽ đóng thông báo
  setTimeout(() => {
    showAlert.classList.add("alert-hidden");
  }, time);

  // Khi click vào nút close-alert sẽ đóng luôn
  const closeAlert = showAlert.querySelector("[close-alert]");
  closeAlert.addEventListener("click", () => {
    showAlert.classList.add("alert-hidden");
  });
}

//End Update item cart


//Button Delete
const button_cancel = document.querySelector("[cancel-order]");
if(button_cancel){
    
    button_cancel.addEventListener("click", () =>{
        const id =  button_cancel.getAttribute("data_id");
        const isConfirm = confirm("Bạn có chắc muốn xóa đơn hàng ?");
        if(isConfirm){
            fetch(`/admin/orders/cancel/${id}`, {})
            .then(res => res.json())
            .then(data => {
                if(data.code == 200) {
                    console.log("Ok");
                }
            })
        }
    })
}

//End Button Delete

//Change-status-
const select_status = document.getElementById("orderStatus");
let statusOrders = "";
if(select_status){
    select_status.addEventListener("change", (item) =>{
        statusOrders += item.target.value +"" ;
    })
}

const button_update = document.getElementById("update-order");
if(button_update){
    button_update.addEventListener("click", () => {
        const isConfirm = confirm("Bạn có chắc muốn cập nhật trạng thái đơn hàng?");
        const form = document.querySelector("[form-update]");

        if(isConfirm){
            const id = button_update.getAttribute("data_id");
            const pathU = form.getAttribute("data-path");
            form.action =`${pathU}/${id}?status=${statusOrders}`;
            form.submit();
        }

    })
}
//End Change-status-orders

//Get-Orders-By-Status
const select_status_list = document.getElementById("orderStatusList");

if(select_status_list){
    select_status_list.addEventListener("change", (item) =>{
        fetch(`/admin/orders/list-orders?status=${item.target.value}`, {})
        .then(res => res.json())
        .then(data => {
            if(data.code == 200) {
                let listOrderNew = `Không có đơn hàng !`;
                if( data.listOrder.length >0 ){
                     listOrderNew = data.listOrder.map((item, index) => {
                    
                        return `
                                <tr>
                                    <td>${index + 1}</td>
                                    <td>${item._id}</td>
                                    <td>${item.totalPrice}$</td>
                                    <td>
                                        <div>${moment(item.createdAt).format("DD-MM-YYYY")}</div>
                                    </td>
                                    <td>
                                        ${(() => {
                                            switch (item.status) {
                                                case "pending":
                                                    return `<a class="btn btn-outline-danger">Chờ xác nhận</a>`;
                                                case "confirmed":
                                                    return `<a class="btn btn-outline-primary">Đã xác nhận</a>`;
                                                case "processing":
                                                    return `<a class="btn btn-outline-secondary">Đang xử lý</a>`;
                                                case "shipping":
                                                    return `<a class="btn btn-outline-info">Đang giao hàng</a>`;
                                                case "delivered":
                                                    return `<a class="btn btn-outline-success">Đã giao hàng</a>`;
                                                case "cancelled":
                                                    return `<a class="btn btn-outline-danger">Bị hủy</a>`;
                                                default:
                                                    return '';
                                            }
                                        })()}
                                    </td>
                                    <td>
                                        <div>${item.createByFullName}</div>
                                        <div>${moment(item.updateAt).format("DD-MM-YYYY")}</div>
                                    </td>
                                    <td>
                                        <a href="/admin/orders/detail/${item._id}?status=${item.status}" class="btn btn-info btn-sm ml-1">Chi tiết</a>
                                    </td>
                                </tr>
                            `;
                        }).join(''); 
                
                   
                   
                } 
                const tbody = document.getElementById("orderList");
                tbody.innerHTML = listOrderNew
            }
        })
    })
}


//End Get-Orders-By-Status

