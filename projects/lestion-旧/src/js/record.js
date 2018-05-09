/**
 * Created by cql on 2017/5/27.
 */
import '../css/base.css'
import '../css/record.css'
import {click, htmlToElems, insertAfter, insertBefore, queryElements, scopeElements,device,ExcuDelay,ExcuInterval} from "./corejs/corejs";
let {isIOS} = device;
let excuDelay = new ExcuDelay();

function scrollTop(elem, y) {
    if (elem === window) {
        elem.scrollTo(0, y);
    }
    else {
        elem.scrollTop = y;
    }
}

function scrollActive() {
    excuDelay.excu(function () {
        scrollTop(eEdit, activeBox.offsetTop - eEdit.clientHeight / 2 + 30);
        scrollTop(window, eEdit.offsetTop + activeBox.offsetTop - eEdit.scrollTop - 60);
    }, 300);
}

// 文本框
function addTextBox({
                        html='',
                        label
                    }) {

    let className = getCalssNameByLabel(label);

    let eDiv=document.createElement('div');
    eDiv.innerText=html;

    let eRecordBox = htmlToElems(`<div class="${className}" contenteditable="true" data-type="0" data-label="${label}">&nbsp;${eDiv.innerHTML}</div>`)[0];

    if (activeBox.classList.contains('none')) {
        insertBefore(activeBox, eRecordBox);
    }
    else {
        insertAfter(activeBox, eRecordBox);
    }

    delHandle(eRecordBox);

    eRecordBox.onfocus = function () {
        activeBox = this;
    };

    if (isIOS) {
        eRecordBox.focus();
    }
    else {
        setTimeout(function () {
            eRecordBox.focus();
        }, 10);
    }

    setTimeout(function () {
        eRecordBox.focus();
        let selection = global.getSelection();
        let range = document.createRange();
        range.selectNode(eRecordBox.lastChild);
        range.collapse(false);

        selection.removeAllRanges();
        selection.addRange(range);

        scrollActive();

    }, 20);

    activeBox = eRecordBox;
}

// 图片框
function addPicture({
                        content,
                        label = activeBox.dataset.label * 1,
                        type
                    }) {


    let eRecordBox = htmlToElems(`<div class="${getCalssNameByLabel(label)}" data-content="${content}" data-type="${type}" data-label="${label}"><div class="img"><img src="${content}"><i class="close"></i></div><p style="display:none">1</p></div>`)[0];

    if (activeBox.classList.contains('none')) {
        insertBefore(activeBox, eRecordBox);
    }
    else {
        insertAfter(activeBox, eRecordBox);
    }

    // 删除空
    if (!activeBox.classList.contains('none') && !activeBox.textContent.trim()) {
        activeBox.remove();
        activeBox = eRecordBox;
    }

    // 事件
    click(eRecordBox, function (e) {

        scopeElements(e.target, function (elem) {

            if (elem === eRecordBox) {
                activeBox = eRecordBox;
                return false;
            }
            if (elem.className === 'close') {

                eRecordBox.remove();
                activeBox = eBlankRecordBox;
                return false;
            }
        });
    });

    activeBox = eRecordBox;

    scrollActive();
}

// 音频
function addAudio({
                      content,
                      time_length,
                      label = activeBox.dataset.label * 1
                  }) {
    let eRecordBox = htmlToElems(`<div class="${getCalssNameByLabel(label)}" data-content="${content}" data-time="${time_length}" data-type="2" data-label="${label}"><p></p><a class="audio">${time_length}s<i class="close"></i></a></div>`)[0];

    if (activeBox.classList.contains('none')) {
        insertBefore(activeBox, eRecordBox);
    }
    else {
        insertAfter(activeBox, eRecordBox);
    }

    // 删除空
    if (!activeBox.classList.contains('none') && !activeBox.textContent.trim()) {
        activeBox.remove();
        activeBox = eRecordBox;
    }

    // 事件
    click(eRecordBox, function (e) {

        scopeElements(e.target, function (elem) {

            if (elem === eRecordBox) {
                activeBox = eRecordBox;
                return false;
            }
            let classList = elem.classList;
            if (classList.contains('audio')) {
                if (classList.contains('play')) {
                    audio.pause();
                    classList.remove('play');
                }
                else {
                    audio.curr.remove('play');
                    audio.src = eRecordBox.dataset.content;
                    audio.play();
                    audio.onended = function () {
                        classList.remove('play');
                    };
                    audio.curr = classList;
                    classList.add('play');
                }

                return false;
            }
            if (classList.contains('close')) {
                if (elem.parentElement.classList.contains('play')) {
                    audio.pause();
                }
                eRecordBox.remove();
                activeBox = eBlankRecordBox;
                return false;
            }
        });
    });

    activeBox = eRecordBox;

    scrollActive();
}

function getCalssNameByLabel(label) {
    let className = 'general';
    switch (label * 1) {
        case 0:
            className = 'merit';
            break;
        case 1:
            className = 'suggest';
            break;
    }

    return className;
}

let global = window;

let eBox,
    eEdit, eToolBar,
    eBlankRecordBox,
    activeBox;

let audio = new Audio();
document.body.appendChild(audio)
audio.curr = {
    remove(){
    }
};

