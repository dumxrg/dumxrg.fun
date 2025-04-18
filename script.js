const containers = document.getElementsByClassName("container");
let theme = false
const content = [
  {
    
    cover:
      "https://i.ibb.co/VXXYyVp/sixth-side.png",
    title: "The Sixth Side",
    subTitle: "DIce-themded roguelike, how far can you go?",
    link: "sixth_side/sixth_side.html",
  },
  {
    cover:
      "https://i.scdn.co/image/ab67616d0000b2731fa702577139de8d7601431d",
    title: "Comming soon...",
    subTitle: "More experiences will be added in the future...",
    link: "",
  },
  {
    cover:
      "https://i.scdn.co/image/ab67616d0000b2731fa702577139de8d7601431d",
    title: "Comming soon...",
    subTitle: "More experiences will be added in the future...",
    link: "",
  },
  {
    cover:
      "https://i.scdn.co/image/ab67616d0000b2731fa702577139de8d7601431d",
    title: "Comming soon...",
    subTitle: "More experiences will be added in the future...",
    link: "",
  },
  {
    cover:
      "https://i.scdn.co/image/ab67616d0000b2731fa702577139de8d7601431d",
    title: "Comming soon...",
    subTitle: "More experiences will be added in the future...",
    link: "",
  },  {
    cover:
      "https://i.scdn.co/image/ab67616d0000b2731fa702577139de8d7601431d",
    title: "Comming soon...",
    subTitle: "More experiences will be added in the future...",
    link: "",
  },
  
];


const onLoad = () => {
    const sun = document.getElementById("switch-light")
       const root = document.documentElement;
    
    sun.onclick = () => {
      theme ? console.log("dark") : console.log("light");
    
      if (theme) {
        
        root.style.setProperty("--bg", "rgb(20, 20, 20)");
        root.style.setProperty("--bg2", "rgb(73, 73, 73)");
        root.style.setProperty("--text", "rgb(200, 200, 200)");
        root.style.setProperty("--color1", "rgb(68, 68, 68)");
      } else {
        
        root.style.setProperty("--bg", "rgb(250, 250, 250)");
        root.style.setProperty("--bg2", "rgb(235, 235, 235)");
        root.style.setProperty("--text", "rgb(30, 30, 30)");
        root.style.setProperty("--color1", "rgb(200, 200, 200)");
      }
    
      theme = !theme;
    };
    

  const createGrid = () => {
    const grid = document.createElement("div");
    grid.className = "grid";
    document.body.appendChild(grid);

    const createContainer = (item) => {
      const newContainer = document.createElement("div");
      newContainer.className = "container";
     

      const link = document.createElement("a");
      link.href = item.link;
      if(item.link != ""){
        link.target = "_blank";
      }


      const containerTitle = document.createElement("h2");
      containerTitle.className = "container-title";
      containerTitle.innerText = item.title;

      const containerSubTitle = document.createElement("h4");
      containerSubTitle.className = "container-sub-title";
      containerSubTitle.innerText = item.subTitle;

      const img = document.createElement("img");
      img.src = item.cover;
      img.alt = item.title;
      img.className = "cover"; 

      link.appendChild(img);
      
      link.appendChild(containerTitle);  
      link.appendChild(containerSubTitle);  
      newContainer.appendChild(link);
      grid.appendChild(newContainer);
    };

    for (let i = 0; i < content.length; i++) {
      createContainer(content[i]);
    }
  };

  createGrid();

  requestAnimationFrame(() => {
    for (let container of containers) {
      container.style.transition = "transform 0.1s ease-in-out";
    }
  });
};

onLoad();
