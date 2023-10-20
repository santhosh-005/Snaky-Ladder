const clickSound=new Audio('assets/click-index.mp3')


document.body.addEventListener('click',()=>{
    clickSound.pause();
    clickSound.currentTime=0;
    clickSound.play()
})

document.getElementById('instruction').addEventListener('click',()=>{
    document.getElementById('instrutions-page').style.display='inherit'
    // console.log("hello")
})


document.getElementById('wrong-btn').addEventListener('click',()=>{
    document.getElementById('instrutions-page').style.display='none'
})

document.getElementById('play-btn').addEventListener('click',()=>{

    const name1=document.getElementById('name1').value;
    const name2=document.getElementById('name2').value;

    if(name1=="" || name2==""){
        alert("Enter your nicknames")
    }else{
        // storing players name on localStorage

        localStorage.setItem('player1',name1)
        localStorage.setItem('player2',name2)

        // redirecting to game page
        
        location.href='game.html'
    }
})

