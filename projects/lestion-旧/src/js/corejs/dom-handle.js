/**
 * dom操作汇总
 *
 * Created by cql on 2017/4/1.
 */


import addCssText from "dom/add-css-text";
import addScript from "dom/add-script";
import autoPrefix from "dom/autoprefix";
import click from "dom/click";
import htmlToElems from "dom/html-to-elems";
import htmlToNodes from "dom/html-to-nodes";
import scopeElements from "dom/scope-elements";


/**
 * each
 *
 * */
export function each(obj, fn) {
    var
        key,
        len = obj.length;

    if (len === undefined) {
        for (key in obj) {
            if (fn(key, obj[key]) === false) {
                break;
            }
        }
    }
    else {
        for (key = 0; key < len; key++) {
            if (fn(key, obj[key], len) === false) {
                break;
            }
        }
    }
}





/**
 * 快捷键
 * ctrl+? 两键组合
 * ctrl+shift+? 三键组合
 *
 * 未实现
 * ctrl+alt+? 三键组合
 *
 * */
export function shortcutKey({
    elem,
    ctrl = () => { },
    ctrlShift = () => { }
}) {

    let ctrlDown = false,
        shiftDown = false;

    elem.addEventListener('keydown', function (e) {

        if (e.keyCode === 17) {
            ctrlDown = true;
        }
        else if (e.keyCode === 16) {
            if (ctrlDown) {
                shiftDown = true;
            }
        }
        else {

            if (ctrlDown) {

                if (shiftDown) {
                    if (ctrlShift(e.keyCode) === false) {
                        e.preventDefault();
                    }
                }
                else if (ctrl(e.keyCode) === false) {
                    e.preventDefault();
                }


            }
        }
    });

    elem.addEventListener('keyup', function (e) {
        if (e.keyCode === 17) {
            ctrlDown = false;
        }
        else if (e.keyCode === 16) {
            shiftDown = false;
        }
    });

}

/**
 * 元素 className 操作
 * 兼容性: 包括ie6的所有
 * */
function hasClass(elem, className) {
    if (elem.classList) {
        hasClass = function (elem, className) {
            return elem.classList.contains(className);
        };
    }
    else {
        hasClass = function (elem, className) {
            return (' ' + elem.className + ' ').indexOf(' ' + className.trim() + ' ') > -1;
        }
    }
    return hasClass(elem, className);
}
function addClass(elem, className) {
    if (elem.classList) {
        addClass = function (elem, className) {
            elem.classList.add(className);
        };
    }
    else {
        addClass = function (elem, className) {
            if (hasClass(elem, className) === false) {
                elem.className = ((elem.className + ' ' + className).replace(/\s{2,}/g, ' ')).trim();
            }
        };
    }
    addClass(elem, className);
}
function removeClass(elem, className) {
    if (elem.classList) {
        removeClass = function (elem, className) {
            elem.classList.remove(className);
        }
    }
    else {
        removeClass = function (elem, className) {
            elem.className = (' ' + elem.className + ' ').replace(' ' + className.trim() + ' ', '');
        }
    }
    removeClass(elem, className);
}

///// 取元素
/**
 * 紧邻同辈元素 获取
 * 获取某节点 紧邻的 上或下 单个 同辈元素节点

 @param node 节点对象，一般为元素节点
 @param isPrev * [bool] 能代表真假的任意值，默认是假，即下一个，否则上一个

 @return [node] 元素节点 或者为 null

 @compatibility 所有浏览器
 */
function siblingElement(node, isPrev) {

    var str = isPrev ? "previousSibling" : "nextSibling";

    do {
        node = node[str];
        if (node === null) return null;
    } while (node.nodeType !== 1);

    return node;
}
export function nextElementSibling(elem) {
    return elem.nextElementSibling;
}

/**
 * 元素查询
 *
 * @example
 // 支持同名
 queryElements(eToolBar,'.name,.name',function (elems) {
    elmA = elems['.name'];
    elmB = elems['.name1'];
 });

 *
 *
 * id，className，tagName 包含着三种选择
 *
 * names 的顺序，需与文档元素同步
 * */
export function queryElements(rootElem, names, callback) {
    var name,
        resultElems = [],
        nameIds = {},
        test;

    if (typeof names === 'string') names = names.split(',');

    setName();

    go(rootElem.children);

    callback(resultElems);

    function go(childs) {

        var nameId = '';
        for (var i = 0, len = childs.length, elem; i < len; i++) {
            elem = childs[i];

            if (!name) {
                return false;
            }
            nameId = nameIds[name];
            if (!nameId) {
                nameId = nameIds[name] = '';
            }

            if (test(elem)) {

                resultElems.push(elem);
                resultElems[name + nameId] = elem;

                nameIds[name]++;

                setName();
            }

            go(elem.children);
        }

    }

    function setName() {
        name = names.shift();

        if (name) {
            var lName = name.substr(0, 1),
                rName = name.substr(1);
            if (lName === '.') {
                test = function (elem) {
                    return hasClass(elem, rName);
                };
            }
            else if (lName === '#') {
                test = function (elem) {
                    return elem.id === rName;
                };
            }
            else {
                test = function (elem) {
                    // html标签 tagName 大写，但svg标签 tagName 小写
                    return elem.tagName.toUpperCase() === name.toUpperCase();
                };
            }
        }
    }
}



///// 仿Jq
/**
 * 仿jq链式调用
 *
 * @param elems html 文本、单个元素、元素集合
 *
 *
 **/
function Dom(elems) {

    // html
    if (typeof elems === 'string') {
        elems = htmlToElems(elems);
    }

    let count = elems.length;

    ///// 0 单个元素情况，直接返回
    if (count === undefined) {
        this[0] = elems;
        this.length = 0;
        return;
    }

    ///// 1 处理剩下的
    for (let i = 0; i < count; i++) {
        this[i] = elems[i];
    }
    this.length = count;
}
Dom.prototype = {
    next(){
        return new Dom(nextElementSibling(this[0]));
    },
    each(cb){
        for (let i = 0, len = this.length, elem; i < len; i++) {
            elem = this[i];
            if (cb.call(elem, i, elem) === false)break;
        }
        return this;
    },
    hasClass(className){
        return hasClass(this[0], className);
    },
    addClass(className){
        return addClass(this[0], className);
    },
    removeClass(className){
        return removeClass(this[0], className);
    }
};
function dom(elem) {
    return new Dom(elem);
}

/**
 * 获取滚动条Top，浏览器窗口滚动条
 *
 * 兼容性：包括ie6的所有浏览器
 * */
dom.scrollTop = function () {
    this.scrollTop = 'pageYOffset' in window ? function () {
        return pageYOffset;
    } : function () {
        return document.documentElement.scrollTop;
    };
    return this.scrollTop();
};
dom.scrollLeft = function () {
    this.scrollLeft = 'pageXOffset' in window ? function () {
        return pageXOffset;
    } : function () {
        return document.documentElement.scrollLeft;
    };
    return this.scrollLeft();
};


export {
    addCssText,
    addScript,
    click,
    scopeElements,
    htmlToElems, htmlToNodes,
    autoPrefix,
    dom as $
}

