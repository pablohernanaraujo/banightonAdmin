"use strict";angular.module("banightonAdminApp",["ngAnimate","ngCookies","ngResource","ngRoute","ngSanitize","ngTouch","angular-toArrayFilter","ngMessages","toggle-switch","validation.match","ImageCropper"]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl",controllerAs:"main"}).when("/clients",{templateUrl:"views/clients.html",controller:"ClientsCtrl",controllerAs:"clients"}).when("/clients/new",{templateUrl:"views/new.html",controller:"NewCtrl",controllerAs:"new"}).when("/about",{templateUrl:"views/about.html",controller:"AboutCtrl",controllerAs:"about"}).otherwise({redirectTo:"/"})}]),angular.module("banightonAdminApp").controller("MainCtrl",function(){}),angular.module("banightonAdminApp").controller("ClientsCtrl",["$scope","$http","$location","Password",function(a,b,c,d){a.$watch("client.password",function(b){a.passwordStrength=d.getStrength(b),console.log(d.getStrength(b)),a.isPasswordWeak()?a.clientForm.password.$setValidity("strength",!1):a.clientForm.password.$setValidity("strength",!0)}),a.isPasswordWeak=function(){return a.passwordStrength<40},a.isPasswordOk=function(){return a.passwordStrength>=40&&a.passwordStrength<=70},a.isPasswordStrong=function(){return a.passwordStrength>70},a.isInputValid=function(a){return a.$dirty&&a.$valid},a.isInputInvalid=function(a){return a.$dirty&&a.$invalid},b.get("http://banighton.com.ar/bno_php/clients.php").success(function(b){a.clients=b}),a.musics=[],a.add=function(){a.musics.push({inlineChecked:!1,question:"",questionPlaceholder:"more music",text:""})},a.remove=function(b){a.musics.splice(b,1)},a.saveClient=function(){b({method:"post",url:"http://banighton.com.ar/bno_php/addClient.php",data:$.param({user:a.tempUser,type:"save_client"}),headers:{"Content-Type":"application/x-www-form-urlencoded"}}).success(function(b,c,d,e){b.success?(a.editMode?(a.post.users[a.index].id=b.id,a.post.users[a.index].name=a.tempUser.name,a.post.users[a.index].email=a.tempUser.email,a.post.users[a.index].companyName=a.tempUser.companyName,a.post.users[a.index].designation=a.tempUser.designation):a.post.users.push({id:b.id,name:a.tempUser.name,email:a.tempUser.email,companyName:a.tempUser.companyName,designation:a.tempUser.designation}),a.messageSuccess(b.message),a.userForm.$setPristine(),a.tempUser={}):a.messageFailure(b.message)}).error(function(a,b,c,d){}),$(".btn-save").button("reset")},a.addClient=function(){$(".btn-save").button("loading"),a.saveClient()},$(":file").filestyle({placeholder:"No file"}),a.eliminarArchivo=function(a){console.log(a),"logo"===a&&$("#logo").filestyle("clear"),"image"===a&&$("#image").filestyle("clear")},a.fileChanged=function(b){$("#myModal").modal("toggle");var c=b.target.files,d=new FileReader;d.readAsDataURL(c[0]),d.onload=function(b){a.imgSrc=this.result,a.$apply()}},a.clear=function(){a.imageCropStep=1,delete a.imgSrc,delete a.result,delete a.resultBlob}}]),angular.module("banightonAdminApp").controller("AboutCtrl",function(){this.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}),angular.module("banightonAdminApp").factory("Password",function(){function a(a){var b=0;if(!a)return b;for(var c={},d=0;d<a.length;d++)c[a[d]]=(c[a[d]]||0)+1,b+=5/c[a[d]];var e={digits:/\d/.test(a),lower:/[a-z]/.test(a),upper:/[A-Z]/.test(a),nonWords:/\W/.test(a)},f=0;for(var g in e)f+=e[g]===!0?1:0;return b+=10*(f-1),b>100&&(b=100),parseInt(b)}return{getStrength:function(b){return a(b)}}}),function(a){var b=0,c=function(b,c){this.options=c,this.$elementFilestyle=[],this.$element=a(b)};c.prototype={clear:function(){this.$element.val(""),this.$elementFilestyle.find(":text").val(""),this.$elementFilestyle.find(".badge").remove()},destroy:function(){this.$element.removeAttr("style").removeData("filestyle"),this.$elementFilestyle.remove()},disabled:function(a){if(a===!0)this.options.disabled||(this.$element.attr("disabled","true"),this.$elementFilestyle.find("label").attr("disabled","true"),this.options.disabled=!0);else{if(a!==!1)return this.options.disabled;this.options.disabled&&(this.$element.removeAttr("disabled"),this.$elementFilestyle.find("label").removeAttr("disabled"),this.options.disabled=!1)}},buttonBefore:function(a){if(a===!0)this.options.buttonBefore||(this.options.buttonBefore=!0,this.options.input&&(this.$elementFilestyle.remove(),this.constructor(),this.pushNameFiles()));else{if(a!==!1)return this.options.buttonBefore;this.options.buttonBefore&&(this.options.buttonBefore=!1,this.options.input&&(this.$elementFilestyle.remove(),this.constructor(),this.pushNameFiles()))}},icon:function(a){if(a===!0)this.options.icon||(this.options.icon=!0,this.$elementFilestyle.find("label").prepend(this.htmlIcon()));else{if(a!==!1)return this.options.icon;this.options.icon&&(this.options.icon=!1,this.$elementFilestyle.find(".icon-span-filestyle").remove())}},input:function(a){if(a===!0)this.options.input||(this.options.input=!0,this.options.buttonBefore?this.$elementFilestyle.append(this.htmlInput()):this.$elementFilestyle.prepend(this.htmlInput()),this.$elementFilestyle.find(".badge").remove(),this.pushNameFiles(),this.$elementFilestyle.find(".group-span-filestyle").addClass("input-group-btn"));else{if(a!==!1)return this.options.input;if(this.options.input){this.options.input=!1,this.$elementFilestyle.find(":text").remove();var b=this.pushNameFiles();b.length>0&&this.options.badge&&this.$elementFilestyle.find("label").append(' <span class="badge">'+b.length+"</span>"),this.$elementFilestyle.find(".group-span-filestyle").removeClass("input-group-btn")}}},size:function(a){if(void 0===a)return this.options.size;var b=this.$elementFilestyle.find("label"),c=this.$elementFilestyle.find("input");b.removeClass("btn-lg btn-sm"),c.removeClass("input-lg input-sm"),"nr"!=a&&(b.addClass("btn-"+a),c.addClass("input-"+a))},placeholder:function(a){return void 0===a?this.options.placeholder:(this.options.placeholder=a,void this.$elementFilestyle.find("input").attr("placeholder",a))},buttonText:function(a){return void 0===a?this.options.buttonText:(this.options.buttonText=a,void this.$elementFilestyle.find("label .buttonText").html(this.options.buttonText))},buttonName:function(a){return void 0===a?this.options.buttonName:(this.options.buttonName=a,void this.$elementFilestyle.find("label").attr({"class":"btn "+this.options.buttonName}))},iconName:function(a){return void 0===a?this.options.iconName:void this.$elementFilestyle.find(".icon-span-filestyle").attr({"class":"icon-span-filestyle "+this.options.iconName})},htmlIcon:function(){return this.options.icon?'<span class="icon-span-filestyle '+this.options.iconName+'"></span> ':""},htmlInput:function(){return this.options.input?'<input type="text" class="form-control '+("nr"==this.options.size?"":"input-"+this.options.size)+'" placeholder="'+this.options.placeholder+'" disabled> ':""},pushNameFiles:function(){var a="",b=[];void 0===this.$element[0].files?b[0]={name:this.$element[0]&&this.$element[0].value}:b=this.$element[0].files;for(var c=0;c<b.length;c++)a+=b[c].name.split("\\").pop()+", ";return""!==a?this.$elementFilestyle.find(":text").val(a.replace(/\, $/g,"")):this.$elementFilestyle.find(":text").val(""),b},constructor:function(){var c=this,d="",e=c.$element.attr("id"),f="";""!==e&&e||(e="filestyle-"+b,c.$element.attr({id:e}),b++),f='<span class="group-span-filestyle '+(c.options.input?"input-group-btn":"")+'"><label for="'+e+'" class="btn '+c.options.buttonName+" "+("nr"==c.options.size?"":"btn-"+c.options.size)+'" '+(c.options.disabled?'disabled="true"':"")+">"+c.htmlIcon()+'<span class="buttonText">'+c.options.buttonText+"</span></label></span>",d=c.options.buttonBefore?f+c.htmlInput():c.htmlInput()+f,c.$elementFilestyle=a('<div class="bootstrap-filestyle input-group">'+d+"</div>"),c.$elementFilestyle.find(".group-span-filestyle").attr("tabindex","0").keypress(function(a){return 13===a.keyCode||32===a.charCode?(c.$elementFilestyle.find("label").click(),!1):void 0}),c.$element.css({position:"absolute",clip:"rect(0px 0px 0px 0px)"}).attr("tabindex","-1").after(c.$elementFilestyle),c.options.disabled&&c.$element.attr("disabled","true"),c.$element.change(function(){var a=c.pushNameFiles();0==c.options.input&&c.options.badge?0==c.$elementFilestyle.find(".badge").length?c.$elementFilestyle.find("label").append(' <span class="badge">'+a.length+"</span>"):0==a.length?c.$elementFilestyle.find(".badge").remove():c.$elementFilestyle.find(".badge").html(a.length):c.$elementFilestyle.find(".badge").remove()}),window.navigator.userAgent.search(/firefox/i)>-1&&c.$elementFilestyle.find("label").click(function(){return c.$element.click(),!1})}};var d=a.fn.filestyle;a.fn.filestyle=function(b,d){var e="",f=this.each(function(){if("file"===a(this).attr("type")){var f=a(this),g=f.data("filestyle"),h=a.extend({},a.fn.filestyle.defaults,b,"object"==typeof b&&b);g||(f.data("filestyle",g=new c(this,h)),g.constructor()),"string"==typeof b&&(e=g[b](d))}});return void 0!==typeof e?e:f},a.fn.filestyle.defaults={buttonText:"Choose file",iconName:"glyphicon glyphicon-folder-open",buttonName:"btn-default",size:"nr",input:!0,badge:!0,icon:!0,buttonBefore:!1,disabled:!1,placeholder:""},a.fn.filestyle.noConflict=function(){return a.fn.filestyle=d,this},a(function(){a(".filestyle").each(function(){var b=a(this),c={input:"false"===b.attr("data-input")?!1:!0,icon:"false"===b.attr("data-icon")?!1:!0,buttonBefore:"true"===b.attr("data-buttonBefore")?!0:!1,disabled:"true"===b.attr("data-disabled")?!0:!1,size:b.attr("data-size"),buttonText:b.attr("data-buttonText"),buttonName:b.attr("data-buttonName"),iconName:b.attr("data-iconName"),badge:"false"===b.attr("data-badge")?!1:!0,placeholder:b.attr("data-placeholder")};b.filestyle(c)})})}(window.jQuery),function(){var a=function(a,b,c){var d=a,e=b||0,f=0;this.getRawData=function(){return d},"string"==typeof a?(f=c||d.length,this.getByteAt=function(a){return 255&d.charCodeAt(a+e)},this.getBytesAt=function(a,b){for(var c=[],f=0;b>f;f++)c[f]=255&d.charCodeAt(a+f+e);return c}):"unknown"==typeof a&&(f=c||IEBinary_getLength(d),this.getByteAt=function(a){return IEBinary_getByteAt(d,a+e)},this.getBytesAt=function(a,b){return new VBArray(IEBinary_getBytesAt(d,a+e,b)).toArray()}),this.getLength=function(){return f},this.getSByteAt=function(a){var b=this.getByteAt(a);return b>127?b-256:b},this.getShortAt=function(a,b){var c=b?(this.getByteAt(a)<<8)+this.getByteAt(a+1):(this.getByteAt(a+1)<<8)+this.getByteAt(a);return 0>c&&(c+=65536),c},this.getSShortAt=function(a,b){var c=this.getShortAt(a,b);return c>32767?c-65536:c},this.getLongAt=function(a,b){var c=this.getByteAt(a),d=this.getByteAt(a+1),e=this.getByteAt(a+2),f=this.getByteAt(a+3),g=b?(((c<<8)+d<<8)+e<<8)+f:(((f<<8)+e<<8)+d<<8)+c;return 0>g&&(g+=4294967296),g},this.getSLongAt=function(a,b){var c=this.getLongAt(a,b);return c>2147483647?c-4294967296:c},this.getStringAt=function(a,b){for(var c=[],d=this.getBytesAt(a,b),e=0;b>e;e++)c[e]=String.fromCharCode(d[e]);return c.join("")},this.getCharAt=function(a){return String.fromCharCode(this.getByteAt(a))},this.toBase64=function(){return window.btoa(d)},this.fromBase64=function(a){d=window.atob(a)}},b=function(){function a(a){return!!a.exifdata}function b(a,b){BinaryAjax(a.src,function(d){var e=c(d.binaryResponse);a.exifdata=e||{},b&&b.call(a)})}function c(a){if(255!=a.getByteAt(0)||216!=a.getByteAt(1))return!1;for(var b,c=2,d=a.getLength();d>c;){if(255!=a.getByteAt(c))return l&&console.log("Not a valid marker at offset "+c+", found: "+a.getByteAt(c)),!1;if(b=a.getByteAt(c+1),22400==b)return l&&console.log("Found 0xFFE1 marker"),f(a,c+4,a.getShortAt(c+2,!0)-2);if(225==b)return l&&console.log("Found 0xFFE1 marker"),f(a,c+4,a.getShortAt(c+2,!0)-2);c+=2+a.getShortAt(c+2,!0)}}function d(a,b,c,d,f){var g,h,i,j=a.getShortAt(c,f),k={};for(i=0;j>i;i++)g=c+12*i+2,h=d[a.getShortAt(g,f)],!h&&l&&console.log("Unknown tag: "+a.getShortAt(g,f)),k[h]=e(a,g,b,c,f);return k}function e(a,b,c,d,e){var f,g,h,i,j,k,l=a.getShortAt(b+2,e),m=a.getLongAt(b+4,e),n=a.getLongAt(b+8,e)+c;switch(l){case 1:case 7:if(1==m)return a.getByteAt(b+8,e);for(f=m>4?n:b+8,g=[],i=0;m>i;i++)g[i]=a.getByteAt(f+i);return g;case 2:return f=m>4?n:b+8,a.getStringAt(f,m-1);case 3:if(1==m)return a.getShortAt(b+8,e);for(f=m>2?n:b+8,g=[],i=0;m>i;i++)g[i]=a.getShortAt(f+2*i,e);return g;case 4:if(1==m)return a.getLongAt(b+8,e);g=[];for(var i=0;m>i;i++)g[i]=a.getLongAt(n+4*i,e);return g;case 5:if(1==m)return j=a.getLongAt(n,e),k=a.getLongAt(n+4,e),h=new Number(j/k),h.numerator=j,h.denominator=k,h;for(g=[],i=0;m>i;i++)j=a.getLongAt(n+8*i,e),k=a.getLongAt(n+4+8*i,e),g[i]=new Number(j/k),g[i].numerator=j,g[i].denominator=k;return g;case 9:if(1==m)return a.getSLongAt(b+8,e);for(g=[],i=0;m>i;i++)g[i]=a.getSLongAt(n+4*i,e);return g;case 10:if(1==m)return a.getSLongAt(n,e)/a.getSLongAt(n+4,e);for(g=[],i=0;m>i;i++)g[i]=a.getSLongAt(n+8*i,e)/a.getSLongAt(n+4+8*i,e);return g}}function f(a,b){if("Exif"!=a.getStringAt(b,4))return l&&console.log("Not valid EXIF data! "+a.getStringAt(b,4)),!1;var c,e,f,g,h,i=b+6;if(18761==a.getShortAt(i))c=!1;else{if(19789!=a.getShortAt(i))return l&&console.log("Not valid TIFF data! (no 0x4949 or 0x4D4D)"),!1;c=!0}if(42!=a.getShortAt(i+2,c))return l&&console.log("Not valid TIFF data! (no 0x002A)"),!1;if(8!=a.getLongAt(i+4,c))return l&&console.log("Not valid TIFF data! (First offset not 8)",a.getShortAt(i+4,c)),!1;if(e=d(a,i,i+8,n,c),e.ExifIFDPointer){g=d(a,i,i+e.ExifIFDPointer,m,c);for(f in g){switch(f){case"LightSource":case"Flash":case"MeteringMode":case"ExposureProgram":case"SensingMethod":case"SceneCaptureType":case"SceneType":case"CustomRendered":case"WhiteBalance":case"GainControl":case"Contrast":case"Saturation":case"Sharpness":case"SubjectDistanceRange":case"FileSource":g[f]=p[f][g[f]];break;case"ExifVersion":case"FlashpixVersion":g[f]=String.fromCharCode(g[f][0],g[f][1],g[f][2],g[f][3]);break;case"ComponentsConfiguration":g[f]=p.Components[g[f][0]]+p.Components[g[f][1]]+p.Components[g[f][2]]+p.Components[g[f][3]]}e[f]=g[f]}}if(e.GPSInfoIFDPointer){h=d(a,i,i+e.GPSInfoIFDPointer,o,c);for(f in h){switch(f){case"GPSVersionID":h[f]=h[f][0]+"."+h[f][1]+"."+h[f][2]+"."+h[f][3]}e[f]=h[f]}}return e}function g(c,d){return c.complete?(a(c)?d&&d.call(c):b(c,d),!0):!1}function h(b,c){return a(b)?b.exifdata[c]:void 0}function i(b){if(!a(b))return{};var c,d=b.exifdata,e={};for(c in d)d.hasOwnProperty(c)&&(e[c]=d[c]);return e}function j(b){if(!a(b))return"";var c,d=b.exifdata,e="";for(c in d)d.hasOwnProperty(c)&&(e+="object"==typeof d[c]?d[c]instanceof Number?c+" : "+d[c]+" ["+d[c].numerator+"/"+d[c].denominator+"]\r\n":c+" : ["+d[c].length+" values]\r\n":c+" : "+d[c]+"\r\n");return e}function k(a){return c(a)}var l=!1,m={36864:"ExifVersion",40960:"FlashpixVersion",40961:"ColorSpace",40962:"PixelXDimension",40963:"PixelYDimension",37121:"ComponentsConfiguration",37122:"CompressedBitsPerPixel",37500:"MakerNote",37510:"UserComment",40964:"RelatedSoundFile",36867:"DateTimeOriginal",36868:"DateTimeDigitized",37520:"SubsecTime",37521:"SubsecTimeOriginal",37522:"SubsecTimeDigitized",33434:"ExposureTime",33437:"FNumber",34850:"ExposureProgram",34852:"SpectralSensitivity",34855:"ISOSpeedRatings",34856:"OECF",37377:"ShutterSpeedValue",37378:"ApertureValue",37379:"BrightnessValue",37380:"ExposureBias",37381:"MaxApertureValue",37382:"SubjectDistance",37383:"MeteringMode",37384:"LightSource",37385:"Flash",37396:"SubjectArea",37386:"FocalLength",41483:"FlashEnergy",41484:"SpatialFrequencyResponse",41486:"FocalPlaneXResolution",41487:"FocalPlaneYResolution",41488:"FocalPlaneResolutionUnit",41492:"SubjectLocation",41493:"ExposureIndex",41495:"SensingMethod",41728:"FileSource",41729:"SceneType",41730:"CFAPattern",41985:"CustomRendered",41986:"ExposureMode",41987:"WhiteBalance",41988:"DigitalZoomRation",41989:"FocalLengthIn35mmFilm",41990:"SceneCaptureType",41991:"GainControl",41992:"Contrast",41993:"Saturation",41994:"Sharpness",41995:"DeviceSettingDescription",41996:"SubjectDistanceRange",40965:"InteroperabilityIFDPointer",42016:"ImageUniqueID"},n={256:"ImageWidth",257:"ImageHeight",34665:"ExifIFDPointer",34853:"GPSInfoIFDPointer",40965:"InteroperabilityIFDPointer",258:"BitsPerSample",259:"Compression",262:"PhotometricInterpretation",274:"Orientation",277:"SamplesPerPixel",284:"PlanarConfiguration",530:"YCbCrSubSampling",531:"YCbCrPositioning",282:"XResolution",283:"YResolution",296:"ResolutionUnit",273:"StripOffsets",278:"RowsPerStrip",279:"StripByteCounts",513:"JPEGInterchangeFormat",514:"JPEGInterchangeFormatLength",301:"TransferFunction",318:"WhitePoint",319:"PrimaryChromaticities",529:"YCbCrCoefficients",532:"ReferenceBlackWhite",306:"DateTime",270:"ImageDescription",271:"Make",272:"Model",305:"Software",315:"Artist",33432:"Copyright"},o={0:"GPSVersionID",1:"GPSLatitudeRef",2:"GPSLatitude",3:"GPSLongitudeRef",4:"GPSLongitude",5:"GPSAltitudeRef",6:"GPSAltitude",7:"GPSTimeStamp",8:"GPSSatellites",9:"GPSStatus",10:"GPSMeasureMode",11:"GPSDOP",12:"GPSSpeedRef",13:"GPSSpeed",14:"GPSTrackRef",15:"GPSTrack",16:"GPSImgDirectionRef",17:"GPSImgDirection",18:"GPSMapDatum",19:"GPSDestLatitudeRef",20:"GPSDestLatitude",21:"GPSDestLongitudeRef",22:"GPSDestLongitude",23:"GPSDestBearingRef",24:"GPSDestBearing",25:"GPSDestDistanceRef",26:"GPSDestDistance",27:"GPSProcessingMethod",28:"GPSAreaInformation",29:"GPSDateStamp",30:"GPSDifferential"},p={ExposureProgram:{0:"Not defined",1:"Manual",2:"Normal program",3:"Aperture priority",4:"Shutter priority",5:"Creative program",6:"Action program",7:"Portrait mode",8:"Landscape mode"},MeteringMode:{0:"Unknown",1:"Average",2:"CenterWeightedAverage",3:"Spot",4:"MultiSpot",5:"Pattern",6:"Partial",255:"Other"},LightSource:{0:"Unknown",1:"Daylight",2:"Fluorescent",3:"Tungsten (incandescent light)",4:"Flash",9:"Fine weather",10:"Cloudy weather",11:"Shade",12:"Daylight fluorescent (D 5700 - 7100K)",13:"Day white fluorescent (N 4600 - 5400K)",14:"Cool white fluorescent (W 3900 - 4500K)",15:"White fluorescent (WW 3200 - 3700K)",17:"Standard light A",18:"Standard light B",19:"Standard light C",20:"D55",21:"D65",22:"D75",23:"D50",24:"ISO studio tungsten",255:"Other"},Flash:{0:"Flash did not fire",1:"Flash fired",5:"Strobe return light not detected",7:"Strobe return light detected",9:"Flash fired, compulsory flash mode",13:"Flash fired, compulsory flash mode, return light not detected",15:"Flash fired, compulsory flash mode, return light detected",16:"Flash did not fire, compulsory flash mode",24:"Flash did not fire, auto mode",25:"Flash fired, auto mode",29:"Flash fired, auto mode, return light not detected",31:"Flash fired, auto mode, return light detected",32:"No flash function",65:"Flash fired, red-eye reduction mode",69:"Flash fired, red-eye reduction mode, return light not detected",71:"Flash fired, red-eye reduction mode, return light detected",73:"Flash fired, compulsory flash mode, red-eye reduction mode",77:"Flash fired, compulsory flash mode, red-eye reduction mode, return light not detected",79:"Flash fired, compulsory flash mode, red-eye reduction mode, return light detected",89:"Flash fired, auto mode, red-eye reduction mode",93:"Flash fired, auto mode, return light not detected, red-eye reduction mode",95:"Flash fired, auto mode, return light detected, red-eye reduction mode"},SensingMethod:{1:"Not defined",2:"One-chip color area sensor",3:"Two-chip color area sensor",4:"Three-chip color area sensor",5:"Color sequential area sensor",7:"Trilinear sensor",8:"Color sequential linear sensor"},SceneCaptureType:{0:"Standard",1:"Landscape",2:"Portrait",3:"Night scene"},SceneType:{1:"Directly photographed"},CustomRendered:{0:"Normal process",1:"Custom process"},WhiteBalance:{0:"Auto white balance",1:"Manual white balance"},GainControl:{0:"None",1:"Low gain up",2:"High gain up",3:"Low gain down",4:"High gain down"},Contrast:{0:"Normal",1:"Soft",2:"Hard"},Saturation:{0:"Normal",1:"Low saturation",2:"High saturation"},Sharpness:{0:"Normal",1:"Soft",2:"Hard"},SubjectDistanceRange:{0:"Unknown",1:"Macro",2:"Close view",3:"Distant view"},FileSource:{3:"DSC"},Components:{0:"",1:"Y",2:"Cb",3:"Cr",4:"R",5:"G",6:"B"}};return{readFromBinaryFile:k,pretty:j,getTag:h,getAllTags:i,getData:g,Tags:m,TiffTags:n,GPSTags:o,StringValues:p}}();angular.module("ImageCropper",[]).directive("imageCrop",function(){return{template:'<div id="image-crop-{{ rand }}" class="ng-image-crop ng-image-crop--{{ shape }}" ng-style="moduleStyles"><section ng-style="sectionStyles" ng-show="step==1"></section><section ng-style="sectionStyles" ng-show="step==2"><canvas class="cropping-canvas" width="{{ canvasWidth }}" height="{{ canvasHeight }}" ng-mousemove="onCanvasMouseMove($event)" ng-mousedown="onCanvasMouseDown($event)"></canvas><div ng-style="croppingGuideStyles" class="cropping-guide"></div><div class="zoom-handle" ng-mousemove="onHandleMouseMove($event)" ng-mousedown="onHandleMouseDown($event)" ng-mouseup="onHandleMouseUp($event)"><span>&larr; zoom &rarr;</span></div></section><section ng-style="sectionStyles" class="image-crop-section-final" ng-show="step==3"><img class="image-crop-final" ng-src="{{ croppedDataUri }}" /></section></div>',replace:!0,restrict:"AE",scope:{crop:"=",width:"@",height:"@",shape:"@",src:"=",resultBlob:"=",result:"=",step:"=",padding:"@",maxSize:"@"},link:function(c,d,e){function f(a){return new Promise(function(b,c){if(!U)return b(a);var d=new Image;d.src=a,d.onload=function(){var c=d.height,e=d.width;if(U>=c&&U>=e)return b(a);var f=e/c;f>1?(e=U,c=U/f):(e=U*f,c=U),e=Math.round(e),c=Math.round(c);var g=document.createElement("canvas");g.width=e,g.height=c;var h=g.getContext("2d");h.drawImage(d,0,0,d.width,d.height,0,0,g.width,g.height),h.save();var i=g.toDataURL();b(i)}})}function g(a,b){return new Promise(function(c,d){var e=new Image;e.src=a,e.onload=function(){var a=document.createElement("canvas");b.Orientation>=5?(a.width=e.height,a.height=e.width):(a.width=e.width,a.height=e.height);var d=a.getContext("2d");switch(b.Orientation){case 1:break;case 2:d.translate(e.width,0),d.scale(-1,1);break;case 3:d.translate(e.width,e.height),d.rotate(Math.PI);break;case 4:d.translate(0,e.height),d.scale(1,-1);break;case 5:d.rotate(.5*Math.PI),d.scale(1,-1);break;case 6:d.rotate(.5*Math.PI),d.translate(0,-e.height);break;case 7:d.rotate(.5*Math.PI),d.translate(e.width,-e.height),d.scale(-1,1);break;case 8:d.rotate(-.5*Math.PI),d.translate(-e.width,0)}d.drawImage(e,0,0),d.save();var f=a.toDataURL();c(f)}})}function h(c){var d=atob(c.split(",")[1]),e=new a(d,0,d.length);X=b.readFromBinaryFile(e),f(c).then(function(a){return X&&X.Orientation&&X.Orientation>1?g(a,X):a}).then(function(a){w.src=a})["catch"](function(a){console.log(a)})}function i(){Y=[],M=1,C=0,D=0,E=!1,F=0,G=0,H=!1,W.clearRect(0,0,t.width,t.height),w.src=""}function j(a,b){return a=Q>a?Q:a,a=a>R?R:a,b=S>b?S:b,b=b>T?T:b,K=a,L=b,W.clearRect(0,0,t.width,t.height),W.drawImage(w,a,b,I,J),a==Q||a==R||b==S||b==T}function k(a){return Math.round(1e3*a)/1e3}function l(){Q=t.width-w.width*M-r/2,S=t.height-w.height*M-r/2}function m(a){if(a){var b=k(M+a);if(!(O>b||b>P)){M=b,l(),I=w.width*M,J=w.height*M;var c=C*M,d=D*M;Q>c?c=Q:c>R&&(c=R),S>d?d=S:d>T&&(d=T),W.clearRect(0,0,t.width,t.height),W.drawImage(w,c,d,I,J)}}}function n(a,b){var c=Math.sqrt(Math.pow(a,2)+Math.pow(b,2)),d=k(c/N),e=k((P-O)*d*V);return a>0?-e:e}function o(a){var b,c;b=-1!==a.split(",")[0].indexOf("base64")?atob(a.split(",")[1]):decodeURI(a.split(",")[1]),c=a.split(",")[0].split(":")[1].split(";")[0];for(var d=new Array,e=0;e<b.length;e++)d[e]=b.charCodeAt(e);return new Blob([new Uint8Array(d)],{type:c})}function p(a,b){document.documentElement.addEventListener(a,b,!1)}function q(a,b){document.documentElement.removeEventListener(a,b)}var r=c.padding?Number(c.padding):200;c.rand=Math.round(99999*Math.random()),c.step=c.step||1,c.shape=c.shape||"circle",c.width=parseInt(c.width,10)||300,c.height=parseInt(c.height,10)||300,c.canvasWidth=c.width+r,c.canvasHeight=c.height+r;var s=d[0],t=s.getElementsByClassName("cropping-canvas")[0],u=s.getElementsByClassName("zoom-handle")[0],v=s.getElementsByClassName("image-crop-final")[0],w=new Image,x=new FileReader,y=0,z=0,A=0,B=0,C=0,D=0,E=!1,F=0,G=0,H=!1,I=A,J=B,K=0,L=0,M=1,N=0,O=0,P=2,Q=0,R=r/2,S=0,T=r/2,U=c.maxSize?Number(c.maxSize):null,V=.6,W=t.getContext("2d"),X=null,Y=[];c.moduleStyles={width:c.width+r+"px",height:c.height+r+"px"},c.sectionStyles={width:c.width+r+"px",height:c.height+r+"px"},c.croppingGuideStyles={width:c.width+"px",height:c.height+"px",top:r/2+"px",left:r/2+"px"},x.onload=function(a){h(this.resultBlob)},w.onload=function(){c.step=2,c.$apply(),W.drawImage(w,0,0),A=w.width,B=w.height,y=c.width+r-this.width,z=c.height+r-this.height,I=A,J=B,O=A>=B?(t.height-r)/B:(t.width-r)/A,N=k(Math.sqrt(Math.pow(t.width,2)+Math.pow(t.height,2))),l();var a=Math.round((Q+R)/2),b=Math.round((S+T)/2);j(a,b)},c.$watch("src",function(){c.src?3!=c.step&&("Blob"==typeof c.src?x.readAsDataURL(c.src):h(c.src)):(c.step=1,i())}),c.$watch("crop",function(){c.crop&&(c.doCrop(),c.crop=!1)}),v.onload=function(){var a=document.createElement("canvas");a.width=this.width-r,a.height=this.height-r,a.style.display="none";var b=a.getContext("2d");b.drawImage(v,-(r/2),-(r/2)),s.getElementsByClassName("image-crop-section-final")[0].appendChild(a);var d=a.toDataURL();c.result=d,c.resultBlob=o(d),c.$apply()},c.doCrop=function(){c.croppedDataUri=t.toDataURL(),c.step=3},c.onCanvasMouseUp=function(a){E&&(a.preventDefault(),a.stopPropagation(),F=0,G=0,E=!1,C=K,D=L,q("mouseup",c.onCanvasMouseUp),q("touchend",c.onCanvasMouseUp),q("mousemove",c.onCanvasMouseMove),q("touchmove",c.onCanvasMouseMove))},t.addEventListener("touchend",c.onCanvasMouseUp,!1),c.onCanvasMouseDown=function(a){F="touchstart"===a.type?a.changedTouches[0].clientX:a.clientX,G="touchstart"===a.type?a.changedTouches[0].clientY:a.clientY,H=!1,E=!0,p("mouseup",c.onCanvasMouseUp),p("mousemove",c.onCanvasMouseMove)},t.addEventListener("touchstart",c.onCanvasMouseDown,!1),c.onHandleMouseDown=function(a){a.preventDefault(),a.stopPropagation(),F=Z="touchstart"===a.type?a.changedTouches[0].clientX:a.clientX,G=$="touchstart"===a.type?a.changedTouches[0].clientY:a.clientY,E=!1,H=!0,p("mouseup",c.onHandleMouseUp),p("touchend",c.onHandleMouseUp),p("mousemove",c.onHandleMouseMove),p("touchmove",c.onHandleMouseMove)},u.addEventListener("touchstart",c.onHandleMouseDown,!1),c.onHandleMouseUp=function(a){H&&(a.preventDefault(),a.stopPropagation(),F=0,G=0,H=!1,C=K,D=L,q("mouseup",c.onHandleMouseUp),q("touchend",c.onHandleMouseUp),q("mousemove",c.onHandleMouseMove),q("touchmove",c.onHandleMouseMove))},u.addEventListener("touchend",c.onHandleMouseUp,!1),c.onCanvasMouseMove=function(a){if(a.preventDefault(),a.stopPropagation(),E){var b=F-("touchmove"===a.type?a.changedTouches[0].clientX:a.clientX),c=G-("touchmove"===a.type?a.changedTouches[0].clientY:a.clientY);j(C-b,D-c)}},t.addEventListener("touchmove",c.onCanvasMouseMove,!1);var Z=null,$=null;c.onHandleMouseMove=function(a){if(a.stopPropagation(),a.preventDefault(),!H)return!1;var b=Z-("touchmove"===a.type?a.changedTouches[0].clientX:a.clientX),c=$-("touchmove"===a.type?a.changedTouches[0].clientY:a.clientY);Z="touchmove"===a.type?a.changedTouches[0].clientX:a.clientX,$="touchmove"===a.type?a.changedTouches[0].clientY:a.clientY;var d=n(b,c);m(d)},u.addEventListener("touchmove",c.onHandleMouseMove,!1),c.onHandleMouseWheel=function(a){a.preventDefault(),m(a.deltaY>0?-.05:.05)},t.addEventListener("mousewheel",c.onHandleMouseWheel),u.addEventListener("mousewheel",c.onHandleMouseWheel)}}})}(),angular.module("banightonAdminApp").run(["$templateCache",function(a){a.put("views/about.html","<p>This is the about view.</p>"),a.put("views/client.html","<h2>Client</h2>"),a.put("views/clients.html",'<div class="row mt80"> <div class="col-xs-12 col-sm-4 col-md-4 col-lg-4 animated fadeInDown"> <form name="clientForm" novalidate> <div class="form-group"> <label>Djs</label> <toggle-switch ng-model="switchStatus" on-label="<" off-label=">"> </toggle-switch> <label>Boliches</label> </div> <div class="form-group has-feedback" ng-class="{\'has-error\':clientForm.email.$dirty && clientForm.email.$invalid, \'has-success\':clientForm.email.$valid && clientForm.email.$dirty}"> <label for="email">Email</label> <input type="email" class="form-control" id="email" name="email" placeholder="Email" data-ng-model="client.email" required> <span class="glyphicon glyphicon-remove form-control-feedback" ng-show="clientForm.email.$dirty && clientForm.email.$invalid"></span> <span class="glyphicon glyphicon glyphicon-ok form-control-feedback" ng-show="clientForm.email.$valid && clientForm.email.$dirty"></span> </div> <p class="help-block" ng-show="clientForm.email.$dirty && clientForm.email.$error.required">Campo obligatorio</p> <p class="help-block" ng-show="clientForm.email.$dirty && clientForm.email.$error.email">Email invalido</p> <div class="form-group has-feedback" ng-class="{\'has-error\': isInputInvalid(clientForm.password), \'has-success\': isInputValid(clientForm.password)}"> <label for="password">Password</label> <input type="password" class="form-control" id="password" name="password" placeholder="Password" ng-model="client.password" required> <span class="glyphicon glyphicon-remove form-control-feedback" ng-show="clientForm.password.$dirty && clientForm.password.$invalid"></span> <span class="glyphicon glyphicon glyphicon-ok form-control-feedback" ng-show="clientForm.password.$valid && clientForm.password.$dirty"></span> <div class="progress" style="margin-top:5px"> <div class="progress-bar" ng-class="{\'progress-bar-success\': isPasswordStrong(), \'progress-bar-warning\': isPasswordOk(), \'progress-bar-danger\': isPasswordWeak()}" aria-valuenow="{{passwordStrength}}" aria-valuemin="0" aria-valuemax="100" style="width:{{passwordStrength}}%"> </div> </div> <p class="help-block" ng-show="clientForm.password.$dirty && clientForm.password.$error.required">Campo obligatorio</p> </div> <div class="form-group has-feedback" ng-class="{\'has-error\':clientForm.confirmPassword.$dirty && clientForm.confirmPassword.$error.match, \'has-success\':!clientForm.confirmPassword.$error.match && clientForm.confirmPassword.$dirty}"> <label for="confirmPassword">Confirm password</label> <input type="password" class="form-control" id="confirmPassword" name="confirmPassword" placeholder="Confirm password" required ng-model="client.confirmPassword" match="client.password" not-match="true"> <span class="glyphicon glyphicon-remove form-control-feedback" ng-show="clientForm.confirmPassword.$dirty && clientForm.confirmPassword.$error.match"></span> <span class="glyphicon glyphicon glyphicon-ok form-control-feedback" ng-show="!clientForm.confirmPassword.$error.match && clientForm.confirmPassword.$dirty"></span> </div> <div class="form-group"> <label for="name">Name</label> <input type="text" class="form-control" id="name" name="name" placeholder="Name" data-ng-model="client.name"> </div> <div class="form-group" ng-show="!switchStatus"> <label for="address">Address</label> <input type="text" class="form-control" id="address" name="address" placeholder="Address" data-ng-model="client.address"> </div> <div class="form-group has-feedback" ng-show="!switchStatus"> <label for="homePhone">Home Phone</label> <input type="text" class="form-control" id="homePhone" name="homePhone" placeholder="Home Phone" data-ng-model="client.homePhone"> </div> <div class="form-group"> <label for="cellPhone">Cell Phone</label> <input type="text" class="form-control" id="cellPhone" name="cellPhone" placeholder="Cell Phone" data-ng-model="cliente.cellPhone"> </div> <div class="form-group"> <label for="music">Music</label> <div class="input-group"> <input type="text" class="form-control" id="music" name="music" placeholder="Music" data-ng-model="client.music"> <span class="input-group-btn" style="top:-1px"> <button class="btn btn-default glyphicon glyphicon-plus" type="button" data-ng-click="add()"></button> </span> </div> </div> <div class="form-group" ng-repeat="music in musics"> <div class="input-group"> <input type="text" class="form-control" id="music" name="music" placeholder="{{music.questionPlaceholder}}" ng-model="music.question"> <span class="input-group-btn" style="top:-1px"> <button class="btn btn-default glyphicon glyphicon-remove btn-danger" type="button" data-ng-click="remove($index)"></button> </span> </div> </div> <div class="form-group" ng-show="!switchStatus"> <label for="aniversary">Aniversary</label> <input type="text" class="form-control" id="aniversary" name="aniversary" placeholder="Aniversary" data-ng-model="client.aniversary"> </div> <div class="form-group" ng-show="switchStatus"> <label for="birthday">Birthday</label> <input type="text" class="form-control" id="birthday" name="birthday" placeholder="Birthday" data-ng-model="client.birthday"> </div> <div class="form-group"> <label for="website">Website</label> <input type="url" class="form-control" id="website" name="website" placeholder="Website" data-ng-model="client.website"> </div> <div class="form-group" ng-show="imageCropStep == 1"> <label for="logo">logo</label> <div class="input-group"> <span class="input-group-btn" style="top:-1px"> <button class="btn btn-default glyphicon glyphicon-remove" type="button" ng-click="eliminarArchivo(\'logo\')"></button> </span> <input class="filestyle" type="file" name="logo" id="logo" onchange="angular.element(this).scope().fileChanged(event)" data-ng-model="cliente.logo" data-placeholder="No file" accept="image/*"> </div> </div> <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"> <div class="modal-dialog"> <div class="modal-content"> <div class="modal-header"> <h4 class="modal-title">logo</h4> </div> <div class="modal-body"> <div class="" ng-show="imageCropStep == 2"> <!-- <image-crop       \r\n                   data-height="200" //shape\'s height\r\n                   data-width="150" //shape\'s width\r\n                   data-shape="square" //the shape.. square or circle\r\n                   data-step="imageCropStep"//scope variable that will contain the current step of the crop (1. Waiting for source image; 2. Image loaded, waiting for crop; 3. Crop done)\r\n                   src="imgSrc" //scope variable that will be the source image for the crop (may be a Blob or base64 string)\r\n                   data-result-blob="result" //scope variable that will contain the Blob information\r\n                   data-result="resultDataUrl" //scope variable that will contain the image\'s base64 string representation\r\n                   crop="initCrop" //scope variable that must be set to true when the image is ready to be cropped\r\n                   padding="250" //space, in pixels, rounding the shape\r\n                   max-size="1024" //max of the image, in pixels\r\n                   ></image-crop> --> <image-crop data-height="100" data-width="100" data-shape="square" data-step="imageCropStep" src="imgSrc" data-result="result" data-result-blob="resultBlob" crop="initCrop" padding="250" max-size="1024"></image-crop> </div> </div> <div class="modal-footer" ng-show="imageCropStep == 2"> <button class="btn btn-default" data-dismiss="modal" ng-click="clear()">Cancel</button> <button class="btn btn-primary" data-dismiss="modal" ng-click="initCrop = true">Crop</button> </div> </div><!-- /.modal-content --> </div><!-- /.modal-dialog --> </div><!-- /.modal --> <div class="form-group" ng-show="imageCropStep == 3"> <label for="logo">logo result</label><br> <img ng-src="{{result}}" class="img-thumbnail"> <textarea type="text" class="form-control" rows="3">{{ result }}</textarea> </div> <div class="form-group" ng-show="imageCropStep == 3"> <div class="text-center"> <button class="btn btn-default btn-block" ng-click="clear()">Clear</button> </div> </div> <div class="form-group"> <label for="logotext">logotext</label> <input class="form-control" id="logotext" name="logotext" placeholder="logotext" data-ng-model="client.logoText"> </div> <div class="form-group"> <label for="imagen">imagen</label> <div class="input-group"> <span class="input-group-btn" style="top:-1px"> <button class="btn btn-default glyphicon glyphicon-remove" type="button" ng-click="eliminarArchivo(\'image\')"></button> </span> <input type="file" id="image" name="image" data-ng-model="cliente.image" data-iconname="glyphicon glyphicon-inbox" accept="image/*"> </div> </div> <div class="form-group"> <label for="imagenText">imagenText</label> <textarea type="text" class="form-control" id="imagenText" name="imagenText" placeholder="imagenText" rows="3" data-ng-model="client.imagenText"></textarea> </div> <div class="form-group"> <div class="text-center"> <button data-loading-text="Saving Client..." type="submit" class="btn btn-save btn-block" data-ng-click="addClient()" ng-disabled="clientForm.$invalid">Save Client</button> </div> </div> </form> </div> <div class="col-xs-12 col-sm-8 col-md-8 col-lg-8 animated fadeInUp"> <div class="form-group"> <label for="search">Search</label> <input class="form-control" id="search" name="search" ng-model="search" placeholder="Search"> </div> <div class="table-responsive"> <table class="table table-bordered table-hover table-striped"> <thead> <tr> <th width="10%">#</th> <th width="30%">Name</th> <th width="30%">Address</th> <th width="30%">Email</th> </tr> </thead> <tbody> <tr ng-repeat="client in clients"> <th>{{client.id}}</th> <td>{{client.name}}</td> <td>{{client.address}}</td> <td>{{client.email}}</td> </tr> </tbody> </table> </div> <nav> <ul class="pagination"> <li> <a href="#" aria-label="Previous"> <span aria-hidden="true">&laquo;</span> </a> </li> <li class="active"><a href="#">1</a></li> <li><a href="#">2</a></li> <li> <a href="#" aria-label="Next"> <span aria-hidden="true">&raquo;</span> </a> </li> </ul> </nav> </div> </div>'),
a.put("views/main.html","<h1>MAIN</h1>")}]);