var siteNameInput = document.getElementById("siteNameInput");
var siteUrlInput = document.getElementById("siteUrlInput");
var searchInput = document.getElementById("searchInput");
var submitButton = document.getElementById("submitButton");
var updateButton = document.getElementById("updateButton");
var nameAlert = document.getElementById("nameAlert");
var urlAlert = document.getElementById("urlAlert");
var urlList = [];
var indexUpdate = 0;
var nameRegex = /^[A-Z ?a-z]{5,20}$/;
var urlRegex =/^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/;
    if (localStorage.getItem("urlArray") != null) {
    urlList = JSON.parse(localStorage.getItem("urlArray"));
    displayUrl();
    }
    if (urlList.length == 0) {
    document.getElementById("deletaAllInputButton").classList.add("disabled");
    }
function addSite() {
    // $('#exampleModal').modal('toggle');
    var site = {
        siteName: siteNameInput.value,
        siteUrl: siteUrlInput.value,
    };
        if (site.siteName.trim() == "" && site.siteUrl.trim() == "") {
        document.getElementById("hiddenButton").click();
    } else if (onInputName() == false || onInputUrl() == false) {
        document.getElementById("hiddenButton").click();
    } else {
        urlList.push(site);
        localStorage.setItem("urlArray", JSON.stringify(urlList));
        displayUrl();
        clearForm();
        document
        .getElementById("deletaAllInputButton")
        .classList.remove("disabled");
        siteNameInput.classList.remove("is-valid");
        siteUrlInput.classList.remove("is-valid");
    }
    }
    function clearForm() {
    siteNameInput.value = "";
    siteUrlInput.value = "";
    searchInput.value = "";
    }
    function displayUrl() {
    var urlSite = "";
    for (var i = 0; i < urlList.length; i++) {
        urlSite += `        
        <tr>
        <td>${i}</td>
        <td>${urlList[i].siteName}</td>
        <td><a target="_blank"  href='${urlList[i].siteUrl}'>
        <button id="visitSite" class="btn btn-visit">
            <i class="fa-regular fa-eye"></i>
            Visit
        </button></a></td>
        <td><button onclick="getForm(${i})" id="updateSite" class="btn btn-warning">
        <i class="fa-solid fa-trash-can"></i>
        Update
        </button></td>
        <td><button onclick="deleteItem(${i})" id="deleteSite" class="btn btn-danger">
            <i class="fa-solid fa-trash-can"></i>
            Delete
        </button></td>
        </tr>
        `;
    }
    document.getElementById("showItems").innerHTML = urlSite;
    }
    function deleteItem(index) {
    urlList.splice(index, 1);
    localStorage.setItem("urlArray", JSON.stringify(urlList));
    displayUrl();
    if (urlList.length == 0) {
        document.getElementById("deletaAllInputButton").classList.add("disabled");
    }
    }
    function deleteAllSites() {
    urlList.splice(0);
    localStorage.setItem("urlArray", JSON.stringify(urlList));
    displayUrl();
    document.getElementById("deletaAllInputButton").classList.add("disabled");
    }
    function searchForm() {
    var term = searchInput.value;
    var urlSite = "";
    for (var i = 0; i < urlList.length; i++) {
        if (urlList[i].siteName.toLowerCase().includes(term.toLowerCase())) {
        urlSite += `        
        <tr>
        <td>${i}</td>
        <td>${urlList[i].siteName}</td>
        <td><a target="_blank"  href='${urlList[i].siteUrl}'>
        <button id="visitSite" class="btn btn-visit">
            <i class="fa-regular fa-eye"></i>
            Visit
        </button></a></td>
        <td><button id="updateSite" class="btn btn-warning">
        <i class="fa-solid fa-trash-can"></i>
        Update
        </button></td>
        <td><button onclick="deleteItem(${i})" id="deleteSite" class="btn btn-danger">
            <i class="fa-solid fa-trash-can"></i>
            Delete
        </button></td>
        </tr>
        `;
        }
    }
    document.getElementById("showItems").innerHTML = urlSite;
    }
    function getForm(index) {
    indexUpdate = index;
    var currentSiteName = urlList[index].siteName;
    var currentSiteUrl = urlList[index].siteUrl;
    siteNameInput.value = currentSiteName;
    siteUrlInput.value = currentSiteUrl;
    updateButton.classList.remove("d-none");
    submitButton.classList.add("d-none");
    }
    function updateForm() {
    var site = {
        siteName: siteNameInput.value,
        siteUrl: siteUrlInput.value,
    };

    if (site.siteName.trim() == "" && site.siteUrl.trim() == "") {
        document.getElementById("hiddenButton").click();
    } else if (onInputName() == false || onInputUrl() == false) {
        document.getElementById("hiddenButton").click();
    } else {
        urlList.splice(indexUpdate, 1, site);
        localStorage.setItem("urlArray", JSON.stringify(urlList));
        displayUrl();
        clearForm();
        updateButton.classList.add("d-none");
        submitButton.classList.remove("d-none");
        siteNameInput.classList.remove("is-valid");
        siteUrlInput.classList.remove("is-valid");
    }
    }
    function onInputName() {
    if (nameRegex.test(siteNameInput.value) == true) {
        siteNameInput.classList.add("is-valid");
        siteNameInput.classList.remove("is-invalid");
        nameAlert.classList.add("d-none");
        return true;
    } else {
        siteNameInput.classList.remove("is-valid");
        siteNameInput.classList.add("is-invalid");
        nameAlert.classList.remove("d-none");
        return false;
    }
    }
    function onInputUrl() {
    if (urlRegex.test(siteUrlInput.value) == true) {
        siteUrlInput.classList.add("is-valid");
        siteUrlInput.classList.remove("is-invalid");
        urlAlert.classList.add("d-none");
        return true;
    } else {
        siteUrlInput.classList.remove("is-valid");
        siteUrlInput.classList.add("is-invalid");
        urlAlert.classList.remove("d-none");
        return false;
    }
}
    
