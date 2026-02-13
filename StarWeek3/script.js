let bookmarks= [];
let addBookmark = ()=> {
    const name= document.getElementById('Bookmarkname').value;
    if(name.length<3){
        alert('Please enter a valid name');
        return;
    }
    let check=false;
    for(let i=0;i<bookmarks.length;i++){
        if(name===bookmarks[i].name){
            check=true;
            alert('Bookmark already added');
            break;
        }
    }
    if(check===true){
        return;
    }
    const URL = document.getElementById('URL').value;
    if(!(URL.startsWith('https')||URL.startsWith('http'))){
        alert('Please enter a valid URL');
        return;
    }
    const bookmark = {
        name: name,
        URL: URL
    }
    bookmarks.push(bookmark);
    let table= document.getElementById('bookmarktable');
    let row=document.createElement('tr');
    let index=document.createElement('td');
    let wname=document.createElement('td');
    let visit=document.createElement('td');
    let remove=document.createElement('td');
    index.textContent= bookmarks.length;
    wname.textContent= bookmark.name;
    row.appendChild(index);
    row.appendChild(wname);
    row.appendChild(visit);
    row.appendChild(remove);
    row.style.height='50px';
    index.style.textAlign='center';
    wname.style.textAlign='center';
    index.style.verticalAlign='middle';
    wname.style.verticalAlign='middle';
    table.appendChild(row);
    const jsonBookmark=JSON.stringify(bookmarks);
    localStorage.setItem('bookmark',jsonBookmark);
    let visitbutton=document.createElement('button');
    visitbutton.textContent='Visit';
    visitbutton.style.border='1px';
    visitbutton.style.borderRadius='5px';
    visitbutton.style.backgroundColor='orange';
    visitbutton.style.paddingLeft='10px';
    visitbutton.style.paddingRight='10px';
    visitbutton.onclick = ()=>{
        window.open(bookmark.URL,'_blank');
    };
    visit.appendChild(visitbutton);
    visit.style.textAlign='center';
    visit.style.verticalAlign='middle';
    let removebutton=document.createElement('button');
    removebutton.textContent='Remove';
    removebutton.style.border='1px';
    removebutton.style.borderRadius='5px';
    removebutton.style.backgroundColor='red';
    removebutton.style.paddingLeft='10px';
    removebutton.style.paddingRight='10px';
    removebutton.onclick= ()=>{
        let rows=document.querySelectorAll('tr');
        for(let i=1;i<rows.length;i++){
            let cells=rows[i].cells;
            if(cells[1].textContent===bookmark.name){
                rows[i].remove();
                bookmarks.splice(i-1,1);
                const jsonBookmark=JSON.stringify(bookmarks);
                localStorage.setItem('bookmark',jsonBookmark);
                break;
            }
        }
        let newrows=document.querySelectorAll('tr');
        for(let j=1;j<newrows.length;j++){
            let cells=newrows[j].cells;
            let strindex=j.toString();
            cells[0].textContent=strindex;
        }
    }
    remove.appendChild(removebutton);
    remove.style.textAlign='center';
    remove.style.verticalAlign='middle';



};
let clearall = ()=> {
    let rows=document.querySelectorAll('tr');
    if(rows.length<=1){
        alert('No bookmarks have been added');
        return;
    }
    for(let i=1;i<rows.length;i++){
        rows[i].remove();
    }
    bookmarks.splice(0);
    const jsonBookmark=JSON.stringify(bookmarks);
    localStorage.setItem('bookmark',jsonBookmark);

};

function loadFromLocalStorage(){
    if(localStorage.getItem('bookmark')!==null){
        prevbookmarks=JSON.parse(localStorage.getItem('bookmark'));
    }
    else{
        return;
    }
    let count=1;
    prevbookmarks.forEach(prev=>{
        bookmarks.push(prev);
        let table= document.getElementById('bookmarktable');
        let row=document.createElement('tr');
        let index=document.createElement('td');
        let wname=document.createElement('td');
        let visit=document.createElement('td');
        let remove=document.createElement('td');
        index.textContent= count;
        wname.textContent= prev.name;
        row.appendChild(index);
        row.appendChild(wname);
        row.appendChild(visit);
        row.appendChild(remove);
        row.style.height='50px';
        index.style.textAlign='center';
        wname.style.textAlign='center';
        index.style.verticalAlign='middle';
        wname.style.verticalAlign='middle';
        table.appendChild(row); 
        let visitbutton=document.createElement('button');
        visitbutton.textContent='Visit';
        visitbutton.style.border='1px';
        visitbutton.style.borderRadius='5px';
        visitbutton.style.backgroundColor='orange';
        visitbutton.style.paddingLeft='10px';
        visitbutton.style.paddingRight='10px';
        visitbutton.onclick = ()=>{
            window.open(prev.URL,'_blank');
        };
        visit.appendChild(visitbutton);
        visit.style.textAlign='center';
        visit.style.verticalAlign='middle';
        let removebutton=document.createElement('button');
        removebutton.textContent='Remove';
        removebutton.style.border='1px';
        removebutton.style.borderRadius='5px';
        removebutton.style.backgroundColor='red';
        removebutton.style.paddingLeft='10px';
        removebutton.style.paddingRight='10px';
        removebutton.onclick= ()=>{
            let rows=document.querySelectorAll('tr');
            for(let i=1;i<rows.length;i++){
                let cells=rows[i].cells;
                if(cells[1].textContent===prev.name){
                    rows[i].remove();
                    bookmarks.splice(i-1,1);
                    const jsonBookmark=JSON.stringify(bookmarks);
                    localStorage.setItem('bookmark',jsonBookmark);
                    break;
                }
            }
            let newrows=document.querySelectorAll('tr');
            for(let j=1;j<newrows.length;j++){
                let cells=newrows[j].cells;
                let strindex=j.toString();
                console.log(strindex);
                cells[0].textContent=strindex;
            }
        }
        remove.appendChild(removebutton);
        remove.style.textAlign='center';
        remove.style.verticalAlign='middle';
        count++;
    })
};
window.addEventListener('DOMContentLoaded',loadFromLocalStorage);
