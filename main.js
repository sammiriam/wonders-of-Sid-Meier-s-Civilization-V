//通用函数function g(selector) {    var method = selector.substr(0, 1) == '.' ? 'getElementsByClassName' : 'getElementById';    return document[method](selector.substr(1));}//随机生成一个数支持取值范围 random([min, max])function random(range) {    var max = Math.max(range[0], range[1]);    var min = Math.min(range[0], range[1]);    var diff = max - min + 1;    return Math.floor(Math.random()*diff + min);}//输出所有海报var data = data;function addPhotos() {    var template = g('#wrap').innerHTML;    var html = [];    var nav = [];    for (var s = 0; s < data.length; s++){        var _html = template                        .replace('{{index}}', s.toString())                        .replace('{{img}}', data[s].img)                        .replace('{{caption}}', data[s].caption)                        .replace('{{desc}}', data[s].desc);        html.push(_html);        nav.push('<span id="nav' + s + '" onclick= "turn( g(\'#photo' + s + '\') )" class="i">&nbsp;</span>');    }    html.push('<div class="nav">' + nav.join("") + '</div>');    g("#wrap").innerHTML = html.join("");    resort(random([0, data.length]));}addPhotos();//翻面控制function turn(elem) {    var cls = elem.className;    var n = elem.id.split('-')[1];    if (!/photo-center/.test(cls)) {        return resort(n);    }    if (/photo-front/.test(cls)) {        cls = cls.replace(/photo-front/, 'photo-back');        //g("#nav" + n).className = g("#nav" + n).className.replace('i','i curr-back');        g("#nav" + n).className += " curr-back";    }else {        cls = cls.replace(/photo-back/, 'photo-front');        //g("#nav" + n).className = g("#nav" + n).className.replace(/\s*curr-back\s*/, " ");        g("#nav"+n).className = g('#nav_'+n).className.replace(/\s*curr-back\s*/," ");    }    return elem.className = cls;}//计算左右分区范围function zone() {    var range = {        left : {            x : [],            y : []        },        right : {            x : [],            y : []        }    };    var wrap = {        w : g("#wrap").clientWidth,        h : g("#wrap").clientHeight    };    var photo = {        w : g(".photo")[0].clientWidth,        h : g(".photo")[0].clientHeight    };    range.wrap = wrap;    range.photo = photo;    range.left.x = [0 - photo.w, wrap.w / 2 - photo.w / 2];    range.left.y = [0 - photo.h, wrap.h];    range.right.x = [wrap.w / 2 + photo.w / 2, wrap.w + photo.w];    range.right.y = range.left.y;    return range;}//海报排序function resort(n) {        var _photo = g(".photo");        var photos = [];        for (var s = 0; s < _photo.length; s++){            _photo[s].className = _photo[s].className.replace(/\s*photo-center\s*/, " ");            _photo[s].className = _photo[s].className.replace(/\s*photo-front\s*/, " ");            _photo[s].className = _photo[s].className.replace(/\s*photo-back\s*/, " ");            _photo[s].className += " photo-front";            _photo[s].style.left = "";            _photo[s].style.top = "";            _photo[s].style["transform"] = "rotate(360deg)";            photos.push(_photo[s]);        }        var photoCenter = g("#photo" + n);        photoCenter.className += " photo-center";        //把海报分为两个部分        var photosLeft = photos.splice(0, Math.ceil(photos.length / 2));        var photosRight = photos;        var ranges = zone();        for (var s = 0; s < photosLeft.length; s++) {            var photo = photosLeft[s];            photo.style.left = random(ranges.left.x) + "px"; //散乱排列            photo.style.top = random(ranges.left.y) + "px";            photo.style['transform']='rotate('+random([-150,150])+'deg)';            //photo.style["transform"] = "rotate(" + random([-60, 60]) + "deg) scale(.8) translate(600px)"; //环形排列        }        for (var s = 0; s < photosRight.length; s++) {            var photo = photosRight[s];            photo.style.left = random(ranges.right.x) + "px"; //散乱排列            photo.style.top = random(ranges.right.y) + "px";            photo.style['transform']='rotate('+random([-150,150])+'deg)';            //photo.style["transform"] = "rotate(" + random([-60, 60]) + "deg) scale(.8) translate(600px)"; //环形排列        }        //控制按钮处理        var navs = g(".i");        for (var s = 0; s < navs.length; s++) {            navs[s].className = navs[s].className.replace(/\s*current\s*/, " ");            navs[s].className = navs[s].className.replace(/\s*curr-back\s*/, " ");        }        g("#nav" + n).className += " current";    }