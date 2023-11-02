const dataTable=document.getElementById('data-table')
const baseUrl="https://northwind.vercel.app/api/products"

async function fetchData() {
    try {
        const response=await axios.get(baseUrl)
        addTable(response.data)
    } catch (error) {
        console.log(error);
    }
}

function addTable(data) {
    dataTable.innerHTML=''
    data.forEach(item => {
        const row=document.createElement('tr')
        row.innerHTML+=`
       
            <td>${item.id}</td>
            <td>${item.unitPrice}</td>
            <td>${item.reorderLevel}</td>
            <td>
            <button onclick="editPost(${item.id})">Edit</button>
            <button onclick="deletePost(${item.id})">Delete</button>
        </td>
        `
        dataTable.appendChild(row)
    });
    
}

async function createPost(){
    const unitPrice=document.getElementById('unitPrice').value
    const reorderLevel = document.getElementById('reorderLevel').value
    try {
        
        await axios.post(baseUrl,{
            unitPrice:unitPrice,
            reorderLevel:reorderLevel,
        })
        await fetchData()

    } catch (error) {
        console.log(error);
    }
}
fetchData()

let editPostId=null

async function editPost(postId) {
    
    try {
        const response= await axios.get(`${baseUrl}/${postId}`)
       
        const post=response.data
        
        document.getElementById('unitPrice').value=post.unitPrice
        document.getElementById('reorderLevel').value=post.reorderLevel
    
    editPostId=postId
    } catch (error) {
        console.log(error);
    }
}

async function updatePost() {
    const unitPrice=document.getElementById('unitPrice').value
    const reorderLevel=document.getElementById('reorderLevel').value
    if(editPostId){
        try {
           await axios.put(`${baseUrl}/${editPostId}`,{
                unitPrice:unitPrice,
                reorderLevel:reorderLevel
            })
            fetchData()
        } catch (error) {
            console.log(error);
        }
    }

}

async function deletePost(postId) {
    try {
        
        await axios.delete(`${baseUrl}/${postId}`)
        fetchData()
    } catch (error) {
        console.log(error);
    }
}

fetchData()
