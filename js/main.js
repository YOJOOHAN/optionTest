'use strict';
{

  const images=[
    "img/glayBack.png",
    "img/salaAnime.png",
    "img/salaCut.png",    
    "img/waku.png",
    "img/waku2.png",
  ];

  const AM = document.getElementById("AM");
  const power = document.getElementById("power");
  const cursor= document.getElementById("cursor");
  const wah= document.getElementById("wah");

  
  let bgmVolume =0.05
  let seVolume =0.05

  const preImage =document.getElementById("preImage")
  const loading =document.getElementById("loading")
  const loadingText= document.getElementById("loadingText")
  let imageIndex = 0
  
  //#region ロード画面

  const sala=document.getElementById("sala");
  setTimeout(() => {preImage.src="img/salaCut.png"
  },10);
  preImage.addEventListener("load",()=>{
    if(imageIndex<images.length-1){
      imageIndex++;
      preImage.src= images[imageIndex];
      loadingText.textContent=`画像を読み込み中(${imageIndex+1}/${images.length})`;
    }
    if(imageIndex===images.length-1){
      loadingText.textContent="click to start"
      loading.style.cursor="pointer"
      loading.addEventListener("click",()=>{
        loading.classList.add("active");
        loading.style.cursor="not-allowed";
        AM.loop =true;
        AM.volume =0.05;
        AM.play();
        sala.src="img/salaAnime.png";
        setTimeout(() => {loading.style.display="none"}, 1000)
       
      })
    }
  })
  //#endregion

  //#region BGMとSEの音量調節
  
  const bgmBar=document.getElementById("bgmBar");
  const bgmNum=document.getElementById("bgmNum");
  const seBar=document.getElementById("seBar");
  const seNum=document.getElementById("seNum");
  bgmBar.addEventListener("input",()=>{
    bgmVolume = bgmBar.value/1000;
    AM.volume = bgmVolume;
    bgmNum.textContent=bgmBar.value;
  })
  seBar.addEventListener("input",()=>{
    seVolume = seBar.value/1000;
    power.volume = seVolume;
    seNum.textContent=seBar.value;
    power.currentTime = 0;
    power.play();
  })


  //#endregion

  //#region メッセージ速度の調節とテキストの処理
    const speedNormal = document.getElementById("speedNormal");
    const speedFast = document.getElementById("speedFast");
    const speedFastest = document.getElementById("speedFastest");
    let messageSpeed = 50;

    speedNormal.classList.add("active");

    speedNormal.addEventListener("click",()=>{
      cursor.volume = seVolume;
      cursor.currentTime = 0;
      cursor.play();
      messageSpeed =50;
      speedNormal.classList.add("active");
      speedFast.classList.remove("active");
      speedFastest.classList.remove("active");
    })
    speedFast.addEventListener("click",()=>{
      cursor.volume = seVolume;
      cursor.currentTime = 0;
      cursor.play();
      messageSpeed =25;
      speedNormal.classList.remove("active");
      speedFast.classList.add("active");
      speedFastest.classList.remove("active");
    })
    speedFastest.addEventListener("click",()=>{
      cursor.volume = seVolume;
      cursor.currentTime = 0;
      cursor.play();
      messageSpeed =1;
      speedNormal.classList.remove("active");
      speedFast.classList.remove("active");
      speedFastest.classList.add("active");
    })

      //#region テキストの処理
      const messageBox = document.getElementById("messageBox");
      

      speedNormal.addEventListener("mouseover",()=>{
      const section = document.querySelector("section");
      messageBox.removeChild(section);
       textOrder("春はあけぼの　夏は夜b秋は夕暮れ　ケモショタはブリーフ",50)
      })
      speedFast.addEventListener("mouseover",()=>{
        const section = document.querySelector("section");
        messageBox.removeChild(section);
         textOrder("ドランゴンは断然、スリット派！bスリット最高！スリット最高！スリット最高！",25)
        })
      speedFastest.addEventListener("mouseover",()=>{
        const section = document.querySelector("section");
        messageBox.removeChild(section);
         textOrder("ドラゴンに乳首をつけるべきかbつけないべきか…それが問題だ…。",1)
        })
     
      function textOrder(rawText,orderMessageSpeed){
        let newElement = document.createElement("section");
        newElement.innerHTML="";
        messageBox.appendChild(newElement);
        let str =`${rawText}`;
        const arr =[...str];
        let i=0;
        let showText =()=>{   
          if(arr[i]!=="b"){newElement.innerHTML +=`${arr[i]}`};
          if(arr[i]==="b"){newElement.innerHTML+="<br>"}
          if(i>=arr.length-1){clearInterval(id)}
          i++;
        }
        let id =setInterval(showText,orderMessageSpeed);
      }

      
      //#endregion

      //#region 難易度の調整
      const difficultyEasy=document.getElementById("difficultyEasy");
      const difficultyNormal=document.getElementById("difficultyNormal");
      
      difficultyNormal.classList.add("active");

      let difficulty =1
      difficultyEasy.addEventListener("click",()=>{
        cursor.volume = seVolume;
        cursor.currentTime = 0;
        cursor.play();
        difficulty =0;
        difficultyEasy.classList.add("active");
        difficultyNormal.classList.remove("active");
      })
      difficultyNormal.addEventListener("click",()=>{
        cursor.volume = seVolume;
        cursor.currentTime = 0;
        cursor.play();
        difficulty =1;
        difficultyEasy.classList.remove("active");
        difficultyNormal.classList.add("active");
      })

      difficultyEasy.addEventListener("mouseover",()=>{
        const section = document.querySelector("section");
        messageBox.removeChild(section);
         textOrder("タイピングが苦手な人向けの難易度です。b制限時間２倍。bストーリーとイベント内容は難易度ノーマルとb変わりません。",messageSpeed)
        })
      difficultyNormal.addEventListener("mouseover",()=>{
        const section = document.querySelector("section");
        messageBox.removeChild(section);
         textOrder("通常の難易度です。",messageSpeed)
        })

      //#endregion


  //#endregion 

  //#region 戻るの処理
  const returnBtn = document.getElementById("return");
  returnBtn.addEventListener("mouseover",()=>{
   const section = document.querySelector("section");
   messageBox.removeChild(section);
   textOrder("このバージョンではb「戻る」ボタンは実装されていません。",messageSpeed)
  })

  //#endregion

  //#region キャラクタークリック
  sala.style.cursor="pointer"
  sala.addEventListener("click",()=>{
    wah.volume = seVolume;
    wah.currentTime = 1;
    wah.play();
  })
  //#endregion
}