queryElements(document.body, '.classes-estimate-editor,.cee-edit,.general,.cee-bottom-tool-bar', function (elems) {

    eBox = elems[0];
    eEdit = elems[1];
    eBlankRecordBox = elems[2];
    eToolBar = elems[3];

    activeBox = eBlankRecordBox;
});

eToolBar && click(eToolBar, function (e) {

    scopeElements(e.target, function (elem) {
        if (eToolBar === elem) return false;

        if (elem.className === 'item') {
            let eRecordBox, selection, range;
            switch (elem.children[0].classList[0]) {
                case 'merit-btn':
                    // 优点

                    addTextBox({
                        label: 0
                    });

                    break;
                case 'suggest-btn':
                    // 建议

                    addTextBox({
                        label: 1
                    });

                    break;
                // case 'key-btn':
                //     // 键盘
                //     break;
                case 'enamel-btn':
                    //

                    global.webjs.draw();
                    break;
                case 'camera-btn':
                    global.webjs.camera();
                    break;
                case 'voice-btn':
                    global.webjs.voice();
                    break;
            }

            return false;
        }

    });
});

/*eBlankRecordBox.oninput = function () {
 let eRecordBox = htmlToElems(`
 <div class="general" contenteditable="true">${eBlankRecordBox.innerHTML}</div>
 `)[0];

 eBlankRecordBox.innerHTML = '';

 delHandle(eRecordBox);

 insertBefore(eBlankRecordBox, eRecordBox);

 let selection = window.getSelection();
 let range = document.createRange();
 range.selectNode(eRecordBox.lastChild);
 selection.removeAllRanges();
 selection.addRange(range);
 selection.collapseToEnd();

 }*/

eBlankRecordBox.oninput = function () {

    let eRecordBox = htmlToElems(`<div class="general none" contenteditable="true" data-label="2" data-type="0"></div>`)[0];

    eRecordBox.oninput = eBlankRecordBox.oninput;

    eEdit.appendChild(eRecordBox);
    eBlankRecordBox.className = 'general';
    delHandle(eBlankRecordBox);

    eBlankRecordBox = eRecordBox;

    eBlankRecordBox.onfocus = function () {
        activeBox = this;
    };
};

eBlankRecordBox.onfocus = function () {
    activeBox = this;
};

setTimeout(function () {
    eBlankRecordBox.focus();
}, 100);

function delHandle(elem) {
    let excuInterval = new ExcuInterval(),
        isDel = 0;

    function del() {
        if (isDel) {
            excuInterval.excu(function () {
                if (elem.innerText.trim().length) {

                }
                else {
                    activeBox = elem.nextElementSibling;

                    elem.remove();

                    activeBox.focus();
                }
            });
        }
    }

    elem.addEventListener('keydown', function (e) {

        // 文本删除

        if (e.keyCode === 8) {
            isDel = 1;
        }

        del();

        /*switch (elem.dataset.type) {
         case '1':
         case '2':
         // 其它附件
         if (e.keyCode === 8) {
         elem.remove();
         }

         e.preventDefault();
         break;
         default:
         // 文本删除

         if (e.keyCode === 8) {
         isDel = 1;
         }
         }*/

    });

    elem.oninput = null;

    /*elem.oninput = function (e) {

     if (isDel) {
     excuInterval.excu(function () {
     if (elem.innerText.trim().length) {

     }
     else {
     activeBox = elem.nextElementSibling;

     elem.remove();

     activeBox.focus();
     }
     });
     }
     };*/

}

global.addPicture = addPicture;
global.addAudio = addAudio;
global.addTextBox = addTextBox;
global.saveData = function () {
    let d = [];
    let child = eEdit.children;

    for (let i = 0, len = child.length, item, type, dataset, order = 0; i < len; i++) {
        item = child[i];

        dataset = item.dataset;
        type = dataset.type;

        switch (type) {
            case '0':
                let text = item.innerText.trim();
                if (text) {
                    d.push({
                        "content": text,
                        "content_type": 0,
                        "label": dataset.label * 1,
                        "display_order": order
                    });
                }

                order++;
                break;
            case '1':
            case '3':
                d.push({
                    "content": dataset.content,
                    "content_type": type * 1,
                    "label": dataset.label * 1,
                    "display_order": order
                });
                order++;
                break;
            case '2':
                d.push({
                    "content": dataset.content,
                    "content_type": 2,
                    "label": dataset.label * 1,
                    "display_order": order,
                    "time_length": dataset.time + ''
                });
                order++;
                break;
            default:
        }

    }

    if (global.webjs.saveData) {
        global.webjs.saveData(JSON.stringify(d));
    }
    else {
        return JSON.stringify(d);
    }
};

// 编辑情况
global.transmitData = function (data) {

    data.forEach(function (d) {
        let
            type = d.content_type * 1;

        switch (type) {
            case 1:
            case 3:
                addPicture({
                    content: d.content,
                    type: type,
                    label: d.label
                });
                break;
            case 2:
                addAudio({
                    content: d.content,
                    time_length: d.time_length,
                    label: d.label
                });
                break;
            default:
                addTextBox({
                    html: d.content,
                    label: d.label
                });
        }
    });

    setTimeout(function () {
        eBlankRecordBox.focus();
    }, 100);

};
