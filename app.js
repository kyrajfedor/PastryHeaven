$ (()=>{
     console.log("on app.js page load");

    //nav bar 
    fetch('navbar.html')
        .then(response => response.text())
        .then(data => {
        document.getElementById('navbar-placeholder').innerHTML = data;
        });
});

function showSidebar() {
    const sidebar = document.querySelector('.sidebar');
    sidebar.style.display = 'flex';
}

function hideSidebar() {
    const sidebar = document.querySelector('.sidebar');
    sidebar.style.display = 'none';
}
