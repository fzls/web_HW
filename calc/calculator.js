/**
 * Created by 风之凌殇 on 4/8/2016.
 */
DEUBG = 1;
need_reset = false;
var screen = document.getElementById('screen');

function a(s) {
    if (DEUBG)
        alert(s);
}

function l(s) {
    if (DEUBG)
        console.log(s);
}

function functional_key(op) {
    var expr = screen.value;
    if (op == "Backspace")
        screen.value = expr.substring(0, expr.length - 1);
    else if (op == "clear")
        screen.value = '';
}

function addToScreen(op) {
    if (need_reset) {
        need_reset = false;
        screen.value = '';
    }
    screen.value += op;
}

document.addEventListener("keypress", key_board_version);

function key_board_version(e) {
    var _addtoscreen = "0123456789+-*/.";
    var _compute = "=\r";
    var key = String.fromCharCode(e.which);
    if (_addtoscreen.indexOf(key) != -1)
        addToScreen(key);
    if (_compute.indexOf(key) != -1)
        compute();
    if(e.which==27)
        functional_key("clear");
    if(e.which==8)
        functional_key("Backspace");
}


function isValid(expr) {
    return expr.match(/^\d+(\.\d+)?[+-/*/]\d+(\.\d+)?$/) != null;
}
function compute() {
    if (need_reset) {
        need_reset = false;
        screen.value = '';
    }
    var expr = screen.value;
    var result = 0;
    need_reset = true;
    if (!isValid(expr)) {
        screen.value = '表达式有误，请重新输入。';
        return;
    }

    // compute
    var res = expr.match(/^(\d+(\.\d+)?)([+-/*/])(\d+(\.\d+)?)$/)
    // find out lexme (1(2))(3)(4(5))
    var op1 = res[1];
    var op = res[3];
    var op2 = res[4];
    // parse value
    switch(op){
        case "+":
            result=parseFloat(op1)+parseFloat(op2);
            break;
        case "-":
            result=parseFloat(op1)-parseFloat(op2);

            break;
        case "*":
            result=parseFloat(op1)*parseFloat(op2);

            break;
        case "/":
            if(parseFloat(op2)>=-1e-6&&parseFloat(op2)<=1e-6){
                screen.value="divided by zero";
                return;
            }
            result=parseFloat(op1)/parseFloat(op2);

            break;

    }
    screen.value = result;
}
