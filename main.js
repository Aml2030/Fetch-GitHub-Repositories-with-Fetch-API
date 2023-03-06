let theInput = document.querySelector(".get-repos input");
let getButton = document.querySelector(".get-repos .get-button");
let reposData = document.querySelector(".show-data");

getButton.onclick = function () {
  getRepos();
};

function getRepos() {
  if (theInput.value == "") {
    reposData.innerHTML = "<span>Please write GitHub Username</span>"; 
  } else {
    fetch(`https://api.github.com/users/${theInput.value}/repos`)
      .then((data) => data.json())
      .then((reposResult) => {
        //Empty the container showData
        reposData.innerHTML = '';
        //Loop on Repos
        reposResult.forEach((repo)=>{
            let mainDiv = document.createElement("div");
            //Add Class on mainDiv
            mainDiv.className='repo-box' ;

            let repoName = document.createTextNode(repo.name);
 
            let links = document.createElement("div"); 
            links.className='links'

            //Create Repo URL
            let anchor = document.createElement("a");
            anchor.href=  repo.html_url ;
            // anchor.href= `https://github.com/${theInput.value}/${repo.name}`; same as line30
            anchor.setAttribute('target','_blank')
            let anchorText = document.createTextNode("Visit Repo")
            anchor.appendChild(anchorText);
            
            //Create URL Site
            let anchor2 = document.createElement("a");
            anchor2.href=  `https://${theInput.value}.github.io/${repo.name}/`;
            anchor2.setAttribute('target','_blank')
            let anchorText2=  document.createTextNode("Open Site") 
            anchor2.appendChild(anchorText2);
            links.append(anchor,anchor2);
       
            
            mainDiv.append(repoName,links);
            reposData.append(mainDiv)
        })
      }).catch((err)=>reposData.innerHTML = Error('Undefined GitHub Username.'));
  }
}

document.onkeyup = function(e){
    if(e.key === "Enter"){
        getButton.click();
    }
}