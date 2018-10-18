class TypeWriter{
    constructor(txtElement,words,wait=3000) {
        this.txtElement = txtElement;
        this.words = words;
        this.txt ='';
        this.wordIndex = 0;
        this.wait = parseInt(wait,10);
        this.type();
        this.isDeleting = false;
    }


    type(){
        //Current Index of Words
        const current = this.wordIndex % this.words.length;
        //Geet full text of current word
        const fullTxt = this.words[current];

        //Check if Deleting
        if(this.isDeleting){
            //Remove Character
            this.txt = fullTxt.substring(0,this.txt.length-1);
        }else{
            //Add Character
            this.txt = fullTxt.substring(0,this.txt.length+1);
        }
        
        //Insert Txt into element
        this.txtElement.innerHTML = '<span class = "txt">'+this.txt+'</span>'

        //Initial Type Speed
        let typeSpeed = 200;

        if(this.isDeleting){
            typeSpeed /=2;
        }

        //If word is complete
        if(!this.isDeleting && this.txt === fullTxt){
            //Pause at end
            typeSpeed = this.wait;
            //Set delete to true
            this.isDeleting=true;
        }else if(this.isDeleting && this.txt === ''){
            //Set delete to false
            this.isDeleting=false;
            //Move to next word
            this.wordIndex++;
            //Pause Before start typing
            typeSpeed=500;
        }

        setTimeout(()=>this.type(),typeSpeed);
    }
}

//Initialize function on DOM load
document.addEventListener('DOMContentLoaded',init);
function init(){
    const txtElement = document.querySelector('.text');
    const words =JSON.parse(txtElement.getAttribute('data-words'));
    const wait = txtElement.getAttribute('data-wait');
    new TypeWriter( txtElement,words,wait);
}