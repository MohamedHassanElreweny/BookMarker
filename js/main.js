let siteNameInput = document.querySelector('.sitename');

let siteUrlInput = document.querySelector('.siteurl');

let SiteList;

let editSitebtn = document.querySelector('#editSitebtn');
let currentindex;

let searchSites = document.getElementById('searchSites');


let addsitebtn = document.getElementById('AddSitebtn');
addsitebtn.addEventListener('click',AddSite);

if(localStorage.getItem('sites')){
    SiteList = JSON.parse(localStorage.getItem('sites'));
    display(SiteList);
}else{
    SiteList = [];
}

function AddSite(){
    if(validateInputs()){
        let Site ={
            siteName : siteNameInput.value,
            siteUrl : siteUrlInput.value
        }
        //if condition to check duplicatio
        if(!SiteList.find(e=>e.siteName == Site.siteName)){
            SiteList.push(Site);
            localStorage.setItem('sites',JSON.stringify(SiteList));
            clear();
            display(SiteList);    
            window.scrollTo(0,document.getElementById('bookmarkList').offsetTop);
            siteNameInput.classList.remove('is-valid');
            siteUrlInput.classList.remove('is-valid');
            document.getElementById('pforduplication').classList.add('d-none');
        }
        else{
            document.getElementById('pforduplication').classList.remove('d-none');
        }
    }
}

function display(List){
    let cartona = '';
    for(let i=0 ; i<List.length ; i++){
        cartona += `
        <div id="bookmark" class="p-3 my-3 rounded-1 w-75 mx-auto d-flex justify-content-around">
        <h2>${List[i].siteName}</h2>
        <div>
            <a href="https://${List[i].siteUrl}" target="_blank" class="btn btn-primary me-3">Visit</a>
            <button onclick="SetForUpdate(${i})" class="btn btn-warning me-3">Edit</button>
            <button onclick="DeleteSite(${i})" class="btn btn-danger">Delete</button>
        </div>
        </div>
        `
    }
    document.getElementById('bookmarkList').innerHTML = cartona;
}

//delete 
function DeleteSite(index){
    SiteList.splice(index,1);
    localStorage.setItem('sites',JSON.stringify(SiteList));
    display(SiteList);
}

//clear
function clear(){
    siteNameInput.value = '';
    siteUrlInput.value = '';
}

//update
function SetForUpdate(index){
    siteNameInput.value = SiteList[index].siteName;
    siteUrlInput.value = SiteList[index].siteUrl;
    currentindex = index;
    window.scrollTo(0,document.getElementsByClassName('home')[0].offsetTop);
    editSitebtn.classList.replace('d-none','d-inline-block');
    cancelbtn.classList.replace('d-none','d-inline-block');
    addsitebtn.classList.add('d-none');
}


editSitebtn.addEventListener('click',function(){
    if(validateInputs()){
        let newSite ={
            siteName : siteNameInput.value,
            siteUrl : siteUrlInput.value
        }
        if(SiteList.find(e=>e.siteName==siteNameInput.value) && SiteList[currentindex].siteName != newSite.siteName)
         {
            document.getElementById('pforduplication').classList.remove('d-none');
        }
        else{
            SiteList[currentindex] = newSite;
            localStorage.setItem('sites',JSON.stringify(SiteList));
            display(SiteList);
            window.scrollTo(0,document.getElementById('bookmarkList').offsetTop);
            clear();
            editSitebtn.classList.replace('d-inline-block','d-none');
            addsitebtn.classList.remove('d-none');
            cancelbtn.classList.replace('d-inline-block','d-none');
            document.getElementById('pforduplication').classList.add('d-none');
        }
    }
})

//cancel edit
let cancelbtn = document.getElementById('cancelbtn');
cancelbtn.addEventListener('click',function(){
    clear();
    addsitebtn.classList.remove('d-none');
    editSitebtn.classList.replace('d-inline-block','d-none');
    cancelbtn.classList.replace('d-inline-block','d-none');
    document.getElementById('pforduplication').classList.add('d-none');
})

//validation 
function validateInputs(inputform){
    var sitenameRegex = /^[A-Z]\w{3,20}$/;
    var siteurlRegex = /^www\.\w{1,25}\.com$/;
    if(inputform == siteNameInput){
        ValidateSite(sitenameRegex,siteNameInput,'namerules');
    }
    if(inputform == siteUrlInput){
        ValidateSite(siteurlRegex,siteUrlInput,'urlrules')
    }
    if(sitenameRegex.test(siteNameInput.value) && siteurlRegex.test(siteUrlInput.value)){
        addsitebtn.removeAttribute('disabled');
        editSitebtn.removeAttribute('disabled');
        return true;
    }
    else{
        addsitebtn.disabled = true;
        editSitebtn.disabled = true;
        return false
    }
}
function ValidateSite(regexform,DetectedInput,rulesID){
    if(regexform.test(DetectedInput.value) == true){
        if(DetectedInput.classList.contains('is-invalid')){
            DetectedInput.classList.replace('is-invalid','is-valid');
        }
        if(!document.getElementById(rulesID).classList.contains('d-none')){
            document.getElementById(rulesID).classList.add('d-none');
        }
        return true
    }
    else{
        DetectedInput.classList.add('is-invalid');
        DetectedInput.classList.remove('is-valid');
        document.getElementById(rulesID).classList.remove('d-none');
        return false
    }
}

// search
searchSites.addEventListener('input',function(){
    search(this.value);
});

function search(text){
    let SearchedList = SiteList.filter(x=>x.siteName.toLowerCase().includes(text.toLowerCase()))
    //let SwarchList =[];
    // for(let i=0 ;i<SiteList.length ;i++){
    //     if(SiteList[i].siteName.toLowerCase().includes(text.toLowerCase())){
    //         SearchedList.push(SiteList[i]);
    //     }
    // }
    display(SearchedList);
}

//another way to search
// searchSites.onkeyup = function(){
//     let SearchedList = [];
//     for(let i=0 ;i<SiteList.length ;i++){
//         if(SiteList[i].siteName.toLowerCase().includes(searchSites.value.toLowerCase())){
//             SearchedList.push(SiteList[i]);
//         }
//     }
//     display(SearchedList);
// }

